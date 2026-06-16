"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

type TechStackLogoProps = {
  name: string;
  iconKey?: string | null;
  imageUrl?: string | null;
  className?: string;
  iconClassName?: string;
  imageClassName?: string;
  fallbackClassName?: string;
};

function techInitials(name: string) {
  return name
    .split(/\s+|&|\./)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export function TechStackLogo({
  name,
  iconKey,
  imageUrl,
  className,
  iconClassName,
  imageClassName,
  fallbackClassName,
}: TechStackLogoProps) {
  return (
    <div
      className={cn(
        "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-slate-500/15 bg-slate-950/75",
        className,
      )}
    >
      {iconKey ? (
        <Icon
          icon={iconKey}
          aria-hidden="true"
          className={cn(
            "h-10 w-10 text-slate-100 transition group-hover:scale-110",
            iconClassName,
          )}
        />
      ) : imageUrl ? (
        <Image
          src={imageUrl}
          alt={name + " logo"}
          width={42}
          height={42}
          sizes="42px"
          className={cn(
            "max-h-11 w-auto object-contain transition group-hover:scale-110",
            imageClassName,
          )}
        />
      ) : (
        <span
          className={cn(
            "text-sm font-semibold text-emerald-200",
            fallbackClassName,
          )}
        >
          {techInitials(name)}
        </span>
      )}
    </div>
  );
}
