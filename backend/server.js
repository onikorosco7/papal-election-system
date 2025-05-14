const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Importar rutas
const candidatoRoutes = require('./routes/candidatos');
const votanteRoutes = require('./routes/votantes');
const votoRoutes = require('./routes/votos');
const ganadorRoutes = require('./routes/ganadores');

// Inicialización
dotenv.config();
const app = express();
const PORT = process.env.PORT || 9000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/candidatos', candidatoRoutes);
app.use('/api/votantes', votanteRoutes);
app.use('/api/votos', votoRoutes);
app.use('/api/ganadores', ganadorRoutes);

// Conexión a MongoDB y servidor
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ Error al conectar MongoDB:', err));