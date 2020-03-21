'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deviceId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      country: {
        type: Sequelize.STRING(8),
        allowNull: false
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      rank: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      baseStatus: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['PROTECTED', 'UNPROTECTED'],
        defaultValue: 'PROTECTED'
      },
      latitude: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      longitude: {
        type: Sequelize.STRING,
        allowNull: false
      },
      radius: {
        type: Sequelize.INTEGER(4),
        allowNull: false,
        defaultValue: 100
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
        .then(() => queryInterface.addIndex('users', ['deviceId'], {
          name: 'device_ids',
          unique: true
        }))

        .then(() =>  queryInterface.addIndex('users', ['username'], { name: 'usenames' }))
        .then(() =>  queryInterface.addIndex('users', ['country'], { name: 'countries' }))
        .then(() =>  queryInterface.addIndex('users', ['rank'], { name: 'ranks' }))
        .then(() =>  queryInterface.addIndex('users', ['baseStatus'], { name: 'base_statuses' }))
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};