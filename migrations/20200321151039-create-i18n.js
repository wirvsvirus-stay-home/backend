'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('i18n', {
        language: {
          type: Sequelize.STRING(8),
          allowNull: false
        },
        key: {
          type: Sequelize.STRING,
          allowNull: false
        },
        text: {
          type: Sequelize.TEXT,
          allowNull: false
        }
    })
        .then(() => queryInterface.addIndex('i18n', ['language', 'key'], { unique: true }))
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('i18n')
  }
};
