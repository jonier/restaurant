const { Sequelize } = require('sequelize');
const sequelize = require('../database/db');

const KindOfProduct = sequelize.define('kindOfProduct', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = KindOfProduct;
