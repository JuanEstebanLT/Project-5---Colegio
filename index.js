const express = require('express');
const app = express();
const port = 3000;

// Middleware para permitir que el servidor entienda JSON en el cuerpo de las peticiones
app.use(express.json());

// Importación de las rutas desde la carpeta 'routes'
// Asegúrate de que los nombres de los archivos coincidan con estos
const estudiantesRoutes = require('./routes/estudiantes');
const profesoresRoutes = require('./routes/profesores');
const materiasRoutes = require('./routes/materias');
const notasRoutes = require('./routes/notas');

// Registro de las rutas en la aplicación
// Cada una tendrá su propio prefijo para que el código esté organizado
app.use('/Api', estudiantesRoutes);
app.use('/Api', profesoresRoutes);
app.use('/Api', materiasRoutes);
app.use('/Api', notasRoutes);

// Ruta base opcional para verificar que el servidor funciona
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: "Bienvenido a la API del Proyecto 5 - Colegio (SENA)"
    });
});

// Inicio del servidor
app.listen(port, () => {
    console.log(`-----------------------------------------`);
    console.log(`Servidor corriendo en: http://localhost:${port}`);
    console.log(`Proyecto 5: Gestión de Colegio listo.`);
    console.log(`-----------------------------------------`);
});