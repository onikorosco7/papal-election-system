const express = require('express');
const Candidato = require('../models/Candidato');
const router = express.Router();

// Obtener los 3 candidatos más votados
router.get('/', async (req, res) => {
  try {
    const top3 = await Candidato.find().sort({ votos: -1 }).limit(3);
    res.json(top3);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ganadores' });
  }
});

module.exports = router;