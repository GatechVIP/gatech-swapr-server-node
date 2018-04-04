'use strict';
module.exports = (sequelize, DataTypes) => {
    var AssignmentGradeInfo = sequelize.define('AssignmentGradeInfo', {
        rubric_item_num: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_instructor_res: {
            type: DataTypes.BOOLEAN,
            allowNull: false
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
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'assignment_grade_info'
    });

    AssignmentGradeInfo.associate = function(models) {
        AssignmentGradeInfo.belongsTo(models.User, {foreignKey: 'user_id'});
        AssignmentGradeInfo.belongsTo(models.Session, {foreignKey: 'session_id'});
        AssignmentGradeInfo.belongsTo(models.Assignment, {foreignKey: 'assignment_id'});
    };

    return AssignmentGradeInfo;
};
