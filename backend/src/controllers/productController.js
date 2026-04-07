const prisma = require('../prismaClient');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: { category: true }
        });
        const mappedProducts = products.map(product => ({
            ...product,
            category: product.category ? product.category.name : 'Uncategorized'
        }));
        res.json(mappedProducts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.findUnique({ 
            where: { id: parseInt(id) },
            include: { category: true } 
        });
        if (product) {
            res.json({
                ...product,
                category: product.category ? product.category.name : 'Uncategorized'
            });
        }
        else res.status(404).json({ error: 'Product not found' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};
