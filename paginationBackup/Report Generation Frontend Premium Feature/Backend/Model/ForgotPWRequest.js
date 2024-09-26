
const Sequelize = require('sequelize')
const sequelize = require('../Util/Database')

const ForgetPWRequest = sequelize.define('ForgetPWRequest',{
    id: {
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    isActive:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    }
})

module.exports = ForgetPWRequest;


