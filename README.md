# LibroClick
# ¡Atención, Cibercoders del Caos! 🕶️💀🌌

> **"Bienvenidos a la Matrix de lo imposible, donde cada hot fix es un trofeo en nuestra odisea digital y cada error, un chiste macabro del destino. En este oscuro callejón de bits, nuestro contador de hot fixes se dispara con cada parche que aplicamos, mientras el contador de arquitecturas nos recuerda que reinventamos el sistema con estilo y sin piedad. ¡Aquí, hackeamos la realidad, reímos en la cara del bug y forjamos el futuro con humor negro y cables de neón! 🤖💻⚡🔧🔥😈"**


# 📚 Proyecto Final: Microservicios de Productos, Usuarios y Préstamos 🚀

## 1. Introducción & Tecnologías Usadas 🔧💻

En este proyecto se ha desarrollado una arquitectura basada en **microservicios** para gestionar de manera independiente la información de usuarios, productos y préstamos. Cada servicio cuenta con su propia base de datos y se comunica entre sí a través de una API REST. A continuación, se muestran las principales tecnologías utilizadas:

- **Node.js**: Plataforma para ejecutar JavaScript en el servidor.  
- **Express.js**: Framework para crear y gestionar las rutas y peticiones HTTP.  
- **MySQL**: Sistema de gestión de bases de datos para almacenar la información de cada microservicio.  
- **Axios**: Librería para realizar peticiones HTTP entre microservicios de forma sencilla y asíncrona.  
- **Postman**: Herramienta para probar y documentar la API REST.  
- **PHP, HTML, CSS, JavaScript y Bootstrap**: Utilizados en la capa de presentación para la aplicación web que interactúa con el API REST.  
- **cURL**: Para realizar peticiones HTTP desde el lado del cliente en PHP.

✨ **Ventajas y motivos**:  
- ⚡ **Escalabilidad**: Cada microservicio es independiente.  
- 🔐 **Seguridad**: Las interacciones se validan a través de consultas HTTP y manejo de errores.  
- 🛠️ **Mantenimiento**: Cada servicio tiene su propio ciclo de desarrollo y despliegue.

---

## 2. **PROPÓSITO IDEAL Y REQUERIMIENTOS DEL PROYECTO** 🔥💡

**Objetivo Ideal:**  
**¡Crear un sistema robusto y escalable que permita la gestión independiente de usuarios, productos y préstamos, facilitando la comunicación entre microservicios a través de una API REST y garantizando la integridad de la información en cada operación!**  

**Requerimientos Principales:**  
- ✅ **Gestión de Usuarios:** Registro, consulta, actualización y eliminación de usuarios.  
- ✅ **Gestión de Productos:** Creación, consulta y verificación de disponibilidad de productos para préstamo.  
- ✅ **Gestión de Préstamos:** Registro de préstamos, validación de existencia del usuario y disponibilidad del producto antes de confirmar el préstamo.  
- ✅ **Independencia de Bases de Datos:** Cada microservicio se conecta a su propia base de datos MySQL.  
- ✅ **Comunicación Segura:** Uso de peticiones HTTP con Axios para asegurar la correcta interacción entre microservicios.  
- ✅ **Interfaz Visual:** Desarrollo de una aplicación web que permite interactuar con la API de forma sencilla mediante PHP y cURL, mostrando la información de manera gráfica.  

🚀 **Este proyecto se centra en la eficiencia, seguridad y escalabilidad del sistema, haciendo uso de tecnologías modernas y metodologías ágiles.**

---

## 3. Arquitectura del Sistema & Estructura de Carpetas 🏗️📁

### 3.1. **Diagrama de Interacción de Microservicios** 🤝

```mermaid
flowchart LR
    A[UsuariosMS]
    B[ProductosMS]
    C[PrestamosMS]
    D[Base de Datos MySQL (Usuarios)]
    E[Base de Datos MySQL (Productos)]
    F[Base de Datos MySQL (Préstamos)]
    
    A -- Consulta de usuario --> D
    B -- Consulta de producto --> E
    C -- Registro de préstamo --> F
    
    C -- Verifica existencia de usuario --> A
    C -- Verifica disponibilidad de producto --> B
```

> Este diagrama muestra la comunicación entre microservicios y sus respectivas bases de datos. ¡Cada servicio es independiente pero colaborativo! 😎

---

### 3.2. **Estructura de Carpetas y Vinculación de Archivos** 📂🔗

```plaintext
/proyecto-final/
├── usuariosMS/
│   ├── controllers/
│   │   └── usuariosController.js       // Lógica para CRUD de usuarios
│   ├── models/
│   │   └── usuariosModel.js            // Conexión y consultas a la BD de usuarios
│   └── index.js                        // Archivo principal para iniciar el servicio
├── productosMS/
│   ├── controllers/
│   │   └── productosController.js      // Lógica para CRUD de productos
│   ├── models/
│   │   └── productosModel.js           // Conexión y consultas a la BD de productos
│   └── index.js                        // Archivo principal para iniciar el servicio
├── prestamosMS/
│   ├── controllers/
│   │   └── prestamosController.js      // Lógica para CRUD de préstamos y validaciones
│   ├── models/
│   │   └── prestamosModel.js           // Conexión y consultas a la BD de préstamos
│   └── index.js                        // Archivo principal para iniciar el servicio
├── frontProductos/                     // Aplicación web para gestionar productos
│   ├── index.php                       // Página principal que consume la API REST
│   └── crearProducto.php               // Script para creación de productos vía cURL
└── README.md                           // Documentación del proyecto
```

