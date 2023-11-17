const Product = require("../models/product");

const getAllProducts = (req, res) => {
    res.send("<h1>Producto desde Controller</h1>")
}

const postAddProduct = (req, res, next) => {
    // console.log('Ese es el body: ', req.body)
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    Product.create({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description,
        createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    })
    .then(result => {
        res.status(201).send({ status: "OK", data: result });
    })
    .catch(error => {
        console.log("Error: ", error);
    })

}

module.exports = {
    getAllProducts,
    postAddProduct
}