const Sequelize = require('sequelize')

const sequelize = require('../Util/Database')

const User = sequelize.define('user',{
    id : {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey:true
    },
    names : {
        type: Sequelize.STRING,
        allowNull : false
    },
    email: {
        type : Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    total_expense:Sequelize.INTEGER ,
    isPremiumUser:{
        type:Sequelize.BOOLEAN
        
    }
    
})

module.exports = User ;