'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('actions', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM,
        values: ['CHECK_IN'],
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })

        .then(() =>  queryInterface.addIndex('actions', ['type'], { name: 'types' }))
        .then(() =>  queryInterface.addIndex('actions', ['userId'], { name: 'user_ids' }))
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('actions');
  }
};
