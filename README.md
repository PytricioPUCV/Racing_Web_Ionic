# Presentado por:
- Bastián Mejías
- Vicente Cisternas
- Patricio hernandez

# RacingConEstilo - E-Commerce

##  Índice
1. [Resumen del Proyecto](#resumen-del-proyecto)
2. [Requerimientos](#requerimientos)
3. [Arquitectura de la Información](#arquitectura-de-la-información)
4. [Prototipo de Diseño](#prototipo-de-diseño)
5. [Principios de UX Aplicados](#principios-de-ux-aplicados)
6. [Tecnologías Utilizadas](#tecnologías-utilizadas)
7. [Arquitectura del Sistema](#arquitectura-del-sistema)
8. [Instalación y Ejecución](#instalación-y-ejecución)

---

## Resumen del Proyecto

Este es un proyecto universitario para el ramo de "Web y Móvil", desarrollado con el framework Ionic y Angular. La aplicación es un e-commerce para la marca "RacingConEstilo", una tienda de streetwear inspirada en la cultura de las carreras de autos.

[![Captura de pantalla de la página de inicio](https://i.imgur.com/ehaGOR7.png)](https://racing-web-ionic.vercel.app/)

El proyecto implementa una arquitectura cliente-servidor completa, con un frontend desarrollado en Ionic/Angular y un backend en Node.js con Express. La aplicación incluye funcionalidades esenciales de un e-commerce moderno: catálogo de productos, detalle de producto, autenticación de usuarios con JWT, gestión de carrito de compras y operaciones CRUD protegidas. La arquitectura se centra en componentes reutilizables y servicios para la gestión de datos, asegurando la escalabilidad del sistema.

---

## Requerimientos

### Roles del Sistema
- **Cliente**: Un usuario que navega por el e-commerce, gestiona un carrito y puede realizar compras.
- **Administrador**: Un usuario con privilegios para gestionar el catálogo de productos, el inventario y las órdenes de compra.

### Requerimientos Funcionales

#### Rol-Cliente
- **RF1: Visualizar Catálogo de Productos**: El usuario puede ver en la página de inicio una cuadrícula con todas las chaquetas disponibles para la venta.
- **RF2: Ver Detalle de Producto**: Al hacer clic en un producto, el usuario puede acceder a una página dedicada con más información, imágenes y opciones.
- **RF3: Seleccionar Atributos de Producto**: El usuario puede elegir una talla específica y la cantidad de unidades que desea de un producto.
- **RF4: Gestionar Carrito de Compras**: El usuario puede agregar productos a un carrito, ver el resumen de su compra y modificarlo antes de pagar.

#### Rol-Administrador
- **RF5: Gestionar Productos**: El administrador puede agregar nuevos productos al catálogo, editar la información de los existentes (precio, nombre, descripción) y eliminarlos.
- **RF6: Gestionar Inventario**: El administrador puede actualizar la cantidad de stock disponible para cada talla de un producto.
- **RF7: Visualizar Órdenes de Compra**: El administrador puede ver una lista de todos los pedidos realizados por los clientes para gestionar su despacho.

### Requerimientos No Funcionales

- **RNF1 (Rendimiento)**: La aplicación debe cargar la página de inicio y el catálogo de productos en menos de 2 segundos en una conexión de internet estándar.
- **RNF2 (Usabilidad)**: La interfaz debe ser intuitiva, permitiendo que un usuario nuevo pueda seleccionar un producto y sus opciones en menos de 3 clics.
- **RNF3 (Diseño Responsivo)**: El sistema debe adaptarse y ser completamente funcional en pantallas de dispositivos móviles (iOS, Android) y de escritorio.
- **RNF4 (Compatibilidad)**: La aplicación web debe ser compatible con las últimas versiones de los navegadores como Google Chrome, Firefox y Safari.
- **RNF5 (Seguridad)**: Las contraseñas de los usuarios deben ser almacenadas en la base de datos de forma encriptada para proteger su información.
- **RNF6 (Mantenibilidad)**: El código debe estar organizado en componentes reutilizables para facilitar futuras actualizaciones y correcciones.
- **RNF7 (Persistencia de Tema)**: La elección del usuario entre el tema claro y oscuro debe guardarse en su dispositivo para que se mantenga en futuras visitas.
- **RNF8 (Autenticación)**: El sistema debe implementar tokens JWT para mantener sesiones de usuario de forma segura.

---

## Arquitectura de la Información 
[Estructura de Navegación - Página](https://whimsical.com/estructura-de-navegacion-pagina-FfecMFJYgrHrKuPHLwcUia)
[![Captura de pantalla del Flujo de Navegación Página](https://i.imgur.com/VWcv3yP.jpeg)](https://whimsical.com/estructura-de-navegacion-pagina-FfecMFJYgrHrKuPHLwcUia)

[Flujo de Navegación - Compra](https://whimsical.com/flujo-de-navegacion-compra-BYthZ4Gd9HRMVqQf32mxQ2)
[![Captura de pantalla del Flujo de Navegación Compra](https://i.imgur.com/pVSGxEc.jpeg)](https://whimsical.com/flujo-de-navegacion-compra-BYthZ4Gd9HRMVqQf32mxQ2)

---

## Prototipo de Diseño 
[MockUps - Racing Jackets (Figma)](https://www.figma.com/design/oAG1GI9Ct5XgXj3GKipiSc/MockUps-Racing-Jackets?node-id=0-1&t=QJukTLq0sVg6Lppk-1)
[![Captura de pantalla del prototipo de Figma](https://i.imgur.com/2QRz8cs.png)](https://www.figma.com/design/oAG1GI9Ct5XgXj3GKipiSc/MockUps-Racing-Jackets?node-id=0-1&t=QJukTLq0sVg6Lppk-1)

---

## Principios de UX Aplicados
1.  **Consistencia**: Se diseñaron componentes reutilizables para el encabezado y el pie de página que aparecen en todas las páginas. Esto nos asegura que elementos clave como el logo, los menús de navegación y los íconos de usuario y tema estén siempre en el mismo lugar, creando una experiencia predecible y familiar.
2.  **Feedback**: En la página de detalle de producto, cuando el usuario selecciona una talla, el botón correspondiente cambia de estilo, dándole la confirmación visual de su elección. Se implementaron mensajes toast para proporcionar retroalimentación inmediata al usuario en acciones como login, registro y operaciones del carrito. Con el mismo fin los botones y enlaces presentan efectos visuales sutiles al pasar el mouse para indicar que son interactivos.
3.  **Simplicidad y Claridad**: En el formulario de registro, el campo "Comuna" permanece deshabilitado hasta que se seleccione primero el campo "Región", evitando errores y reduciendo la carga cognitiva del usuario al no mostrar opciones irrelevantes. El sistema maneja automáticamente el redireccionamiento después de login/registro para una experiencia fluida.
4.  **Accesibilidad**: Se implementó un tema oscuro y claro. Esto no es solo una preferencia estética, sino una característica de accesibilidad clave para usuarios con sensibilidad a la luz. Además, se utilizó un buen contraste de colores en ambos temas y se emplearon componentes semánticos de Ionic, que son compatibles con lectores de pantalla.

---

## Tecnologías Utilizadas

### Frontend
- **Ionic Framework**: Kit de herramientas de UI para construir aplicaciones multiplataforma.
- **Angular**: Plataforma de desarrollo para construir aplicaciones web eficientes.
- **TypeScript**: Superconjunto de JavaScript con tipado estático.
- **Sass (SCSS)**: Preprocesador de CSS para estilos avanzados.
- **Angular Router**: Para gestionar la navegación y las rutas de la aplicación.
- **HttpClient**: Para la comunicación con el backend mediante peticiones HTTP.

### Backend
- **Node.js**: Entorno de ejecución para JavaScript del lado del servidor.
- **Express**: Framework minimalista para crear APIs REST.
- **PostgreSQL**: Sistema de gestión de bases de datos relacional en la nube.
- **bcrypt**: Librería para el hash y encriptación de contraseñas.
- **jsonwebtoken (JWT)**: Para la generación y validación de tokens de autenticación.
- **cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing).

---

## Arquitectura del Sistema

### Backend - API REST

El backend está construido con Node.js y Express, proporcionando una API RESTful completa para gestionar las operaciones del e-commerce.

#### Características Principales

- **Base de Datos PostgreSQL en la Nube**: La aplicación utiliza una base de datos PostgreSQL alojada en la nube para garantizar disponibilidad y persistencia de datos.

- **Sistema de Autenticación JWT**: Implementa tokens JWT para mantener sesiones seguras. Los tokens se generan en el login/registro y se validan en cada petición a endpoints protegidos.

- **Encriptación de Contraseñas**: Todas las contraseñas se almacenan utilizando bcrypt con hash seguro antes de guardarse en la base de datos.

- **CRUD Completo**: El backend proporciona endpoints para todas las operaciones CRUD (Create, Read, Update, Delete) sobre:
  - Usuarios
  - Productos
  - Carrito de compras
  - Órdenes de compra

- **Endpoints Protegidos**: Ciertos endpoints requieren autenticación mediante JWT, validando el token en cada petición.

#### Estructura de la API

  - POST /api/auth/register - Registro de nuevos usuarios
  - POST /api/auth/login - Inicio de sesión
  - GET /api/products - Listar productos
  - GET /api/products/:id - Obtener detalle de producto
  - POST /api/products - Crear producto (protegido)
  - PUT /api/products/:id - Actualizar producto (protegido)
  - DELETE /api/products/:id - Eliminar producto (protegido)
  - GET /api/cart - Obtener carrito del usuario (protegido)
  - POST /api/cart - Agregar al carrito (protegido)

### Frontend - Integración con Backend

El frontend de Angular consume la API del backend mediante el servicio HttpClient:

- **Servicio de Autenticación**: Maneja login, registro y validación de tokens.
- **Persistencia de Sesión**: El token JWT se almacena localmente para mantener la sesión del usuario.
- **Interceptores HTTP**: Se implementan para agregar automáticamente el token JWT a las peticiones protegidas.
- **Manejo de Estados**: Los componentes reaccionan a los cambios de autenticación para mostrar/ocultar funcionalidades según el rol del usuario.

---

## Instalación y Ejecución

Sigue estos pasos para ejecutar el proyecto en un entorno de desarrollo local.

### Prerrequisitos

* Tener instalado [Node.js](https://nodejs.org/) (que incluye npm).
* Tener instalado el CLI de Ionic:
    ```
    npm install -g @ionic/cli
    ```

### Instalación

1.  **Clona el repositorio:**
    ```
    git clone https://github.com/PytricioPUCV/Racing_Web_Ionic.git
    ```

2.  **Navega a la carpeta del proyecto:**
    ```
    cd Racing_Web_Ionic
    ```

3.  **Instala las dependencias del frontend:**
    ```
    npm install
    ```

4.  **Instala las dependencias del backend:**
    ```
    cd backend
    npm install
    cd ..
    ```

### Ejecutar la Aplicación

#### Ejecutar el Backend

1.  **Navega a la carpeta del backend:**
    ```
    cd backend
    ```

2.  **Configura las variables de entorno:**
    Crea un archivo `.env` con las credenciales de tu base de datos PostgreSQL:
    ```
    DB_HOST=tu_host
    DB_PORT=5432
    DB_USER=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_NAME=nombre_bd
    JWT_SECRET=tu_clave_secreta
    ```

3.  **Inicia el servidor backend:**
    ```
    npm start
    ```
    El servidor se ejecutará en `http://localhost:3000`.

#### Ejecutar el Frontend

1.  **En otra terminal, desde la raíz del proyecto, inicia el servidor de desarrollo:**
    ```
    ionic serve
    ```

2.  Abre tu navegador y ve a `http://localhost:8100`. La aplicación se recargará automáticamente cada vez que guardes un cambio en el código.

### Notas Importantes

- Asegúrate de que el backend esté ejecutándose antes de iniciar el frontend.
- El frontend está configurado para conectarse al backend en `http://localhost:3000` por defecto.
- La base de datos debe estar configurada con las tablas necesarias antes de ejecutar la aplicación.
