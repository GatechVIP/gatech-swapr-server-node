'use strict';
module.exports = (sequelize, DataTypes) => {
  var AssignmentGradingSecretTask = sequelize.define('AssignmentGradingSecretTask', {
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
        // AssignmentGradeInfo.belongsTo(models.User, {foreignKey: 'user_id'});
        // AssignmentGradeInfo.belongsTo(models.Session, {foreignKey: 'session_id'});
        // AssignmentGradeInfo.belongsTo(models.Assignment, {foreignKey: 'assignment_id'});
      }
    },
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'assignment_grading_secret_task'
  });
  return AssignmentGradingSecretTask;
};