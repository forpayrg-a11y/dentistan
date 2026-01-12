import React from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import BeforeAfter from "@/components/landing/BeforeAfter";
import { Treatments } from "@/components/landing/Treatments";
function page() {
  return (
    <div>
      <Navbar />
      <Hero />
      <BeforeAfter></BeforeAfter>
      <Treatments></Treatments>
    </div>
  );
}

export default page;
