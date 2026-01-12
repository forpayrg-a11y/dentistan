import { Storage } from "@google-cloud/storage";
import { NextRequest, NextResponse } from "next/server";

// Google Cloud Storage Bağlantısı
const storage = new Storage({
    projectId: process.env.GCS_PROJECT_ID,
    credentials: {
        client_email: process.env.GCS_CLIENT_EMAIL,
        // Private key içindeki \n karakterlerini düzeltiyoruz ve tırnakları temizliyoruz
        private_key: process.env.GCS_PRIVATE_KEY?.replace(/\\n/g, "\n").replace(/^"|"$/g, ""),
    },
});

export async function POST(request: NextRequest) {
    try {
        const { filename, fileType, name, email, phone } = await request.json();

        // 1. Bucket adını buraya yaz (Google Cloud'da oluşturduğun isim)
        const bucketName = process.env.GCS_BUCKET_NAME;

        if (!bucketName) {
            console.error("GCS_BUCKET_NAME is not set in environment variables");
            return NextResponse.json(
                { error: "Depolama yapılandırması eksik (Bucket name)" },
                { status: 500 }
            );
        }

        const safeName = (name || "unknown").replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "");
        const safePhone = (phone || "no-phone").replace(/\+/g, "").replace(/\s+/g, "-");
        const safeEmail = (email || "no-email").replace(/[@.]/g, "-");

        const uniqueName = `${Date.now()}-${safeName}-${safePhone}-${safeEmail}-${filename.replace(/\s+/g, "-")}`;
        const file = storage.bucket(bucketName).file(uniqueName);

        const [url] = await file.getSignedUrl({
            version: "v4",
            action: "write",
            expires: Date.now() + 60 * 1000,
            contentType: fileType,
        });

        return NextResponse.json({ url, storagePath: uniqueName });

    } catch (error) {
        console.error("GCS Upload Hatası:", error);
        return NextResponse.json(
            { error: "Yükleme linki oluşturulamadı" },
            { status: 500 }
        );
    }
}