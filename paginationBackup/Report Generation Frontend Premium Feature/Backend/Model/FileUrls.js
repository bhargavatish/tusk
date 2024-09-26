const Sequelize = require('sequelize')

const sequelize = require('../Util/Database')

const Fileurls = sequelize.define('fileurltable',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    DownloadDate : {
        type: Sequelize.DATE,
        allowNull: false
    },
    Urls:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = Fileurls