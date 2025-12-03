const express = require('express');
const {
    createOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
} = require('../controllers/orderController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
    .post(createOrder)
    .get(getMyOrders);

router.get('/admin', admin, getAllOrders);
router.get('/:id', getOrderById);

module.exports = router;
