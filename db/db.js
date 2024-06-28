const Sequelize = require('sequelize');
const connection = new Sequelize('gamesApi', 'Alexandre', '46422278As@$', {
    host:localhost,
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;