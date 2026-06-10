import { NextResponse, type NextRequest } from "next/server";
import { authenticateAdmin } from "@/lib/auth";
import { setSessionCookie } from "@/lib/session";
import { loginSchema } from "@/lib/validators";

export const dynamic = "force-dynamic";

async function readPayload(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return { payload: await request.json().catch(() => ({})), isJson: true };
  }

  const formData = await request.formData();
  return { payload: Object.fromEntries(formData), isJson: false };
}

function failure(request: NextRequest, isJson: boolean, message = "Invalid email or password.") {
  if (isJson) {
    return NextResponse.json({ success: false, message }, { status: 401 });
  }

  const url = new URL("/admin/login", request.url);
  url.searchParams.set("error", "invalid");
  return NextResponse.redirect(url, 303);
}

export async function POST(request: NextRequest) {
  const { payload, isJson } = await readPayload(request);
  const parsed = loginSchema.safeParse(payload);

  if (!parsed.success) {
    return failure(request, isJson);
  }

  try {
    const session = await authenticateAdmin(parsed.data.email, parsed.data.password);

    if (!session) {
      return failure(request, isJson);
    }

    const response = isJson
      ? NextResponse.json({ success: true })
      : NextResponse.redirect(new URL("/admin", request.url), 303);

    await setSessionCookie(response, session);
    return response;
  } catch {
    return failure(request, isJson, "Login service is unavailable.");
  }
}
