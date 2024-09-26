const jwt = require('jsonwebtoken');
const User = require('../Model/User')


const authorize = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        console.log('token decryption post', token);
        const user = jwt.verify(token, 'secretKey');
        console.log('UserID is >>>', user.userId);
        User.findByPk(user.userId).then(user => {
            console.log('In Auth folder',JSON.stringify(user));
            req.user = user;
            next();
        }).catch((error) => {
            throw new Error(error)
        })

    } catch (error) {
        console.log('Authenicate function failed as : ', error)
        res.status(401).json({ success: false });
    }
}
const authenticate = (req, res, next) => {
    try {
        const token = req.header('Authentication');
        console.log('token decryption get', token);
        const user = jwt.verify(token, 'secretKey');
        console.log('UserID is >>>', user.userId);
        User.findByPk(user.userId).then(user => {
            console.log('In Auth folder',JSON.stringify(user));
            req.user = user;
            next();
        }).catch((error) => {
            throw new Error(error)
        })

    } catch (error) {
        console.log('Authenicate function failed as : ', error)
        res.status(401).json({ success: false });
    }
}


module.exports = {authenticate,authorize}