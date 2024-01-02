const OrderStatus = require("../models/orderStatus");
const { validationResult } = require("express-validator");
const { getErrorFromCoreOrDb } = require("../library/functions");

const getAllOrderStatus = (req, res, next) => {

    OrderStatus.findAll()
    .then(orders => {
        res.status(200).send({ status: 200, data: orders });
    })

}

const getOneOrderStatus = (req, res, next) => {
    const orderStatusId = req.params.orderStatusId;

    res.status(200).send({ status: 200, data: `This is the status ${orderStatusId}`});
}

const createStatus = (req, res, next) => {
    const result = validationResult(req);

    if(!result.isEmpty()){
        return res.send(({error: result}))
    }

    const title = req.body.title;

    try {
        OrderStatus.create({
            title,
            createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
            updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        })
        .then(order => {
            res.status(200).send(
                { 
                    status: '200', 
                    data: order
                })
        })
        .catch(error => {
            //origin = 'CORE' => Possibly some data is missing in the body
            //origin = 'DB'   => The error is caused by the Database when it is validating Primary and unique keys
 
            const message = getErrorFromCoreOrDb(error.errors);

            res.send(
                { 
                    error: true, 
                    data: {
                        origin: error.errors[0].origin, 
                        path: error.errors[0].path, 
                        validatorKey: error.errors[0].validatorKey, 
                        message: message
                    } 
                })
        })
    } catch (error) {
        res.send({ error: true, data: error })
    }
}

const updateOneOrderStatus = (req, res, next) => {
    const orderStatusId = req.params.orderStatusId;
    res.status(200).send({ status: 200, data: `The order status id ${orderStatusId} has been updated`})
}

const deleteOneOrderStatus = (req, res, next) => {
    const orderStatusId = req.params.orderStatusId;
    res.status(200).send({ status: 200, data: `The order status id ${orderStatusId} has been delete`})
}

module.exports = {
    getAllOrderStatus, 
    getOneOrderStatus,
    createStatus,
    updateOneOrderStatus,
    deleteOneOrderStatus
}