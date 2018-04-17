'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return [
            queryInterface.addColumn('student_confidence_rating', 'user_id', {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id'
                }
            }),
            queryInterface.addColumn('student_confidence_rating', 'exercise_id', {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'exercise',
                    key: 'id'
                }
            })
        ];
    },

    down: (queryInterface) => {
        return [
            queryInterface.removeColumn('student_confidence_rating', 'user_id'),
            queryInterface.removeColumn('student_confidence_rating', 'exercise_id')
        ];
    }
};
