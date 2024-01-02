const express = require('express');
const morgan = require('morgan');
const sequelize = require("./database/db");
const bodyParser = require("body-parser");

//Models
const Product = require('./models/product');
const User = require('./models/user');
const KindOfProduct = require('./models/kindOfProduct');
const Order = require('./models/order');
const OrderStatus = require('./models/orderStatus');
const OrderDetail = require('./models/orderDetail');

//Routers
const productRouter = require("./v1/routes/productRoutes");
const userRouter = require("./v1/routes/userRouter");
const orderStatusRouter = require("./v1/routes/ordenStatusRouter");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev')); 
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orderStatus", orderStatusRouter);

//Creating relation between tables
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

Product.belongsTo(KindOfProduct, { constraints: true, onDelete: 'CASCADE'});
KindOfProduct.hasMany(Product);

Order.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});
User.hasMany(Order);

Order.belongsTo(OrderStatus, { constraints: true, onDelete: 'CASCADE'});
OrderStatus.hasMany(Order);

OrderDetail.belongsTo(Order, { constraints: true, onDelete: 'CASCADE'});
Order.hasMany(OrderDetail);

OrderDetail.belongsTo(Product, { constraints: true, onDelete: 'CASCADE'});
Product.hasMany(OrderDetail);

sequelize
  .sync() // { force: true }
  .then(result => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    })
  })
  .catch(err => {
    console.log(err);
  });