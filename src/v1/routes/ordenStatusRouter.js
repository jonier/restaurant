const express = require('express');

const orderStatusController = require('../../controllers/orderStatusController');
const { check } = require('express-validator');

const router = express.Router();

router.get('/', orderStatusController.getAllOrderStatus);
router.get('/:orderStatusId', orderStatusController.getOneOrderStatus);
router.post('/', [
    check("title").notEmpty().withMessage("The string can't be empty."),
    check("title").isLength({min: 5}).withMessage("The string can be less than 5 characters")
], orderStatusController.createStatus);
router.patch('/:orderStatusId', orderStatusController.updateOneOrderStatus);
router.delete('/:orderStatusId', orderStatusController.deleteOneOrderStatus);

module.exports = router;