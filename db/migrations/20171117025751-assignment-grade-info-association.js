'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('assignment_grade_info', 'session_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'session',
        key: 'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('assignment_grade_info', 'session_id');
  }
};
