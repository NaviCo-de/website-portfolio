import { z } from "zod";
import { normalizeTechStackCategory } from "@/lib/tech-stack";
import { nullableString, parseList, sanitizeText } from "@/lib/utils";

const emptyToNull = (value: unknown) => nullableString(value);
const dateOrNull = z.preprocess(
  (value) =>
    value === "" || value === null || value === undefined ? null : value,
  z.coerce.date().nullable(),
);

export const loginSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
  password: z.string().min(1),
});

export const contactSchema = z.object({
  email: z.string().trim().email().max(160),
  subject: z
    .string()
    .trim()
    .min(1)
    .max(160)
    .transform((value) => sanitizeText(value, 160)),
  message: z
    .string()
    .trim()
    .min(1)
    .max(5000)
    .transform((value) => sanitizeText(value, 5000)),
  website: z.string().optional().default(""),
});

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .transform((value) => sanitizeText(value, 120)),
  headline: z.string().optional().transform(emptyToNull),
  shortIntro: z.string().optional().transform(emptyToNull),
  profileImageUrl: z.string().optional().transform(emptyToNull),
  cvUrl: z.string().optional().transform(emptyToNull),
  ownerEmail: z.string().optional().transform(emptyToNull),
});

export const aboutSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .transform((value) => sanitizeText(value, 120)),
  subtitle: z.string().optional().transform(emptyToNull),
  description: z
    .string()
    .trim()
    .min(1)
    .max(5000)
    .transform((value) => sanitizeText(value, 5000)),
});

export const experienceSchema = z.object({
  position: z
    .string()
    .trim()
    .min(1)
    .max(140)
    .transform((value) => sanitizeText(value, 140)),
  organization: z
    .string()
    .trim()
    .min(1)
    .max(160)
    .transform((value) => sanitizeText(value, 160)),
  location: z.string().optional().transform(emptyToNull),
  startDate: z.coerce.date(),
  endDate: dateOrNull,
  isPresent: z.coerce.boolean().default(false),
  description: z
    .string()
    .trim()
    .min(1)
    .max(5000)
    .transform((value) => sanitizeText(value, 5000)),
  sortOrder: z.coerce.number().int().default(0),
});

export const projectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1)
    .max(160)
    .transform((value) => sanitizeText(value, 160)),
  description: z
    .string()
    .trim()
    .min(1)
    .max(5000)
    .transform((value) => sanitizeText(value, 5000)),
  thumbnailUrl: z.string().optional().transform(emptyToNull),
  githubUrl: z.string().trim().min(1).max(500),
  liveDemoUrl: z.string().optional().transform(emptyToNull),
  techStack: z.preprocess(parseList, z.array(z.string().min(1)).default([])),
  isFeatured: z.coerce.boolean().default(true),
  sortOrder: z.coerce.number().int().default(0),
});

export const socialLinkSchema = z.object({
  platform: z
    .string()
    .trim()
    .min(1)
    .max(80)
    .transform((value) => sanitizeText(value, 80)),
  url: z.string().trim().min(1).max(500),
  icon: z.string().optional().transform(emptyToNull),
  isActive: z.coerce.boolean().default(true),
  sortOrder: z.coerce.number().int().default(0),
});

export const techStackSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .max(80)
    .transform((value) => sanitizeText(value, 80)),
  category: z
    .string()
    .trim()
    .min(1)
    .max(80)
    .transform((value) => normalizeTechStackCategory(sanitizeText(value, 80))),
  iconKey: z.string().trim().max(120).optional().transform(emptyToNull),
  imageUrl: z.string().optional().transform(emptyToNull),
  isActive: z.coerce.boolean().default(true),
  sortOrder: z.coerce.number().int().default(0),
});

export const settingsSchema = z.object({
  siteTitle: z
    .string()
    .trim()
    .min(1)
    .max(160)
    .transform((value) => sanitizeText(value, 160)),
  metaDescription: z.string().optional().transform(emptyToNull),
  ownerEmail: z.string().optional().transform(emptyToNull),
  heroRoles: z.preprocess(parseList, z.array(z.string().min(1)).default([])),
  primaryColor: z.string().optional().transform(emptyToNull),
  seoTitle: z.string().optional().transform(emptyToNull),
  seoDescription: z.string().optional().transform(emptyToNull),
});
