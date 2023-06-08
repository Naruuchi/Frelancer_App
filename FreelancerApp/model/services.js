const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../util/database');

const Sevices = sequelize.define('services', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    imgURL :
    {
        type: "Varchar(5000)",
        allowNull: false,
    },

    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },    

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    major:
    {
        type: DataTypes.STRING,
        allowNull: false
    },

    certificate:
    {
        type: DataTypes.STRING
    },

    salaryExpectation:
    {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },

    description:
    {
        type: DataTypes.TEXT
    },

    contact:
    {
        type: "Varchar(5000)",
        allowNull: false,
    }
});

module.exports = Sevices;