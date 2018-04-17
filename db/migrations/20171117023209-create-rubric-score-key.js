'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('rubric_score_key', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            rubric_item_num: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            rating: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    allowEmpty: false
                }
            },
            score: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deleted_at: {
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('rubric_score_key');
    }
};