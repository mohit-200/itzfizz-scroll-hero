import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ITZFIZZ — Scroll Driven Hero",
  description: "A premium scroll-driven hero animation built with Next.js, GSAP and Tailwind CSS."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
