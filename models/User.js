const { Model, DataTypes } = require('sequelize');
const sequelize = require('./../services/sequelize');

class User extends Model { }

User.init({
    deviceId: DataTypes.STRING,
    username: DataTypes.STRING,
    country: DataTypes.STRING,
    score: DataTypes.INTEGER,
    rank: DataTypes.INTEGER,
    baseStatus: {
        type: DataTypes.ENUM,
        values: ['PROTECTED', 'UNPROTECTED']
    },
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    radius: DataTypes.INTEGER
}, { sequelize, modelName: 'user' });

module.exports = User;
