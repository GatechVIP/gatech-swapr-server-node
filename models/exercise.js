module.exports = function(sequelize, DataTypes) {
    var Exercise = sequelize.define('Exercise', {
        'id': {
            'type': DataTypes.INTEGER.UNSIGNED,
            'allowNull': false,
            'unique': true,
            'primaryKey': true,
            'autoIncrement': true
        },
        'name': {
            'type': DataTypes.STRING,
            'allowNull': false,
            'unique': true,
            'validate': { 'notEmpty': true }
        },
        'type': {
            'type': DataTypes.STRING,
            'allowNull': false,
            'validate': { 'notEmpty': true }
        },
        'numGraders': {
            'type': DataTypes.INTEGER.UNSIGNED,
            'allowNull': false
        },
        'prompt': {
            'type': DataTypes.STRING,
            'allowNull': false,
            'validate': { 'notEmpty': true }
        }
    }, {
        'classMethods': {
            'associate': function(models) {
                Exercise.belongsTo(models.Course);
            }
        }
    });

    return Exercise;
};
