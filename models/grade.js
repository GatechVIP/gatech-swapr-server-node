module.exports = function(sequelize, DataTypes) {
    var Grade = sequelize.define('Grade', {
        'id': {
            'type': DataTypes.INTEGER.UNSIGNED,
            'allowNull': false,
            'unique': true,
            'primaryKey': true,
            'autoIncrement': true
        },
        'grade': {
            'type': DataTypes.FLOAT,
            'allowNull': false
        }
    }, {
        'classMethods': {
            'associate': function(models) {
                Grade.belongsTo(models.User);
                Grade.belongsTo(models.Assignment);
            }
        }
    });

    return Grade;
};
