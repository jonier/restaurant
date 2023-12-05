const User = require("../models/user");

const { getErrorFromCoreOrDb } = require("../library/functions");
const { validationResult } = require("express-validator");

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

    const result = validationResult(req);
    console.log('Vea pues: ', result)
    if (!result.isEmpty()) {
        return res.send({error: result});
    }

    const name = req.body.name;
    const userName = req.body.userName;
    const email = req.body.email;

    try {
        User.create({
            name, //name: name,
            userName,
            email,
            createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
            updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        })
        .then(result => {
            res.status(201).send({ status: "OK", data: result });
            //msgFile.success(req, res, result, 200)
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

const postEditUser = (req, res, next) => {    
 
    try {
        const { userId, name, userName, email } = req.body;

        console.log('Esta es una validacion', name)

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
            res.status(404).send({status: 404, data: "The user does not exist!" })
        })      
          
    } catch (error) {
        console.log('Otro Error: ', error)
    }
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

const postLogin = (req, res, next) => {
    const email = req.body.email;

    if(!email){
        res.status(400).send({ status: 400, data: "The email is missing in the api body" })
    }else{
        User.findAll({
            where: {
                email: email
            }
        })
        .then(user => {
            res.status(200).send({ status: 200, data: user })
        })
        .catch(error => {
            res.status(400).send({ status: 400, data: error })
        })
    }

}

module.exports = {
    getAllUsers,
    getUserByPk,
    postAddUser,
    postEditUser,
    deleteUserById,
    postLogin
}