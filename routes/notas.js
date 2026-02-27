const express = require('express');
const router = express.Router();

// Datos de ejemplo basados en la guía: id, estudianteId, materia, nota, fecha 
let notas = [
    { id: 1, estudianteId: 1, materia: 'Matemáticas', valor: 4.5, fecha: '2024-03-20' },
    { id: 2, estudianteId: 2, materia: 'Programación', valor: 3.8, fecha: '2024-03-21' }
];

// GET - Obtener todas las notas (con filtro por query params) 
router.get('/notas', (req, res) => {
    const filtros = req.query;
    
    const data = notas.filter(n =>
        Object.entries(filtros).every(([k, v]) =>
            n[k]?.toString().toLowerCase().includes(v.toLowerCase())
        )
    );

    res.json({ success: true, total: data.length, data });
});

// GET - Obtener una nota por ID
router.get('/notas:id', (req, res) => {
    const nota = notas.find(n => n.id === parseInt(req.params.id));
    if (!nota) return res.status(404).json({ success: false, message: 'Nota no encontrada' });
    res.json({ success: true, data: nota });
});

// POST - Crear una nota (Leemos el header 'idioma' como pide la guía) 
router.post('/notas', (req, res) => {
    const idioma = req.headers['accept-language']; // Ejemplo de lectura de header 
    const { estudianteId, materia, valor, fecha } = req.body;

    if (!estudianteId || !materia || !valor) {
        return res.status(400).json({ 
            success: false, 
            message: idioma === 'en' ? 'Missing data' : 'Faltan datos obligatorios' 
        });
    }

    const nuevaNota = {
        id: notas.length + 1,
        estudianteId,
        materia,
        valor,
        fecha: fecha || new Date().toISOString().split('T')[0]
    };

    notas.push(nuevaNota);
    res.status(201).json({ success: true, data: nuevaNota });
});

// PUT - Actualizar nota
router.put('/notas:id', (req, res) => {
    const nota = notas.find(n => n.id === parseInt(req.params.id));
    if (!nota) return res.status(404).json({ success: false, message: 'Nota no encontrada' });

    const { valor, materia } = req.body;
    if (valor) nota.valor = valor;
    if (materia) nota.materia = materia;

    res.json({ success: true, data: nota });
});

// DELETE - Eliminar nota
router.delete('/notas:id', (req, res) => {
    const index = notas.findIndex(n => n.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ success: false, message: 'No encontrado' });

    const eliminada = notas.splice(index, 1);
    res.json({ success: true, message: 'Nota eliminada', data: eliminada });
});

module.exports = router;