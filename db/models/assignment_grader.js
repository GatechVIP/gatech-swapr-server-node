'use strict';
module.exports = (sequelize, DataTypes) => {
  var AssignmentGrader = sequelize.define('AssignmentGrader', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    assignment_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    current_position: {
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
        AssignmentGrader.belongsTo(models.User, {foreignKey: 'user_id'});
        AssignmentGrader.belongsTo(models.Assignment, {foreignKey: 'assignment_id'});
      }
    },
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'assignment_grader'
  });
  return AssignmentGrader;
};