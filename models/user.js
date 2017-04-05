module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        'id': {
            'type': DataTypes.INTEGER.UNSIGNED,
            'allowNull': false,
            'unique': true,
            'primaryKey': true,
            'autoIncrement': true
        },
        'username': {
            'type': DataTypes.STRING,
            'allowNull': false,
            'unique': true
        },
        'first_name': DataTypes.STRING,
        'last_name': DataTypes.STRING,
        'password': DataTypes.STRING,
        'token': DataTypes.STRING,
        'role': DataTypes.STRING,
        'email': DataTypes.STRING
    });

    return User;
};
