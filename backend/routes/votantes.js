// routes/votantes.js
const express = require('express');
const Votante = require('../models/Votante');
const router = express.Router();

// Registrar votante
router.post('/', async (req, res) => {
  try {
    const { nombre, documentoIdentidad, tipoDocumento } = req.body;
    
    // Verificar si ya existe un votante con ese documentoIdentidad
    const existingVotante = await Votante.findOne({ documentoIdentidad });
    if (existingVotante) {
      return res.status(400).json({ error: 'Votante ya registrado' });
    }

    // Crear un nuevo votante con tipo de documento
    const nuevo = new Votante({ nombre, documentoIdentidad, tipoDocumento });
    await nuevo.save();
    
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar el votante' });
  }
});

// Obtener todos los votantes
router.get('/', async (req, res) => {
  try {
    const votantes = await Votante.find(); 
    res.status(200).json(votantes);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los votantes' });
  }
});

module.exports = router;