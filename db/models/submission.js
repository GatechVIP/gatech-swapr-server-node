'use strict';
module.exports = (sequelize, DataTypes) => {
  var Submission = sequelize.define('Submission', {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Submission.belongsTo(models.User, {foreignKey: 'user_id'});
        Submission.belongsTo(models.Assignment, {foreignKey: 'assignment_id'});
      }
    },
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'submission'
  });
  return Submission;
};