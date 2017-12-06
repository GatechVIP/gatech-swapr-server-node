'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('url_state', 'grader_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      }),
      queryInterface.addColumn('url_state', 'submission_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'submission',
          key: 'id'
        }
      })
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('url_state', 'grader_id'),
      queryInterface.removeColumn('url_state', 'submission_id')
    ];
  }
};
