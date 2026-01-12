import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Diamond, ShieldCheck, ArrowRight } from "lucide-react";

// Treatments data in English, prices removed
const treatments = [
  {
    title: "Hollywood Smile",
    description:
      "Refresh your confidence with a completely personalized smile design tailored just for you.",
    icon: <Sparkles className="w-10 h-10 text-blue-600 mb-2" />,
  },
  {
    title: "Dental Implants",
    description:
      "Lifetime guaranteed titanium implants that provide the feel and function of natural teeth.",
    icon: <ShieldCheck className="w-10 h-10 text-blue-600 mb-2" />,
  },
  {
    title: "Zirconium Crowns",
    description:
      "Metal-free, light-transmitting crowns for a perfectly natural and aesthetic look.",
    icon: <Diamond className="w-10 h-10 text-blue-600 mb-2" />,
  },
];

export const Treatments = () => {
  return (
    <section className="py-24 bg-white" id="treatments">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Popular Treatments
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            World-class dental care combining state-of-the-art technology with
            expert dentists.
          </p>
        </div>

        {/* Grid Structure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {treatments.map((item, index) => (
            <Card
              key={index}
              className="border-2 border-gray-100 hover:border-blue-500 transition-all duration-300 hover:shadow-xl group"
            >
              <CardHeader>
                <div className="bg-blue-50 w-fit p-3 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {/* TypeScript fix applied with <any> */}
                  {React.cloneElement(item.icon as React.ReactElement<any>, {
                    className: "w-8 h-8 group-hover:text-white text-blue-600",
                  })}
                </div>
                <CardTitle className="mt-4 text-xl font-bold text-gray-900">
                  {item.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-base text-gray-600">
                  {item.description}
                </CardDescription>
              </CardContent>

              <CardFooter className="pt-4">
                {/* Updated Button: Blue, Oval (rounded-full) */}
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full group-hover:shadow-lg transition-all">
                  Get More Info <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
