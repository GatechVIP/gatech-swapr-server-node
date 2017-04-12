module.exports = function(sequelize, DataTypes) {
    var Assignment = sequelize.define('Assignment', {
        'id': {
            'type': DataTypes.INTEGER.UNSIGNED,
            'allowNull': false,
            'unique': true,
            'primaryKey': true,
            'autoIncrement': true
        },
        'openDate': DataTypes.DATE,
        'closeDate': DataTypes.DATE
    }, {
        'classMethods': {
            'associate': function(models) {
                Assignment.belongsTo(models.Session);
                Assignment.belongsTo(models.Exercise);
            }
        }
    });

    return Assignment;
};
