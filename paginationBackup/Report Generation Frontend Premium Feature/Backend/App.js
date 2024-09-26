

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const cors = require('cors')
app.use(cors());

const loginController = require('./Controller/User')
const loginRoute = require('./Routes/User');
const Sequelize = require('./Util/Database')

const User = require('./Model/User')
const signupController = require('./Controller/NewUser')
const signupRoute = require('./Routes/NewUser');

const Expense = require('./Model/Expense');
const expenseRoute = require('./Routes/Expense')
const expenseController = require('./Controller/Expense')

const Order = require('./Model/Orders')
const purchaseRoute = require('./Routes/Purchase')

const premiumRoute = require('./Routes/PremiumMember')

const leaderboardRoute = require('./Routes/Leaderboard')

const forgotPWRoute = require('./Routes/ForgotPWRoute')

const ForgotPWRequest = require('./Model/ForgotPWRequest')
const Fileurls = require('./Model/FileUrls')

require('dotenv').config()
require('env')

app.use('/user', signupRoute);
app.use('/login', loginRoute);
app.use('/expense',expenseRoute);
app.use('/check',premiumRoute)
app.use('/purchase',purchaseRoute);
app.use('/leaderboard',leaderboardRoute)
app.use('/called',forgotPWRoute)
app.use('/password',forgotPWRoute)


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPWRequest)
ForgotPWRequest.belongsTo(User)

User.hasMany(Fileurls)
Fileurls.belongsTo(User)


Sequelize
    // .sync({force:true})
    .sync()
    .then(() => {
        app.listen(2203, () => {
            console.log('Hello, World ! I am listening');
        })
    })
    .catch(er => console.log('sequelize is not running', er));
