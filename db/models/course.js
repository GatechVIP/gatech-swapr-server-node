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
    tableName: 'course'
  });

  Course.associate = function(models) {
    Course.belongsTo(models.Institute, {foreignKey: 'institute_id'})
  };

  return Course;
};
