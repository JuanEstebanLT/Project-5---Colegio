# API REST – Gestión Colegio
**SENA - Centro de Servicios y Gestión Empresarial**

## Equipo
- Juan Esteban Lezcano Tejada
- Valeria Usuga Penagos

## 🌐 URL de la API en producción
https://project-5-colegio.onrender.com

## 🔐 Autenticación
Todos los endpoints requieren el header:
```
password: [valor de la API_PASSWORD]
```
Para endpoints POST, PUT y DELETE también se requiere:
```
x-user-role: admin
```

## 📌 Endpoints

### Estudiantes
```
GET    /Api/estudiantes          - Lista todos (soporta filtro por query)
GET    /Api/estudiantes/:id      - Busca por ID
POST   /Api/estudiantes          - Crea uno nuevo
PUT    /Api/estudiantes/:id      - Actualiza
DELETE /Api/estudiantes/:id      - Elimina
```

### Maestros (Profesores)
```
GET    /Api/maestros             - Lista todos (soporta filtro por query)
GET    /Api/maestros/:id         - Busca por ID
POST   /Api/maestros             - Crea uno nuevo
PUT    /Api/maestros/:id         - Actualiza
DELETE /Api/maestros/:id         - Elimina
```

### Materias
```
GET    /Api/materias             - Lista todas (soporta filtro por query)
GET    /Api/materias/:id         - Busca por ID
POST   /Api/materias             - Crea una nueva
PUT    /Api/materias/:id         - Actualiza
DELETE /Api/materias/:id         - Elimina
```

### Notas
```
GET    /Api/notas                - Lista todas (soporta filtro por query)
GET    /Api/notas/:id            - Busca por ID
POST   /Api/notas                - Crea una nueva
PUT    /Api/notas/:id            - Actualiza
DELETE /Api/notas/:id            - Elimina
```

## 💡 Ejemplos de uso
```bash
# Consultar estudiantes
curl https://project-5-colegio.onrender.com/Api/estudiantes \
     -H "password: 12345"

# Crear un estudiante
curl -X POST https://project-5-colegio.onrender.com/Api/estudiantes \
     -H "password: 6789" \
     -H "x-user-role: admin" \
     -H "Content-Type: application/json" \
     -d '{"nombre":"Juan","apellido":"Perez","genero":"M","email":"juan@mail.com"}'
```

## 🚀 Instrucciones de ejecución local
1. Instalar dependencias: `npm install`
2. Crear archivo `.env` con las variables de entorno
3. Correr servidor: `node index.js`
4. Probar en Postman en `http://localhost:3000`

## 📦 Repositorios GitHub
- https://github.com/JuanEstebanLT/Project-5---Colegio
- https://github.com/valeriaup/colegio

---
**Instructor:** Mateo  
**Programa:** Tecnología en Análisis y Desarrollo de Software  
**SENA – Centro de Servicios y Gestión Empresarial**