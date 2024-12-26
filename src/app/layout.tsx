import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description:
    "Transform your texts into high-quality audio, ready for advertising campaigns and marketing content. Simple, fast, and with professional voices that capture the audience's attention.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`dark antialiased`}>{children}</body>
    </html>
  );
}
