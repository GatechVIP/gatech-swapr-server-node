'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      queryInterface.removeColumn('exercise', 'num_graders'),
      queryInterface.addColumn('assignment', 'num_graders', {
        type: Sequelize.INTEGER,
        allowNull: true
      })
  },

  down: (queryInterface, Sequelize) => {
      queryInterface.removeColumn('assignment', 'num_graders'),
      queryInterface.addColumn('exercise', 'num_graders', {
        type: Sequelize.INTEGER,
        allowNull: false
      })
  }
};
