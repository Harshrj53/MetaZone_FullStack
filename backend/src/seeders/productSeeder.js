const sequelize = require('../config/database');
const Category = require('../models/Category');
const Product = require('../models/Product');

const sampleProducts = [
    // Men's Category
    {
        name: "Classic Denim Jacket",
        description: "Timeless denim jacket with a modern fit. Features button closure, chest pockets, and durable cotton construction. Perfect for layering in any season.",
        price: 89.99,
        stock: 45,
        category: "Men",
        imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
        featured: true
    },
    {
        name: "Premium Leather Wallet",
        description: "Handcrafted genuine leather wallet with RFID protection. Multiple card slots, bill compartment, and sleek minimalist design.",
        price: 49.99,
        stock: 120,
        category: "Men",
        imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80",
        featured: false
    },
    {
        name: "Sport Performance Sneakers",
        description: "Lightweight athletic sneakers with breathable mesh upper and cushioned sole. Ideal for running, gym, or casual wear.",
        price: 79.99,
        stock: 60,
        category: "Men",
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
        featured: true
    },
    {
        name: "Casual Button-Down Shirt",
        description: "100% cotton button-down shirt in classic fit. Versatile design perfect for office or weekend wear.",
        price: 45.99,
        stock: 85,
        category: "Men",
        imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80",
        featured: false
    },
    {
        name: "Winter Wool Coat",
        description: "Elegant wool blend coat with internal pockets. Sophisticated design keeps you warm and stylish.",
        price: 199.99,
        stock: 25,
        category: "Men",
        imageUrl: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&q=80",
        featured: true
    },

    // Women's Category
    {
        name: "Floral Summer Dress",
        description: "Beautiful floral print dress with flowing silhouette. Lightweight fabric perfect for warm weather occasions.",
        price: 69.99,
        stock: 55,
        category: "Women",
        imageUrl: "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=500&q=80",
        featured: true
    },
    {
        name: "Designer Handbag",
        description: "Stylish vegan leather handbag with adjustable strap. Multiple compartments for organized storage.",
        price: 129.99,
        stock: 40,
        category: "Women",
        imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80",
        featured: true
    },
    {
        name: "Elegant Heels",
        description: "Classic pointed-toe heels with 3-inch heel. Comfortable insole and timeless design for any formal occasion.",
        price: 95.99,
        stock: 50,
        category: "Women",
        imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80",
        featured: false
    },
    {
        name: "Silk Scarf Collection",
        description: "Luxurious silk scarf with artistic print. Can be worn multiple ways - as necktie, headband, or bag accessory.",
        price: 39.99,
        stock: 100,
        category: "Women",
        imageUrl: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&q=80",
        featured: false
    },
    {
        name: "Yoga Leggings",
        description: "High-waisted moisture-wicking leggings with four-way stretch. Perfect for yoga, gym, or athleisure.",
        price: 54.99,
        stock: 75,
        category: "Women",
        imageUrl: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&q=80",
        featured: false
    },
    {
        name: "Cashmere Sweater",
        description: "Ultra-soft 100% cashmere sweater in classic crew neck. Luxurious warmth without the bulk.",
        price: 159.99,
        stock: 30,
        category: "Women",
        imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&q=80",
        featured: true
    },

    // Electronics
    {
        name: "Wireless Noise-Cancelling Headphones",
        description: "Premium over-ear headphones with active noise cancellation and 30-hour battery life. Superior sound quality with deep bass.",
        price: 249.99,
        stock: 35,
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
        featured: true
    },
    {
        name: "Smart Fitness Watch",
        description: "Advanced fitness tracker with heart rate monitoring, GPS, and sleep tracking. Water-resistant up to 50m.",
        price: 199.99,
        stock: 50,
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
        featured: true
    },
    {
        name: "Portable Bluetooth Speaker",
        description: "Compact wireless speaker with 360-degree sound. 12-hour battery and IPX7 waterproof rating.",
        price: 79.99,
        stock: 65,
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
        featured: false
    },
    {
        name: "Wireless Charging Pad",
        description: "Fast wireless charger compatible with all Qi-enabled devices. Sleek design with LED indicator.",
        price: 34.99,
        stock: 95,
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1591290619762-d61eca53e65a?w=500&q=80",
        featured: false
    },
    {
        name: "4K Action Camera",
        description: "Compact 4K action camera with image stabilization. Waterproof housing included for underwater adventures.",
        price: 299.99,
        stock: 28,
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80",
        featured: true
    },

    // Accessories
    {
        name: "Aviator Sunglasses",
        description: "Classic aviator sunglasses with polarized lenses and UV400 protection. Metal frame with spring hinges.",
        price: 69.99,
        stock: 80,
        category: "Accessories",
        imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80",
        featured: false
    },
    {
        name: "Leather Belt",
        description: "Genuine leather belt with reversible design (black/brown). Polished buckle and premium stitching.",
        price: 42.99,
        stock: 70,
        category: "Accessories",
        imageUrl: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=500&q=80",
        featured: false
    },
    {
        name: "Minimalist Backpack",
        description: "Sleek laptop backpack with water-resistant exterior. Padded compartment fits up to 15-inch laptop.",
        price: 89.99,
        stock: 45,
        category: "Accessories",
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
        featured: true
    },
    {
        name: "Stainless Steel Watch",
        description: "Classic analog watch with stainless steel band. Water-resistant with Japanese quartz movement.",
        price: 149.99,
        stock: 40,
        category: "Accessories",
        imageUrl: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&q=80",
        featured: false
    },
    {
        name: "Winter Beanie",
        description: "Warm knitted beanie in multiple colors. Soft acrylic blend with fold-over design.",
        price: 24.99,
        stock: 150,
        category: "Accessories",
        imageUrl: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500&q=80",
        featured: false
    }
];

async function seedProducts() {
    try {
        console.log('🌱 Starting product seeding...');

        // Clear existing products
        await Product.destroy({ where: {} });
        console.log('✅ Cleared existing products');

        // Get all categories
        const categories = await Category.findAll();
        const categoryMap = {};
        categories.forEach(cat => {
            categoryMap[cat.name] = cat.id;
        });

        // Insert products with proper category IDs
        const productsToCreate = sampleProducts.map(product => ({
            ...product,
            categoryId: categoryMap[product.category]
        }));

        await Product.bulkCreate(productsToCreate);

        console.log(`✅ Successfully seeded ${sampleProducts.length} products!`);
        console.log('📊 Product breakdown:');
        console.log(`   - Men: ${sampleProducts.filter(p => p.category === 'Men').length}`);
        console.log(`   - Women: ${sampleProducts.filter(p => p.category === 'Women').length}`);
        console.log(`   - Electronics: ${sampleProducts.filter(p => p.category === 'Electronics').length}`);
        console.log(`   - Accessories: ${sampleProducts.filter(p => p.category === 'Accessories').length}`);
        console.log(`   - Featured: ${sampleProducts.filter(p => p.featured).length}`);

    } catch (error) {
        console.error('❌ Error seeding products:', error);
        throw error;
    }
}

module.exports = seedProducts;
