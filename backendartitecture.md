sequenceDiagram
participant User as 👤 Patient (Browser)
participant Next as ⚡ Next.js (Server Actions)
participant Mongo as 🍃 MongoDB Atlas (Cloud)
participant GCS as ☁️ Google Cloud Storage

    Note over User, GCS: Phase 1: Image Upload (Bypassing Server)
    User->>Next: 1. Request Upload URL (filename, type)
    Next-->>User: 2. Return Signed Upload URL (Secure)
    User->>GCS: 3. Upload Photo Direct to Bucket (PUT)
    GCS-->>User: 4. 200 OK (File Saved)

    Note over User, Mongo: Phase 2: Data Saving
    User->>Next: 5. Submit Form Data + File Path (GCS Link)
    Next->>Mongo: 6. Connect & Create Document (Mongoose/Prisma)
    Mongo-->>Next: 7. Document ID Returned
    Next-->>User: 8. Success Message
