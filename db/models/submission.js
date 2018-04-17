'use strict';
module.exports = (sequelize, DataTypes) => {
  var Submission = sequelize.define('Submission', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    assignment_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
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