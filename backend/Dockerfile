FROM node:18-slim
WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/
RUN apt-get update -y && apt-get install -y openssl && npm install

COPY . .
RUN npx prisma generate

EXPOSE 3000
CMD ["npm", "start"]
