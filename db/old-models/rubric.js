module.exports = function(sequelize, DataTypes) {
    var Rubric = sequelize.define('Rubric', {
        'id': {
            'type': DataTypes.INTEGER,
            'allowNull': false,
            'unique': true,
            'primaryKey': true,
            'autoIncrement': true
        },
        'itemNum': {
            'type': DataTypes.INTEGER,
            'allowNull': false
        },
        'name': {
            'type': DataTypes.STRING,
            'allowNull': false,
            'validate': {
                'allowEmpty': false
            }
        },
        'description': {
            'type': DataTypes.STRING,
            'allowNull': false
        }
    }, {
        'classMethods': {
            'associate': function(models) {
                Rubric.belongsTo(models.Exercise);
            }
        }
    });

    return Rubric;
};
