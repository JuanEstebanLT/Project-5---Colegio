const express = require('express');
const router = express.Router();

let notas = [
    { id: 1, estudianteId: 1, profesorid: 1, materia: 'Matemáticas', valor: 4.5 },
    { id: 2, estudianteId: 2, profesorid: 2, materia: 'Programación', valor: 3.8 }
];

// GET: todas las notas
router.get('/notas', (req, res) => {
    const apiKey = req.headers['password'];

    if (!apiKey) {
        return res.status(401).json({
            success: false,
            message: 'API key es requerida'
        });
    }

    if (apiKey !== '12345') {
        return res.status(403).json({
            success: false,
            message: 'Error la password no es correcta'
        });
    }

    const { estudianteId, materia, valor } = req.query;

    let filteredNotas = notas.filter(n => {
        return ((!estudianteId || n.estudianteId === parseInt(estudianteId))) &&
               (!materia || n.materia.toLowerCase().includes(materia.toLowerCase())) &&
               (!valor || n.valor === parseFloat(valor));
    });

    res.json({ success: true, Headers: { apiKey }, data: filteredNotas });
});

// GET: obtener nota por ID
router.get('/notas/:id', (req, res) => {
    const apiKey = req.headers['password'];

    if (!apiKey) {
        return res.status(401).json({
            success: false,
            message: 'API key es requerida'
        });
    }

    if (apiKey !== '12345') {
        return res.status(403).json({
            success: false,
            message: 'Error la password no es correcta'
        });
    }

    const nota = notas.find(n => n.id === parseInt(req.params.id));

    if (!nota) {
        return res.status(404).json({
            success: false,
            message: 'Nota no encontrada'
        });
    }

    res.json({ success: true, Headers: { apiKey }, data: nota });
});

// POST: agregar nota
router.post('/notas', (req, res) => {
    const apiKey = req.headers['password'];
    const role = req.headers['x-user-role'];

    if (!apiKey) {
        return res.status(401).json({
            success: false,
            message: 'API key es requerida'
        });
    }

    if (apiKey !== '6789') {
        return res.status(403).json({
            success: false,
            message: 'Error la password no es correcta'
        });
    }

    if (role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'No tienes permisos para realizar esta acción'
        });
    }

    const { estudianteId, profesorid, materia, valor } = req.body;

    if (!estudianteId || !profesorid || !materia || !valor) {
        return res.status(400).json({
            success: false,
            message: 'Faltan datos requeridos'
        });
    }

    const nuevaNota = {
        id: notas.length + 1,
        estudianteId,
        profesorid,
        materia,
        valor
    };

    notas.push(nuevaNota);

    res.status(201).json({ success: true, Headers: { apiKey, role }, data: nuevaNota });
});

// PUT: actualizar nota
router.put('/notas/:id', (req, res) => {
    const apiKey = req.headers['password'];
    const role = req.headers['x-user-role'];

    if (!apiKey) {
        return res.status(401).json({
            success: false,
            message: 'API key es requerida'
        });
    }

    if (apiKey !== '6789') {
        return res.status(403).json({
            success: false,
            message: 'Error la password no es correcta'
        });
    }

    if (role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'No tienes permisos para realizar esta acción'
        });
    }

    const id = parseInt(req.params.id);
    const nota = notas.find(n => n.id === id);

    if (!nota) {
        return res.status(404).json({
            success: false,
            message: 'Nota no encontrada'
        });
    }

    const { estudianteId, profesorid, materia, valor } = req.body;

    nota.estudianteId = estudianteId;
    nota.profesorid = profesorid;
    nota.materia = materia;
    nota.valor = valor;

    res.json({ success: true, Headers: { apiKey, role }, data: nota });
});

// DELETE: eliminar nota
router.delete('/notas/:id', (req, res) => {
    const apiKey = req.headers['password'];
    const role = req.headers['x-user-role'];

    if (!apiKey) {
        return res.status(401).json({
            success: false,
            message: 'API key es requerida'
        });
    }

    if (apiKey !== '6789') {
        return res.status(403).json({
            success: false,
            message: 'Error la password no es correcta'
        });
    }

    if (role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'No tienes permisos para realizar esta acción'
        });
    }

    const notaIndex = notas.findIndex(n => n.id === parseInt(req.params.id));

    if (notaIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Nota no encontrada'
        });
    }

    notas.splice(notaIndex, 1);

    res.status(201).json({
        success: true,
        Headers: { apiKey, role },
        data: "La nota se ha eliminado"
    });
});

module.exports = router;