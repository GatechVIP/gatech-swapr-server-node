'use strict';
module.exports = (sequelize, DataTypes) => {
  var Grade = sequelize.define('Grade', {
    grade: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Grade.belongsTo(models.Assignment, {foreignKey: 'assignment_id'});
        Grade.belongsTo(models.User, {foreignKey: 'user_id'});
      }
    },
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'grade'
  });
  return Grade;
};