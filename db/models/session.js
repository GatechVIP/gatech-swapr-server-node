'use strict';
module.exports = (sequelize, DataTypes) => {
  var Session = sequelize.define('Session', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    start_date: {
      type: DataTypes.DATE
    },
    end_date: {
      type: DataTypes.DATE
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
        Session.belongsTo(models.Course, {foreignKey: 'course_id'});
        Session.belongsToMany(models.User, {
          as: 'students',
          through: models.SessionEnrollment,
          foreignKey: 'session_id',
          otherKey: 'user_id'
        });
      }
    },
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'session'
  });
  return Session;
};