'use strict';
module.exports = (sequelize, DataTypes) => {
    var RubricScoreKey = sequelize.define('RubricScoreKey', {
        rubric_item_num: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                allowEmpty: false
            }
        },
        score: {
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
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'rubric_score_key'
    });

    RubricScoreKey.associate = function(models) {
        RubricScoreKey.belongsTo(models.Exercise, {foreignKey: 'exercise_id'});
    };

    return RubricScoreKey;
};
