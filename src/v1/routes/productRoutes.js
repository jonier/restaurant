const express = require('express');
const productController = require('../../controllers/productControll');

const router = express.Router();

router
    .get("/", productController.getAllProducts)
    .post("/", productController.postAddProduct)

module.exports = router;