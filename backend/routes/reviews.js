const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const reviewCtrl = require('../controllers/reviewController');

const router = express.Router();

router.post('/',
  auth,
  [ body('movieId').isInt(), body('title').notEmpty(), body('rating').isInt({ min: 1, max: 5 }) ],
  validate, reviewCtrl.create);

router.get('/mine', auth, reviewCtrl.mine);
router.put('/:id', auth, reviewCtrl.update);
router.delete('/:id', auth, reviewCtrl.remove);

// Match frontend call: POST /api/reviews/:id/share
router.post('/:id/share', auth, reviewCtrl.share);

module.exports = router;
