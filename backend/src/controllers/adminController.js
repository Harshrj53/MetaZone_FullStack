const prisma = require('../prismaClient');

// --- Users ---
exports.getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, name: true, email: true, role: true, isBlocked: true, createdAt: true }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

exports.blockUser = async (req, res) => {
    try {
        const user = await prisma.user.update({
            where: { id: parseInt(req.params.id) },
            data: { isBlocked: true },
            select: { id: true, name: true, isBlocked: true }
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to block user' });
    }
};

exports.unblockUser = async (req, res) => {
    try {
        const user = await prisma.user.update({
            where: { id: parseInt(req.params.id) },
            data: { isBlocked: false },
            select: { id: true, name: true, isBlocked: true }
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to unblock user' });
    }
};

// --- Products ---
exports.createProduct = async (req, res) => {
    const { name, description, price, stock, imageUrl, categoryId } = req.body;
    try {
        const product = await prisma.product.create({
            data: {
                name, description, price: parseFloat(price), stock: parseInt(stock), imageUrl, categoryId: parseInt(categoryId)
            }
        });
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create product' });
    }
};

exports.updateProduct = async (req, res) => {
    const { name, description, price, stock, imageUrl, categoryId } = req.body;
    try {
        const product = await prisma.product.update({
            where: { id: parseInt(req.params.id) },
            data: {
                name, description, price: parseFloat(price), stock: parseInt(stock), imageUrl, categoryId: parseInt(categoryId)
            }
        });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await prisma.product.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};

// --- Categories ---
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

exports.createCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const category = await prisma.category.create({ data: { name, description } });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create category' });
    }
};

exports.updateCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const category = await prisma.category.update({
            where: { id: parseInt(req.params.id) },
            data: { name, description }
        });
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update category' });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await prisma.category.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
};

// --- Orders ---
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: { select: { id: true, name: true, email: true } },
                items: { include: { product: { select: { name: true } } } }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

exports.updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    try {
        const order = await prisma.order.update({
            where: { id: parseInt(req.params.id) },
            data: { status }
        });
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order status' });
    }
};

// --- Dashboard Stats ---
exports.getDashboardStats = async (req, res) => {
    try {
        const [usersCount, productsCount, ordersCount, categoriesCount, revenueResult, blockedUsersCount] = await Promise.all([
            prisma.user.count(),
            prisma.product.count(),
            prisma.order.count(),
            prisma.category.count(),
            prisma.order.aggregate({ _sum: { total: true } }),
            prisma.user.count({ where: { isBlocked: true } })
        ]);

        res.json({
            totalUsers: usersCount,
            totalProducts: productsCount,
            totalCategories: categoriesCount,
            totalOrders: ordersCount,
            revenue: revenueResult._sum.total || 0,
            blockedUsers: blockedUsersCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
};
