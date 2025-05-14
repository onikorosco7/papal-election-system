const mongoose = require('mongoose');

const candidatoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  funcionEclesiastica: { type: String, required: true }, 
  nacionalidad: { type: String, required: true },
  votos: { type: Number, default: 0 }
});

module.exports = mongoose.model('Candidato', candidatoSchema);