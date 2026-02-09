import { Storage } from "@google-cloud/storage";
import { NextRequest, NextResponse } from "next/server";

const RATE_LIMIT_LIMIT = 5;
const RATE_LIMIT_WINDOW = 60 * 1000;

const ALLOWED_FILE_TYPES = [
    "image/jpeg",
    "image/png",
];

const ipMap = new Map<string, { count: number; lastReset: number }>();

setInterval(() => {
    const now = Date.now();
    ipMap.forEach((value, key) => {
        if (now - value.lastReset > RATE_LIMIT_WINDOW) {
            ipMap.delete(key);
        }
    });
}, 10 * 60 * 1000);

const storage = new Storage({
    projectId: process.env.GCS_PROJECT_ID,
    credentials: {
        client_email: process.env.GCS_CLIENT_EMAIL,
        private_key: process.env.GCS_PRIVATE_KEY?.replace(/\\n/g, "\n").replace(/^"|"$/g, ""),
    },
});

async function verifyTurnstile(token: string) {
    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (!secretKey) return false;

    try {
        const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                secret: secretKey,
                response: token,
            }),
        });
        const data = await result.json();
        return data.success;
    } catch (error) {
        console.error("Turnstile Hatası:", error);
        return false;
    }
}

export async function POST(request: NextRequest) {
    try {
        let ip = request.headers.get("x-forwarded-for") || (request as any).ip || "unknown";
        if (ip.includes(",")) ip = ip.split(",")[0];

        const now = Date.now();
        const userRecord = ipMap.get(ip);

        if (!userRecord) {
            ipMap.set(ip, { count: 1, lastReset: now });
        } else {
            if (now - userRecord.lastReset > RATE_LIMIT_WINDOW) {
                userRecord.count = 1;
                userRecord.lastReset = now;
            } else {
                if (userRecord.count >= RATE_LIMIT_LIMIT) {
                    return NextResponse.json(
                        { error: "Çok hızlı işlem yapıyorsunuz. Lütfen 1 dakika bekleyin." },
                        { status: 429 }
                    );
                }
                userRecord.count++;
            }
        }

        const body = await request.json();
        const { filename, fileType, name, email, phone, token } = body;

        if (!token) {
            console.error("DEBUG: Token missing in payload. Body:", JSON.stringify(body));
            return NextResponse.json({ error: "Güvenlik doğrulaması eksik (Captcha)." }, { status: 400 });
        }

        const isHuman = await verifyTurnstile(token);
        if (!isHuman) {
            return NextResponse.json({ error: "Bot tespiti: İşlem reddedildi." }, { status: 403 });
        }

        if (!filename || !fileType) {
            return NextResponse.json(
                { error: "Dosya adı veya türü eksik." },
                { status: 400 }
            );
        }

        if (!ALLOWED_FILE_TYPES.includes(fileType)) {
            return NextResponse.json(
                { error: "Bu dosya türüne izin verilmiyor." },
                { status: 400 }
            );
        }

        const bucketName = process.env.GCS_BUCKET_NAME;
        if (!bucketName) {
            console.error("GCS_BUCKET_NAME eksik!");
            return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
        }

        const safeName = (name || "unknown").replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "");
        const safePhone = (phone || "no-phone").replace(/\+/g, "").replace(/\s+/g, "-");
        const safeEmail = (email || "no-email").replace(/[@.]/g, "-");
        const safeFilename = filename.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "");

        const uniqueName = `uploads/${Date.now()}-${safeName}-${safePhone}-${safeFilename}`;
        const file = storage.bucket(bucketName).file(uniqueName);

        const [url] = await file.getSignedUrl({
            version: "v4",
            action: "write",
            expires: Date.now() + 5 * 60 * 1000,
            contentType: fileType,
        });

        return NextResponse.json({
            url,
            storagePath: uniqueName,
            message: "Yükleme bağlantısı hazır."
        });

    } catch (error) {
        console.error("API Hatası:", error);
        return NextResponse.json(
            { error: "İşlem başarısız." },
            { status: 500 }
        );
    }
}