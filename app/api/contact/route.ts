import { NextResponse, type NextRequest } from "next/server";
import { sendContactEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/utils";
import { contactSchema } from "@/lib/validators";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const ipAddress = getClientIp(request);
  const limited = rateLimit(`contact:${ipAddress}`, 5, 60_000);

  if (!limited.allowed) {
    return NextResponse.json(
      { success: false, message: "Too many messages. Please try again later." },
      { status: 429 },
    );
  }

  const payload = await request.json().catch(() => ({}));
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ success: false, message: "Failed to send message." }, { status: 400 });
  }

  if (parsed.data.website.trim().length > 0) {
    return NextResponse.json({ success: true, message: "Message sent successfully." });
  }

  try {
    const [profile, settings] = await Promise.all([
      prisma.profile.findFirst({ orderBy: { updatedAt: "desc" } }),
      prisma.siteSetting.findFirst({ orderBy: { updatedAt: "desc" } }),
    ]);
    const ownerEmail = profile?.ownerEmail || settings?.ownerEmail || process.env.OWNER_EMAIL;

    if (!ownerEmail) {
      return NextResponse.json({ success: false, message: "Failed to send message." }, { status: 500 });
    }

    await prisma.contactMessage.create({
      data: {
        email: parsed.data.email,
        subject: parsed.data.subject,
        message: parsed.data.message,
        ipAddress,
      },
    });

    await sendContactEmail({
      ownerEmail,
      fromEmail: parsed.data.email,
      subject: parsed.data.subject,
      message: parsed.data.message,
    });

    return NextResponse.json({ success: true, message: "Message sent successfully." });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to send message." }, { status: 500 });
  }
}
