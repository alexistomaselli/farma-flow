# FarmaFlow — SaaS de Gestión Farmacéutica Inteligente 🚀

FarmaFlow es una plataforma SaaS de alta fidelidad para la gestión integral de farmacias. Este proyecto es un prototipo interactivo 100% reactivo construido en **React + TypeScript + Vite** y optimizado para presentaciones comerciales a clientes, con un diseño premium diurno (Light Mode), efectos de glassmorphism, micro-animaciones y un estado relacional local interactivo.

---

## ✨ Características Principales de la Demo

1. **Calculadora de Tarifas Comercial:** Ubicada en la Landing Page, permite a prospectos estimar su tarifa mensual según el número de sucursales y empleados mediante sliders reactivos.
2. **Punto de Venta (POS) Inteligente:**
   - Carrito de compras intuitivo con validación de medicamentos bajo receta.
   - Selector de copagos por obra social (PAMI 80%, OSDE 40%, etc.) con recálculo en vivo.
   - Modal de simulación de ticket de caja térmica impreso de alta fidelidad.
3. **Gestión de Inventario (CRUD Completo):** Altas, bajas y modificaciones de fármacos con indicadores visuales tipo semáforo de stock crítico y vencimientos por lotes.
4. **Control de Asistencia del Vendedor:** Reloj de registro horario (Clock-In / Clock-Out) que mide retardos y asistencia en tiempo real.
5. **Quick Account Switcher (WOW Factor):** Selector rápido en la barra lateral para alternar instantáneamente entre los roles de **Superadmin del SaaS**, **Dueño de Farmacia** y **Vendedor** para demostraciones fluidas en vivo.
6. **Esquema Supabase Integrado:** Pestaña técnica con códigos reales DDL SQL y scripts del SDK de JS, lista para conectar a bases de datos PostgreSQL reales.

---

## 🛠️ Ejecución Local para Desarrollo

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor de desarrollo local
npm run dev
```
*Por defecto estará disponible en `http://localhost:5173` (o un puerto alternativo libre).*

---

## 🐳 Despliegue en Servidores con Docker

El repositorio cuenta con un **Dockerfile multi-etapa** optimizado que compila la aplicación usando `node:22-alpine` y la sirve a través de un servidor `nginx:alpine` con soporte para enrutamientos SPA.

### Comandos de Construcción y Ejecución Local de Contenedor:
```bash
# Construir la imagen
docker build -t farma-flow .

# Ejecutar el contenedor en puerto 8080
docker run -d -p 8080:80 --name farmaflow-app farma-flow
```

---

## 🖥️ Guía de Despliegue en Easypanel

**Easypanel** es un panel de control moderno potenciado por Docker que facilita el despliegue automático de aplicaciones directamente desde repositorios de GitHub.

Sigue estos sencillos pasos para desplegar **FarmaFlow** en tu servidor de Easypanel en un par de minutos:

### Paso 1: Crear la Aplicación en Easypanel
1. Ingresa a tu panel de **Easypanel**.
2. Selecciona tu **Proyecto** o crea uno nuevo.
3. Haz click en el botón **"+ New"** y selecciona **"App"**.
4. Asígnale un nombre a tu aplicación (ej: `farmaflow`).

### Paso 2: Conectar el Repositorio de GitHub
1. En la pestaña **"Source"** de la configuración de tu App, elige **GitHub**.
2. Conecta tu cuenta e introduce la URL de este repositorio:
   `https://github.com/alexistomaselli/farma-flow`
3. En la sección **Branch**, introduce **`main`**.

### Paso 3: Configurar el Método de Construcción (Build Method)
1. En la pestaña **"Build"** de Easypanel:
   - Cambia el **Build Method** de *Nixpacks / Paketo* a **`Dockerfile`**.
   - Asegúrate de que el **Dockerfile Path** esté apuntando a `./Dockerfile` (ubicado por defecto en la raíz de este proyecto).
2. Haz click en **Save**.

### Paso 4: Mapeo de Puertos y Despliegue
1. Ve a la pestaña **"Routing"** de tu aplicación en Easypanel.
2. Agrega una regla de puerto que apunte al puerto interno del contenedor:
   - **Internal Port:** **`80`** *(nuestro Nginx corre en el puerto estándar 80)*.
3. Guarda los cambios.
4. En la esquina superior derecha, haz click en **"Deploy"**.

*Easypanel clonará el repositorio, ejecutará el Dockerfile multi-etapa y desplegará la aplicación sirviéndola con HTTPS y dominio personalizado asignado automáticamente por tu panel.*
