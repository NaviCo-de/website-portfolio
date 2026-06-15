"use client";

import Image from "next/image";
import { ImageIcon, Upload } from "lucide-react";
import { useId, useRef, useState } from "react";

const inputClass =
  "mt-2 h-11 w-full rounded-xl border border-slate-500/25 bg-slate-950/70 px-3 text-sm text-slate-50 outline-none transition placeholder:text-slate-600 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/20";
const uploadButtonClass =
  "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-500/25 px-4 text-sm font-semibold text-slate-100 transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:cursor-not-allowed disabled:opacity-60";

type UploadResponse = {
  success: boolean;
  message?: string;
  data?: {
    secureUrl?: string;
  };
};

export function ProfileImageUploader({
  defaultValue,
}: {
  defaultValue?: string | null;
}) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState(defaultValue ?? "");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  async function uploadImage(file: File) {
    setError("");
    setStatus("");

    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran gambar maksimal 5MB.");
      return;
    }

    const body = new FormData();
    body.append("file", file);
    setIsUploading(true);

    try {
      const response = await fetch("/api/admin/uploads/profile-image", {
        method: "POST",
        body,
      });
      const payload = (await response
        .json()
        .catch(() => ({}))) as UploadResponse;

      if (!response.ok || !payload.success || !payload.data?.secureUrl) {
        throw new Error(payload.message ?? "Upload gagal.");
      }

      setImageUrl(payload.data.secureUrl);
      setStatus("URL foto siap disimpan.");
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Upload gagal.",
      );
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  const canPreview = imageUrl.startsWith("http") || imageUrl.startsWith("/");

  return (
    <div className="space-y-3">
      <label
        className="block text-sm font-medium text-slate-200"
        htmlFor="profileImageUrl"
      >
        Foto profil URL
        <input
          id="profileImageUrl"
          name="profileImageUrl"
          value={imageUrl}
          onChange={(event) => {
            setImageUrl(event.target.value);
            setError("");
            setStatus("");
          }}
          className={inputClass}
        />
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-500/20 bg-slate-950/70">
          {canPreview ? (
            <Image
              src={imageUrl}
              alt="Preview foto profil"
              fill
              sizes="112px"
              className="object-cover"
            />
          ) : (
            <ImageIcon className="h-8 w-8 text-slate-500" aria-hidden />
          )}
        </div>

        <div className="space-y-2">
          <input
            ref={fileInputRef}
            id={inputId}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                void uploadImage(file);
              }
            }}
          />
          <button
            type="button"
            className={uploadButtonClass}
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4" aria-hidden />
            {isUploading ? "Mengupload..." : "Upload Foto"}
          </button>
          {status ? <p className="text-sm text-emerald-200">{status}</p> : null}
          {error ? <p className="text-sm text-red-200">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}
