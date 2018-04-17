'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rubric = sequelize.define('Rubric', {
    exercise_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    item_num: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        allowEmpty: false
      }
    },
    description: {
      type: DataTypes.STRING,
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
        Rubric.belongsTo(models.Exercise, {foreignKey: 'exercise_id'});
    };

    return Rubric;
};
