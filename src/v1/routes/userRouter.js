const express = require("express");
const userController = require("../../controllers/userController");

const router = express.Router();

router
    .get("/", userController.getAllUsers)
    .get("/:userId", userController.getUserByPk)
    .post("/", userController.postAddUser)
    .patch("/", userController.postEditUser)
    .delete("/:userId", userController.deleteUserById)

module.exports = router;