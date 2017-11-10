'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    return [
      queryInterface.addColumn('assignment', 'exercise_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'exercise',
          key: 'id'
        }
      }),
      queryInterface.addColumn('assignment_grade_info', 'user_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      }),
      queryInterface.addColumn('assignment_grade_info', 'assignment_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'assignment',
          key: 'id'
        }
      }),
      queryInterface.addColumn('exercise', 'course_id', {
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    return [
      queryInterface.removeColumn('assignment', 'exercise_id'),
      queryInterface.removeColumn('assignment_grade_info', 'user_id'),
      queryInterface.removeColumn('assignment_grade_info', 'assignment_id'),
      queryInterface.removeColumn('exercise', 'course_id')
    ]
  }
};
