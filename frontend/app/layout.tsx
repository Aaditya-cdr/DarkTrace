import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DARKTRACE — Connecting the Hidden Threads",
  description:
    "Explainable dark web threat actor attribution assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}