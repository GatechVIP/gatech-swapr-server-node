'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('assignment_grading_secret_task', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      grader_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'assignment_grader',
          key: 'id'
        }
      },
      secret_video_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'exercise_secret_video',
          key: 'id'
        }
      },
      grade_info_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'assignment_grade_info',
          key: 'id'
        }
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('assignment_grading_secret_task');
  }
};