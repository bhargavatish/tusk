const Sequelize = require('sequelize');

const sequelize = require('../Util/Database');

const Expense = sequelize.define('expense',{
    id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    amount:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    }
    
})

module.exports = Expense;