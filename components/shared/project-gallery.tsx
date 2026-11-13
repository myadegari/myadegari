"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import { Counter, Fullscreen, Thumbnails, Zoom } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { cn } from "@/lib/utils";

/** X shows at most four tiles and folds the rest into a "+N" overlay. */
const MAX_TILES = 4;

export function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(-1);
  const count = images.length;
  const visible = images.slice(0, MAX_TILES);
  const hidden = count - visible.length;

  return (
    <>
      <div
        className={cn(
          "mt-3 grid gap-0.5 overflow-hidden rounded-2xl bg-border",
          count === 1 && "aspect-[16/9]",
          count === 2 && "aspect-[2/1] grid-cols-2",
          count === 3 && "aspect-[3/2] grid-cols-2 grid-rows-2",
          count >= 4 && "aspect-[16/10] grid-cols-2 grid-rows-2"
        )}
      >
        {visible.map((src, i) => {
          const isClamped = hidden > 0 && i === visible.length - 1;

          return (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={
                isClamped
                  ? `${title} — view screenshot ${i + 1} of ${count} (${hidden} more) full size`
                  : `${title} — view screenshot ${i + 1} of ${count} full size`
              }
              className={cn(
                "group relative h-full w-full cursor-zoom-in overflow-hidden bg-muted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary",
                count === 3 && i === 0 && "row-span-2"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${title} — screenshot ${i + 1}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {isClamped ? (
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-foreground/60 text-2xl font-semibold text-background">
                  +{hidden}
                </span>
              ) : (
                <span className="pointer-events-none absolute inset-0 bg-foreground/0 transition-colors duration-200 group-hover:bg-foreground/10" />
              )}
            </button>
          );
        })}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={Math.max(index, 0)}
        slides={images.map((src, i) => ({ src, alt: `${title} — screenshot ${i + 1}` }))}
        plugins={[Counter, Fullscreen, Thumbnails, Zoom]}
        counter={{ separator: "/" }}
        thumbnails={{ position: "bottom", width: 120, height: 70 }}
        zoom={{ maxZoomPixelRatio: 4, scrollToZoom: true }}
        carousel={{ finite: true }}
        styles={{ root: { "--yarl__color_backdrop": "rgba(0,0,0,0.9)" } }}
      />
    </>
  );
}
