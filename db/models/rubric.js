'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rubric = sequelize.define('Rubric', {
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
    }
  }, {
    classMethods: {
      associate: function(models) {
        Rubric.belongsTo(models.Exercise);
      }
    },
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'rubric'
  });
  return Rubric;
};