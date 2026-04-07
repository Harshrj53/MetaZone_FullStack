const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.sendStatus(403);
        
        try {
            const user = await prisma.user.findUnique({ where: { id: decoded.id } });
            if (!user || user.isBlocked) {
                return res.status(403).json({ error: 'User is blocked or deleted' });
            }
            req.user = user;
            next();
        } catch (error) {
            return res.sendStatus(500);
        }
    });
};

module.exports = authenticateToken;
