module.exports = function(sequelize, DataTypes) {
    var Institute = sequelize.define('Institute', {
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
        }
    });

    return Institute;
};
