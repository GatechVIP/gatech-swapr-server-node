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
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'session_enrollment'
  });
  return SessionEnrollment;
};
