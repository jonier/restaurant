const express = require("express");
const { check } = require("express-validator");
const userController = require("../../controllers/userController");
const checkAuth = require("../../middleware/checkAuth");

const router = express.Router();

//These to routes does not need the Authorization token
router.post("/signup", 
        [
            check("name").notEmpty().withMessage("The string can't be empty"),
            check("name").isLength({min: 5}).withMessage("The string can be less than 5 characters"),
            check("userName").notEmpty().withMessage("The string can't be empty"),
            check("userName").isLength({min: 8}).withMessage(`The string can be less than 8 characters`),
            check("email")
                .normalizeEmail() //jonierm@gmail.com => jonierm@gmail.com
                .isEmail()
                .withMessage('Not a valid e-mail address'),
            check('password').isLength({min: 8}).withMessage(`The string can be less than 8 characters`)
        ],
        userController.createUser
    );
router.post("/login", userController.postLogin);

router.use(checkAuth);

router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getUserByPk);
router.patch("/", userController.postEditUser);
router.delete("/:userId", userController.deleteUserById);

module.exports = router;