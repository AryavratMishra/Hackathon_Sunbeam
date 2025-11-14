const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'movie_reviews',
  process.env.DB_USER || 'D1_93144_Aryavrat',
  process.env.DB_PASS || 'manager',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      // recommended for newer mysql2
    },
  }
);

module.exports = sequelize;
