'use strict';

const { v4: uuidV4 } = require('uuid');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: uuidV4(),
      username: 'Red Elephant',
      country: 'DE',
      score: 850,
      rank: 2,
      baseStatus: 'PROTECTED',
      latitude: 37.285951,
      longitude: -121.936650,
      radius: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: uuidV4(),
      username: 'Pink Dog',
      country: 'IT',
      score: 750,
      rank: 2,
      baseStatus: 'PROTECTED',
      latitude: 37.285951,
      longitude: -121.936650,
      radius: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: uuidV4(),
      username: 'Yellow Cat',
      country: 'DE',
      score: 950,
      rank: 1,
      baseStatus: 'UNPROTECTED',
      latitude: 37.285951,
      longitude: -121.936650,
      radius: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
