'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      deviceId: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
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
      deviceId: 'f3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
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
      deviceId: 'c3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
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
