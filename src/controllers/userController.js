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

const getUserByPk = (req, res, next) => {
    const userId = req.params.userId;
    User.findByPk(userId)
    .then(user => {
        const { row } = user;
        res.status(201).send({ status: "Ok", data: row });        
    })
    .catch(error => {
        console.log(error)        
    })
}

const postAddUser = (req, res, next) => {

    const name = req.body.name;
    const userName = req.body.userName;
    const email = req.body.email;

    User.create({
        id: 1,
        name: name,
        userName: userName,
        email: email,
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

const postEditUser = (req, res, next) => {    
    const userId = req.body.id;
    const name = req.body.name;
    const userName = req.body.userName;
    const email = req.body.email;

    User.findByPk(userId)
    .then(user => {
        user.name = name;
        user.userName = userName;
        user.email = email;
        user.updatedAt = new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        user.save();
        return user;
    })
    .then(user => {
        res.status(200).send({status: 200, data: user })
    })
    .catch(error => {
        console.log(error)
    })
}

const deleteUserById = (req, res, next) => {
    const userId = req.params.userId;
    
    User.findByPk(userId)
    .then(user => {
        return user.destroy()
    })
    .then(user => {
        res.status(200).send({ status: 200, data: user })
    })
    .catch(error => {
        console.log(error)
    })
}

module.exports = {
    getAllUsers,
    getUserByPk,
    postAddUser,
    postEditUser,
    deleteUserById
}