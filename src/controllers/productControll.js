const Product = require("../models/product");
//const msgFile = require("../share/messages");

const getAllProducts = (req, res, next) => {
    Product.findAll()
    .then(products => {
        //console.log("Este es el archivo: ", msgFile);
        //msgFile.success(req, res, products, 201);
        res.status(201).send({ status: "OK", data: products });
    })
    .catch(error => {
        console.log("Error: ", error);
    })
    
}

const getProductByPk = (req, res, next) => {
    const productId = req.params.productId;
    Product.findByPk(productId)
    .then(product => {
        const { row } = product;
        console.log('Resultado', row);
        res.status(201).send({status: "OK", data: product});
    })
    .catch(error => {
        console.log("Error: ", error);
    })
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
        //msgFile.success(req, res, result, 200)
    })
    .catch(error => {
        console.log("Error: ", error);
    })

}

const postEditProduct = (req, res, next) => {
    const productId = req.body.id;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    Product.findByPk(productId)
    .then(product => {        
        product.title = title;
        product.imageUrl = imageUrl;
        product.price = price;
        product.description = description;
        product.updatedAt = new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        product.save()
        return product;
    })
    .then(product => {
        console.log('Super resultado: ', product)
        res.status(201).send({ status: "200", data: product });
    })
    .catch(error => {
        console.log(error)
    })

}

const deleteProductById = (req, res, next) => {
    const productId = req.params.productId;

    Product.findByPk(productId)
    .then(product => {
        return product.destroy();
    })
    .then(result => {
        res.status(201).send({ status: "Product destroyed", data: result });
    })
    .catch(error => {
        console.log(error)
    })
}

module.exports = {
    getAllProducts,
    postAddProduct,
    getProductByPk,
    postEditProduct,
    deleteProductById
}