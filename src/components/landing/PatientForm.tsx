"use client";

import { useState } from "react";
import { Upload, X, CheckCircle, Loader2 } from "lucide-react";
import { submitPatientForm } from "@/app/actions";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Turnstile } from '@marsidev/react-turnstile';

export default function PatientForm() {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phone, setPhone] = useState<string>();
  const [token, setToken] = useState<string | null>(null);

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
    
    if (!token) {
        alert("Lütfen güvenlik doğrulamasını (Captcha) tamamlayın.");
        return;
    }
    
    setIsUploading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const uploadedImages = [];

      for (const file of files) {
        const requestBody = { 
            filename: file.name, 
            fileType: file.type,
            name,
            email,
            phone,
            token
          };
        
        console.log("DEBUG: Uploading...", requestBody);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: JSON.stringify(requestBody),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Upload failed");
        }

        const { url, storagePath } = await res.json();

        const uploadRes = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });

        if (!uploadRes.ok) {
          throw new Error("GCS Put Failed");
        }

        uploadedImages.push({ url: storagePath, storagePath }); 
      }

      // 2. Save to DB
      if (phone) formData.set("phone", phone);
      await submitPatientForm(formData, uploadedImages);
      
      setIsSuccess(true);
      setFiles([]);
      setToken(null); // Başarılı işlem sonrası token'ı sıfırla
      (e.target as HTMLFormElement).reset();

    } catch (error) {
      console.error("Form Error:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
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
        <h3 className="mt-4 text-xl font-bold text-gray-900">Başvurunuz Alındı!</h3>
        <p className="mt-2 text-gray-600">Medikal ekibimiz fotoğraflarınızı inceleyip en kısa sürede WhatsApp üzerinden dönüş yapacaktır.</p>
        <button onClick={() => setIsSuccess(false)} className="mt-6 text-blue-600 font-medium hover:underline">
          new application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">free dental analysis</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input name="name" required className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Adınız Soyadınız" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-Posta</label>
            <input name="email" type="email" required className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="ornek@email.com" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <div className="phone-input-container">
            <PhoneInput
              international
              defaultCountry="GB"
              countries={['TR', 'GB', 'DE', 'NL', 'FR', 'US', 'SA', 'KW', 'QA', 'AE']}
              value={phone}
              onChange={setPhone}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Request / Complaint</label>
          <textarea name="description" rows={3} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="İmplant, Gülüş Tasarımı vb..." />
        </div>

        {/* Dosya Yükleme */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dental Photos (optional)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors relative">
            <input 
              type="file" 
              multiple 
              accept="image/*"
              onChange={handleFileChange} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Upload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">upload photos here  <span className="text-blue-600 font-semibold">click to upload</span></p>
            <p className="text-xs text-gray-400 mt-1">JPEG, PNG (Max 10MB)</p>
          </div>

          {/* Seçilen Dosyalar */}
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

        {/* Turnstile Widget */}
        <div className="flex justify-center my-4">
            <Turnstile 
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAACAYD-m9r_3S2l3"}
                onSuccess={(token) => {
                    console.log("Token alındı:", token);
                    setToken(token);
                }}
                onError={() => setToken(null)}
                onExpire={() => setToken(null)}
            />
        </div>

        <button 
          type="submit" 
          disabled={isUploading || !token}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isUploading ? (
            <>
              <Loader2 className="animate-spin" /> uploading...
            </>
          ) : (
            "Ücretsiz Analiz Gönder"
          )}
        </button>
      </div>
    </form>
  );
}