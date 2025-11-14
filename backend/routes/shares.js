const express = require('express');
const auth = require('../middleware/auth');
const shareCtrl = require('../controllers/shareController');

const router = express.Router();

// GET /api/shares/received
router.get('/received', auth, shareCtrl.received);

module.exports = router;
