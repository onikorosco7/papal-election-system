const mongoose = require('mongoose');

const votoSchema = new mongoose.Schema({
  votante: { type: mongoose.Schema.Types.ObjectId, ref: 'Votante', required: true },
  candidato: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidato', required: true }
});

module.exports = mongoose.model('Voto', votoSchema);