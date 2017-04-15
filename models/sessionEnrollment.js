module.exports = function(sequelize, DataTypes) {
    var SessionEnrollment = sequelize.define('SessionEnrollment', {},
        {
            'classMethods': {
                'associate': function(models) {
                    SessionEnrollment.belongsTo(models.Session);
                    SessionEnrollment.belongsTo(models.User);
                }
            }
        });

    return SessionEnrollment;
}
