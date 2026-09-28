import type { CertificateItem } from "@/lib/types";

export const CREDLY_PROFILE_URL =
  "https://www.credly.com/users/mohammadmehdi-yadegarifard/badges/credly";

/**
 * Logo per issuer, keyed by the `issuer` string and pointing at files in
 * `public/cert-logos`. Raster marks sit on a white plate so dark brand colors
 * remain legible on the dark card surface.
 */
export const ISSUER_LOGOS: Record<string, string> = {
  "DataCamp": "/cert-logos/datacamp.png",
  "Anthropic": "/cert-logos/anthropic.png",
  "Google": "/cert-logos/google.png",
  "OpenCV University": "/cert-logos/opencv-university.png",
  "Meta": "/cert-logos/meta.png",
  "IBM Skills Network": "/cert-logos/ibm-skills-network.ico",
  "DeepLearning.AI": "/cert-logos/deeplearning-ai.png",
  "EPFL": "/cert-logos/epfl.png",
  "Quera | کوئرا": "/cert-logos/quera.png",
  "DUBAI FUTURE FOUNDATION": "/cert-logos/dubai-future-foundation.png",
};

export function issuerLogo(issuer: string): string | undefined {
  return ISSUER_LOGOS[issuer];
}

/**
 * Certificates are language-neutral: course names and issuers stay in English
 * for every locale. Keep this list in sync with `certificates_data.csv`.
 */
