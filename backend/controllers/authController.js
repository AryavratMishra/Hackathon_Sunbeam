const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const signToken = (user) => jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'change_this_secret', { expiresIn: '7d' });

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ msg: 'Email already used' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, passwordHash });
    const token = signToken(user);
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = signToken(user);
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.me = async (req, res) => {
  // non-protected: frontend calls /auth/me with token and we return user if valid
  const header = req.headers.authorization;
  if (!header) return res.json({ user: null });
  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'change_this_secret');
    const user = await User.findByPk(decoded.id, { attributes: ['id','username','email'] });
    res.json({ user });
  } catch {
    res.json({ user: null });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id','username','email'] });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
