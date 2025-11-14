const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const reviewCtrl = require('../controllers/reviewController');
const { Review, Movie, User } = require('../models');

const router = express.Router();

router.post('/',
  auth,
  [ body('movieId').isInt(), body('title').notEmpty(), body('rating').isInt({ min: 1, max: 5 }) ],
  validate, reviewCtrl.create);
// GET ALL REVIEWS (public)
router.get('/all', async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        { model: User, attributes: ['username', 'email'] },
        { model: Movie }
      ],
      order: [['updatedAt', 'DESC']]
    });

    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get('/mine', auth, reviewCtrl.mine);
router.put('/:id', auth, reviewCtrl.update);
router.delete('/:id', auth, reviewCtrl.remove);

// Match frontend call: POST /api/reviews/:id/share
router.post('/:id/share', auth, reviewCtrl.share);

module.exports = router;
