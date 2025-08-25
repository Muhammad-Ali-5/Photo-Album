import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Slider from "./components/Slider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Photo Album",
  description: "A user-friendly photo album application where users can upload, store, and organize their photos using Cloudinary API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative h-full">
      <body className={"inter.className h-full"}>
        <Slider>{children}</Slider>
      </body>
    </html>
  );
}
