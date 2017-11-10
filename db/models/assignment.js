'use strict';
module.exports = (sequelize, DataTypes) => {
  var Assignment = sequelize.define('Assignment', {
    open_date: DataTypes.DATE,
    close_date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // TODO: belongsTo Session
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