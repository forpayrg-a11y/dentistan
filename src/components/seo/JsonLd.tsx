import React from "react";

export default function JsonLd() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "DentTourist",
    "name": "DentTourist",
    "url": "https://dentourist.com",
    "logo": "https://dentourist.com/logo.png",
    "image": "https://dentourist.com/og-image.jpg",
    "description": "Premium Dental Care & Smile Design in Istanbul. Save up to 70% on Hollywood Smile and Implants.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Istanbul",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "41.0082",
      "longitude": "28.9784"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/dentourist",
      "https://www.instagram.com/dentourist"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
    />
  );
}
