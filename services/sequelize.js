const { Sequelize } = require('sequelize');

module.exports = new Sequelize('mariadb://root:password@localhost/wvv');