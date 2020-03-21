const { Model, DataTypes } = require('sequelize');
const sequelize = require('./../services/sequelize');

class User extends Model { }

User.init({
    deviceId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    country: {
        type: DataTypes.STRING(8),
        allowNull: false
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    rank: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    baseStatus: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['PROTECTED', 'UNPROTECTED'],
        defaultValue: 'PROTECTED'
    },
    latitude: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    longitude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    radius: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
        defaultValue: 100
    }

}, {
    modelName: 'user',
    indexes: [
        {
            name: 'device_ids',
            unique: true,
            fields: ['deviceId']
        }, {
            name: 'usernames',
            fields: ['username']
        }, {
            name: 'countries',
            fields: ['country']
        }, {
            name: 'ranks',
            fields: ['rank']
        }, {
            name: 'base_statuses',
            fields: ['baseStatus']
        }
    ],
    sequelize
});

module.exports = User;
