const Sequelize = require('sequelize');
const sequelize = require('../database/db');

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull:false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    tps: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    tvq: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    subTotal: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    total: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
})

module.exports = Order;