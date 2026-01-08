FROM node:20-alpine

WORKDIR /app

# Install dependencies first (caching)
COPY package.json package-lock.json* ./
RUN npm install

# Copy source
COPY . .

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "run", "dev"]