import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import WhatsApp from "@/components/landing/WhatsApp";
import HowItWorks from "@/components/landing/HowItWorks";
import CTA from "@/components/landing/CTA";

export const metadata: Metadata = {
  title: "About Us | Quality Dental Tourism in Istanbul",
  description: "Learn more about DentTourist, our expert dental team in Istanbul, and how we provide premium dental care at affordable prices.",
};
function page() {
  return (
    <div>
      <Navbar />
      <WhatsApp />
      <HowItWorks />
      <CTA />
    </div>
  );
}

export default page;
