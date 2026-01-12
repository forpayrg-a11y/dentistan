import React from "react";
import Navbar from "@/components/landing/Navbar";
import WhatsApp from "@/components/landing/WhatsApp";
import HowItWorks from "@/components/landing/HowItWorks";
import CTA from "@/components/landing/CTA";
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
