# Use official Node.js runtime
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# ⭐ IMPORTANT — Generate Prisma client inside container
RUN npx prisma generate

# Expose application port
EXPOSE 3000

# Start server
CMD ["node", "src/server.js"]