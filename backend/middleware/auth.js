const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ msg: 'No token provided' });

  const parts = header.split(' ');
  if (parts.length !== 2) return res.status(401).json({ msg: 'Invalid auth header' });

  const token = parts[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'change_this_secret');
    req.user = decoded; // contains id and username
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
};
