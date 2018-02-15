'use strict';
module.exports = (sequelize, DataTypes) => {
  var Assignment = sequelize.define('Assignment', {
    open_date: DataTypes.DATE,
    close_date: DataTypes.DATE,
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    num_graders: {
      type: DataTypes.INTEGER,
      allowNull: true
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
        Assignment.belongsTo(models.Session, {foreignKey: 'session_id'});
        Assignment.belongsTo(models.Exercise, {foreignKey: 'exercise_id'});
      }
    },
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'assignment'
  });
  return Assignment;
};