const { DiscountCode } = require('../models');

// @desc    Create discount code
// @route   POST /api/discounts
// @access  Private/Admin
exports.createDiscount = async (req, res) => {
    try {
        const { code, discountPercentage, expiryDate, usageLimit } = req.body;
        const discount = await DiscountCode.create({
            code,
            discountPercentage,
            expiryDate,
            usageLimit,
        });
        res.status(201).json({ success: true, data: discount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Validate discount code
// @route   POST /api/discounts/validate
// @access  Private
exports.validateDiscount = async (req, res) => {
    try {
        const { code } = req.body;
        const discount = await DiscountCode.findOne({ where: { code, isActive: true } });

        if (!discount) {
            return res.status(404).json({ message: 'Invalid code' });
        }

        if (new Date() > discount.expiryDate) {
            return res.status(400).json({ message: 'Code expired' });
        }

        if (discount.usageLimit <= discount.usedCount) {
            return res.status(400).json({ message: 'Usage limit reached' });
        }

        res.status(200).json({ success: true, data: discount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
