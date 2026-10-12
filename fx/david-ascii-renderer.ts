"use client";

import * as THREE from "three";

/** Glyphs ordered by visual density (index 0 is blank, never used for kept points). */
const CHARSET = "$";
const ATLAS_COLS = 8;
const ATLAS_ROWS = 4;
const CELL = 72;

/** Per-theme source images (white statue on black / black statue on white). */
const DEFAULT_DARK_SRC = "/dark-david.jpg";
const DEFAULT_LIGHT_SRC = "/light-david.jpg";

const LUMA_THRESHOLD = 0.1;
/**
 * Shared tonal curve for both modes ("matched settings"): lifts shadow
 * detail so dark-david's near-black hair reads with the same emphasis as
 * light-david's solid-black hair. Applied identically to both polarities.
 */
const TONE_GAMMA = 0.55;
const RELIEF_DEPTH = 0.3;
const PLANE_W = 2;
const FOV_DEG = 35;

export type DavidQuality = "high" | "low";

/**
 * Sampling density and backing-store scale per quality.
 *
 * `low` is the phone setting, where the banner renders a single frozen frame.
 * Because nothing is repainted after that frame, the backing-store scale is
 * free, so it stays high enough to keep the glyphs crisp. The column count is
 * what actually governs legibility: point size is derived from the row
 * spacing, so sampling too coarsely enlarges every sprite until the glyphs
 * overlap and the statue reads as random dots. Keep this at the density the
 * phone looked right at, and buy the performance back from not animating
 * rather than from throwing points away.
 */
const QUALITY_SETTINGS = {
  high: { columns: 270, maxPixelRatio: 2, antialias: true },
  low: { columns: 110, maxPixelRatio: 1.5, antialias: false },
} as const satisfies Record<
  DavidQuality,
  { columns: number; maxPixelRatio: number; antialias: boolean }
>;

export interface DavidAsciiInit {
  container: HTMLElement;
  quality?: DavidQuality;
  /** When true, render a single static frame and never start the rAF loop. */
  staticFrame?: boolean;
  darkSrc?: string;
  lightSrc?: string;
}

function sampleLuminance(
  img: HTMLImageElement,
  cols: number
): { luma: Float32Array; cols: number; rows: number; aspect: number } {
  const aspect = img.naturalWidth / img.naturalHeight;
  const rows = Math.max(1, Math.round(cols / aspect));
  const off = document.createElement("canvas");
  off.width = cols;
  off.height = rows;
  const ctx = off.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2d context unavailable");
  ctx.drawImage(img, 0, 0, cols, rows);
  const data = ctx.getImageData(0, 0, cols, rows).data;
  const luma = new Float32Array(cols * rows);
  for (let i = 0; i < cols * rows; i++) {
    const r = data[i * 4] / 255;
    const g = data[i * 4 + 1] / 255;
    const b = data[i * 4 + 2] / 255;
    luma[i] = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  return { luma, cols, rows, aspect };
}

function buildGlyphAtlas(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = ATLAS_COLS * CELL;
  canvas.height = ATLAS_ROWS * CELL;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2d context unavailable");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.font = `600 ${Math.round(CELL * 0.72)}px "Courier New", ui-monospace, monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let i = 0; i < CHARSET.length; i++) {
    const col = i % ATLAS_COLS;
    const row = Math.floor(i / ATLAS_COLS);
    ctx.fillText(
      CHARSET[i],
      col * CELL + CELL / 2,
      row * CELL + CELL / 2 + CELL * 0.03
    );
  }
  return canvas;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(new Error(`Failed to load ASCII source: ${src}`));
    img.src = src;
  });
}

const VERT = /* glsl */ `
attribute float aGlyph;
attribute float aScale;
attribute float aShade;
uniform float uPixelFactor;
uniform float uSpacing;
varying float vGlyph;
varying float vShade;
void main() {
  vGlyph = aGlyph;
  vShade = aShade;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  float dist = max(-mv.z, 0.001);
  gl_PointSize = uPixelFactor * uSpacing * aScale / dist;
}
`;

