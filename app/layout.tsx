import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Production domain
const baseUrl = "https://foodfolio.in";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default: "FoodFolio — Clarity on Your Plate",
    template: "%s | FoodFolio",
  },

  description:
    "FoodFolio — Clarity on Your Plate. Explore expert insights on food safety, risk management, and quality assurance by Pranjal Pandya.",

  keywords: [
    "food safety",
    "food technology",
    "HACCP",
    "risk management",
    "quality assurance",
    "food blog",
    "foodfolio",
  ],

  authors: [{ name: "Pranjal Pandya" }],

  alternates: {
    canonical: baseUrl,
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  openGraph: {
    title: {
      default: "FoodFolio — Clarity on Your Plate",
      template: "%s | FoodFolio",
    },
    description:
      "Explore expert insights on food safety, risk management, and quality assurance.",
    url: baseUrl,
    siteName: "FoodFolio",
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
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
        {/* ✅ PERSON SCHEMA */}
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

        {/* ✅ WEBSITE SCHEMA */}
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