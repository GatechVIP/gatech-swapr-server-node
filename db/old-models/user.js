module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        'id': {
            'type': DataTypes.INTEGER,
            'allowNull': false,
            'unique': true,
            'primaryKey': true,
            'autoIncrement': true
        },
        'username': {
            'type': DataTypes.STRING,
            'allowNull': false,
            'unique': true,
            'validate': { 'notEmpty': true }
        },
        'first_name': {
            'type': DataTypes.STRING,
            'allowNull': false,
            'validate': { 'notEmpty': true }
        },
        'last_name': {
           'type': DataTypes.STRING,
            'allowNull': false,
            'validate': { 'notEmpty': true }
        },
        'password': {
          'type': DataTypes.STRING,
            'allowNull': false,
            'validate': { 'notEmpty': true }
        },
        'token': {
          'type': DataTypes.STRING,
            'allowNull': false,
            'validate': { 'notEmpty': true }
        },
        'role': DataTypes.STRING,
        'email': {
          'type': DataTypes.STRING,
          'allowNull': false,
          'validate': {
              'notEmpty': true,
              'isEmail': true
          }
        }
    }, {
        'classMethods': {
            'associate': function(models) {
                User.belongsToMany(models.Session, {'through': models.SessionEnrollment});
            }
        }
    });

    return User;
};
