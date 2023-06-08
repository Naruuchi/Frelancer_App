const {Datatype, DataTypes} = require("sequelize");

const sequelize = require("../util/database");

const Works = sequelize.define( "works", 
{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    hirer: 
    {
        type: DataTypes.STRING,
        allowNull: false,
    },

    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },  
    
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },    

    title:
    {
        type: "Varchar(5000)",
        allowNull:false,
    },

    details:
    {
        type: "Varchar(5000)",
        allowNull: false,
    },
    
    request:
    {
        type: "Varchar(5000)",
    },

    start:
    {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Works;