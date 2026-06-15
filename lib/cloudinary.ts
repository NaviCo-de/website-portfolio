import { createHash } from "crypto";

const MAX_PROFILE_IMAGE_SIZE = 5 * 1024 * 1024;
const PROFILE_IMAGE_FOLDER = "portfolio/profile";
const allowedProfileImageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

type CloudinaryConfig = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  uploadPreset?: string;
  profileFolder: string;
};

type CloudinaryResponse = {
  secure_url?: unknown;
  public_id?: unknown;
  width?: unknown;
  height?: unknown;
  format?: unknown;
  bytes?: unknown;
};

type CloudinaryUploadPayload = CloudinaryResponse & {
  error?: {
    message?: string;
  };
};

export type CloudinaryUploadResult = {
  secureUrl: string;
  publicId: string;
  width: number | null;
  height: number | null;
  format: string | null;
  bytes: number | null;
};

export class CloudinaryUploadError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = "CloudinaryUploadError";
    this.status = status;
  }
}

function getCloudinaryConfig(): CloudinaryConfig {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new CloudinaryUploadError(
      "Environment variable Cloudinary belum lengkap.",
    );
  }

  return {
    cloudName,
    apiKey,
    apiSecret,
    uploadPreset:
      process.env.CLOUDINARY_PROFILE_UPLOAD_PRESET ??
      process.env.CLOUDINARY_UPLOAD_PRESET,
    profileFolder:
      process.env.CLOUDINARY_PROFILE_FOLDER ?? PROFILE_IMAGE_FOLDER,
  };
}

function signUploadParams(
  params: Record<string, string | undefined>,
  apiSecret: string,
) {
  const payload = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== "")
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return createHash("sha1").update(`${payload}${apiSecret}`).digest("hex");
}

function asNumber(value: unknown) {
  return typeof value === "number" ? value : null;
}

function asString(value: unknown) {
  return typeof value === "string" ? value : null;
}

export async function uploadProfileImage(file: File) {
  if (!allowedProfileImageTypes.has(file.type)) {
    throw new CloudinaryUploadError(
      "Hanya gambar JPG, PNG, dan WEBP yang diperbolehkan.",
      400,
    );
  }

  if (file.size > MAX_PROFILE_IMAGE_SIZE) {
    throw new CloudinaryUploadError("Ukuran gambar maksimal 5MB.", 400);
  }

  const config = getCloudinaryConfig();
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const uploadParams = {
    folder: config.profileFolder,
    timestamp,
    upload_preset: config.uploadPreset,
  };
  const signature = signUploadParams(uploadParams, config.apiSecret);
  const formData = new FormData();

  formData.append("file", file);
  formData.append("api_key", config.apiKey);
  formData.append("folder", config.profileFolder);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  if (config.uploadPreset) {
    formData.append("upload_preset", config.uploadPreset);
  }

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );
  const payload = (await response
    .json()
    .catch(() => ({}))) as CloudinaryUploadPayload;

  if (!response.ok) {
    const message =
      "error" in payload && payload.error?.message
        ? payload.error.message
        : "Upload ke Cloudinary gagal.";
    throw new CloudinaryUploadError(message, response.status);
  }

  const secureUrl = asString(payload.secure_url);
  const publicId = asString(payload.public_id);

  if (!secureUrl || !publicId) {
    throw new CloudinaryUploadError("Response Cloudinary tidak lengkap.");
  }

  return {
    secureUrl,
    publicId,
    width: asNumber(payload.width),
    height: asNumber(payload.height),
    format: asString(payload.format),
    bytes: asNumber(payload.bytes),
  } satisfies CloudinaryUploadResult;
}
