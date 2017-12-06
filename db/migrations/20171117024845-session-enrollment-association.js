'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('session_enrollment', 'session_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'session',
          key: 'id'
        }
      }),
      queryInterface.addColumn('session_enrollment', 'user_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      }),
      queryInterface.addColumn('session', 'course_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'course',
          key: 'id'
        }
      })
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('session_enrollment', 'session_id'),
      queryInterface.removeColumn('session_enrollment', 'user_id'),
      queryInterface.removeColumn('session', 'course_id'),
    ];
  }
};
