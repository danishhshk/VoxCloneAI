# ---- Base Image ----
FROM node:20-alpine

# ---- Set working directory ----
WORKDIR /app

# ---- Copy package files ----
COPY package*.json ./

# ---- Install dependencies ----
RUN npm install --omit=dev

# ---- Copy source code ----
COPY . .

# ---- Expose backend port ----
EXPOSE 5000

# ---- Start server ----
CMD ["npm", "start"]