const FRAG = /* glsl */ `
precision mediump float;
uniform sampler2D uAtlas;
uniform vec3 uColor;
uniform float uCols;
uniform float uRows;
varying float vGlyph;
varying float vShade;
void main() {
  float col = mod(vGlyph, uCols);
  float row = floor(vGlyph / uCols);
  vec2 uv = vec2(
    (col + gl_PointCoord.x) / uCols,
    (row + gl_PointCoord.y) / uRows
  );
  vec4 tex = texture2D(uAtlas, uv);
  float a = max(tex.a, tex.r);
  if (a < 0.05) discard;
  vec3 c = uColor * (0.55 + 0.45 * vShade);
  gl_FragColor = vec4(c, a);
}
`;

/**
 * True-3D ASCII relief of the David statue.
 * Luminance becomes geometry (z-displacement) and glyph choice, so highlights
 * like the nose, brow and curls physically parallax against the shadows.
 * Dark mode samples dark-david.jpg (bright statue on black) with glyphs for
 * the LIGHT parts; light mode samples light-david.jpg (dark statue on
 * white) with the logic inverted — glyphs for the DARK parts.
 */
export class DavidAsciiRenderer {
  private canvas: HTMLCanvasElement;
  private container: HTMLElement;
  private quality: DavidQuality;
  private staticFrame: boolean;
  private darkSrc: string;
  private lightSrc: string;

  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private group: THREE.Group | null = null;
  private points: THREE.Points | null = null;
  private material: THREE.ShaderMaterial | null = null;
  private geometry: THREE.BufferGeometry | null = null;
  private atlasTexture: THREE.CanvasTexture | null = null;

  private sample: {
    luma: Float32Array;
    cols: number;
    rows: number;
    aspect: number;
  } | null = null;
  private spacing = 0;
  private aspect = 713 / 529;
  private currentSrc: string | null = null;
  private loadToken = 0;

  private raf = 0;
  private running = false;
  private visible = true;
  private disposed = false;
  private startTime = 0;

  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private themeObserver: MutationObserver | null = null;

  constructor(canvas: HTMLCanvasElement, init: DavidAsciiInit) {
    this.canvas = canvas;
    this.container = init.container;
    this.quality = init.quality ?? "high";
    this.staticFrame = init.staticFrame ?? false;
    this.darkSrc = init.darkSrc ?? DEFAULT_DARK_SRC;
    this.lightSrc = init.lightSrc ?? DEFAULT_LIGHT_SRC;
  }

