const Sequelize = require('sequelize');
const connection = new Sequelize('gamesapi', 'Alexandre', '46422278As@$', {
    host:'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;