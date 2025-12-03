const sequelize = require('./src/config/database');
const { Product, Category, User, DiscountCode } = require('./src/models');
const bcrypt = require('bcrypt');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Reset database
        console.log('Database synced');

        // Create Admin User
        const adminSalt = await bcrypt.genSalt(10);
        const adminPassword = await bcrypt.hash('admin123', adminSalt);

        await User.create({
            name: 'Admin User',
            email: 'admin@metazone.com',
            password: adminPassword, // We are bypassing the hook for simplicity in bulk create if we used it, but here we use create. 
            // Actually, the model hook will hash it again if we are not careful. 
            // Wait, the model hook checks if password is changed. 
            // Let's just pass the raw password and let the hook handle it.
            role: 'admin',
            phone: '1234567890'
        });

        // We need to re-create because the hook will hash the already hashed password if we passed the hashed one above without checking.
        // But wait, in the User model:
        // if (user.password) { ... hash ... }
        // So if we pass 'admin123', it will be hashed.

        // Let's correct:
        await User.destroy({ where: { email: 'admin@metazone.com' } }); // Cleanup if exists (though force:true handles it)
        await User.create({
            name: 'Admin User',
            email: 'admin@metazone.com',
            password: 'admin123',
            role: 'admin',
            phone: '1234567890'
        });

        console.log('Admin user created: admin@metazone.com / admin123');

        // Create Categories
        const categories = await Category.bulkCreate([
            { name: 'Men', description: 'Fashion for men' },
            { name: 'Women', description: 'Fashion for women' },
            { name: 'Electronics', description: 'Gadgets and devices' },
            { name: 'Accessories', description: 'Bags, watches, and more' },
        ]);

        console.log('Categories created');

        // Create Products
        await Product.bulkCreate([
            {
                name: 'Classic White T-Shirt',
                description: 'A comfortable and stylish white t-shirt made from 100% cotton.',
                price: 29.99,
                stock: 100,
                imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
                categoryId: categories[0].id, // Men
            },
            {
                name: 'Denim Jacket',
                description: 'Vintage style denim jacket.',
                price: 89.99,
                stock: 50,
                imageUrl: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=500&q=80',
                categoryId: categories[0].id, // Men
            },
            {
                name: 'Summer Floral Dress',
                description: 'Beautiful floral dress for summer days.',
                price: 59.99,
                stock: 75,
                imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80',
                categoryId: categories[1].id, // Women
            },
            {
                name: 'Wireless Noise-Cancelling Headphones',
                description: 'Immersive sound with active noise cancellation.',
                price: 199.99,
                stock: 30,
                imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
                categoryId: categories[2].id, // Electronics
            },
            {
                name: 'Smart Watch Series 5',
                description: 'Track your fitness and stay connected.',
                price: 299.99,
                stock: 40,
                imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
                categoryId: categories[2].id, // Electronics
            },
            {
                name: 'Leather Crossbody Bag',
                description: 'Premium leather bag for everyday use.',
                price: 149.99,
                stock: 20,
                imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80',
                categoryId: categories[3].id, // Accessories
            },
        ]);

        console.log('Products created');

        // Create Discount Code
        await DiscountCode.create({
            code: 'WELCOME20',
            discountPercentage: 20,
            expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            usageLimit: 1000,
        });

        console.log('Discount code created: WELCOME20');

        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedDatabase();
