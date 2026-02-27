# Mi API REST - Gestión Colegio
**SENA - Centro de Servicios y Gestión Empresarial**

API desarrollada con Node.js y Express que implementa un CRUD completo para la gestión académica, siguiendo los lineamientos de la Guía de Actividad.

## 📌 Estructura de Endpoints

### 1. Estudiantes
Administra el registro de alumnos.
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| GET | `/estudiantes` | Lista todos los estudiantes (Filtros por Query Params) |
| GET | `/estudiantes/:id` | Busca un estudiante específico por ID |
| POST | `/estudiantes` | Crea un estudiante (Requiere Header: `Authorization`) |
| PUT | `/estudiantes/:id` | Actualiza la información del estudiante |
| DELETE | `/estudiantes/:id` | Elimina un estudiante del sistema |

### 2. Profesores
Gestión de la planta docente.
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| GET | `/profesores` | Lista profesores (Usa Header: `accept-language`) |
| GET | `/profesores/:id` | Busca un profesor por ID |
| POST | `/profesores` | Registra un nuevo docente |
| PUT | `/profesores/:id` | Actualiza datos del profesor |
| DELETE | `/profesores/:id` | Elimina un profesor |

### 3. Materias
Catálogo de asignaturas del colegio.
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| GET | `/materias` | Lista materias con filtrado dinámico |
| GET | `/materias/:id` | Busca materia (Requiere Header: `password`) |
| POST | `/materias` | Crea una nueva asignatura |
| PUT | `/materias/:id` | Actualiza datos de la materia |
| DELETE | `/materias/:id` | Elimina una materia |

### 4. Notas
Registro de calificaciones.
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| GET | `/notas` | Lista todas las notas registradas |
| GET | `/notas/:id` | Busca una calificación por ID |
| POST | `/notas` | Registra una nota (Maneja mensajes por idioma) |
| PUT | `/notas/:id` | Modifica el valor de una nota |
| DELETE | `/notas/:id` | Elimina un registro de nota |

## 🛠️ Requisitos Técnicos Implementados
- **CRUD Completo:** Implementado en las 4 entidades.
- **Códigos de Estado:** Uso de 200, 201, 400, 401 y 404 según la guía.
- **Parámetros:** Uso de `req.params`, `req.query` y `req.headers`.
- **Estructura Modular:** Rutas separadas en archivos independientes dentro de `/routes`.

## 🚀 Instrucciones de Ejecución
1. Instalar dependencias: `npm install`
2. Correr servidor: `node index.js`
3. Probar en Postman en `http://localhost:3000`

---
**Instructor:** Mateo
**Programa:** Tecnología en Análisis y Desarrollo de Software