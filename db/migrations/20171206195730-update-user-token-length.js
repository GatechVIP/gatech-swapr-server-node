'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn('user', 'token', {type: Sequelize.STRING(512)});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn('user', 'token', {type: Sequelize.STRING});
    }
};
