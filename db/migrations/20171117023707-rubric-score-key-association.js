'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('rubric_score_key', 'exercise_id', {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'exercise',
                key: 'id'
            }
        });
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('rubric_score_key', 'exercise_id');
    }
};
