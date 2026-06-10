"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import {
  aboutSchema,
  experienceSchema,
  projectSchema,
  profileSchema,
  settingsSchema,
  socialLinkSchema,
} from "@/lib/validators";
import { formBoolean, formString } from "@/lib/utils";

function revalidateAdmin(path: string) {
  revalidatePath("/");
  revalidatePath(path);
  revalidatePath("/admin");
}

function singletonData(formData: FormData, keys: string[]) {
  return Object.fromEntries(keys.map((key) => [key, formString(formData, key)]));
}

export async function saveProfileAction(formData: FormData) {
  await requireAdminSession();
  const data = profileSchema.parse(
    singletonData(formData, ["name", "headline", "shortIntro", "profileImageUrl", "cvUrl", "ownerEmail"]),
  );
  const current = await prisma.profile.findFirst();

  if (current) {
    await prisma.profile.update({ where: { id: current.id }, data });
  } else {
    await prisma.profile.create({ data });
  }

  revalidateAdmin("/admin/profile");
}

export async function saveAboutAction(formData: FormData) {
  await requireAdminSession();
  const data = aboutSchema.parse(singletonData(formData, ["title", "subtitle", "description"]));
  const current = await prisma.about.findFirst();

  if (current) {
    await prisma.about.update({ where: { id: current.id }, data });
  } else {
    await prisma.about.create({ data });
  }

  revalidateAdmin("/admin/about");
}

export async function saveSettingsAction(formData: FormData) {
  await requireAdminSession();
  const data = settingsSchema.parse(
    singletonData(formData, [
      "siteTitle",
      "metaDescription",
      "ownerEmail",
      "heroRoles",
      "primaryColor",
      "seoTitle",
      "seoDescription",
    ]),
  );
  const current = await prisma.siteSetting.findFirst();

  if (current) {
    await prisma.siteSetting.update({ where: { id: current.id }, data });
  } else {
    await prisma.siteSetting.create({ data });
  }

  revalidateAdmin("/admin/settings");
}

function experienceData(formData: FormData) {
  return {
    position: formString(formData, "position"),
    organization: formString(formData, "organization"),
    location: formString(formData, "location"),
    startDate: formString(formData, "startDate"),
    endDate: formString(formData, "endDate"),
    isPresent: formBoolean(formData, "isPresent"),
    description: formString(formData, "description"),
    sortOrder: Number(formString(formData, "sortOrder") || 0),
  };
}

export async function createExperienceAction(formData: FormData) {
  await requireAdminSession();
  const data = experienceSchema.parse(experienceData(formData));
  await prisma.experience.create({ data });
  revalidateAdmin("/admin/experiences");
}

export async function updateExperienceAction(formData: FormData) {
  await requireAdminSession();
  const id = formString(formData, "id");
  const data = experienceSchema.parse(experienceData(formData));
  await prisma.experience.update({ where: { id }, data });
  revalidateAdmin("/admin/experiences");
}

export async function deleteExperienceAction(formData: FormData) {
  await requireAdminSession();
  await prisma.experience.delete({ where: { id: formString(formData, "id") } });
  revalidateAdmin("/admin/experiences");
}

function projectData(formData: FormData) {
  return {
    title: formString(formData, "title"),
    description: formString(formData, "description"),
    thumbnailUrl: formString(formData, "thumbnailUrl"),
    githubUrl: formString(formData, "githubUrl"),
    liveDemoUrl: formString(formData, "liveDemoUrl"),
    techStack: formString(formData, "techStack"),
    isFeatured: formBoolean(formData, "isFeatured"),
    sortOrder: Number(formString(formData, "sortOrder") || 0),
  };
}

export async function createProjectAction(formData: FormData) {
  await requireAdminSession();
  const data = projectSchema.parse(projectData(formData));
  await prisma.project.create({ data });
  revalidateAdmin("/admin/projects");
}

export async function updateProjectAction(formData: FormData) {
  await requireAdminSession();
  const id = formString(formData, "id");
  const data = projectSchema.parse(projectData(formData));
  await prisma.project.update({ where: { id }, data });
  revalidateAdmin("/admin/projects");
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdminSession();
  await prisma.project.delete({ where: { id: formString(formData, "id") } });
  revalidateAdmin("/admin/projects");
}

function socialLinkData(formData: FormData) {
  return {
    platform: formString(formData, "platform"),
    url: formString(formData, "url"),
    icon: formString(formData, "icon"),
    isActive: formBoolean(formData, "isActive"),
    sortOrder: Number(formString(formData, "sortOrder") || 0),
  };
}

export async function createSocialLinkAction(formData: FormData) {
  await requireAdminSession();
  const data = socialLinkSchema.parse(socialLinkData(formData));
  await prisma.socialLink.create({ data });
  revalidateAdmin("/admin/social-links");
}

export async function updateSocialLinkAction(formData: FormData) {
  await requireAdminSession();
  const id = formString(formData, "id");
  const data = socialLinkSchema.parse(socialLinkData(formData));
  await prisma.socialLink.update({ where: { id }, data });
  revalidateAdmin("/admin/social-links");
}

export async function deleteSocialLinkAction(formData: FormData) {
  await requireAdminSession();
  await prisma.socialLink.delete({ where: { id: formString(formData, "id") } });
  revalidateAdmin("/admin/social-links");
}

export async function markMessageReadAction(formData: FormData) {
  await requireAdminSession();
  await prisma.contactMessage.update({ where: { id: formString(formData, "id") }, data: { isRead: true } });
  revalidateAdmin("/admin/messages");
}

export async function deleteMessageAction(formData: FormData) {
  await requireAdminSession();
  await prisma.contactMessage.delete({ where: { id: formString(formData, "id") } });
  revalidateAdmin("/admin/messages");
}
