const { Order, OrderItem, Cart, CartItem, Product, DiscountCode, User } = require('../models');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
    try {
        const { shippingAddress, paymentMethod, discountCode, useReferralCredits } = req.body;

        // 1. Get Cart
        const cart = await Cart.findOne({
            where: { userId: req.user.id },
            include: [{ model: CartItem, include: [Product] }],
        });

        if (!cart || cart.CartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // 2. Calculate Subtotal & Validate Stock
        let subtotal = 0;
        for (const item of cart.CartItems) {
            if (item.Product.stock < item.quantity) {
                return res.status(400).json({ message: `Product ${item.Product.name} is out of stock` });
            }
            subtotal += parseFloat(item.Product.price) * item.quantity;
        }

        // 3. Apply Discount
        let discountAmount = 0;
        if (discountCode) {
            const code = await DiscountCode.findOne({ where: { code: discountCode, isActive: true } });
            if (code) {
                if (new Date() > code.expiryDate) {
                    return res.status(400).json({ message: 'Discount code expired' });
                }
                if (code.usageLimit <= code.usedCount) {
                    return res.status(400).json({ message: 'Discount code usage limit reached' });
                }

                discountAmount = (subtotal * code.discountPercentage) / 100;

                // Update usage
                code.usedCount += 1;
                await code.save();
            } else {
                return res.status(400).json({ message: 'Invalid discount code' });
            }
        }

        // 4. Apply Referral Credits
        let creditsUsed = 0;
        if (useReferralCredits) {
            const user = await User.findByPk(req.user.id);
            if (user.referral_credits > 0) {
                // Max credits we can use is (subtotal - discount)
                const remainingTotal = subtotal - discountAmount;
                if (user.referral_credits >= remainingTotal) {
                    creditsUsed = remainingTotal;
                } else {
                    creditsUsed = user.referral_credits;
                }

                // Deduct credits
                user.referral_credits -= creditsUsed;
                await user.save();
            }
        }

        const finalTotal = subtotal - discountAmount - creditsUsed;

        // 5. Create Order
        const order = await Order.create({
            userId: req.user.id,
            totalAmount: finalTotal >= 0 ? finalTotal : 0,
            shippingAddress,
            paymentMethod,
            status: 'pending',
        });

        // 6. Create Order Items & Update Stock
        for (const item of cart.CartItems) {
            await OrderItem.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.Product.price,
            });

            // Reduce stock
            const product = await Product.findByPk(item.productId);
            product.stock -= item.quantity;
            await product.save();
        }

        // 7. Clear Cart
        await CartItem.destroy({ where: { cartId: cart.id } });

        res.status(201).json({ success: true, data: order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get my orders
// @route   GET /api/orders
// @access  Private
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            include: [{ model: OrderItem, include: [Product] }],
            order: [['createdAt', 'DESC']],
        });

        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [{ model: OrderItem, include: [Product] }],
        });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order.userId !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders/admin
// @access  Private/Admin
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [{ model: User, attributes: ['id', 'name', 'email'] }],
            order: [['createdAt', 'DESC']],
        });
        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
