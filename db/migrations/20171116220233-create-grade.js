'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return [
            queryInterface.createTable('grade', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                grade: {
                    type: Sequelize.FLOAT
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
            })
        ];
    },
    down: (queryInterface) => {
        return [
            queryInterface.dropTable('grade')
        ];
    }
};