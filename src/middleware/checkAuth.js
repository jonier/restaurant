const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer <Token>'
        if(!token){
            res.status(401).send({status: 401, data: "Authentication failed!"});
        }
        //If the jwt.verify faild, it goes to the catch error
        const decodedToken = jwt.verify(token, 'portfolio21');
        console.log('Now: ', new Date())
        console.log('Token expired: ', new Date(decodedToken.exp*1000))
        req.userData = { userId: decodedToken.userId, email: decodedToken.email };
        next();
            
    } catch (error) {
        res.status(401).send({status: 401, data: "Authentication failed!"});
    }

}