> **Vinculación entre carpetas:**  
> - Cada microservicio se ejecuta de forma independiente, pero se comunican a través de solicitudes HTTP.  
> - La capa de presentación (frontProductos) se conecta a la API REST de productosMS, enviando y recibiendo datos de la base de datos de productos.  
> - Los archivos `index.js` en cada servicio inician la aplicación y definen las rutas que gestionan las operaciones.

---

## 4. Funcionamiento de las Consultas y Ejemplos Gráficos 📊🔍

### 4.1. **Consultas a Libros (Ejemplo Adicional)**

- **GET Todos los Libros:**  
  **Endpoint:** `GET http://localhost:3002/libros/get/all`  
  **Respuesta (Ejemplo):**
  ```json
  [
      {
          "id": 1,
          "titulo": "El Coronel",
          "autor": "Gabriel García",
          "isbn": "978-3-16-148410-1",
          "categoria": "Novela",
          "estado": "",
          "fecha_ingreso": "2025-03-23T23:22:20.000Z"
      },
      {
          "id": 7,
          "titulo": "El señor sin anillos",
          "autor": "Dori Per",
          "isbn": "978-3-16-148410-6",
          "categoria": "Super Novela",
          "estado": "disponible",
          "fecha_ingreso": "2025-03-27T00:18:07.000Z"
      }
  ]
  ```

- **GET Libro Específico:**  
  **Endpoint:** `GET http://localhost:3002/libros/get/7`  
  **Respuesta (Ejemplo):**
  ```json
  {
      "id": 7,
      "titulo": "El señor sin anillos",
      "autor": "Dori Per",
      "isbn": "978-3-16-148410-6",
      "categoria": "Super Novela",
      "estado": "",
      "fecha_ingreso": "2025-03-27T00:18:07.000Z"
  }
  ```

> Estos ejemplos se muestran para ilustrar cómo se realizan las consultas y se gestionan las respuestas en formato JSON. ¡Muy visual y práctico! 😍

---

## 5. Detalle de los Microservicios y sus Endpoints 📝📡

### 5.1. **UsuariosMS** 👤

- **POST `/usuarios/create`**  
  *Crea un nuevo usuario.*  
  **Ejemplo de Payload:**
  ```json
  {
    "nombre": "Pepito lol",
    "correo": "lol.baron@example.com",
    "codigo": "PL11"
  }
  ```

- **GET `/usuarios/get/all`**  
  *Obtiene la lista de todos los usuarios.*

- **GET `/usuarios/get/:id`**  
  *Obtiene la información de un usuario específico.*

- **PUT `/usuarios/edit/:id`**  
  *Actualiza la información del usuario.*

- **DELETE `/usuarios/delete/:id`**  
  *Elimina un usuario.*

> Verificación realizada con Postman.  
> citeturn0file2

### 5.2. **ProductosMS** 📦

- **POST `/productos/create`**  
  *Crea un nuevo producto.*

- **GET `/productos/get/all`**  
  *Obtiene todos los productos.*

- **GET `/productos/get/:id`**  
  *Consulta la información de un producto específico.*

> Basado en la documentación del Taller 8 y validado en Postman.  
> citeturn0file2

### 5.3. **PrestamosMS** 💸

- **POST `/prestamos/create`**  
  *Registra un nuevo préstamo, verificando previamente que el usuario exista y el producto esté disponible.*  

- **GET `/prestamos/get/all`**  
  *Obtiene la lista de todos los préstamos.*

- **GET `/prestamos/get/:id`**  
  *Consulta la información de un préstamo específico.*

> La lógica de validación y comunicación entre microservicios garantiza que solo se realicen operaciones válidas.  
> citeturn0file2

---

## 6. Estado Actual y Próximos Pasos 🚧➡️✅

### **Estado Actual:**
- [x] Microservicio `usuariosMS` funcional.  
- [x] Microservicio `productosMS` funcional.  
- [x] Microservicio `prestamosMS` funcional.  
- [ ] Pruebas de integración pendientes.  
- [ ] Despliegue en entorno de producción pendiente.

### **Próximos Pasos:**
1. **Realizar pruebas de integración completas** entre los microservicios.  
2. **Corregir errores de conexión y manejo de excepciones.**  
3. **Desplegar en producción,** configurando los servidores y dominios necesarios.  
4. **Completar la documentación** con diagramas adicionales y casos de uso.

---

## 7. Conclusión Final 🌟📈

Este proyecto ejemplifica la implementación de una arquitectura basada en microservicios usando tecnologías modernas como Node.js, Express, MySQL y Axios. La separación de responsabilidades y el uso de API REST permiten una comunicación clara y segura entre servicios, facilitando la escalabilidad y el mantenimiento del sistema. Con una estructura de carpetas organizada y diagramas visuales, se asegura que tanto desarrolladores como mantenedores puedan entender y expandir el proyecto de forma eficiente. ¡El camino hacia un sistema robusto y modular está más cerca que nunca! 🚀🎉
