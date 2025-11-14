const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Review = sequelize.define('Review', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT },
  rating: { type: DataTypes.INTEGER, validate: { min: 1, max: 5 } }
}, { timestamps: true });

module.exports = Review;
