// src/app/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db";
import Patient from "@/models/Patient";

// Formdan gelen verileri karşılayan fonksiyon
export async function submitPatientForm(
    formData: FormData,
    uploadedImages: { url: string; storagePath: string }[]
) {
    try {
        // 1. Veritabanına bağlan
        await connectDB();

        // 2. Form verilerini ayıkla
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const description = formData.get("description") as string;
        const phone = formData.get("phone") as string;

        // 3. Yeni hasta kaydını oluştur
        const newPatient = new Patient({
            name,
            email,
            phone,
            description,
            images: uploadedImages, // Google Cloud'dan gelen resim linkleri
        });

        // 4. Kaydet
        await newPatient.save();

        // (Opsiyonel) Admin paneli yaparsan, yeni kayıt gelince orayı yeniler
        revalidatePath("/");

        return { success: true, message: "Başvurunuz başarıyla alındı!" };
    } catch (error) {
        console.error("Kayıt Hatası:", error);
        return { success: false, message: "Bir hata oluştu, lütfen tekrar deneyin." };
    }
}