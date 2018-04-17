'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

        return [
            queryInterface.addColumn('exercise_secret_video', 'exercise_id', {
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

        return queryInterface.removeColumn('exercise_secret_video', 'exercise_id');
    }
};
