module.exports = function(sequelize, DataTypes) {
    var Submission = sequelize.define('Submission', {
        'url': {
            'type': DataTypes.STRING,
            'unique': true,
            'primaryKey': true,
             'allowNull': false,
            'validate': {
                'notEmpty': true
            }
        }
    }, {
        'classMethods': {
            'associate': function(models) {
                Submission.belongsTo(models.User);
                Submission.belongsTo(models.Assignment);
            }
        }
    });

    return Submission;
};
