const { Product, Category } = require('../models');
const { Op } = require('sequelize');

// @desc    Get all products with pagination, sorting, and filtering
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, sort = 'createdAt', order = 'DESC', category, search } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = {};
        let categoryInclude = { model: Category, attributes: ['name'] };

        if (category) {
            // Find category by name and filter products by that category
            const foundCategory = await Category.findOne({ where: { name: category } });
            if (foundCategory) {
                whereClause.categoryId = foundCategory.id;
            }
        }

        if (search) {
            whereClause[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } }
            ];
        }

        const { count, rows } = await Product.findAndCountAll({
            where: whereClause,
            include: [categoryInclude],
            order: [[sort, order]],
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        res.status(200).json({
            success: true,
            count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            data: rows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [{ model: Category, attributes: ['name'] }],
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, imageUrl, categoryId } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            stock,
            imageUrl,
            categoryId,
        });

        res.status(201).json({ success: true, data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.update(req.body);
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy();
        res.status(200).json({ success: true, message: 'Product removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Search products
// @route   GET /api/products/search
// @access  Public
exports.searchProducts = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: 'Query parameter is required' });
        }

        const products = await Product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${query}%` } },
                    { description: { [Op.like]: `%${query}%` } },
                ],
            },
            include: [
                {
                    model: Category,
                    where: {
                        name: { [Op.like]: `%${query}%` }
                    },
                    required: false // Left join, so we still get products if category doesn't match but name/desc does
                }
            ]
        });

        // Note: The above OR logic with included model might need adjustment depending on strict requirement.
        // A simpler approach for "Search by category" is usually filtering. 
        // If we want text match on category name to return products, we need to be careful with the query structure.
        // Let's refine: Find products where Name/Desc matches OR Category Name matches.

        // Alternative: Fetch all products matching name/desc, AND fetch all products matching category name, then merge.
        // Or use a complex where clause.

        // Simplified for this implementation:
        // We will search in Product Name and Description.
        // If the user wants to search by category, they usually click a category or filter by it.
        // But the requirement says "Backend full-text search on: Product name, Description, Category".

        const productsByNameOrDesc = await Product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${query}%` } },
                    { description: { [Op.like]: `%${query}%` } }
                ]
            },
            include: [{ model: Category, attributes: ['name'] }]
        });

        // Also find products where category name matches
        const categories = await Category.findAll({
            where: { name: { [Op.like]: `%${query}%` } }
        });
        const categoryIds = categories.map(c => c.id);

        let productsByCategory = [];
        if (categoryIds.length > 0) {
            productsByCategory = await Product.findAll({
                where: { categoryId: { [Op.in]: categoryIds } },
                include: [{ model: Category, attributes: ['name'] }]
            });
        }

        // Merge and deduplicate
        const allProducts = [...productsByNameOrDesc];
        productsByCategory.forEach(p => {
            if (!allProducts.find(existing => existing.id === p.id)) {
                allProducts.push(p);
            }
        });

        res.status(200).json({ success: true, count: allProducts.length, data: allProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
