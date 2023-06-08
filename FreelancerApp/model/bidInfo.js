const {DataTypes} = require('sequelize');

const sequelize = require("../util/database");

const bidInfo = sequelize.define('bidInfo', {
    bid:
    {
        type: DataTypes.STRING,
        allowNull: false,
    },

    title: {
        type: "Varchar(5000)",
        allowNull: false,
    },    
    
    deadline:
    {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },    

    exp:
    {
        type: "Varchar(5000)",
        allowNull: false,
    },

    solution:
    {
        type: "Varchar(5000)",
        allowNull: false,
    },

    contact:
    {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = bidInfo;