'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: '16063e10-de04-4c1b-8124-8a7dd13b61d6',
      username: 'Red Elephant',
      country: 'DE',
      score: 850,
      rank: 2,
      baseStatus: 'PROTECTED',
      latitude: 37.285951,
      longitude: -121.936650,
      radius: 100,
      tickets: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: '3f6ffbc8-2648-4b93-a132-667ef48a1138',
      username: 'Pink Dog',
      country: 'IT',
      score: 750,
      rank: 2,
      baseStatus: 'PROTECTED',
      latitude: 37.285951,
      longitude: -121.936650,
      radius: 100,
      tickets: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: '6000f592-f201-4719-8d5d-f46b03ac48ba',
      username: 'Yellow Cat',
      country: 'DE',
      score: 950,
      rank: 1,
      baseStatus: 'UNPROTECTED',
      latitude: 37.285951,
      longitude: -121.936650,
      radius: 100,
      tickets: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 'd1053640-225d-44fd-9d16-572889052979',
      username: 'Pink Mouse',
      country: 'DE',
      score: 750,
      rank: 2,
      baseStatus: 'UNPROTECTED',
      latitude: 37.285951,
      longitude: -121.936650,
      radius: 100,
      tickets: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 'e1453640-225d-44fd-9d16-572889055517',
      username: 'Grey Dolphin',
      country: 'DE',
      score: 650,
      rank: 3,
      baseStatus: 'ABANDONED',
      latitude: 37.285951,
      longitude: -121.936650,
      radius: 100,
      tickets: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
