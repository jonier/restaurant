const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const { getErrorFromCoreOrDb } = require("../library/functions");
const { validationResult } = require("express-validator");
const getCoordsForAddress = require("../library/location");

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

const postAddUser = async(req, res, next) => {

    const result = validationResult(req);
   
    if (!result.isEmpty()) {
        return res.send({error: result});
    }

    let coor = ''
    if(req.body.address){
        coor = await getCoordsForAddress(req.body.address);
    }
    
    const name = req.body.name;
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;

    try {
        User.create({
            name, //name: name,
            userName,
            email,
            password,
            address: JSON.stringify(coor),
            createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
            updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        })
        .then(user => {
            let token;
            try {
                token = jwt.sign(
                    {userId: user.id, email: user.email},
                    'portfolio21',
                    { expiresIn: '1h' }
                )
            } catch (error) {
                res.status(400).send({data: error})
            }

            res.status(200).send(
                { 
                    status: '200', 
                    data: {
                        id: user.id,
                        name: user.name,
                        userName: user.userName,
                        address: user.address,
                        email: user.email,
                        token 
                    }, 
                })
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

const postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    
    let resUser = await User.findAll({ where: { email: email } });

    if(resUser.length === 1){
        const user = resUser[0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(isValidPassword){

            let token;
            try {
                token = jwt.sign(
                    {userId: user.id, email: user.email},
                    'portfolio21',
                    { expiresIn: '1h' }
                )
            } catch (error) {
                res.status(400).send({data: error})
            }

            res.status(200).send(
                { 
                    status: '200', 
                    data: {
                        id: user.id,
                        name: user.name,
                        userName: user.userName,
                        address: user.address,
                        email: user.email,
                        token 
                    }, 
                })
        }else{
            res.send({ status: 'No valid password' })
        }
        console.log('Vea pues: ', isValidPassword)
    }else{
        res.send({ status: 'The user does not exist'})
    }

    

//     User.findAll({
//         where: {
//           email: email
//         }
//       })
//     .then(user => {
//         if(user.length === 1){

//             const isValidPassword = await bcrypt.compare(password, user.password);

//             res.send({ status: 'Ok', data: user })
//         }else{
//             res.send({ status: 'No existe', data: user })
//         }
//     })
//     .catch(error => {
//         res.send(400).send({ status: 400, data: error })
//     })
}

module.exports = {
    getAllUsers,
    getUserByPk,
    postAddUser,
    postEditUser,
    deleteUserById,
    postLogin
}