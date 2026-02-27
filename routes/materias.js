const express = require('express');
const router = express.Router();

// Datos de ejemplo basados en los campos sugeridos: id, nombre, descripcion, activa 
let materias = [
    { id: 1, nombre: 'Matemáticas', descripcion: 'Álgebra y Geometría', activa: false },
    { id: 2, nombre: 'Programación', descripcion: 'Node.js y APIs REST', activa: true },
    { id: 3, nombre: 'Quimica', descripcion: 'Nivel Técnico', activa: true }
];

// GET - Obtener todas las materias (con Filtro Dinámico por Query Params) 
router.get('/materias', (req, res) => {
    const { nombre, descripcion, activa } = req.query; // Query params 
    
    let filteredMaterias = materias.filter(m => {
        return (!nombre || m.nombre.toLowerCase().includes(nombre.toLowerCase())) &&
               (!descripcion || m.descripcion.toLowerCase().includes(descripcion.toLowerCase())) &&
               (activa === undefined || m.activa.toString() === activa);
    });

    res.json({ success: true, total: filteredMaterias.length, data: filteredMaterias });
});

// GET - Obtener una materia por ID (con validación de Header) 
router.get('/materias:id', (req, res) => {
    const apiKey = req.headers['password'];

    if (!apiKey || apiKey !== 'Hola Mundo') {
        return res.status(401).json({
            success: false,
            message: 'API key (password) incorrecta o requerida'
        }); 
    }

    const materia = materias.find(m => m.id === parseInt(req.params.id));
    
    if (!materia) {
        return res.status(404).json({ success: false, message: 'Materia no encontrada' }); 
    }
    
    res.json({ success: true, data: materia }); 
});

// POST - Crear una nueva materia 
router.post('/materias', (req, res) => {
    const { nombre, descripcion, activa } = req.body;

    // Validación de datos obligatorios 
    if (!nombre || !descripcion) {
        return res.status(400).json({ success: false, message: 'Faltan datos requeridos (nombre y descripción)' });
    }

    const nuevaMateria = {
        id: materias.length + 1,
        nombre,
        descripcion,
        activa: activa !== undefined ? activa : true
    };

    materias.push(nuevaMateria);
    res.status(201).json({ success: true, data: nuevaMateria }); 
});

// PUT - Actualizar una materia (Requisito para el CRUD completo) 
router.put('/materias:id', (req, res) => {
    const materia = materias.find(m => m.id === parseInt(req.params.id));
    
    if (!materia) {
        return res.status(404).json({ success: false, message: 'Materia no encontrada' });
    }

    const { nombre, descripcion, activa } = req.body;
    
    if (nombre) materia.nombre = nombre;
    if (descripcion) materia.descripcion = descripcion;
    if (activa !== undefined) materia.activa = activa;

    res.json({ success: true, data: materia });
});

// DELETE - Eliminar una materia 
router.delete('/materias:id', (req, res) => {
    const index = materias.findIndex(m => m.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Materia no encontrada' });
    }

    const eliminada = materias.splice(index, 1);
    res.json({ success: true, message: 'Materia eliminada correctamente', data: eliminada });
});

module.exports = router;