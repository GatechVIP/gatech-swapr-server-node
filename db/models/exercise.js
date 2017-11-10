'use strict';
module.exports = (sequelize, DataTypes) => {
  var Exercise = sequelize.define('Exercise', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Exercise.belongsTo(models.Course, {foreignKey: 'course_id'})
      }
    },
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'exercise'
  });
  return Exercise;
};