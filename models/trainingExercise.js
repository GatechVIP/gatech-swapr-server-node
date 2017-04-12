module.exports = function(sequelize, DataTypes) {
    var TrainingExercise = sequelize.define('TrainingExercise', {
        'id': {
            'type': DataTypes.INTEGER.UNSIGNED,
            'allowNull': false,
            'unique': true,
            'primaryKey': true,
            'autoIncrement': true
        },
        'orderServed': {
            'type': DataTypes.INTEGER.UNSIGNED,
            'allowNull': false
        },
        'url': {
            'type': DataTypes.STRING,
            'allowNull': false,
            'validate': {
                'notEmpty': true
            }
        },
        'isCalibration': {
            'type': DataTypes.BOOLEAN,
            'allowNull': false,
        }
    }, {
        'classMethods': {
            'associate': function(models) {
                TrainingExercise.belongsTo(models.Exercise);
            }
        }
    });

    return TrainingExercise;
};
