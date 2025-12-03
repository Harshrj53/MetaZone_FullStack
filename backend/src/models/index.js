const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');
const Category = require('./Category');
const Cart = require('./Cart');
const CartItem = require('./CartItem');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const DiscountCode = require('./DiscountCode');
const Referral = require('./Referral');

// User Associations
User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Referral Associations
User.hasMany(Referral, { as: 'ReferralsMade', foreignKey: 'referrerId' });
User.hasOne(Referral, { as: 'ReferralReceived', foreignKey: 'referredUserId' });
Referral.belongsTo(User, { as: 'Referrer', foreignKey: 'referrerId' });
Referral.belongsTo(User, { as: 'ReferredUser', foreignKey: 'referredUserId' });

// Product & Category
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

// Cart & CartItem
Cart.hasMany(CartItem, { foreignKey: 'cartId' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

// Order & OrderItem
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
    sequelize,
    User,
    Product,
    Category,
    Cart,
    CartItem,
    Order,
    OrderItem,
    DiscountCode,
    Referral
};
