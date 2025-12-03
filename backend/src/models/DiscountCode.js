const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DiscountCode = sequelize.define('DiscountCode', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    discountPercentage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 100,
        },
    },
    expiryDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    usageLimit: {
        type: DataTypes.INTEGER,
        defaultValue: 100, // Max times this code can be used globally
    },
    usedCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
});

module.exports = DiscountCode;
