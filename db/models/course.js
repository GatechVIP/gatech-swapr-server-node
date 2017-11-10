'use strict';
module.exports = (sequelize, DataTypes) => {
  var Course = sequelize.define('Course', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Course.belongsTo(models.Institute, {foreignKey: 'institute_id'})
      }
    },
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'course'
  });
  return Course;
};