const bcrypt = require('bcrypt');

var userSchema = sequelize.define("users", {
        userId: {
            field: 'user_id',
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        password: {
            field: 'user_password',
            type: Sequelize.STRING,
            allowNull: true
        },
        name: {
            type: Sequelize.STRING,
            field: 'user_name',
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            field: 'user_email',
            allowNull: false
        },
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
