'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('training_exercise', 'exercise_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'exercise',
        key: 'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('training_exercise', 'exercise_id');
  }
};
