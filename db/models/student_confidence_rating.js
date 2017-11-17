'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentConfidenceRating = sequelize.define('StudentConfidenceRating', {
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
    }
  }, {
    classMethods: {
      associate: function(models) {
        StudentConfidenceRating.belongsTo(models.User, {foreignKey: 'user_id'});
        StudentConfidenceRating.belongsTo(models.Exercise, {foreignKey: 'exercise_id'});
      }
    },
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'student_confidence_rating'
  });
  return StudentConfidenceRating;
};