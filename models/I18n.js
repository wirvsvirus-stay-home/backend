const { Model, DataTypes } = require('sequelize');
const sequelize = require('./../services/sequelize');

class I18n extends Model { }

I18n.init({
    language: {
        type: DataTypes.STRING(8),
        allowNull: false
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    modelName: 'i18n',
    indexes: [
        {
            name: 'device_ids',
            unique: true,
            fields: ['language', 'key']
        }
    ],
    sequelize
});

module.exports = I18n;
