'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('i18n', [{
      language: 'de',
      key: 'onboarding.welcome',
      text: 'Hallo :username:'
    }, {
      language: 'en',
      key: 'onboarding.welcome',
      text: 'Hello :username:'
    }, {
      language: 'de',
      key: 'misc.save',
      text: 'Speichern'
    }, {
      language: 'en',
      key: 'misc.save',
      text: 'Save'
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('i18n', null, {});
  }
};
