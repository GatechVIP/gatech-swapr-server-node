module.exports = function(sequelize, DataTypes) {
    var Course = sequelize.define('Course', {
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
    }, {
        'classMethods': {
            'associate': function(models) {
                Course.belongsTo(models.Institute);
            }
        }
    });

    return Course;
};