  /**
   * Build the point cloud. Dark mode maps glyphs to LIGHT parts (luminance
   * of dark-david.jpg); light mode inverts and maps glyphs to DARK parts
   * (1 - luminance of light-david.jpg). Both sides share the same tonal
   * curve, glyph ramp, relief depth and sizing so the two views match.
   */
  private buildGeometry(inverted: boolean): THREE.BufferGeometry {
    const sample = this.sample;
    if (!sample) throw new Error("ASCII sampling missing");
    const { luma, cols: w, rows: h, aspect } = sample;

    const planeH = PLANE_W / aspect;
    const positions: number[] = [];
    const glyphs: number[] = [];
    const scales: number[] = [];
    const shades: number[] = [];
    const glyphCount = CHARSET.length;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const l = luma[y * w + x];
        const raw = inverted ? 1 - l : l;
        if (raw < LUMA_THRESHOLD) continue;
        // Matched tonal curve for both modes.
        const v = Math.pow(raw, TONE_GAMMA);
        const px = (x / (w - 1) - 0.5) * PLANE_W;
        const py = (0.5 - y / (h - 1)) * planeH;
        positions.push(px, py, v * RELIEF_DEPTH);
        glyphs.push(
          1 + Math.min(glyphCount - 2, Math.floor(v * (glyphCount - 1)))
        );
        scales.push(1.35 * (0.55 + 0.85 * v));
        shades.push(v);
      }
    }
    if (positions.length === 0) throw new Error("ASCII sampling empty");

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute("aGlyph", new THREE.Float32BufferAttribute(glyphs, 1));
    geometry.setAttribute("aScale", new THREE.Float32BufferAttribute(scales, 1));
    geometry.setAttribute("aShade", new THREE.Float32BufferAttribute(shades, 1));
    return geometry;
  }

  async init(): Promise<void> {
    const settings = QUALITY_SETTINGS[this.quality];
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        alpha: true,
        // MSAA does nothing for a point cloud (the fragments are discarded or
        // blended, never edge-antialiased), so it is only paid for on desktop.
        antialias: settings.antialias,
        powerPreference: this.staticFrame ? "low-power" : "default",
      });
    } catch {
      throw new Error("WebGL unavailable");
    }
    this.renderer = renderer;
    renderer.setClearColor(0x000000, 0);

    const dark = this.isDark();
    const loaded = await this.loadSource(dark);
    if (!loaded || this.disposed) {
      throw new Error("ASCII source unavailable");
    }
    this.sample = loaded.sample;
    this.currentSrc = loaded.src;
    this.aspect = loaded.sample.aspect;
    this.spacing = PLANE_W / loaded.sample.aspect / loaded.sample.rows;

    const geometry = this.buildGeometry(!dark);
    this.geometry = geometry;

    const atlas = buildGlyphAtlas();
    const atlasTexture = new THREE.CanvasTexture(atlas);
    atlasTexture.flipY = false;
    atlasTexture.minFilter = THREE.LinearFilter;
    atlasTexture.magFilter = THREE.LinearFilter;
    atlasTexture.generateMipmaps = false;
    this.atlasTexture = atlasTexture;

    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uAtlas: { value: atlasTexture },
        uColor: { value: new THREE.Color(this.isDark() ? "#ded9cc" : "#26262a") },
        uCols: { value: ATLAS_COLS },
        uRows: { value: ATLAS_ROWS },
        uPixelFactor: { value: 1 },
        uSpacing: { value: this.spacing },
      },
      transparent: true,
      depthTest: true,
      depthWrite: false,
    });
    this.material = material;

    const scene = new THREE.Scene();
    const group = new THREE.Group();
    const points = new THREE.Points(geometry, material);
    group.add(points);
    this.points = points;
    scene.add(group);
    this.scene = scene;
    this.group = group;

    const camera = new THREE.PerspectiveCamera(FOV_DEG, 1, 0.5, 50);
    this.camera = camera;

    this.resize();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.container);

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        this.visible = entries.some((e) => e.isIntersecting);
        this.kick();
      },
      { threshold: 0 }
    );
    this.intersectionObserver.observe(this.container);

    this.themeObserver = new MutationObserver(() => this.applyTheme());
    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    this.startTime = performance.now();
    if (this.staticFrame) {
      if (this.quality === "high") {
        // Reduced motion on a capable device: a strong tilt so the relief
        // reads as sculpted rather than flat.
        group.rotation.set(1.04, 0.18, 0);
      } else {
        // A frozen phone frame has to hold the same pose the animation rests
        // at. The dramatic tilt above is meant to be read through parallax
        // over time; frozen at phone sampling density it just turns the
        // silhouette away from the viewer and the cloud becomes noise.
        group.rotation.set(0.05, 0.1, 0);
      }
      this.render();
    } else {
      this.kick();
    }
  }

  setQuality(quality: DavidQuality) {
    this.quality = quality;
  }

  private isDark(): boolean {
    return document.documentElement.classList.contains("dark");
  }

  private srcFor(dark: boolean): string {
    return dark ? this.darkSrc : this.lightSrc;
  }

  private async loadSource(dark: boolean): Promise<{
    src: string;
    sample: { luma: Float32Array; cols: number; rows: number; aspect: number };
  } | null> {
    const src = this.srcFor(dark);
    const token = ++this.loadToken;
    let img: HTMLImageElement;
    try {
      img = await loadImage(src);
    } catch {
      return null;
    }
    if (this.disposed || token !== this.loadToken) return null;
    const { columns } = QUALITY_SETTINGS[this.quality];
    return { src, sample: sampleLuminance(img, columns) };
  }

  private applyTheme() {
    const dark = this.isDark();
    const color = this.material?.uniforms["uColor"] as
      | { value: THREE.Color }
      | undefined;
    color?.value.set(dark ? "#ded9cc" : "#26262a");
    void this.syncSource(dark);
  }

  /** Swap the sampled image + rebuild the cloud when the theme side changes. */
  private async syncSource(dark: boolean): Promise<void> {
    if (!this.points || !this.material || this.disposed) return;
    if (this.srcFor(dark) === this.currentSrc) return;
    const loaded = await this.loadSource(dark);
    if (!loaded || this.disposed || !this.points || !this.material) return;
    this.sample = loaded.sample;
    this.currentSrc = loaded.src;
    this.aspect = loaded.sample.aspect;
    this.spacing = PLANE_W / loaded.sample.aspect / loaded.sample.rows;
    const spacing = this.material.uniforms["uSpacing"] as
      | { value: number }
      | undefined;
    if (spacing) spacing.value = this.spacing;
    const next = this.buildGeometry(!dark);
    this.points.geometry.dispose();
    this.points.geometry = next;
    this.geometry = next;
    // Refit the camera to the new image aspect (still contain-fit, no crop).
    this.resize();
  }

  private resize() {
    if (!this.renderer || !this.camera || this.disposed) return;
    const rect = this.container.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    const ratio = Math.min(
      window.devicePixelRatio || 1,
      QUALITY_SETTINGS[this.quality].maxPixelRatio
    );
    this.renderer.setPixelRatio(ratio);
    this.renderer.setSize(width, height, false);

    const aspect = width / height;
    this.camera.aspect = aspect;
    // Contain-fit: whole relief plane always inside the frustum (never cropped).
    const planeH = PLANE_W / this.aspect;
    const halfFovTan = Math.tan(THREE.MathUtils.degToRad(FOV_DEG / 2));
    const fitH = planeH / 2 / halfFovTan;
    const fitW = PLANE_W / 2 / (halfFovTan * aspect);
    this.camera.position.set(0, 0, Math.max(fitH, fitW) * 1.12);
    this.camera.updateProjectionMatrix();

    const pixelFactor = this.material?.uniforms["uPixelFactor"] as
      | { value: number }
      | undefined;
    if (pixelFactor) {
      pixelFactor.value =
        (height * ratio) / (2 * halfFovTan * this.camera.position.z);
    }
    if (this.staticFrame) this.render();
  }

  private kick() {
    if (
      this.disposed ||
      this.staticFrame ||
      this.running ||
      !this.visible ||
      !this.renderer ||
      !this.scene ||
      !this.camera ||
      !this.group
    ) {
      return;
    }
    this.running = true;
    const loop = () => {
      if (this.disposed || !this.visible || this.staticFrame) {
        this.running = false;
        return;
      }
      this.raf = requestAnimationFrame(loop);
      const t = (performance.now() - this.startTime) / 1000;
      if (this.group) {
        this.group.rotation.y = Math.sin(t * 0.22) * 0.12;
        this.group.rotation.x = Math.cos(t * 0.18) * 0.05;
      }
      this.render();
    };
    loop();
  }

  private render() {
    if (!this.renderer || !this.scene || !this.camera || this.disposed) return;
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.disposed = true;
    this.running = false;
    cancelAnimationFrame(this.raf);
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
    this.themeObserver?.disconnect();
    this.geometry?.dispose();
    this.material?.dispose();
    this.atlasTexture?.dispose();
    this.renderer?.dispose();
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.group = null;
    this.points = null;
    this.sample = null;
    this.currentSrc = null;
    this.material = null;
    this.geometry = null;
    this.atlasTexture = null;
  }
}
