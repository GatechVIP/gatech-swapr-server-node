'use strict';
module.exports = (sequelize, DataTypes) => {
  var AssignmentGradingSecretTask = sequelize.define('AssignmentGradingSecretTask', {
    grader_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    secret_video_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    grade_info_id: {
      type: DataTypes.INTEGER,
      allowNull: false
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
        AssignmentGradingSecretTask.belongsTo(models.AssignmentGrader, {foreignKey: 'grader_id'});
        AssignmentGradingSecretTask.belongsTo(models.Submission, {foreignKey: 'submission_id'});
        AssignmentGradingSecretTask.belongsTo(models.AssignmentGradeInfo, {foreignKey: 'grade_info_id'});
      }
    },
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'assignment_grading_secret_task'
  });
  return AssignmentGradingSecretTask;
};