import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "VoxyB",
  description:
    "Transform your texts into high-quality audio, ready for advertising campaigns and marketing content. Simple, fast, and with professional voices that capture the audience's attention.",
};

const interFont = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={interFont.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Script
            async
            src="https://analytics.voxyb.com/tracker.js"
            data-ackee-server="https://analytics.voxyb.com"
            data-ackee-domain-id="7b8ceb0f-9e1f-486d-bb5e-a8e7469ea0c6"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
