const express = require('express');
const Voto = require('../models/Voto');
const Votante = require('../models/Votante');
const Candidato = require('../models/Candidato');
const router = express.Router();

// Registrar voto
router.post('/', async (req, res) => {
  try {
    const { documentoIdentidad, candidatoId } = req.body;

    // Buscar votante
    const votante = await Votante.findOne({ documentoIdentidad });
    if (!votante) return res.status(404).json({ error: 'Votante no encontrado' });

    // Verificar si ya votó
    const yaVoto = await Voto.findOne({ votante: votante._id });
    if (yaVoto) return res.status(400).json({ error: 'Votante ya emitió su voto' });

    // Verificar candidato
    const candidato = await Candidato.findById(candidatoId);
    if (!candidato) return res.status(404).json({ error: 'Candidato no encontrado' });

    // Registrar el voto
    const voto = new Voto({ votante: votante._id, candidato: candidato._id });
    await voto.save();

    // Sumar voto al candidato
    candidato.votos += 1;
    await candidato.save();

    res.status(201).json({ mensaje: 'Voto registrado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar voto' });
  }
});

module.exports = router;