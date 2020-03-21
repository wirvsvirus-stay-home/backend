'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('i18n', {
        language: DataTypes.STRING(8),
        key: DataTypes.STRING,
        text: DataTypes.TEXT
    })
};