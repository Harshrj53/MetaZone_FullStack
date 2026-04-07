const prisma = require('../prismaClient');

const adminMiddleware = async (req, res, next) => {
    try {
        // Expected to be placed after authMiddleware so req.user exists
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: 'Admin validation failed' });
    }
};

module.exports = adminMiddleware;
