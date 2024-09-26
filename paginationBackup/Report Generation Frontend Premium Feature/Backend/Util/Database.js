const Sequelize = require('sequelize')

// const sequelize = new Sequelize('Login','root','4411$Bhargav',{
//     dialect:'mysql',
//     host:'localhost'
// })

const sequelize = new Sequelize('expensetracker','root','4411$Bhargav',{
    dialect:'mysql',
    host:'localhost'
});

// const sequelize = new Sequelize('signup','root','4411$Bhargav',{
//     dialect:'mysql',
//     host:'localhost'
// })

module.exports = sequelize;