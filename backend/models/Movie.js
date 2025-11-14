const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Movie = sequelize.define('Movie', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  year: { type: DataTypes.INTEGER }
}, { timestamps: true });

module.exports = Movie;
