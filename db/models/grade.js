'use strict';
module.exports = (sequelize, DataTypes) => {
  var Grade = sequelize.define('Grade', {
    assignment_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
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
    classMethods: {
      associate: function(models) {
        Grade.belongsTo(models.Assignment, {foreignKey: 'assignment_id'});
        Grade.belongsTo(models.User, {foreignKey: 'user_id'});
    };

    return Grade;
};
