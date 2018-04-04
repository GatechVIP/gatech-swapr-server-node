'use strict';
module.exports = (sequelize, DataTypes) => {
  var Grade = sequelize.define('Grade', {
    grade: {
      type: DataTypes.FLOAT,
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
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'grade'
  });

  Grade.associate = function(models) {
    Grade.belongsTo(models.Assignment, {foreignKey: 'assignment_id'});
    Grade.belongsTo(models.User, {foreignKey: 'user_id'});
  };

  return Grade;
};
