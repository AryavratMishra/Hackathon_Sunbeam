const express = require('express');
const movieCtrl = require('../controllers/movieController');

const router = express.Router();

router.get('/', movieCtrl.list);
router.get('/:id', movieCtrl.get);
router.get('/:id/reviews', movieCtrl.reviewsForMovie);

module.exports = router;
