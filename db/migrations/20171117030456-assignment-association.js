'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('assignment', 'session_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'session',
        key: 'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('assignment', 'session_id');
  }
};
