'use strict';
module.exports = (sequelize, DataTypes) => {
  var SessionEnrollment = sequelize.define('SessionEnrollment', {
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
    tableName: 'session_enrollment'
  });
  return SessionEnrollment;
};