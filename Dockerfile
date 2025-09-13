# Dockerfile (admin_clinica)
FROM node:20-alpine AS build

WORKDIR /app

# Dependencias necesarias
RUN apk add --no-cache python3 make g++ bash py3-setuptools

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --output-path=dist/preclinic-angular --configuration production
