'use strict';
module.exports = (sequelize, DataTypes) => {
  var AssignmentGradingTask = sequelize.define('AssignmentGradingTask', {
    grader_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    submission_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    grade_info_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    deleted_at: {
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: function(models) {
        AssignmentGradingTask.belongsTo(models.AssignmentGrader, {foreignKey: 'grader_id'});
        AssignmentGradingTask.belongsTo(models.ExerciseSecretVideo, {foreignKey: 'secret_video_id'});
        AssignmentGradingTask.belongsTo(models.AssignmentGradeInfo, {foreignKey: 'grade_info_id'});
      }
    },
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'assignment_grading_task'
  });
  return AssignmentGradingTask;
};