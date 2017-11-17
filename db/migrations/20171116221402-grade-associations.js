'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('grade', 'user_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      }),
      queryInterface.addColumn('grade', 'assignment_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      })

    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('grade', 'user_id'),
      queryInterface.removeColumn('grade', 'assignment_id')
    ];
  }
};
