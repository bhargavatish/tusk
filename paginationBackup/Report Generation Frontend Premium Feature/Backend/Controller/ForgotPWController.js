const Forgotpassword = require('../Model/ForgotPWRequest')
const bcrypt = require('bcrypt')
const User = require('../Model/User')

const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

//request handler for handling requests coming from forgot password button
exports.forgotPassword = async (req, res, next) => {

    try {
        const Sib = require('sib-api-v3-sdk')

        const client = Sib.ApiClient.instance

        const apiKey = client.authentications['api-key']

        apiKey.apiKey = process.env.API_KEY

        const transEmailApi = new Sib.TransactionalEmailsApi()

        const sender = {
            email: 'bhargavatish@gmail.com',
            name: 'Atish Bhargav'
        }
        const receivers = [
            {
                email: req.body.email
            }
        ]
        const response = await transEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Get signed in to get the marketing trends',
            textContent: `Cules coding will teach you how to become a successful {{params.role}} developer`,
            params: {
                role: 'Frontend'
            },
            htmlContent: `
                <h1>Click to reset password</h1>
                <a href = "http://localhost:2203/password/resetPassword?uuid=${uuid}">Reset Password </a>
                `
        })

        const user = await User.findOne({ where: { email: req.body.email } })
        if (user.id) {
            const ForgotResponse = await Forgotpassword.create({ id: uuid, isActive: true, userId: user.id })
            res.status(201).json({ message: `Mail sent to the ${req.body.email}.`, success: true })
        }
        else {
            res.status(401).json({ message: `The mail id is not valid`, success: false })
        }
    } catch (error) {
        res.status(403).json({ message: 'Error', success: false })
    }

}
//To display form for updating the password
exports.resetPassword = async (req, res, next) => {
    try {
        const id = req.query.uuid;
        const match = await Forgotpassword.findOne({ where: { id: id } })
        if (match == null) {
            res.status(403).json({ message: 'The user does not exist !!!' })
        }
        else {
            if (match != null && match.isActive == true) {

                res.status(200).send(`<html>
                                        <script>
                                            function formsubmitted(e){
                                                e.preventDefault();
                                                console.log('called')
                                            }
                                        </script>
    
                                        <form action="/password/updatepassword/${uuid}" method="get">
                                            <label for="newpassword">Enter New password</label>
                                            <input name="newpassword" type="password" required></input>
                                            <button>reset password</button>
                                        </form>
                                    </html>`
                )
                res.end()
            }
        }
    } catch (error) {
        console.log('Errorin resetpw', error)
    }
}

//To update the password for which link has been generated
exports.updatepassword = async (req, res, next) => {
    const id = req.params.resetpasswordid;
    const newpassword = req.query.newpassword;
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
            throw new Error('Error occured during genSalt : ', err)
        }
        else {
            bcrypt.hash(newpassword, salt, async function (err, hash) {
                if (err) {
                    throw new Error('Error occured during hash : ', err)
                }
                else {
                    console.log('Hash generated is : ', hash)
                    const user = await Forgotpassword.findOne({ where: { id: id } })
                    if (user) {
                        const userId = user.userId;
                        User.update({ password: hash }, { where: { id: userId } })
                        Forgotpassword.update({ isActive: false }, { where: { id: id } })
                    }
                }
            })
        }
    })
}
