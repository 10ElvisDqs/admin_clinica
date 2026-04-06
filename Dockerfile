# Etapa 1: Construcción de Angular
FROM node:18-alpine as build

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Construir Angular en modo producción
RUN npm run build -- --configuration production
# Imagen mínima solo para pasar el build
FROM alpine:3.18 AS runner
WORKDIR /dist
COPY --from=build /app/dist/preclinic-angular .
CMD ["echo", "Angular build listo, servido por NGINX"]
# Etapa 2: Servir con Nginx
# FROM nginx:alpine

# Copiar los archivos compilados de Angular al directorio de Nginx
# COPY --from=build /app/dist/preclinic-angular /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
# COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# Exponer el puerto
# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
