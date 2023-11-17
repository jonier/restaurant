const express = require('express');
const sequelize = require("./database/db");

const bodyParser = require("body-parser");
const productRouter = require("./v1/routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-
app.use("/api/v1/products", productRouter);

// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// })

sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    })
  })
  .catch(err => {
    console.log(err);
  });

// sequelize
//     .sync()
//     .then(result => {
//         console.log(result);
//         app.listen(PORT, () => {
//             console.log(`Server listening on port ${PORT}`);
//         })
//     })
//     .catch(error => {
//         console.log('Error: ', error);
//     })



