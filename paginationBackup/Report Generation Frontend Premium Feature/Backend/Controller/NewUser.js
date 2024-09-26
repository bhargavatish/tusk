//It authenticates that if a user exists or not. If it does not exist then only it register otherwise throws personalized error messages.

const User = require('../Model/User')
const bcrypt = require('bcrypt');


//Adding a new user into the signup database
exports.sendData = async (req, res, next) => {
    
    try {
        let record;

        const getResponse = await User.findAll({ where: { email: req.body.email } })

        for (let i = 0; i < getResponse.length; i++) {
            record = getResponse[i].isNewRecord;
        }


        if (record === false) {
            res.status(403).json({ error: 'Request failed with status code 403 !' })
        }

        else {
            // store the new signup object with it's password bcrypted
            let saltrounds = 10;
            bcrypt.hash(req.body.password, saltrounds, async (err, hash) => {
                const response = await User.create({
                    names: req.body.name,
                    email: req.body.email,
                    password: hash,
                    total_expense:0
                })
                
                res.status(201).json({ userDetails: response, token: 'secretKey', message: 'SUCCESSFULLY SIGNED UP !!!' })
            })
        }

    }
    catch (error) {
        console.log(error)
    }
}

