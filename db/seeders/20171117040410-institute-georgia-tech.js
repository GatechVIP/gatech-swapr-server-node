'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Sequelize.models.Institute.create({
      name: 'Georgia Tech'
    })
  },

  down: (queryInterface, Sequelize) => {
    return Sequelize.models.findOne({
      name: 'Georgia Tech'
    }).destroy();
  }
};
