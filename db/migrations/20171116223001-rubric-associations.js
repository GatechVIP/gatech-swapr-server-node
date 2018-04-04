'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('rubric', 'exercise_id', {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'exercise',
                key: 'id'
            }
        });
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('rubric', 'exercise_id');
    }
};
