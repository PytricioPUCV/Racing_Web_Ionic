# RacingConEstilo - E-Commerce (Ionic + Angular)

Este es un proyecto universitario para el ramo de "Web y Móvil", desarrollado con el framework Ionic y Angular. La aplicación es un e-commerce para la marca "RacingConEstilo", una tienda de streetwear inspirada en la cultura de las carreras de autos.

![Captura de pantalla de la página de inicio](https://i.imgur.com/ehaGOR7.png)

---

## ✅ Características Implementadas

El proyecto cuenta con una base de frontend que cubre las funcionalidades esenciales de un e-commerce moderno.

* **Arquitectura Escalable:**
    * **Gestión Centralizada de Datos:** Se utiliza un servicio de Angular (`ProductService`) para manejar toda la información de los productos, evitando la duplicación de código y facilitando futuras integraciones.
    * **Componentes Reutilizables:** Se crearon componentes modulares para el **encabezado (`HeaderComponent`)** y el **pie de página (`FooterComponent`)**, asegurando una interfaz consistente en toda la aplicación.

* **Páginas y Navegación:**
    * **Páginas de Categorías:** Vistas dedicadas para **Chaquetas** y **Accesorios**, que cargan los productos correspondientes desde el servicio central.
    * **Catálogo Principal:** Página de inicio que muestra todos los productos disponibles.
    * **Detalle de Producto:** Vista individual para cada artículo con información detallada, selector de talla y cantidad.
    * **Autenticación de Usuarios:** Formularios funcionales para **Registro de Usuario** (con lógica de Región/Comuna) e **Inicio de Sesión**.
    * **Navegación Fluida:** Sistema de enrutamiento de Angular que ofrece una experiencia de aplicación de una sola página (SPA) sin recargas.

* **Experiencia de Usuario (UX):**
    * **Diseño Responsivo:** La interfaz se adapta a dispositivos móviles y de escritorio.
    * **Tema Oscuro/Claro:** Funcionalidad para cambiar entre modo oscuro y claro, con la preferencia del usuario guardada localmente para persistir entre sesiones.

---

## 🛠️ Tecnologías Utilizadas

* **[Ionic Framework](https://ionicframework.com/)**: Kit de herramientas de UI para construir aplicaciones multiplataforma de alta calidad.
* **[Angular](https://angular.dev/)**: Plataforma de desarrollo para construir aplicaciones web eficientes y sofisticadas.
* **[TypeScript](https://www.typescriptlang.org/)**: Superconjunto de JavaScript con tipado estático para un código más robusto.
* **[Sass (SCSS)](https://sass-lang.com/)**: Preprocesador de CSS que añade funcionalidades como variables y anidamiento.
* **[Capacitor](https://capacitorjs.com/)**: Capa de compatibilidad para convertir aplicaciones web en binarios nativos para iOS y Android.

---

## 🔄 Flujo de Trabajo

El proyecto se gestiona siguiendo prácticas estándar de control de versiones para asegurar un desarrollo ordenado.

* **Control de Ramas:** El trabajo se realiza en una rama de desarrollo (`develop`) para mantener la rama principal (`main`) siempre estable.
* **Integración Continua:** Los cambios se proponen, revisan (opcionalmente) y fusionan a través de **Pull Requests** en GitHub.

---

## 🚀 Cómo Empezar

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
    git clone [https://github.com/PytricioPUCV/Racing_Web_Ionic.git](https://github.com/PytricioPUCV/Racing_Web_Ionic.git)
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
