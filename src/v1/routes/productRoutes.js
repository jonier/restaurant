const express = require('express');
const productController = require('../../controllers/productControll');

const router = express.Router();

router
    .get("/", productController.getAllProducts)
    .get("/:productId", productController.getProductByPk)
    .post("/", productController.postAddProduct)
    .patch("/", productController.postEditProduct)
    .delete("/:productId", productController.deleteProductById)

module.exports = router;