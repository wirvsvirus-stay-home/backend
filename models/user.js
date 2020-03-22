'use strict';

const { v4: uuidV4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: uuidV4
        },
        username: DataTypes.STRING(64),
        country: DataTypes.STRING(8),
        score: DataTypes.INTEGER,
        rank: DataTypes.INTEGER,
        baseStatus: {
            type: DataTypes.ENUM,
            values: ['PROTECTED', 'ABANDONED', 'UNPROTECTED']
        },
        latitude: DataTypes.STRING,
        longitude: DataTypes.STRING,
        radius: DataTypes.INTEGER(4)
    })
};