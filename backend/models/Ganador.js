const mongoose = require('mongoose');

const ganadorSchema = new mongoose.Schema({
  candidato: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidato', required: true },
  votos: { type: Number, required: true }
});

module.exports = mongoose.model('Ganador', ganadorSchema);