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
7. [Instalación y Ejecución](#instalación-y-ejecución)

---

## Resumen del Proyecto

Este es un proyecto universitario para el ramo de "Web y Móvil", desarrollado con el framework Ionic y Angular. La aplicación es un e-commerce para la marca "RacingConEstilo", una tienda de streetwear inspirada en la cultura de las carreras de autos.

![Captura de pantalla de la página de inicio](https://i.imgur.com/ehaGOR7.png)

El proyecto cuenta con una base de frontend que cubre las funcionalidades esenciales de un e-commerce moderno, incluyendo vistas de catálogo, detalle de producto y autenticación de usuarios. La arquitectura se centra en componentes reutilizables y un servicio central para la gestión de datos, asegurando la escalabilidad del sistema.

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

---

## Arquitectura de la Información 
[Estructura de Navegación - Página](https://whimsical.com/estructura-de-navegacion-pagina-FfecMFJYgrHrKuPHLwcUia)
![Captura de pantalla del Flujo de Navegación Página](https://i.imgur.com/VWcv3yP.jpeg)

[Flujo de Navegación - Compra](https://whimsical.com/flujo-de-navegacion-compra-BYthZ4Gd9HRMVqQf32mxQ2)
![Captura de pantalla del Flujo de Navegación Compra](https://i.imgur.com/pVSGxEc.jpeg)

---

## Prototipo de Diseño 
[MockUps - Racing Jackets (Figma)](https://www.figma.com/design/oAG1GI9Ct5XgXj3GKipiSc/MockUps-Racing-Jackets?node-id=0-1&t=QJukTLq0sVg6Lppk-1)
![Captura de pantalla del prototipo de Figma](https://i.imgur.com/2QRz8cs.png)

---

## Principios de UX Aplicados
1.  **Consistencia**: Se diseñaron componentes reutilizables para el encabezado y el pie de página que aparecen en todas las páginas. Esto nos asegura que elementos clave como el logo, los menús de navegación y los íconos de usuario y tema estén siempre en el mismo lugar, creando una experiencia predecible y familiar.
2.  **Feedback**: En la página de detalle de producto, cuando el usuario selecciona una talla, el botón correspondiente cambia de estilo, dándole la confirmación visual de su elección. Con el mismo fin los botones y enlaces presentan efectos visuales sutiles al pasar el mouse para indicar que son interactivos.
3.  **Simplicidad y Claridad**: En el formulario de registro, el campo "Comuna" permanece deshabilitado hasta que se seleccione primero el campo "Región", evitando errores y reduciendo la carga cognitiva del usuario al no mostrar opciones irrelevantes.
4.  **Accesibilidad**: Se implementó un tema oscuro y claro. Esto no es solo una preferencia estética, sino una característica de accesibilidad clave para usuarios con sensibilidad a la luz. Además, se utilizó un buen contraste de colores en ambos temas y se emplearon componentes semánticos de Ionic, que son compatibles con lectores de pantalla.

---

## Tecnologías Utilizadas
- **Ionic Framework**: Kit de herramientas de UI para construir aplicaciones multiplataforma.
- **Angular**: Plataforma de desarrollo para construir aplicaciones web eficientes.
- **TypeScript**: Superconjunto de JavaScript con tipado estático.
- **Sass (SCSS)**: Preprocesador de CSS para estilos avanzados.
- **Angular Router**: Para gestionar la navegación y las rutas de la aplicación.

---

## Instalación y Ejecución

Sigue estos pasos para ejecutar el proyecto en un entorno de desarrollo local.

### Prerrequisitos

* Tener instalado [Node.js](https://nodejs.org/) (que incluye npm).
* Tener instalado el CLI de Ionic:
    ```bash
    npm install -g @ionic/cli
    ```

### Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/PytricioPUCV/Racing_Web_Ionic.git
    ```

2.  **Navega a la carpeta del proyecto:**
    ```bash
    cd Racing_Web_Ionic
    ```

3.  **Instala las dependencias:**
    ```bash
    npm install
    ```

### Ejecutar la Aplicación

1.  **Inicia el servidor de desarrollo:**
    ```bash
    ionic serve
    ```
2.  Abre tu navegador y ve a `http://localhost:8100`. La aplicación se recargará automáticamente cada vez que guardes un cambio en el código.
