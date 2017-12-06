'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('submission', 'user_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      }),
      queryInterface.addColumn('submission', 'assignment_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'assignment',
          key: 'id'
        }
      })
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('submission', 'user_id'),
      queryInterface.removeColumn('submission', 'assignment_id')
    ];
  }
};
