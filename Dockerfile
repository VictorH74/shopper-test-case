FROM node:18-alpine

WORKDIR /home/node/app

COPY package*.json ./

COPY .env ./

RUN npm i

COPY . .