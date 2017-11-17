'use strict';
module.exports = (sequelize, DataTypes) => {
  var SessionEnrollment = sequelize.define('SessionEnrollment', {
    
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