'use strict';
module.exports = (sequelize, DataTypes) => {
  var Exercise = sequelize.define('Exercise', {,
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    num_graders: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    prompt: {
      type: Sequelize.STRING,
      allowNull: false,
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
        Exercise.belongsTo(models.Course, {foreignKey: 'course_id'})
      }
    },
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'exercise'
  });
  return Exercise;
};