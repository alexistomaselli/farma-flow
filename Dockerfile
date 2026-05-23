# ==========================================
# ETAPA 1: Compilación de la Aplicación
# ==========================================
FROM node:22-alpine AS build

# Definir directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias limpiamente
RUN npm ci

# Copiar el código del proyecto
COPY . .

# Compilar el proyecto de producción (Vite genera la carpeta /dist)
RUN npm run build

# ==========================================
# ETAPA 2: Servidor Nginx Optimizado
# ==========================================
FROM nginx:alpine

# Copiar configuración personalizada para soportar Single Page Applications (SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos compilados de la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto estándar HTTP
EXPOSE 80

# Comando para ejecutar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
