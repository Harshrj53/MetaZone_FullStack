const { Cart, CartItem, Product, DiscountCode } = require('../models');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({
            where: { userId: req.user.id },
            include: [
                {
                    model: CartItem,
                    include: [
                        {
                            model: Product,
                            attributes: ['id', 'name', 'price', 'imageUrl', 'stock'],
                        },
                    ],
                },
            ],
        });

        if (!cart) {
            cart = await Cart.create({ userId: req.user.id });
        }

        // Calculate totals
        let subtotal = 0;
        const items = cart.CartItems.map((item) => {
            const total = parseFloat(item.Product.price) * item.quantity;
            subtotal += total;
            return {
                ...item.toJSON(),
                total,
            };
        });

        res.status(200).json({
            success: true,
            data: {
                id: cart.id,
                items,
                subtotal,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({ where: { userId: req.user.id } });
        if (!cart) {
            cart = await Cart.create({ userId: req.user.id });
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Not enough stock' });
        }

        // Check if item already in cart
        let cartItem = await CartItem.findOne({
            where: {
                cartId: cart.id,
                productId,
            },
        });

        if (cartItem) {
            cartItem.quantity += parseInt(quantity);
            await cartItem.save();
        } else {
            cartItem = await CartItem.create({
                cartId: cart.id,
                productId,
                quantity,
            });
        }

        res.status(200).json({ success: true, message: 'Item added to cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:itemId
// @access  Private
exports.updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const cartItem = await CartItem.findByPk(req.params.itemId);

        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Verify ownership (indirectly via Cart)
        const cart = await Cart.findByPk(cartItem.cartId);
        if (cart.userId !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        if (quantity < 1) {
            await cartItem.destroy();
        } else {
            cartItem.quantity = quantity;
            await cartItem.save();
        }

        res.status(200).json({ success: true, message: 'Cart updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
exports.removeFromCart = async (req, res) => {
    try {
        const cartItem = await CartItem.findByPk(req.params.itemId);

        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const cart = await Cart.findByPk(cartItem.cartId);
        if (cart.userId !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await cartItem.destroy();
        res.status(200).json({ success: true, message: 'Item removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
