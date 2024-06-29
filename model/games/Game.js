const sequelize = require('sequelize');
const connection = require('../../db/db');

const Game = connection.define('games', {
    title:{
        type:sequelize.STRING,
        allowNull:false
    },price:{
        type: sequelize.DOUBLE,
        allowNull:false
    },sinopses:{
        type: sequelize.TEXT,
        allowNull:false
    },genres:{
        type: sequelize.STRING,
        allowNull:true
    },release:{
        type:sequelize.INTEGER,
        allowNull:true
    }
});


module.exports = Game;