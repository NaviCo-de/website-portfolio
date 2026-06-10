import { NextResponse, type NextRequest } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { experienceSchema, projectSchema, socialLinkSchema } from "@/lib/validators";

export const dynamic = "force-dynamic";

type ItemContext = {
  params: Promise<{ resource: string; id: string }>;
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

export async function GET(_request: NextRequest, context: ItemContext) {
  const unauthorized = await requireApiSession();
  if (unauthorized) return unauthorized;

  const { resource, id } = await context.params;

  switch (resource) {
    case "experiences":
      return NextResponse.json({ success: true, data: await prisma.experience.findUnique({ where: { id } }) });
    case "projects":
      return NextResponse.json({ success: true, data: await prisma.project.findUnique({ where: { id } }) });
    case "social-links":
      return NextResponse.json({ success: true, data: await prisma.socialLink.findUnique({ where: { id } }) });
    case "messages":
      return NextResponse.json({ success: true, data: await prisma.contactMessage.findUnique({ where: { id } }) });
    default:
      return badResource();
  }
}

export async function PATCH(request: NextRequest, context: ItemContext) {
  const unauthorized = await requireApiSession();
  if (unauthorized) return unauthorized;

  const { resource, id } = await context.params;
  const body = await readJson(request);

  try {
    switch (resource) {
      case "experiences":
        return NextResponse.json({ success: true, data: await prisma.experience.update({ where: { id }, data: experienceSchema.parse(body) }) });
      case "projects":
        return NextResponse.json({ success: true, data: await prisma.project.update({ where: { id }, data: projectSchema.parse(body) }) });
      case "social-links":
        return NextResponse.json({ success: true, data: await prisma.socialLink.update({ where: { id }, data: socialLinkSchema.parse(body) }) });
      case "messages":
        return NextResponse.json({ success: true, data: await prisma.contactMessage.update({ where: { id }, data: { isRead: Boolean((body as { isRead?: unknown }).isRead) } }) });
      default:
        return badResource();
    }
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request payload." }, { status: 400 });
  }
}

export async function PUT(request: NextRequest, context: ItemContext) {
  return PATCH(request, context);
}

export async function DELETE(_request: NextRequest, context: ItemContext) {
  const unauthorized = await requireApiSession();
  if (unauthorized) return unauthorized;

  const { resource, id } = await context.params;

  switch (resource) {
    case "experiences":
      await prisma.experience.delete({ where: { id } });
      return NextResponse.json({ success: true });
    case "projects":
      await prisma.project.delete({ where: { id } });
      return NextResponse.json({ success: true });
    case "social-links":
      await prisma.socialLink.delete({ where: { id } });
      return NextResponse.json({ success: true });
    case "messages":
      await prisma.contactMessage.delete({ where: { id } });
      return NextResponse.json({ success: true });
    default:
      return badResource();
  }
}
