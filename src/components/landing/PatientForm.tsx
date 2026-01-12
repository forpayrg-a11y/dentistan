"use client";

import { useState } from "react";
import { Upload, X, CheckCircle, Loader2 } from "lucide-react";
import { submitPatientForm } from "@/app/actions"; 
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
export default function PatientForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phone, setPhone] = useState<string>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const uploadedImages = [];

      // 1. Upload to GCS
      for (const file of files) {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: JSON.stringify({ 
            filename: file.name, 
            fileType: file.type,
            name,
            email,
            phone
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Upload URL generation failed");
        }

        const { url, storagePath } = await res.json();

        if (!url) {
          throw new Error("Upload URL is missing from response");
        }

        const uploadRes = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });

        if (!uploadRes.ok) {
          throw new Error("Failed to upload file to storage");
        }

        uploadedImages.push({ url: storagePath, storagePath }); 
      }

      // 2. Save to DB
      // We append phone manually if needed, or pass it separately
      if (phone) formData.set("phone", phone);
      await submitPatientForm(formData, uploadedImages);
      
      setIsSuccess(true);
      setFiles([]);
      (e.target as HTMLFormElement).reset();

    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="mt-4 text-xl font-bold text-gray-900">Application Received!</h3>
        <p className="mt-2 text-gray-600">Our medical team will review your photos and contact you via WhatsApp shortly.</p>
        <button onClick={() => setIsSuccess(false)} className="mt-6 text-blue-600 font-medium hover:underline">
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Free Dental Analysis</h3>
      
      <div className="space-y-4">
        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input name="name" required className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input name="email" type="email" required className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@example.com" />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <div className="phone-input-container">
            <PhoneInput
              international
              defaultCountry="GB"
              countries={['FR', 'IT', 'SE', 'DK', 'IL', 'QA', 'AU', 'GB', 'DE', 'NL', 'SA', 'US', 'AE', 'RU', 'IE', 'CA', 'KW']}
              value={phone}
              onChange={setPhone}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Request / Description</label>
          <textarea name="description" rows={3} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Implants, Veneers, Smile Design..." />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dental Photos (Optional)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors relative">
            <input 
              type="file" 
              multiple 
              accept="image/*"
              onChange={handleFileChange} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Upload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">Drag & drop photos here or <span className="text-blue-600 font-semibold">click to upload</span></p>
            <p className="text-xs text-gray-400 mt-1">JPEG, PNG (Max 10MB)</p>
          </div>

          {/* Selected Files List */}
          {files.length > 0 && (
            <ul className="mt-3 space-y-2">
              {files.map((file, i) => (
                <li key={i} className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded-lg text-sm text-blue-800">
                  <span className="truncate max-w-50">{file.name}</span>
                  <button type="button" onClick={() => removeFile(i)} className="text-red-500 hover:text-red-700">
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button 
          type="submit" 
          disabled={isUploading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isUploading ? (
            <>
              <Loader2 className="animate-spin" /> Processing...
            </>
          ) : (
            "Submit for Analysis"
          )}
        </button>
      </div>
    </form>
  );
}