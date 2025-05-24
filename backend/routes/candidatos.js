const express = require('express');
const router = express.Router();
const Candidato = require('../models/Candidato');
const jwt = require('jsonwebtoken');

// Middleware para verificar token JWT
function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token requerido' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

// Crear nuevo candidato (protegido)
router.post('/', verificarToken, async (req, res) => {
  try {
    const { nombre, funcionEclesiastica, nacionalidad } = req.body;
    const candidato = new Candidato({ nombre, funcionEclesiastica, nacionalidad });
    await candidato.save();
    res.status(201).json(candidato);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear candidato' });
  }
});

// Obtener todos los candidatos
router.get('/', async (req, res) => {
  try {
    const candidatos = await Candidato.find();
    res.json(candidatos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener candidatos' });
  }
});

// Actualizar candidato (protegido)
router.put('/:id', verificarToken, async (req, res) => {
  try {
    const { nombre, funcionEclesiastica, nacionalidad } = req.body;
    const candidatoActualizado = await Candidato.findByIdAndUpdate(
      req.params.id,
      { nombre, funcionEclesiastica, nacionalidad },
      { new: true }
    );
    if (!candidatoActualizado) {
      return res.status(404).json({ error: 'Candidato no encontrado' });
    }
    res.json(candidatoActualizado);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar candidato' });
  }
});

// Eliminar candidato (protegido)
router.delete('/:id', verificarToken, async (req, res) => {
  try {
    const candidatoEliminado = await Candidato.findByIdAndDelete(req.params.id);
    if (!candidatoEliminado) {
      return res.status(404).json({ error: 'Candidato no encontrado' });
    }
    res.json({ mensaje: 'Candidato eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar candidato' });
  }
});

module.exports = router;