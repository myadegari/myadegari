import type { CertFieldId, Lang } from "@/lib/types";

/**
 * Skill areas used to group certificates on `/certificates`.
 *
 * Order here is display order. Every certificate in `@/lib/certificates` maps
 * to exactly one field, so the per-field counts always sum to the total.
 */
export interface CertField {
  id: CertFieldId;
  label: Record<Lang, string>;
  blurb: Record<Lang, string>;
}

export const CERT_FIELDS: CertField[] = [
  {
    id: "deep-learning",
    label: {
      en: "Deep Learning & Neural Networks",
      fa: "یادگیری عمیق و شبکه‌های عصبی",
    },
    blurb: {
      en: "PyTorch fundamentals through the full Deep Learning Specialization.",
      fa: "از مبانی پای‌تورچ تا تخصص کامل یادگیری عمیق.",
    },
  },
  {
    id: "llm-genai",
    label: {
      en: "LLMs & Generative AI",
      fa: "مدل‌های زبانی و هوش مصنوعی مولد",
    },
    blurb: {
      en: "Transformer internals, fine-tuning, small language models and prompting.",
      fa: "معماری ترنسفورمر، تنظیم دقیق، مدل‌های زبانی کوچک و پرامپت‌نویسی.",
    },
  },
  {
    id: "machine-learning",
    label: {
      en: "Machine Learning & Data Science",
      fa: "یادگیری ماشین و علم داده",
    },
    blurb: {
      en: "Classical supervised and unsupervised learning, EDA and project structuring.",
      fa: "یادگیری نظارت‌شده و بدون نظارت، تحلیل داده و ساختار پروژه.",
    },
  },
  {
    id: "rl-agents",
    label: {
      en: "Reinforcement Learning & AI Agents",
      fa: "یادگیری تقویتی و عامل‌های هوشمند",
    },
    blurb: {
      en: "RL foundations, RLHF and the Model Context Protocol.",
      fa: "مبانی یادگیری تقویتی، RLHF و پروتکل Model Context.",
    },
  },
  {
    id: "software-engineering",
    label: {
      en: "Software Engineering & Web",
      fa: "مهندسی نرم‌افزار و وب",
    },
    blurb: {
      en: "React, back-end, PHP, C++ and signal processing foundations.",
      fa: "ری‌اکت، بک‌اند، پی‌اچ‌پی، سی‌پلاس‌پلاس و پردازش سیگنال.",
    },
  },
  {
    id: "ai-engineering",
    label: {
      en: "AI Engineering & LLMOps",
      fa: "مهندسی هوش مصنوعی و LLMOps",
    },
    blurb: {
      en: "Shipping, operating and instrumenting models in production.",
      fa: "استقرار، عملیات و ابزارارسانی مدل‌ها در محیط عملیاتی.",
    },
  },
];

const FIELD_BY_ID = new Map<CertFieldId, CertField>(
  CERT_FIELDS.map((field) => [field.id, field])
);

export function certField(id: CertFieldId): CertField {
  const field = FIELD_BY_ID.get(id);
  if (!field) {
    throw new Error(`Unknown certificate field: ${id}`);
  }
  return field;
}