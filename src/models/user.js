//bcrypt is used to create secure password
const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');
const sequelize = require('../database/db');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    photo: {
      type: Sequelize.STRING,
      allowNull: true
    },
    address: {
        type: Sequelize.STRING
    },
    telephone:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING
    }
},
{
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(user.password, salt);
            }
        },
        beforeUpdate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(user.password, salt);
            }
        }
    },
    instanceMethods: {
        validPassword: (password) => {
            return bcrypt.compareSync(password, this.password);
        }
    }
});

module.exports = User;
