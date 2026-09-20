import type { LucideIcon } from "lucide-react";
import {
  BrainCircuit,
  Code2,
  Compass,
  Database,
  Gamepad2,
  GraduationCap,
  HeartPulse,
  LineChart,
  Megaphone,
  Palette,
  PenLine,
  Server,
  Shield,
  Smartphone,
} from "lucide-react";

export interface CareerTheme {
  /** Human-readable label for the matched theme, mainly useful for debugging/QA. */
  label: string;
  icon: LucideIcon;
  /** Solid accent color used for text, icons and borders. */
  accent: string;
  /** Light tint of the accent, used for badge/icon backgrounds. */
  soft: string;
}

interface ThemeRule {
  keywords: string[];
  theme: CareerTheme;
}

/**
 * Ordered from most specific to most generic. The first rule whose keyword
 * appears in the (lowercased) career string wins, so narrower titles like
 * "Data Scientist" are matched before a broad catch-all like "Engineer".
 */
const rules: ThemeRule[] = [
  {
    keywords: ["cybersecurity", "security engineer", "security analyst", "penetration", "infosec"],
    theme: { label: "Cybersecurity", icon: Shield, accent: "#DC2626", soft: "#FEF2F2" },
  },
  {
    keywords: ["data scientist", "data analyst", "data engineer", "business intelligence", "data science"],
    theme: { label: "Data", icon: Database, accent: "#0D9488", soft: "#F0FDFA" },
  },
  {
    keywords: ["machine learning", "artificial intelligence", "ai engineer", "ml engineer", "deep learning", "nlp"],
    theme: { label: "AI & Machine Learning", icon: BrainCircuit, accent: "#7C3AED", soft: "#F5F3FF" },
  },
  {
    keywords: ["mobile", "ios developer", "android developer", "app developer"],
    theme: { label: "Mobile Development", icon: Smartphone, accent: "#EA580C", soft: "#FFF7ED" },
  },
  {
    keywords: ["devops", "site reliability", " sre", "cloud engineer", "infrastructure"],
    theme: { label: "DevOps & Cloud", icon: Server, accent: "#4F46E5", soft: "#EEF2FF" },
  },
  {
    keywords: ["ui/ux", "ux designer", "ui designer", "product designer", "graphic designer", "designer"],
    theme: { label: "Design", icon: Palette, accent: "#DB2777", soft: "#FDF2F8" },
  },
  {
    keywords: ["product manager", "product management", "program manager"],
    theme: { label: "Product Management", icon: Compass, accent: "#D97706", soft: "#FFFBEB" },
  },
  {
    keywords: ["marketing", "growth", "seo", "digital marketing"],
    theme: { label: "Marketing", icon: Megaphone, accent: "#C026D3", soft: "#FDF4FF" },
  },
  {
    keywords: ["game developer", "game design", "unity", "unreal"],
    theme: { label: "Game Development", icon: Gamepad2, accent: "#059669", soft: "#ECFDF5" },
  },
  {
    keywords: ["content writer", "copywriter", "technical writer", "content strategist"],
    theme: { label: "Writing & Content", icon: PenLine, accent: "#0891B2", soft: "#ECFEFF" },
  },
  {
    keywords: ["financial analyst", "finance", "accountant", "investment"],
    theme: { label: "Finance", icon: LineChart, accent: "#16A34A", soft: "#F0FDF4" },
  },
  {
    keywords: ["nurse", "doctor", "physician", "healthcare", "medical"],
    theme: { label: "Healthcare", icon: HeartPulse, accent: "#0EA5E9", soft: "#F0F9FF" },
  },
  {
    keywords: ["teacher", "educator", "instructor", "professor"],
    theme: { label: "Education", icon: GraduationCap, accent: "#CA8A04", soft: "#FEFCE8" },
  },
  {
    keywords: ["frontend", "front-end", "backend", "back-end", "full stack", "fullstack", "full-stack", "web developer", "software engineer", "react developer", "javascript"],
    theme: { label: "Software Development", icon: Code2, accent: "#2563EB", soft: "#EFF6FF" },
  },
];

const fallbackTheme: CareerTheme = {
  label: "General",
  icon: Compass,
  accent: "#475569",
  soft: "#F8FAFC",
};

export function getCareerTheme(career: string): CareerTheme {
  const normalized = career.toLowerCase();
  const match = rules.find((rule) => rule.keywords.some((keyword) => normalized.includes(keyword)));
  return match ? match.theme : fallbackTheme;
}