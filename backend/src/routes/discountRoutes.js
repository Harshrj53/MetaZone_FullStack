const express = require('express');
const { createDiscount, validateDiscount } = require('../controllers/discountController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/validate', protect, validateDiscount);
router.post('/', protect, admin, createDiscount);

module.exports = router;
