const { Referral, User } = require('../models');

// @desc    Get my referrals
// @route   GET /api/referrals
// @access  Private
exports.getMyReferrals = async (req, res) => {
    try {
        const referrals = await Referral.findAll({
            where: { referrerId: req.user.id },
            include: [{ model: User, as: 'ReferredUser', attributes: ['name', 'email', 'createdAt'] }],
        });

        res.status(200).json({ success: true, count: referrals.length, data: referrals });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
