module.exports = function(sequelize, DataTypes) {
    var Course = sequelize.define('Course', {
        'id': {
            'type': DataTypes.INTEGER,
            'allowNull': false,
            'unique': true,
            'primaryKey': true,
            'autoIncrement': true,
            'omitNull': true
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
