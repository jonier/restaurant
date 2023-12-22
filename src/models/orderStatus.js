const Sequelize = require('sequelize');
const sequelize = require('../database/db');

const OrderStatus = sequelize.define('orderStatus', {
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

module.exports = OrderStatus;