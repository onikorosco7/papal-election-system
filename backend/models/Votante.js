const mongoose = require('mongoose');

const votanteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  documentoIdentidad: { type: String, required: true, unique: true },
  tipoDocumento: { type: String, required: true }
});

module.exports = mongoose.model('Votante', votanteSchema);