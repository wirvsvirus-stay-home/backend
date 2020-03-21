'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        deviceId: DataTypes.STRING,
        username: DataTypes.STRING(64),
        country: DataTypes.STRING(8),
        score: DataTypes.INTEGER,
        rank: DataTypes.INTEGER,
        baseStatus: {
            type: DataTypes.ENUM,
            values: ['PROTECTED', 'UNPROTECTED']
        },
        latitude: DataTypes.STRING,
        longitude: DataTypes.STRING,
        radius: DataTypes.INTEGER(4)
    })
};