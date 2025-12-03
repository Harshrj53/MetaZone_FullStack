const { User, Cart, Referral } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const sendTokenResponse = (user, statusCode, res) => {
    const token = generateToken(user.id);

    const options = {
        expires: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Needed for cross-domain cookies
    };

    res
        .status(statusCode)
        .cookie('jwt', token, options)
        .json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                referral_code: user.referral_code,
                referral_credits: user.referral_credits,
            },
        });
};

// @desc    Register user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
    try {
        const { name, email, password, phone, referralCode } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Handle referral
        let referrer = null;
        if (referralCode) {
            referrer = await User.findOne({ where: { referral_code: referralCode } });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            phone,
            referred_by: referrer ? referrer.referral_code : null,
        });

        // Create a cart for the user
        await Cart.create({ userId: user.id });

        // If referred, credit both users (simple logic: 50 credits each)
        if (referrer) {
            // Update referrer credits
            referrer.referral_credits = parseFloat(referrer.referral_credits) + 50;
            await referrer.save();

            // Update new user credits
            user.referral_credits = 50;
            await user.save();

            // Log referral
            await Referral.create({
                referrerId: referrer.id,
                referredUserId: user.id,
                status: 'completed',
            });
        }

        sendTokenResponse(user, 201, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide an email and password' });
        }

        // Check for user
        const user = await User.findOne({ where: { email } });

        if (!user || !(await user.validPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Logout user / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
    res.cookie('jwt', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });

    res.status(200).json({ success: true, message: 'Logged out successfully' });
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password'] }
    });

    res.status(200).json({
        success: true,
        user,
    });
};
