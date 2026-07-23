import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeContext";
import { FavoritesProvider } from "./components/FavoritesContext";
import { MediaProvider } from "./components/MediaContext";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Lumina — Digital Asset Management & Cloud Gallery Platform",
  description:
    "High-performance cloud media management, tag-based photo curation, and real-time image transformation platform built with Next.js 14 and Cloudinary.",
  openGraph: {
    title: "Lumina — Digital Asset Management Platform",
    description: "High-performance cloud media management & tag-based photo curation.",
    url: "https://lumina-cloud-gallery.vercel.app",
    siteName: "Lumina Gallery",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-[#09090b] text-zinc-100 antialiased selection:bg-zinc-800 selection:text-white`}>
        <ThemeProvider>
          <FavoritesProvider>
            <MediaProvider>{children}</MediaProvider>
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}