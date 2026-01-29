const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DATABASE_URL || 'mysql://root:@localhost:3306/metazone',
    {
        dialect: 'mysql',
        logging: false,
    }
);

module.exports = sequelize;
