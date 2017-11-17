'use strict';
module.exports = (sequelize, DataTypes) => {
  var Session = sequelize.define('Session', {
    name: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
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