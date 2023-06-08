const {Sequelize, DataTypes} = require('sequelize');

const sequelize = require('../util/database');

const Register  = sequelize.define('register', {
    userName : 
    {
        type : DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    passWord :
    {
        type: DataTypes.STRING,
        allowNull: false
    },

    name :  
    {
        type: DataTypes.STRING,
        allowNull: false
    },

    imgURL :  
    {
        type: "Varchar(5000)",
        allowNull: false
    },

    dayOfBirth :
    {
        type: DataTypes.DATE,
        allowNull: false
    },
    sex :
    {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    email :
    {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Register;
