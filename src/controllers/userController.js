const User = require("../models/user");

const getAllUsers = (req, res, next) => {
    User.findAll()
    .then(users => {
        res.status(201).send({ status: "Ok", data: users });
    })
    .catch(error => {
        console.log("Error: ", error);
    })
}

module.exports = {
    getAllUsers
}