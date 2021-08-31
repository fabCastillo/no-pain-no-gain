'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {

        let profiles = [
            { profile: "Administrador", description: 'Total Control over all' },
            { profile: "normal", description: 'Only Register' }
        ];

        await queryInterface.bulkInsert('Profiles', profiles, {});
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Profiles', null, {});
    }
};
