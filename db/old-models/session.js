module.exports = function(sequelize, DataTypes) {
    var Session = sequelize.define('Session', {
        'id': {
            'type': DataTypes.INTEGER,
            'allowNull': false,
            'unique': true,
            'primaryKey': true,
            'autoIncrement': true
        },
        'name': {
            'type': DataTypes.STRING,
            'allowNull': false,
            'validate': { 'notEmpty': true }
        },
        'startDate': DataTypes.DATE,
        'endDate': DataTypes.DATE
    }, {
        'classMethods': {
            'associate': function(models) {
                Session.belongsTo(models.Course);
                Session.belongsToMany(models.User, {'through': models.SessionEnrollment});
            }
        }
    });

    return Session;
};
