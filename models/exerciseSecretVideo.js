module.exports = function(sequelize, DataTypes) {
    var ExerciseSecretVideo = sequelize.define('ExerciseSecretVideo', {
        'id': {
            'type': DataTypes.INTEGER.UNSIGNED,
            'allowNull': false,
            'unique': true,
            'primaryKey': true,
            'autoIncrement': true
        },
        'url': {
            'type': DataTypes.STRING,
            'allowNull': false
        }
    }, {
        'classMethods': {
            'associate': function(models) {
                ExerciseSecretVideo.belongsTo(models.Exercise);
            }
        }
    });

    return ExerciseSecretVideo;
};
