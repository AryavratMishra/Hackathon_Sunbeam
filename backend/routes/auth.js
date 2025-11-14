const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const authCtrl = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/register',
  [ body('username').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 }) ],
  validate, authCtrl.register);

router.post('/login',
  [ body('email').isEmail(), body('password').notEmpty() ],
  validate, authCtrl.login);

router.get('/me', authCtrl.me);
router.get('/users', authCtrl.listUsers);

router.put(
  '/update',
  authMiddleware,
  [
    body('username').optional().notEmpty(),
    body('email').optional().isEmail(),
    body('password').optional().isLength({ min: 6 })
  ],
  validate,
  authCtrl.updateProfile
);



router.put(
  '/change-password',
  authMiddleware,
  [
    body('oldPassword').notEmpty(),
    body('newPassword').isLength({ min: 6 }),
    body('confirmPassword').notEmpty()
  ],
  validate,
  authCtrl.changePassword
);
module.exports = router;
