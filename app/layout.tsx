import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  title: "Ari Darrell Muljono - Fullstack Engineer",
  description:
    "Personal portfolio of Ari Darrell Muljono, a Fullstack Engineer, DevOps Engineer, and Product Engineer.",
  keywords: [
    "Ari Darrell Muljono",
    "Fullstack Engineer",
    "DevOps Engineer",
    "Product Engineer",
    "Portfolio",
    "Next.js Developer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ari Darrell Muljono - Fullstack Engineer",
    description:
      "Personal portfolio of Ari Darrell Muljono, a Fullstack Engineer, DevOps Engineer, and Product Engineer.",
    url: "/",
    siteName: "Ari Darrell Muljono Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ari Darrell Muljono - Fullstack Engineer",
    description:
      "Personal portfolio of Ari Darrell Muljono, a Fullstack Engineer, DevOps Engineer, and Product Engineer.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-950 font-sans text-slate-50">{children}</body>
    </html>
  );
}
