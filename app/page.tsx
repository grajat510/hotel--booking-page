import type { Metadata } from "next";
import { BookingExperience } from "@/components/BookingExperience";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.saltstayz.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Saltstayz — Autograph Golf Course Road",
  description:
    "Book Saltstayz Autograph on Golf Course Road, Gurgaon — premium rooms, rooftop pool, Beyond loyalty rates, and direct-only discounts.",
  keywords: [
    "Saltstayz",
    "Autograph",
    "Golf Course Road",
    "Gurgaon hotel",
    "book direct",
    "Beyond loyalty",
  ],
  openGraph: {
    title: "Saltstayz Autograph · Golf Course Road, Gurgaon",
    description:
      "Premium business hotel with rooftop pool, gym, and Beyond member benefits. Best rates on direct bookings.",
    url: "/",
    siteName: "Saltstayz",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saltstayz Autograph · Golf Course Road",
    description:
      "Book direct for exclusive discounts and Beyond loyalty perks in Gurgaon.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "Saltstayz Autograph",
  description:
    "Premium hotel on Golf Course Road, Gurgaon with rooftop pool, gym, and restaurants.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot 22, Golf Course Road Extension, Sector 58",
    addressLocality: "Gurgaon",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
  priceRange: "₹₹₹",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <BookingExperience />
      </main>
    </>
  );
}
