const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Registrar nuevo admin
router.post('/registrar', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existe = await Admin.findOne({ email });
    if (existe) return res.status(400).json({ message: 'El admin ya existe' });

    const nuevoAdmin = new Admin({ email, password });
    await nuevoAdmin.save();

    res.status(201).json({ message: 'Administrador creado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Login de admin
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin no encontrado' });

    const esCorrecta = await bcrypt.compare(password, admin.password);
    if (!esCorrecta) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;