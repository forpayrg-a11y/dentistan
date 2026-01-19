import PatientForm from "./PatientForm";

export default function Hero() {
  return (
    <section id="contact" className="relative w-full bg-linear-to-br from-blue-50 to-white py-12 md:py-24 lg:py-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Text */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
              Achieve Your Dream Smile <br />
              <span className="text-blue-600">in Istanbul</span>
            </h1>
            <p className="text-lg text-gray-600 md:text-xl max-w-2xl mx-auto lg:mx-0">
              World-class dental care, up to 70% cost savings, and an
              unforgettable holiday experience await you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-gray-700 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                <span className="text-yellow-500">★★★★★</span>
                <span className="font-semibold text-sm">
                  500+ Happy Patients
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="w-full max-w-md mx-auto lg:ml-auto">
            <PatientForm />
          </div>
        </div>
      </div>
    </section>
  );
}
