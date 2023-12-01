const express = require("express");
const { query } = require("express-validator");
const userController = require("../../controllers/userController");

const router = express.Router();

router
    .get("/", userController.getAllUsers)
    .get("/:userId", userController.getUserByPk)
    .patch("/", userController.postEditUser)
    .delete("/:userId", userController.deleteUserById)
    .post("/signup", 
        [
            query("name").notEmpty(),
            // check("name").isLength({min: 8}),
            // check("userName").not().isEmpty(),
            // check("userName").isLength({min: 8}),
            // check("email").not().isEmpty()
        ],
        userController.postAddUser)
    .post("/login", userController.postLogin)

module.exports = router;