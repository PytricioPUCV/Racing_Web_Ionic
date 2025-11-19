# Presentado por:
- Bastián Mejías
- Vicente Cisternas
- Patricio Hernández

# RacingConEstilo - E-Commerce

## Índice
1. [Resumen del Proyecto](#resumen-del-proyecto)
2. [Cumplimiento de Objetivos (Entrega Final)](#cumplimiento-de-objetivos-entrega-final)
3. [Requerimientos](#requerimientos)
4. [Arquitectura de la Información](#arquitectura-de-la-información)
5. [Prototipo de Diseño](#prototipo-de-diseño)
6. [Principios de UX Aplicados](#principios-de-ux-aplicados)
7. [Tecnologías Utilizadas](#tecnologías-utilizadas)
8. [Arquitectura del Sistema](#arquitectura-del-sistema)
9. [Modelo Entidad-Relación (MER)](#modelo-entidad-relación-mer)
10. [Instalación y Ejecución](#instalación-y-ejecución)
    - 10.1 [Prerrequisitos](#prerrequisitos)
    - 10.2 [Instalación](#instalación)
    - 10.3 [Dependencias del Backend](#dependencias-del-backend)
    - 10.4 [Ejecución Manual](#ejecución-manual-frontend-y-backend-separados)
    - 10.5 [Ejecución con Docker (Recomendado)](#ejecución-con-docker-recomendado)
    - 10.6 [Testing de la API](#testing-de-la-api)

---

## Resumen del Proyecto

Este es un proyecto universitario para el ramo de "Web y Móvil", desarrollado con el framework Ionic y Angular. La aplicación es un e-commerce para la marca "RacingConEstilo", una tienda inspirada en la cultura de las carreras de autos.

[![Captura de pantalla de la página de inicio](https://i.imgur.com/ehaGOR7.png)](https://racing-web-ionic.vercel.app/)

El proyecto implementa una arquitectura cliente-servidor completa y robusta. Recientemente, se ha evolucionado hacia una arquitectura contenedorizada con **Docker**, mejorando significativamente la seguridad mediante encriptación de datos sensibles y cabeceras HTTP seguras, y optimizando el rendimiento mediante indexación de base de datos y compresión de respuestas.

---

## Cumplimiento de Objetivos (Entrega Final)

El proyecto cumple con los siguientes hitos de evaluación:

- **EF 1: Funcionalidades Completas**: Sistema CRUD completo para productos, carrito de compras, y autenticación. Implementación de almacenamiento local (Tokens y preferencias) y notificaciones visuales (Toasts).
- **EF 2: Mejoras UI/UX y Rendimiento**: Implementación de componente `IonImg` para carga eficiente de imágenes, *lazy loading*, y atributos dimensionales para evitar saltos de layout.
- **EF 3: Seguridad Avanzada**:
    - Protección contra inyección SQL mediante ORM (Sequelize).
    - Implementación de **Helmet** para cabeceras HTTP seguras.
    - Encriptación de contraseñas con **Bcrypt**.
    - **Encriptación AES** para datos sensibles del usuario (RUT, Región, Comuna).
    - Configuración de CORS seguro.
- **EF 4: Optimización de Consultas**: Implementación de **Índices en Base de Datos** (Users, Products, Orders) para acelerar consultas y uso de middleware de **Compresión (Gzip)** para respuestas HTTP más ligeras.
- **EF 5: Integración de Servicios Externos**: Integración con base de datos en la nube (**NeonDB / Supabase**) y gestión de zonas horarias mediante librería externa (**Luxon**).
- **EF 6: Despliegue con Docker**: Orquestación completa de servicios (Frontend Nginx, Backend Node.js, Base de Datos PostgreSQL) mediante `docker-compose`.

---

## Requerimientos

### Roles del Sistema
- **Cliente**: Navegación, gestión de carrito, compras y perfil.
- **Administrador**: Gestión total del catálogo, inventario y órdenes.

### Requerimientos Funcionales
- **RF1 - RF4 (Cliente)**: Catálogo, detalle, atributos y carrito de compras.
- **RF5 - RF7 (Administrador)**: CRUD de productos, inventario y visualización de órdenes.

### Requerimientos No Funcionales (Actualizados)

- **RNF1 (Rendimiento Optimizado)**: 
    - Uso de `IonImg` en Ionic para gestión inteligente de imágenes.
    - Backend con **Compression Middleware** para reducir el tamaño de las respuestas JSON.
    - Índices en la base de datos para optimizar tiempos de respuesta en consultas complejas.
- **RNF5 (Seguridad Reforzada)**: 
    - Contraseñas hasheadas con `bcrypt`.
    - Datos personales (PII) encriptados en reposo usando **AES-256**.
    - Headers de seguridad implementados con `helmet`.
- **RNF9 (Internacionalización)**: Manejo de zonas horarias consistente utilizando `Luxon` para asegurar que las fechas de las órdenes correspondan a la hora local de Chile.

---

## Arquitectura de la Información
[Estructura de Navegación - Página](https://whimsical.com/estructura-de-navegacion-pagina-FfecMFJYgrHrKuPHLwcUia)
[![Captura de pantalla del Flujo de Navegación Página](https://i.imgur.com/VWcv3yP.jpeg)](https://whimsical.com/estructura-de-navegacion-pagina-FfecMFJYgrHrKuPHLwcUia)

[Flujo de Navegación - Compra](https://whimsical.com/flujo-de-navegacion-compra-BYthZ4Gd9HRMVqQf32mxQ2)
[![Captura de pantalla del Flujo de Navegación Compra](https://i.imgur.com/pVSGxEc.jpeg)](https://whimsical.com/flujo-de-navegacion-compra-BYthZ4Gd9HRMVqQf32mxQ2)

---

## Prototipo de Diseño
[MockUps - Racing Jackets (Figma)](https://www.figma.com/design/oAG1GI9Ct5XgXj3GKipiSc/MockUps-Racing-Jackets?node-id=0-1&t=QJukTLq0sVg6Lppk-1)

---

## Tecnologías Utilizadas

### Frontend
- **Ionic Framework & Angular**: Core de la aplicación.
- **IonImg**: Componente nativo de Ionic utilizado para optimizar la carga de imágenes en Home y Catálogo.
- **TypeScript / SCSS**: Lógica y estilos.
- **HttpClient & Interceptors**: Comunicación segura con API.

### Backend
- **Node.js & Express**: API REST.
- **Sequelize**: ORM para PostgreSQL con optimización de consultas.
- **PostgreSQL**: Base de datos (Versión local Docker o Nube NeonDB).
- **Luxon**: Manejo avanzado de fechas y zonas horarias.
- **Compression**: Middleware para gzip de respuestas.
- **Helmet**: Seguridad en headers HTTP.
- **Crypto-js**: Encriptación AES para datos sensibles.
- **Bcryptjs & JWT**: Autenticación y autorización.

### DevOps
- **Docker / Docker Compose**: Containerización de servicios.
- **Nginx**: Servidor web proxy inverso para el frontend en producción Docker.

---

## Arquitectura del Sistema

### Optimizaciones de Backend (Entrega Final)

1.  **Optimización de Consultas (Indexing):**
    Se implementaron migraciones para añadir índices a las tablas críticas (`Users`, `Products`, `Orders`, `CartItems`). Esto reduce drásticamente el tiempo de búsqueda (`Scan`) en la base de datos.

2.  **Seguridad de Datos (AES + Helmet):**
    Además de proteger las contraseñas, el sistema ahora utiliza `crypto-js` para encriptar campos sensibles como el RUT y la dirección antes de guardarlos en la base de datos. `Helmet` se ha configurado (v7.2.0) para mitigar ataques XSS y sniffing.

3.  **Manejo de Tiempo (Timezone Middleware):**
    Se integró `Luxon` y un middleware personalizado para normalizar las fechas de las transacciones a la zona horaria de Chile, independientemente de la hora del servidor (UTC).

4.  **Compresión:**
    Todas las respuestas JSON de la API pasan por un middleware de compresión, reduciendo el payload de red y mejorando la velocidad en conexiones móviles.

### API REST
El backend expone endpoints seguros para Autenticación, Productos, Categorías, Carritos y Órdenes, protegidos por middlewares de verificación de Token y Roles.

---

## Modelo Entidad-Relación (MER)

El diagrama MER muestra la estructura relacional. Se han añadido índices de rendimiento en las claves foráneas y campos de búsqueda frecuente.

[![Diagrama MER](https://i.imgur.com/KxustCL.png)](https://i.imgur.com/KxustCL.png)

---

## Instalación y Ejecución

### Prerrequisitos
* Node.js & npm
* Ionic CLI (`npm install -g @ionic/cli`)
* Docker Desktop (Para ejecución recomendada)

### Instalación

1.  **Clone el repositorio:**
    ```bash
    git clone [https://github.com/PytricioPUCV/Racing_Web_Ionic.git](https://github.com/PytricioPUCV/Racing_Web_Ionic.git)
    cd Racing_Web_Ionic
    ```

2.  **Instale dependencias:**
    ```bash
    # Frontend
    npm install
    
    # Backend
    cd backend_rw
    npm install
    cd ..
    ```

### Dependencias del Backend

Las dependencias han sido actualizadas para soportar las nuevas funcionalidades de seguridad y rendimiento:
- `compression`: Optimización de respuestas.
- `helmet` (v7.2.0): Seguridad HTTP.
- `crypto-js`: Encriptación AES.
- `luxon`: Manejo de fechas.
- `sequelize` & `pg`: Gestión de base de datos.

### Ejecución con Docker (Recomendado - EF 6)

Esta es la forma más rápida de levantar el entorno completo (Frontend + Backend + BD).

1.  **Configuración de Entorno:**
    Cree los archivos `.env` en la raíz y en `backend_rw/` basándose en `.env.example`.
    *Asegúrese de definir `ENCRYPTION_KEY` (32 chars) y `JWT_SECRET`.*

2.  **Levantar Servicios:**
    ```bash
    docker-compose up --build
    ```
    
3.  **Acceso:**
    - **Frontend (Nginx):** `http://localhost:80`
    - **Backend API:** `http://localhost:3000`
    - **Base de Datos:** Puerto 5432 expuesto localmente.

### Ejecución Manual (Frontend y Backend separados)

1.  **Backend:**
    En `backend_rw/`, configure `.env` con su URL de base de datos (NeonDB o local) y ejecute:
    ```bash
    npm run dev
    ```
    *(Servidor en http://localhost:3000)*

2.  **Frontend:**
    En la raíz del proyecto:
    ```bash
    ionic serve
    ```
    *(Servidor en http://localhost:8100)*

### Testing de la API
Puede probar el flujo completo: Registro -> Login (Obtención de JWT) -> Navegación (IonImg) -> Añadir al Carrito -> Generar Orden. Los datos sensibles se guardarán encriptados en la base de datos.

---

- Rama de desarrollo principal: `release/v3.0-entrega3`
