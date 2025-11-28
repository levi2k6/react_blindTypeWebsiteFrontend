# -------- Stage 1: Build the Vite app --------
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build for production
RUN npm run build


# -------- Stage 2: Serve using Nginx --------
FROM nginx:stable-alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built Vite files to nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy default nginx config (optional but recommended)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
