const express = require('express');
const Candidato = require('../models/Candidato');
const router = express.Router();

// Registrar nuevo candidato
router.post('/', async (req, res) => {
  try {
    const { nombre, funcionEclesiastica, nacionalidad } = req.body;
    const candidato = new Candidato({ nombre, funcionEclesiastica, nacionalidad });
    await candidato.save();
    res.status(201).json(candidato);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear candidato' });
  }
});

// Listar todos los candidatos
router.get('/', async (req, res) => {
  try {
    const candidatos = await Candidato.find();
    res.json(candidatos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener candidatos' });
  }
});

module.exports = router;