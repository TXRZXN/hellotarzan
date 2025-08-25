import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/navigation";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hellotarzan.vercel.app"),
  applicationName:"Hello Tarzan",
  title: {
    default: "Hello Tarzan - Naruechat Buranasombat | Portfolio",
    template: "%s | Hello Tarzan",
  },
  description:
    "Web and Mobile Application Developer, specialized in Dart, C#, Next.js, React, and Tailwind, with experience in building trading indicators and strategies.",
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "Hello Tarzan",
    type: "profile",
    url: "https://hellotarzan.vercel.app",
    title: "Hello Tarzan - Naruechat Buranasombat | Portfolio",
    description:
      "Web and Mobile Application Developer, specialized in Dart, C#, Next.js, React, and Tailwind, with experience in building trading indicators and strategies.",
    images: [
      {
        url: "https://hellotarzan.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hello Tarzan - Naruechat Buranasombat | Portfolio",
      },
    ],
    locale: "en_US", // สอดคล้องภาษา
  },
  twitter: {
    card: "summary_large_image",
    title: "Naruechat Buranasombat | Portfolio",
    description:
      "Web and Mobile Application Developer, specialized in Dart, C#, Next.js, React, and Tailwind, with experience in building trading indicators and strategies.",
    images: ["https://hellotarzan.vercel.app/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  authors: [
    { name: "Naruechat Buranasombat", url: "https://hellotarzan.vercel.app" },
  ],
  keywords: [
    "Portfolio",
    "Naruechat Buranasombat",
    "Dart",
    "C#",
    "Next.js",
    "React",
    "Tailwind",
    "Flutter",
    "Pine Script",
    "MQL4",
    "MQL5",
    "Trading Strategy",
    "Web Developer",
    "Full Stack Developer",
    "Hello Tarzan",
  ],
  other: {
    "profile:first_name": "Naruechat",
    "profile:last_name": "Buranasombat",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Hello Tarzan",
    url: "https://hellotarzan.vercel.app",
    jobTitle: "Full-Stack Developer (Web & Mobile)",
    image: "https://hellotarzan.vercel.app/og-image.jpg", // แนะนำรูปโปรไฟล์จริง
    alternateName: "Hello Tarzan",
    sameAs: [
      "https://github.com/TXRZXN",
      "https://www.linkedin.com/in/naruechat-buranasombat/",
    ],
    knowsAbout: [
      "Dart",
      "C#",
      "Next.js",
      "React",
      "Tailwind",
      "Pine Script",
      "MQL4",
      "MQL5",
      "Flutter",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Naruechat Buranasombat | Portfolio",
    url: "https://hellotarzan.vercel.app",
    inLanguage: "en-US",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <Navigation />
            <main className="pt-16">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
