FROM node:18-alpine
WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY package.json pnpm-lock.yaml ./

EXPOSE 4000

RUN pnpm add -D nodemon ts-node
