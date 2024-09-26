
// const {v4 : uuidv4 } =require( 'uuid');
// const imp = uuidv4();
// console.log('printing uuid &&&>>>_________________________________',imp)


const UserLogin = require('../Model/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function generateAccessToken(id){
    return jwt.sign({userId:id},'secretKey');
}

exports.userlogin = async (req, res, next) => {
    try {
        const getName = await UserLogin.findAll({ where: { email: req.body.name } })
        
        if (getName.length > 0) {
        
            bcrypt.compare(req.body.pw, getName[0].password, (err, result) => {
               
                if (err) { console.log(err); res.status(500).json({ message: 'Internal server error' }) }

                else if (result == true) {
                    res.status(200).json({ message: 'USER LOGIN SUCCESSFUL !' , token:generateAccessToken(getName[0].id)}) 
                }

                else {
                    res.status(400).json({ message: 'UNAUTHORIZED ACCESS' })
                }
            })
        }
        else {
            res.status(404).json({ message: '404 record NOT FOUND' })
        }

    }
    catch (error) {
        console.log('Error in user login : ',error)
        res.status(403).json({ message: 'Failed with error status 403 !' ,err:error})
    }
}