const Sequelize = require('sequelize');

module.exports = new Sequelize('node-complete','root','Optimusprime',{
    dialect:'mysql',
    host:'localhost'
});