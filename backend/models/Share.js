const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Share = sequelize.define('Share', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
}, { timestamps: true });

module.exports = Share;
