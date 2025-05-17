const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Acceso denegado: no hay token' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso restringido a administradores' });
    }
    req.admin = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token inválido' });
  }
};