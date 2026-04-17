import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import PublicFooter from "@/components/PublicFooter";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = "https://food-folio-web.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default: "FoodFolio | Food Safety & Research Insights",
    template: "%s | FoodFolio",
  },

  description:
    "FoodFolio is a platform sharing insights on food safety, risk management, and quality assurance by Pranjal Pandya.",

  keywords: [
    "food safety",
    "food technology",
    "HACCP",
    "risk management",
    "quality assurance",
    "food blog",
  ],

  authors: [{ name: "Pranjal Pandya" }],

  alternates: {
    canonical: baseUrl,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  openGraph: {
    title: "FoodFolio",
    description:
      "Explore food safety, risk management, and quality assurance insights.",
    url: baseUrl,
    siteName: "FoodFolio",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FoodFolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "FoodFolio",
    description: "Food safety and research insights platform.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* PERSON SCHEMA */}
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Pranjal Pandya",
              url: baseUrl,
              jobTitle: "Food Safety Professional",
            }),
          }}
        />

        {/* WEBSITE SCHEMA */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "FoodFolio",
              url: baseUrl,
            }),
          }}
        />

        {children}

        <Toaster />
      </body>
    </html>
  );
}