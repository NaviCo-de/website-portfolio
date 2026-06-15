import { NextResponse, type NextRequest } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { CloudinaryUploadError, uploadProfileImage } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function isUploadFile(value: FormDataEntryValue | null): value is File {
  return (
    typeof value === "object" &&
    value !== null &&
    "arrayBuffer" in value &&
    "name" in value &&
    "size" in value &&
    "type" in value
  );
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!isUploadFile(file)) {
      return NextResponse.json(
        { success: false, message: "File gambar wajib diisi." },
        { status: 400 },
      );
    }

    const uploaded = await uploadProfileImage(file);

    return NextResponse.json({ success: true, data: uploaded });
  } catch (error) {
    if (error instanceof CloudinaryUploadError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.status },
      );
    }

    return NextResponse.json(
      { success: false, message: "Gagal mengupload foto profil." },
      { status: 500 },
    );
  }
}
