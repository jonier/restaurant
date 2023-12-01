const express = require('express');
const morgan = require('morgan');
const sequelize = require("./database/db");
const bodyParser = require("body-parser");

//Routers
const productRouter = require("./v1/routes/productRoutes");
const userRouter = require("./v1/routes/userRouter");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev')); 
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

sequelize
  .sync()
  .then(result => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    })
  })
  .catch(err => {
    console.log(err);
  });