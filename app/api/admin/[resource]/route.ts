import { NextResponse, type NextRequest } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  aboutSchema,
  experienceSchema,
  projectSchema,
  profileSchema,
  settingsSchema,
  socialLinkSchema,
} from "@/lib/validators";

export const dynamic = "force-dynamic";

type ResourceContext = {
  params: Promise<{ resource: string }>;
};

async function requireApiSession() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  return null;
}

async function readJson(request: NextRequest) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function badResource() {
  return NextResponse.json({ success: false, message: "Resource not found." }, { status: 404 });
}

async function upsertProfile(body: unknown) {
  const data = profileSchema.parse(body);
  const current = await prisma.profile.findFirst();
  return current
    ? prisma.profile.update({ where: { id: current.id }, data })
    : prisma.profile.create({ data });
}

async function upsertAbout(body: unknown) {
  const data = aboutSchema.parse(body);
  const current = await prisma.about.findFirst();
  return current ? prisma.about.update({ where: { id: current.id }, data }) : prisma.about.create({ data });
}

async function upsertSettings(body: unknown) {
  const data = settingsSchema.parse(body);
  const current = await prisma.siteSetting.findFirst();
  return current
    ? prisma.siteSetting.update({ where: { id: current.id }, data })
    : prisma.siteSetting.create({ data });
}

export async function GET(_request: NextRequest, context: ResourceContext) {
  const unauthorized = await requireApiSession();
  if (unauthorized) return unauthorized;

  const { resource } = await context.params;

  switch (resource) {
    case "profile":
      return NextResponse.json({ success: true, data: await prisma.profile.findFirst({ orderBy: { updatedAt: "desc" } }) });
    case "about":
      return NextResponse.json({ success: true, data: await prisma.about.findFirst({ orderBy: { updatedAt: "desc" } }) });
    case "settings":
      return NextResponse.json({ success: true, data: await prisma.siteSetting.findFirst({ orderBy: { updatedAt: "desc" } }) });
    case "experiences":
      return NextResponse.json({ success: true, data: await prisma.experience.findMany({ orderBy: [{ startDate: "desc" }, { createdAt: "desc" }] }) });
    case "projects":
      return NextResponse.json({ success: true, data: await prisma.project.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] }) });
    case "social-links":
      return NextResponse.json({ success: true, data: await prisma.socialLink.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] }) });
    case "messages":
      return NextResponse.json({ success: true, data: await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }) });
    default:
      return badResource();
  }
}

export async function POST(request: NextRequest, context: ResourceContext) {
  const unauthorized = await requireApiSession();
  if (unauthorized) return unauthorized;

  const { resource } = await context.params;
  const body = await readJson(request);

  try {
    switch (resource) {
      case "profile":
        return NextResponse.json({ success: true, data: await upsertProfile(body) });
      case "about":
        return NextResponse.json({ success: true, data: await upsertAbout(body) });
      case "settings":
        return NextResponse.json({ success: true, data: await upsertSettings(body) });
      case "experiences":
        return NextResponse.json({ success: true, data: await prisma.experience.create({ data: experienceSchema.parse(body) }) }, { status: 201 });
      case "projects":
        return NextResponse.json({ success: true, data: await prisma.project.create({ data: projectSchema.parse(body) }) }, { status: 201 });
      case "social-links":
        return NextResponse.json({ success: true, data: await prisma.socialLink.create({ data: socialLinkSchema.parse(body) }) }, { status: 201 });
      default:
        return badResource();
    }
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request payload." }, { status: 400 });
  }
}

export async function PUT(request: NextRequest, context: ResourceContext) {
  return POST(request, context);
}

export async function PATCH(request: NextRequest, context: ResourceContext) {
  return POST(request, context);
}