export const certificates: CertificateItem[] = [
  {
    name: "Working with Hugging Face",
    issuer: "DataCamp",
    date: "Jun 2026",
    credentialId: "9f9abca29c773af0a0233357b6b09d79e9868bb1",
  },
  {
    name: "Deep Learning for Text with PyTorch",
    issuer: "DataCamp",
    date: "Jun 2026",
    credentialId: "f486b3d33384ac41de44c3c3696c061b52088d3f",
  },
  {
    name: "Deep Reinforcement Learning in Python",
    issuer: "DataCamp",
    date: "Jun 2026",
    credentialId: "d2f9637968e0d9db4cbea18ec8ed1dd7ab3bcda1",
  },
  {
    name: "Reinforcement Learning with Gymnasium in Python",
    issuer: "DataCamp",
    date: "Jun 2026",
    credentialId: "b64522ad96b9471a42e846cd68b95cb191492b85",
  },
  {
    name: "Reinforcement Learning",
    issuer: "DataCamp",
    date: "Jun 2026",
    credentialId: "0b1831b338085ee95b9f2886ba1dd1a9d4f4080b",
  },
  {
    name: "Developing Large Language Models",
    issuer: "DataCamp",
    date: "Jun 2026",
    credentialId: "fdc780f6b4274be5648b1df6509d0efba1f0ec25",
  },
  {
    name: "Deep Learning",
    issuer: "DataCamp",
    date: "Jun 2026",
    credentialId: "706aef6695ecf7cc7446ff9c17718d36dc4f2d66",
  },
  {
    name: "Google DeepMind: Build Your Own Small Language Model",
    issuer: "DataCamp",
    date: "Jun 2026",
    credentialId: "ddd30fdb008d50c2a1b2978fd1d205fe5cab0ed1",
  },
  {
    name: "Reinforcement Learning from Human Feedback (RLHF)",
    issuer: "DataCamp",
    date: "Jun 2026",
    credentialId: "f0719231834b9751d3f309de4be496c7d4680503",
  },
  {
    name: "LLMOps Concepts",
    issuer: "DataCamp",
    date: "Jun 2026",
    credentialId: "c22bf368b74b10f3ab67bc0491a0ba10af022f78",
  },
  {
    name: "Deep Learning for Images with PyTorch",
    issuer: "DataCamp",
    date: "Jun 2026",
    credentialId: "8950c5447b550a7fd2bcb24df56d8427fcd34bc8",
  },
  {
    name: "Scalable AI Models with PyTorch Lightning",
    issuer: "DataCamp",
    date: "Jun 2026",
    credentialId: "4b0cd720e247564aac90cda8e29e7be400b93b81",
  },
  {
    name: "Intermediate Deep Learning with PyTorch",
    issuer: "DataCamp",
    date: "Jun 2026",
    credentialId: "aa1021986e1a6d3bf5a4a0cacf8e131c8d072048",
  },
  {
    name: "Introduction to Deep Learning with PyTorch",
    issuer: "DataCamp",
    date: "Jun 2026",
    credentialId: "fb9edb47e44eb276bf19ef50939ca84c78fe0a1c",
  },
  {
    name: "Transformer Models with PyTorch",
    issuer: "DataCamp",
    date: "Jun 2026",
    credentialId: "42c3f0f7511826822dd9d6eada3bee113a684d36",
  },
  {
    name: "Working with Llama 3",
    issuer: "DataCamp",
    date: "Jun 2026",
    credentialId: "197d6c73fa097b4f5b605484cb587fdeb81aa3ad",
  },
  {
    name: "Introduction to LLMs in Python",
    issuer: "DataCamp",
    date: "Jun 2026",
    credentialId: "4be9492b0c90c70fab73cec3213c213d0c8ecbdf",
  },
  {
    name: "Explainable AI in Python",
    issuer: "DataCamp",
    date: "Jun 2026",
    credentialId: "f20cf8cdfb513604a718b2ae6b45d700360c26a9",
  },
  {
    name: "Efficient AI Model Training with PyTorch",
    issuer: "DataCamp",
    date: "Jun 2026",
    credentialId: "1d94d231d0c68813e1aee1c1a59027cf7ba65d57",
  },
  {
    name: "Hyperparameter Tuning in Python",
    issuer: "DataCamp",
    date: "Jun 2026",
    credentialId: "9ce49843255633d97ccaac38b716eb25e3578bef",
  },
  {
    name: "Vision Language Models (VLM) Bootcamp",
    issuer: "OpenCV University",
    date: "May 2026",
    credentialId: "95291b9109244bf1b7e479fe45e43447",
  },
  {
    name: "Prompt Design in Vertex AI Skill Badge",
    issuer: "Google",
    date: "May 2026",
    credentialId: "e5fed385-fb17-4cbb-81fa-8bfde9bf7edd",
    link: "https://www.credly.com/badges/e5fed385-fb17-4cbb-81fa-8bfde9bf7edd/public_url",
  },
  {
    name: "Model Context Protocol: Advanced Topics",
    issuer: "Anthropic",
    date: "May 2026",
    credentialId: "eq9qkdovpdxr",
  },
  {
    name: "Introduction to Model Context Protocol",
    issuer: "Anthropic",
    date: "May 2026",
    credentialId: "h6hif9htjcwk",
  },
  {
    name: "Certificate of Completion: AI Fluency Framework & Foundations",
    issuer: "Anthropic",
    date: "May 2026",
    credentialId: "97frq8spihpw",
  },
  {
    name: "1 Million Prompters",
    issuer: "DUBAI FUTURE FOUNDATION",
    date: "Nov 2025",
    credentialId: "Rsgitt5qk8Qk",
  },
  {
    name: "Project-Oriented Course In Web Development With Php",
    issuer: "Quera | کوئرا",
    date: "Sep 2024",
    credentialId: "cSSPmmQl",
  },
  {
    name: "Task-Oriented Course In C++ Programming Language",
    issuer: "Quera | کوئرا",
    date: "Mar 2024",
    credentialId: "2SAxvagC",
  },
  {
    name: "Professional Project-Oriented Course In Frontend Development With React",
    issuer: "Quera | کوئرا",
    date: "Feb 2024",
    credentialId: "u5sXjk5H",
  },
  {
    name: "Digital Signal Processing 1: Basic Concepts and Algorithms",
    issuer: "EPFL",
    date: "Oct 2022",
    credentialId: "JFKDHFPSRUZW",
  },
  {
    name: "Programming in Python",
    issuer: "Meta",
    date: "Dec 2022",
    credentialId: "KYLJUHKZBM82",
  },
  {
    name: "Introduction to Back-End Development",
    issuer: "Meta",
    date: "Oct 2022",
    credentialId: "92UWX4AETF2Y",
  },
  {
    name: "Introduction to Data Engineering",
    issuer: "IBM Skills Network",
    date: "Dec 2022",
    credentialId: "GYZCJUAP66XC",
  },
  {
    name: "Unsupervised Machine Learning",
    issuer: "IBM Skills Network",
    date: "Dec 2022",
    credentialId: "QJM97RWZCJ6C",
  },
  {
    name: "Supervised Machine Learning: Classification",
    issuer: "IBM Skills Network",
    date: "Dec 2022",
    credentialId: "R8WMC4JTECD4",
  },
  {
    name: "Structuring Machine Learning Projects",
    issuer: "DeepLearning.AI",
    date: "Sep 2021",
    credentialId: "KMQ9DUUT62MH",
  },
  {
    name: "Neural Networks and Deep Learning",
    issuer: "DeepLearning.AI",
    date: "Aug 2021",
    credentialId: "3SQMYRXTJEA6",
  },
  {
    name: "Exploratory Data Analysis for Machine Learning",
    issuer: "IBM Skills Network",
    date: "Apr 2022",
    credentialId: "JYSNNJP36J5K",
  },
  {
    name: "Supervised Machine Learning: Regression",
    issuer: "IBM Skills Network",
    date: "Apr 2022",
    credentialId: "L6F8HTVHDL5E",
  },
  {
    name: "Convolutional Neural Networks",
    issuer: "DeepLearning.AI",
    date: "Sep 2021",
    credentialId: "TJB2VZFAD8XP",
  },
  {
    name: "Sequence Models",
    issuer: "DeepLearning.AI",
    date: "Oct 2021",
    credentialId: "VSPSQ8KKSLNB",
  },
  {
    name: "Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization",
    issuer: "DeepLearning.AI",
    date: "Aug 2021",
    credentialId: "E2A46QZQVJSS",
  },
  {
    name: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    date: "Oct 2021",
    credentialId: "SFCKHNACBQ8R",
  },
];
