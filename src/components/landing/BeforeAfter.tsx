import React from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

export const BeforeAfter = () => {
  return (
    <section id="gallery" className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık Bölümü */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            see the Difference: Before & After
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            slide to reveal stunning smile transformations
          </p>
        </div>

        {/* Slider Alanı */}
        <div className="max-w-4xl mx-auto shadow-2xl rounded-2xl overflow-hidden border-4 border-white bg-white">
          <ReactCompareSlider
            // Tutamaç (Handle) stilini özelleştiriyoruz
            handle={
              <div className="w-1 h-full bg-white relative shadow-lg">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full p-2 shadow-xl border-2 border-white">
                  {/* Basit bir sağ-sol ikonu */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      className="rotate-90"
                    />
                  </svg>
                </div>
              </div>
            }
            itemOne={
              <ReactCompareSliderImage
                src="https://images.unsplash.com/photo-1690167687106-180b0ea1d813?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Tedavi Öncesi"
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Tedavi Sonrası"
              />
            }
            style={{ height: "500px", width: "100%" }}
          />
        </div>

        <div className="text-center mt-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide">
            zirkonyum veneers
          </span>
        </div>
      </div>
    </section>
  );
};
export default BeforeAfter;
