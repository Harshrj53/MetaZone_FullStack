const express = require('express');
const { getMyReferrals } = require('../controllers/referralController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', protect, getMyReferrals);

module.exports = router;
