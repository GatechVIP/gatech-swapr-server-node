module.exports = function(sequelize, DataTypes) {
    var UrlState = sequelize.define('UrlState', {
        'id': {
            'type': DataTypes.INTEGER,
            'allowNull': false,
            'unique': true,
            'primaryKey': true,
            'autoIncrement': true
        },
        'isGraded': {
            'type': DataTypes.BOOLEAN,
            'allowNull': false
        }
    }, {
        'classMethods': {
            'associate': function(models) {
                UrlState.belongsTo(models.Submission);
                UrlState.belongsTo(models.User, {'as': 'grader'});
            }
        }
    });

    return UrlState;
};
