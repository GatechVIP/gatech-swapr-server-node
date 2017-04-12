module.exports = function(sequelize, DataTypes) {
    var AssignmentGradeInfo = sequelize.define('AssignmentGradeInfo', {
        'id': {
            'type': DataTypes.INTEGER.UNSIGNED,
            'allowNull': false,
            'unique': true,
            'primaryKey': true,
            'autoIncrement': true
        },
        'rubricItemNum': {
            'type': DataTypes.INTEGER.UNSIGNED,
            'allowNull': false
        },
        'rating': {
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
        'comment': {
            'type': DataTypes.STRING,
            'allowNull': false,
        },
        'isInstructorRes': {
            'type': DataTypes.BOOLEAN,
            'allowNull': false,
        }
    }, {
        'classMethods': {
            'associate': function(models) {
                AssignmentGradeInfo.belongsTo(models.User);
                AssignmentGradeInfo.belongsTo(models.Session);
                AssignmentGradeInfo.belongsTo(models.Assignment);
            }
        }
    });

    return AssignmentGradeInfo;
};
