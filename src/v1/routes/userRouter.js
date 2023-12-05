const express = require("express");
const { check } = require("express-validator");
const userController = require("../../controllers/userController");

const router = express.Router();

router
    .get("/", userController.getAllUsers)
    .get("/:userId", userController.getUserByPk)
    .patch("/", userController.postEditUser)
    .delete("/:userId", userController.deleteUserById)
    .post("/signup", 
        [
            check("name").notEmpty().withMessage("The string can't be empty"),
            check("name").isLength({min: 5}).withMessage("The string can be less than 5 characters"),
            check("userName").notEmpty().withMessage("The string can't be empty"),
            check("userName").isLength({min: 8}).withMessage(`The string can be less than 8 characters`),
            check("email").isEmail().withMessage('Not a valid e-mail address')
        ],
        userController.postAddUser)
    .post("/login", userController.postLogin)

module.exports = router;