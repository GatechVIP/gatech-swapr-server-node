'use strict';
module.exports = (sequelize, DataTypes) => {
  var Institute = sequelize.define('Institute', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
        // associations can be defined here
      }
    },
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'institute'
  });
  return Institute;
};