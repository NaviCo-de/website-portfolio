import { fallbackPortfolioData } from "@/lib/fallback-data";
import { prisma } from "@/lib/prisma";

export async function getAdminDashboardData() {
  try {
    const [experiences, projects, socialLinks, messages, latestMessage, latestSettings] = await Promise.all([
      prisma.experience.count(),
      prisma.project.count(),
      prisma.socialLink.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.findFirst({ orderBy: { createdAt: "desc" } }),
      prisma.siteSetting.findFirst({ orderBy: { updatedAt: "desc" } }),
    ]);

    return { experiences, projects, socialLinks, messages, latestMessage, latestSettings };
  } catch {
    return { experiences: 0, projects: 0, socialLinks: 0, messages: 0, latestMessage: null, latestSettings: null };
  }
}

export async function getProfileForAdmin() {
  return prisma.profile.findFirst({ orderBy: { updatedAt: "desc" } }).catch(() => null);
}

export async function getAboutForAdmin() {
  return prisma.about.findFirst({ orderBy: { updatedAt: "desc" } }).catch(() => null);
}

export async function getSettingsForAdmin() {
  return prisma.siteSetting.findFirst({ orderBy: { updatedAt: "desc" } }).catch(() => null);
}

export async function getExperiencesForAdmin() {
  return prisma.experience
    .findMany({ orderBy: [{ startDate: "desc" }, { createdAt: "desc" }] })
    .catch(() => []);
}

export async function getProjectsForAdmin() {
  return prisma.project.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }).catch(() => []);
}

export async function getSocialLinksForAdmin() {
  return prisma.socialLink.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] }).catch(() => []);
}

export async function getMessagesForAdmin() {
  return prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []);
}

export function getFallbackProfileForForm() {
  return fallbackPortfolioData.profile;
}

export function getFallbackAboutForForm() {
  return fallbackPortfolioData.about;
}

export function getFallbackSettingsForForm() {
  return fallbackPortfolioData.settings;
}
