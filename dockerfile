# 1. Aşama: Bağımlılıkları Yükle
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

# 2. Aşama: Build Al
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# --- DÜZELTME BURADA ---
# Build aşamasında bu değişkenler lazım, o yüzden BURAYA ekliyoruz.
ENV MONGODB_URI="mongodb://build_asamasinda_gecici_deger"
ENV GCS_BUCKET_NAME="build_asamasinda_gecici_deger"
ENV GCS_PROJECT_ID="build_asamasinda_gecici_deger"
ENV GCS_CLIENT_EMAIL="build_asamasinda_gecici_deger"
ENV GCS_PRIVATE_KEY="build_asamasinda_gecici_deger"

RUN npm run build

# 3. Aşama: Çalıştırma (Runner)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Güvenlik için root olmayan bir kullanıcı kullanalım
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN mkdir -p .next/cache
RUN chown -R nextjs:nodejs .next

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]