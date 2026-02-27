const express = require('express');
const router = express.Router();

let profesores = [
    { id: 1, nombre: 'Mateo', email: 'mateo@sena.edu.co', materia: 'Programación', activo: true },
    { id: 2, nombre: 'Alexis', email: 'Alexis@sena.edu.co', materia: 'Quimmica', activo: true },
    { id: 3, nombre: 'Guillermo', email: 'Guillermo@sena.edu.co', materia: 'Matematicas', activo: true },
];

// GET - Obtener todos con filtro dinámico [cite: 107]
router.get('/profesores', (req, res) => {
    const idioma = req.headers['accept-language'] || 'es'; // Lectura de header 
    const filtros = req.query;

    const data = profesores.filter(p =>
        Object.entries(filtros).every(([k, v]) =>
            p[k]?.toString().toLowerCase().includes(v.toLowerCase())
        )
    );

    res.json({ 
        success: true, 
        idioma_detectado: idioma, 
        total: data.length, 
        data 
    });
});

// GET - Por ID
router.get('/profesores:id', (req, res) => {
    const profesor = profesores.find(p => p.id === parseInt(req.params.id));
    if (!profesor) return res.status(404).json({ success: false, message: 'Profesor no encontrado' });
    res.json({ success: true, data: profesor });
});

// POST - Crear profesor
router.post('/profesores', (req, res) => {
    const { nombre, email, materia } = req.body;
    
    if (!nombre || !materia) {
        return res.status(400).json({ success: false, message: 'Faltan campos obligatorios' });
    }

    const nuevo = { id: profesores.length + 1, nombre, email, materia, activo: true };
    profesores.push(nuevo);
    res.status(201).json({ success: true, data: nuevo });
});

// PUT - Actualizar
router.put('/profesores:id', (req, res) => {
    const profesor = profesores.find(p => p.id === parseInt(req.params.id));
    if (!profesor) return res.status(404).json({ success: false, message: 'No encontrado' });

    const { nombre, materia, activo } = req.body;
    if (nombre) profesor.nombre = nombre;
    if (materia) profesor.materia = materia;
    if (activo !== undefined) profesor.activo = activo;

    res.json({ success: true, data: profesor });
});

// DELETE - Eliminar
router.delete('/profesores:id', (req, res) => {
    const index = profesores.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ success: false, message: 'No encontrado' });

    const eliminado = profesores.splice(index, 1);
    res.json({ success: true, message: 'Profesor eliminado', data: eliminado });
});

module.exports = router;