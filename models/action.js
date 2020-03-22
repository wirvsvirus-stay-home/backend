'use strict';

const { v4: uuidV4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('action', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: uuidV4
        },
        type: {
            type: DataTypes.ENUM,
            values: ['CHECK_IN'],
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
};