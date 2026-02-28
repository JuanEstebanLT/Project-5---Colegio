const express = require('express');
const router = express.Router();

// Datos de ejemplo iniciales
let estudiantes = [
    { id: 1, nombre: 'Juan Perez', email: 'juan@sena.edu.co', grado: '10A', activo: true },
    { id: 2, nombre: 'Maria Lopez', email: 'maria@sena.edu.co', grado: '11B', activo: true },
];

// GET - Obtener todos (Incluye Filtro Query Params) 
router.get('/estudiantes', (req, res) => {
    const { nombre, email, grado, activo } = req.query; // Query params 
    
    let filteredEstudiantes = estudiantes.filter(e => {
        return (!nombre || e.nombre.toLowerCase().includes(nombre.toLowerCase())) &&
               (!email || e.email.toLowerCase().includes(email.toLowerCase())) &&
               (!grado || e.grado.toLowerCase().includes(grado.toLowerCase())) &&
               (activo === undefined || e.activo.toString() === activo);
    });

    // ¡Aquí devolvemos la variable filtrada, no el arreglo original!
    res.json({ success: true, total: filteredEstudiantes.length, data: filteredEstudiantes });
});

// GET - Obtener por ID 
router.get('/estudiantes/:id', (req, res) => {
    const estudiante = estudiantes.find(e => e.id === parseInt(req.params.id));
    
    if (!estudiante) {
        return res.status(404).json({ success: false, message: 'Estudiante no encontrado' }); 
    }
    
    res.json({ success: true, data: estudiante }); 
});

// POST - Crear estudiante (Incluye validación de Header) 
router.post('/estudiantes', (req, res) => {
    // Lectura de Header obligatorio para este endpoint
    const auth = req.headers['authorization'];

    if (!auth) {
        return res.status(400).json({ success: false, message: 'Header Authorization es requerido' }); 
    }

    const { nombre, email, grado } = req.body;
    
    if (!nombre || !email) {
        return res.status(400).json({ success: false, message: 'Datos incompletos' });
    }

    const nuevo = {
        id: estudiantes.length + 1,
        nombre,
        email,
        grado,
        activo: true
    };

    estudiantes.push(nuevo);
    res.status(201).json({ success: true, data: nuevo }); 
});

// PUT - Actualizar por ID 
router.put('/estudiantes:id', (req, res) => {
    const estudiante = estudiantes.find(e => e.id === parseInt(req.params.id));
    if (!estudiante) return res.status(404).json({ success: false, message: 'No encontrado' });

    const { nombre, email, grado, activo } = req.body;
    if (nombre) estudiante.nombre = nombre;
    if (email) estudiante.email = email;
    if (grado) estudiante.grado = grado;
    if (activo !== undefined) estudiante.activo = activo;

    res.json({ success: true, data: estudiante });
});

// DELETE - Eliminar por ID
router.delete('/estudiantes:id', (req, res) => {
    const index = estudiantes.findIndex(e => e.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ success: false, message: 'No encontrado' });

    const eliminado = estudiantes.splice(index, 1);
    res.json({ success: true, message: 'Estudiante eliminado', data: eliminado });
});

module.exports = router;