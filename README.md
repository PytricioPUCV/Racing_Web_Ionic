# Presentado por:
- Bastián Mejías
- Vicente Cisternas
- Patricio Hernández

# RacingConEstilo - E-Commerce

## Índice
1. [Resumen del Proyecto](#resumen-del-proyecto)
2. [Requerimientos](#requerimientos)
3. [Arquitectura de la Información](#arquitectura-de-la-información)
4. [Prototipo de Diseño](#prototipo-de-diseño)
5. [Principios de UX Aplicados](#principios-de-ux-aplicados)
6. [Tecnologías Utilizadas](#tecnologías-utilizadas)
7. [Arquitectura del Sistema](#arquitectura-del-sistema)
8. [Modelo Entidad-Relación (MER)](#modelo-entidad-relación-mer)
9. [Instalación y Ejecución](#instalación-y-ejecución)

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
1. **Consistencia**: Se diseñaron componentes reutilizables para el encabezado y el pie de página que aparecen en todas las páginas. Esto nos asegura que elementos clave como el logo, los menús de navegación y los íconos de usuario y tema estén siempre en el mismo lugar, creando una experiencia predecible y familiar.
2. **Feedback**: En la página de detalle de producto, cuando el usuario selecciona una talla, el botón correspondiente cambia de estilo, dándole la confirmación visual de su elección. Se implementaron mensajes toast para proporcionar retroalimentación inmediata al usuario en acciones como login, registro y operaciones del carrito. Con el mismo fin los botones y enlaces presentan efectos visuales sutiles al pasar el mouse para indicar que son interactivos.
3. **Simplicidad y Claridad**: En el formulario de registro, el campo "Comuna" permanece deshabilitado hasta que se seleccione primero el campo "Región", evitando errores y reduciendo la carga cognitiva del usuario al no mostrar opciones irrelevantes. El sistema maneja automáticamente el redireccionamiento después de login/registro para una experiencia fluida.
4. **Accesibilidad**: Se implementó un tema oscuro y claro. Esto no es solo una preferencia estética, sino una característica de accesibilidad clave para usuarios con sensibilidad a la luz. Además, se utilizó un buen contraste de colores en ambos temas y se emplearon componentes semánticos de Ionic, que son compatibles con lectores de pantalla.

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
- **Sequelize**: ORM para PostgreSQL.
- **PostgreSQL**: Sistema de gestión de bases de datos relacional en la nube.
- **bcryptjs**: Librería para el hash y encriptación de contraseñas.
- **jsonwebtoken (JWT)**: Para la generación y validación de tokens de autenticación.
- **cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing).

---

## Arquitectura del Sistema

### Backend - API REST

El backend está construido con Node.js y Express, proporcionando una API RESTful completa para gestionar las operaciones del e-commerce.

#### EP 2.1: Servidor Node.js con Express

- Servidor configurado en puerto 3000
- Estructura modular con carpetas de controllers, routes, models y middlewares
- Variables de entorno configuradas via `.env`
- Manejo centralizado de errores

#### EP 2.2: Base de Datos PostgreSQL

- Base de datos relacional alojada en la nube
- Modelos de datos implementados con Sequelize:
  - **Users**: Gestión de usuarios con roles (user, admin, guest)
  - **Products**: Catálogo de productos con atributos (nombre, descripción, precio, stock, talla, color, marca)
  - **Categories**: Clasificación de productos
  - **Carts**: Carritos de compra asociados a usuarios
  - **CartItems**: Ítems dentro del carrito
  - **Orders**: Órdenes de compra con estado y detalles de envío
  - **OrderItems**: Ítems dentro de las órdenes

- Relaciones establecidas entre modelos (1:N, 1:1)
- Encriptación segura de datos sensibles

#### EP 2.3: API REST con Endpoints

**Autenticación:**
- `POST /api/auth/register` - Registro de nuevos usuarios con validaciones
- `POST /api/auth/login` - Inicio de sesión con retorno de JWT

**Productos:**
- `GET /api/products` - Listar todos los productos
- `GET /api/products/:id` - Obtener detalle de producto específico
- `POST /api/products` - Crear producto (admin)
- `PUT /api/products/:id` - Actualizar producto (admin)
- `DELETE /api/products/:id` - Eliminar producto (admin)

**Categorías:**
- `GET /api/categories` - Listar todas las categorías
- `GET /api/categories/:id` - Obtener categoría específica
- `POST /api/categories` - Crear categoría (admin)

**Carrito:**
- `GET /api/cart` - Obtener carrito del usuario autenticado
- `POST /api/cart/items` - Agregar ítem al carrito
- `PUT /api/cart/items/:itemId` - Actualizar cantidad del ítem
- `DELETE /api/cart/items/:itemId` - Eliminar ítem del carrito
- `DELETE /api/cart` - Vaciar carrito

**Órdenes:**
- `POST /api/orders` - Crear nueva orden
- `GET /api/orders` - Listar órdenes del usuario
- `GET /api/orders/:id` - Obtener detalles de orden específica

- Validación de datos en todas las peticiones
- Respuestas en formato JSON con status HTTP apropiados
- Manejo robusto de errores (400, 401, 403, 404, 500)

#### EP 2.4: Consumo de API desde Frontend

- Servicio `ApiService` centralizado para todas las peticiones HTTP
- Servicio `AuthService` para gestionar autenticación
- Servicio `ProductService` para operaciones de productos
- Servicio `CartService` para gestionar carrito
- Servicio `OrderService` para gestionar órdenes
- Uso de Observables y RxJS para manejo asincrónico
- HttpClient para peticiones HTTP seguras

#### EP 2.5: Autenticación con JWT

**Backend:**
- Implementación de JWT para autenticación segura
- Encriptación de contraseñas con bcryptjs
- Validación de credenciales en login
- Generación de tokens con expiración
- Middleware `verifyToken` para proteger rutas
- Validación de roles (usuario, administrador)

**Frontend:**
- Almacenamiento seguro de tokens en localStorage
- Guardado de datos de usuario en sesión
- Interceptores HTTP para incluir token en peticiones protegidas
- Formularios de login/registro con validaciones
- Mensajes de feedback (toast) en acciones de autenticación
- Logout con limpieza de tokens y datos

#### EP 2.6: Validación de Usuarios y Manejo de Sesiones

**Backend:**
- Middleware de validación de JWT en todas las rutas protegidas
- Control de roles para autorizar operaciones específicas
- Validación de entrada de datos
- Manejo de tokens expirados

**Frontend:**
- Guardia de rutas (Route Guards) para proteger páginas
- Mostrar/ocultar elementos según autenticación y rol
- Persistencia de sesión al recargar la página
- Auto-logout cuando token expira
- Visualización del perfil de usuario autenticado

### Frontend - Integración con Backend

- **HttpClient**: Comunicación segura con la API
- **Interceptores HTTP**: Inyección automática de tokens JWT
- **Guards**: Protección de rutas según autenticación y rol
- **Servicios**: Lógica de negocio centralizada
- **Componentes**: Consumo de datos mediante async pipe y observables
- **Validaciones**: Feedback inmediato en formularios

---

## Modelo Entidad-Relación (MER)

El diagrama MER de la base de datos que muestra la estructura relacional de la aplicación.

[![Diagrama MER](https://i.imgur.com/KxustCL.png)](https://i.imgur.com/KxustCL.png)

### Entidades principales:

- **Users**: Usuarios del sistema con roles diferenciados
- **Products**: Productos disponibles en el catálogo
- **Categories**: Categorías para clasificar productos
- **Carts**: Carritos de compra de usuarios
- **CartItems**: Ítems dentro del carrito
- **Orders**: Órdenes de compra realizadas
- **OrderItems**: Ítems dentro de las órdenes

### Relaciones:

- **Users ↔ Carts** (1:1): Un usuario tiene un carrito
- **Users ↔ Orders** (1:N): Un usuario puede tener múltiples órdenes
- **Categories ↔ Products** (1:N): Una categoría contiene múltiples productos
- **Carts ↔ CartItems** (1:N): Un carrito contiene múltiples ítems
- **Products ↔ CartItems** (1:N): Un producto puede estar en múltiples carritos
- **Orders ↔ OrderItems** (1:N): Una orden contiene múltiples ítems
- **Products ↔ OrderItems** (1:N): Un producto puede estar en múltiples órdenes

---

## Instalación y Ejecución

Sigue estos pasos para ejecutar el proyecto en un entorno de desarrollo local.

### Prerrequisitos

* Tener instalado [Node.js](https://nodejs.org/) (que incluye npm).
* Tener instalado el CLI de Ionic:
    ```
    npm install -g @ionic/cli
    ```
* Base de datos PostgreSQL (local o en la nube)

### Instalación

1. **Clona el repositorio:**
    ```
    git clone https://github.com/PytricioPUCV/Racing_Web_Ionic.git
    ```

2. **Navega a la carpeta del proyecto:**
    ```
    cd Racing_Web_Ionic
    ```

3. **Instala las dependencias del frontend:**
    ```
    npm install
    ```

4. **Instala las dependencias del backend:**
    ```
    cd backend_rw
    npm install
    cd ..
    ```

### Ejecutar la Aplicación

#### Ejecutar el Backend

1. **Navega a la carpeta del backend:**
    ```
    cd backend_rw
    ```

2. **Configura las variables de entorno:**
    Crea un archivo `.env` en la carpeta `backend_rw/` con las siguientes variables:
    ```
    DB_URL=postgres://usuario:contraseña@host:puerto/nombre_bd
    JWT_SECRET=tu_clave_secreta_segura
    NODE_ENV=development
    ```

3. **Inicia el servidor backend:**
    ```
    npm run dev
    ```
    El servidor se ejecutará en `http://localhost:3000`.

#### Ejecutar el Frontend

1. **En otra terminal, desde la raíz del proyecto, inicia el servidor de desarrollo:**
    ```
    ionic serve
    ```

2. Abre tu navegador y ve a `http://localhost:8100`. La aplicación se recargará automáticamente cada vez que guardes un cambio en el código.

### Notas Importantes

- **Asegúrate de que el backend esté ejecutándose antes de iniciar el frontend.**
- El frontend está configurado para conectarse al backend en `http://localhost:3000` por defecto.
- La base de datos debe estar creada y accesible antes de ejecutar la aplicación.
- Los modelos de Sequelize se sincronizarán automáticamente con la base de datos en la primera ejecución.

### Testing de la API

Para probar los endpoints de la API, puedes usar herramientas como **Postman** o **Insomnia**:

1. Registra un nuevo usuario: `POST /api/auth/register`
2. Inicia sesión: `POST /api/auth/login`
3. Copia el token retornado y úsalo en el header `Authorization: Bearer <token>`
4. Prueba endpoints protegidos como `GET /api/products`, `POST /api/cart`, etc.

---

## Información de la Entrega

**Entrega Parcial 2**: Integración Frontend + Backend y Autenticación
- Fecha de entrega: [Completar con fecha límite]
- Estado: En desarrollo
- Rama principal: `main`
- Rama de desarrollo: `backend-integration`
