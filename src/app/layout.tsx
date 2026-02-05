import Script from "next/script";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dentourist.com"),
  title: {
    default: "DenTourist | Premium Dental Care & Smile Design ",
    template: "%s | DenTourist",
  },
  description:
    "Experience world-class dental care in Istanbul with DentTourist. Save up to 70% on Hollywood Smile, Dental Implants, and Zirconium Crowns while enjoying a holiday in Turkey.",
  keywords: [
    "Dental Tourism Turkey",
    "Dentist Istanbul",
    "Hollywood Smile Istanbul",
    "Dental Implants Turkey",
    "Zirconium Crowns",
    "Affordable Dentistry Turkey",
    "Smile Design Istanbul",
    "Best Dentist Istanbul",
    "Dental Holiday Turkey",
  ],
  authors: [{ name: "DenTourist Team" }],
  creator: "DenTourist",
  publisher: "DenTourist",
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "DenTourist | Premium Dental Care & Smile Design ",
    description:
      "Experience world-class dental care in Istanbul with DenTourist. Save up to 70% on Hollywood Smile, Dental Implants, and Zirconium Crowns.",
    url: "https://dentourist.com",
    siteName: "DenTourist",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DentTourist - Premium Dental Care in Istanbul",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DentTourist | Premium Dental Care & Smile Design ",
    description:
      "Experience world-class dental care in Istanbul with DentTourist. Save up to 70% on Hollywood Smile, Dental Implants, and Zirconium Crowns.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground font-roboto">
        <JsonLd />
        {children}
        <Script src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "ad060c9430954510b5e2147329f59788"}'></Script>
      </body>
    </html>
  );
}
