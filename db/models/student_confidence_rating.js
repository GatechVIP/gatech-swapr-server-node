'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentConfidenceRating = sequelize.define('StudentConfidenceRating', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    exercise_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rubric_item_num: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    calibration_weight: {
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
        StudentConfidenceRating.belongsTo(models.User, {foreignKey: 'user_id'});
        StudentConfidenceRating.belongsTo(models.Exercise, {foreignKey: 'exercise_id'});
      }
    }});

    return StudentConfidenceRating;
};
