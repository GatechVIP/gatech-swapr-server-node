'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('institute', [{
      name: 'Georgia Tech',
      created_at: new Date(),
      updated_at: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('institute', {
      name: 'Georgia Tech'
    });
  }
};
