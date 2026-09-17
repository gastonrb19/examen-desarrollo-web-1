### Video del proyecto:
https://youtu.be/7Q_sTMvF01o

# Proyecto VentasFix - Sistema de Catálogo y Backoffice

Este proyecto es una solución integral (Full-Stack) desarrollada para el examen de la asignatura, consistente en un Backend estructurado, un Frontend interactivo y una base de datos relacional; todo orquestado mediante contenedores Docker.

## 🎯 Alcance del Proyecto
El sistema abarca dos grandes áreas:
1. **Backoffice (Administración):** Un panel privado protegido por autenticación JWT que permite a los trabajadores gestionar (CRUD) Usuarios, Productos y Clientes, además de visualizar un Dashboard con estadísticas en tiempo real.
2. **Catálogo Público (Tienda):** Una interfaz accesible por clientes sin necesidad de registro, que lista el inventario disponible y permite agregar productos a un Carrito de Compras funcional que valida el stock en tiempo real.

---

## 🏗 Arquitectura y Tecnologías

El proyecto sigue un enfoque de separación de responsabilidades y modularidad.

### 1. Backend (Node.js + Express + TypeScript)
Diseñado utilizando una estricta **Arquitectura por Capas**, lo que facilita el mantenimiento y la escalabilidad:
*   **Rutas (`routes/`):** Definen los endpoints y aplican middlewares de autenticación y validación.
*   **Controladores (`controllers/`):** Gestionan las peticiones HTTP y formatean las respuestas.
*   **Servicios (`services/`):** Contienen la lógica de negocio pura y se comunican con la base de datos.
*   **Modelos (`models/`):** Entidades de TypeORM que mapean las tablas de MySQL.
*   **DTOs (`dtos/`):** Objetos de Transferencia de Datos. Utilizan `class-validator` para asegurar la integridad de la información que entra al sistema.

### 2. Frontend (Next.js 14+ con App Router)
*   **React y TailwindCSS:** Para una interfaz moderna y completamente responsiva.
*   **Axios e Interceptores:** Centraliza las peticiones a la API e inyecta automáticamente el Token JWT en cada petición privada.
*   **Context API:** Manejo del estado global del Carrito de Compras (`CartContext`) con persistencia en `localStorage`.

### 3. Infraestructura y Datos
*   **Docker Compose:** Levanta simultáneamente el contenedor de la API (Node) y la Base de Datos.
*   **MySQL 8:** Motor de base de datos relacional. Sincronización automática de esquemas a través de TypeORM (`synchronize: true`).

---

## 🔬 Evaluación de Tecnologías

Para el desarrollo de la solución, se optó por una **arquitectura distribuida** separando completamente el Backend (API REST) del Frontend. Esta decisión estratégica garantiza la escalabilidad e interoperabilidad del sistema, permitiendo que en un futuro cercano, el software ERP externo (mencionado en los requerimientos del negocio) pueda integrarse y realizar peticiones directamente a nuestra API de forma segura y estandarizada.

Por el lado del servidor, se eligió **Node.js** junto al framework **Express** debido a su modelo de entrada/salida no bloqueante, el cual proporciona una alta capacidad para manejar múltiples solicitudes concurrentes y permite un tiempo de respuesta sumamente veloz. Al enriquecer este entorno con **TypeScript**, validaciones estrictas (DTOs) y una arquitectura formal por capas, logramos un equilibrio perfecto: mantenemos la agilidad y velocidad de Node, pero dotamos a la aplicación de una enorme **robustez**, apoyándonos en configuraciones seguras y las mejores prácticas de la industria del software.

---

## 🧠 Decisiones Técnicas Destacadas

1. **Abstracción de Errores con `dryFn`:** 
   En lugar de escribir bloques `try/catch` redundantes en cada controlador, se implementó un *wrapper* llamado `dryFn`. Este intercepta las promesas y, si hay un rechazo (ej. registro no encontrado), delega automáticamente el error al middleware global `errorHandler.ts`.
2. **Validación Estricta (DTOs en Lista Blanca):** 
   El Backend está configurado para rechazar cualquier campo no especificado explícitamente en los DTOs (`whitelist: true`, `forbidNonWhitelisted: true`). Esto previene ataques de inyección de propiedades (ej. intentar modificar un `id` o `createdAt` desde el cliente).
3. **Manejo de Estados de Carga y Errores:**
   El frontend gestiona asincronía mediante estados (`loading`, `error`), mostrando feedback visual (spinners/mensajes) para mejorar la experiencia de usuario (UX).

---

## ⚙️ Requerimientos y Configuración

Para ejecutar este proyecto en un entorno local, solo necesitas tener instalado:
*   [Docker Desktop](https://www.docker.com/products/docker-desktop) (o Docker Engine + Docker Compose v2)
*   Node.js (Opcional, solo si se desea correr el frontend de forma independiente).

### Instrucciones de Ejecución
1. Abre una terminal en la raíz del proyecto.
2. Ejecuta el comando para construir y levantar los contenedores en segundo plano:
   ```bash
   docker-compose up --build -d
   ```
3. La primera vez, Docker descargará las imágenes e instalará las dependencias. Una vez finalizado:
   - **Frontend:** http://localhost:3001
   - **Backend (API):** http://localhost:3000

*Nota: La base de datos MySQL puede tardar unos segundos en inicializarse en el primer arranque. El Backend tiene lógica de reintentos automática, por lo que se conectará solo cuando MySQL esté listo.*

---

## ⚠️ Restricciones y Problemas Conocidos (Troubleshooting)

*   **Pérdida temporal de conexión a la Base de Datos:** Si el contenedor de MySQL se reinicia abruptamente, la API podría lanzar un error de conexión (`ECONNREFUSED`). El sistema está configurado para reintentar la conexión 5 veces antes de abortar el proceso.
*   **Permisos de Volumen (Docker):** Si en Linux se presentan problemas de permisos con el volumen `./backend` o `./frontend`, asegurarse de ejecutar docker con los privilegios adecuados o ajustar los dueños de los archivos locales.
*   **Carrito de Compras (Front-only):** Por el momento, el carrito de compras funciona del lado del cliente (`localStorage`). El botón "Proceder al Pago" no inicia una transacción real con una pasarela de pago ni descuenta el stock definitivo en la base de datos hasta que se desarrolle el endpoint de "Checkout".
*   **Formatos Numéricos:** Al crear productos desde el Backoffice, los campos de precio y stock deben ser ingresados sin comas ni separadores de miles, ya que los inputs nativos HTML y las validaciones estrictas del DTO esperan números enteros.
