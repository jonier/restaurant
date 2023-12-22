const Sequelize = require('sequelize');
const sequelize = require('../database/db');

const OrderDetail = sequelize.define('orderDetail', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    }
});

module.exports = OrderDetail;