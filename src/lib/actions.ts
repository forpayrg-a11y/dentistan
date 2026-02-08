"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db";
import Patient from "@/models/Patient";

interface PatientSubmitData {
    name: string;
    email: string;
    phone: string;
    description: string;
    images: { url: string; storagePath: string }[];
}

export async function submitPatientForm(data: PatientSubmitData) {
    try {
        await connectDB();

        const { name, email, phone, description, images } = data;

        const newPatient = new Patient({
            name,
            email,
            phone,
            description,
            images,
        });

        await newPatient.save();

        revalidatePath("/");

        return { success: true, message: "Başvurunuz başarıyla alındı!" };
    } catch (error) {
        console.error("Kayıt Hatası:", error);
        return { success: false, message: "Bir hata oluştu, lütfen tekrar deneyin." };
    }
}