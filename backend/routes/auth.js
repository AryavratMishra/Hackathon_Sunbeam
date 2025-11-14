const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const authCtrl = require('../controllers/authController');

const router = express.Router();

router.post('/register',
  [ body('username').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 }) ],
  validate, authCtrl.register);

router.post('/login',
  [ body('email').isEmail(), body('password').notEmpty() ],
  validate, authCtrl.login);

router.get('/me', authCtrl.me);
router.get('/users', authCtrl.listUsers);

module.exports = router;
