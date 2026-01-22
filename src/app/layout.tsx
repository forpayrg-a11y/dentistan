import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dentistan | Premium Dental Care & Smile Design in Istanbul",
  description:
    "Experience world-class dental care in Istanbul with Dentistan. Save up to 70% on Hollywood Smile, Dental Implants, and Zirconium Crowns while enjoying a holiday in Turkey.",
  keywords: [
    "Dental Tourism Turkey",
    "Dentist Istanbul",
    "Hollywood Smile Istanbul",
    "Dental Implants Turkey",
    "Zirconium Crowns",
    "Affordable Dentistry Turkey",
  ],
  openGraph: {
    title: "Dentistan | Premium Dental Care & Smile Design in Istanbul",
    description:
      "Experience world-class dental care in Istanbul with Dentistan. Save up to 70% on Hollywood Smile, Dental Implants, and Zirconium Crowns.",
    siteName: "Dentistan",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dentistan | Premium Dental Care & Smile Design in Istanbul",
    description:
      "Experience world-class dental care in Istanbul with Dentistan. Save up to 70% on Hollywood Smile, Dental Implants, and Zirconium Crowns.",
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
        {children}
      </body>
    </html>
  );
}
