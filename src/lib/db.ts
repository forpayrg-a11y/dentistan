// src/lib/db.ts
import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error(
        "Lütfen .env.local dosyasına MONGODB_URI değişkenini tanımlayın."
    );
}

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// TypeScript'in global nesneye eklediğimiz 'mongoose' özelliğini tanıması için:
declare global {
    var mongoose: MongooseCache;
}

// Eğer daha önce bağlantı varsa onu kullan (Cache), yoksa boş başlat
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    // 1. Zaten bağlıysa, mevcut bağlantıyı döndür (Hızlı cevap)
    if (cached.conn) {
        return cached.conn;
    }

    // 2. Bağlantı işlemi daha önce başlatılmış ama bitmemişse, o işlemi bekle
    if (!cached.promise) {
        const opts = {
            bufferCommands: false, // Sorguları bekletme, hemen hata ver (daha güvenli)
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log("✅ MongoDB Bağlantısı Başarılı!");
            return mongoose;
        });
    }

    // 3. Bağlantıyı tamamla ve cache'e at
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDB;