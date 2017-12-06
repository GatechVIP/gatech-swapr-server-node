'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true
        }
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
    },
    last_name: {
       type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
    },
    password: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
    },
    token: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
    },
    role: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          notEmpty: true,
          isEmail: true
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    deleted_at: {
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Session, {
          as: 'sessions',
          through: models.SessionEnrollment,
          foreignKey: 'user_id',
          otherKey: 'session_id'
        });
      }
    },
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'user'
  });
  return User;
};