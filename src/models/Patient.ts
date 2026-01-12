// src/models/Patient.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPatient extends Document {
    name: string;
    email: string;
    phone?: string;          // Telefon opsiyonel olabilir
    country?: string;        // Hastanın hangi ülkeden geldiği
    description?: string;    // Şikayeti
    images: Array<{
        url: string;           // Resmin linki
        storagePath: string;   // Google Cloud'daki dosya yolu
    }>;
    createdAt: Date;
}

// 2. MongoDB için Şema (Kural) Tanımı
const PatientSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, "please enter the name"]
        },
        email: {
            type: String,
            required: [true, "please enter the email"]
        },
        phone: {
            type: String,
            required: [true, "please enter the phone number"]
        },
        country: {
            type: String,
            default: "Unknown"
        },
        description: {
            type: String
        },
        // Resimler bir dizi (array) olarak saklanır
        images: [
            {
                url: { type: String, required: true },
                storagePath: { type: String, required: true },
            },
        ],
    },
    {
        timestamps: true, // CreatedAt ve UpdatedAt tarihlerini otomatik ekler
    }
);

// 3. Modeli Dışa Aktar
// Next.js hot-reload sırasında modeli tekrar derlemeye çalışıp hata vermesin diye kontrol ediyoruz.
const Patient: Model<IPatient> =
    mongoose.models.Patient || mongoose.model<IPatient>("Patient", PatientSchema);

export default Patient;