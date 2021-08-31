'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {

        let permissionsProfile = [

            { permissionId: 1, profileId: 1 },
            { permissionId: 2, profileId: 1 },
            { permissionId: 3, profileId: 1 },
            { permissionId: 4, profileId: 1 },
            { permissionId: 5, profileId: 1 },
            { permissionId: 6, profileId: 1 },
            { permissionId: 7, profileId: 1 },
            { permissionId: 8, profileId: 1 },
            { permissionId: 9, profileId: 1 },
            { permissionId: 10, profileId: 1 },
            { permissionId: 11, profileId: 1 },
            { permissionId: 12, profileId: 1 },
            { permissionId: 13, profileId: 1 },
            { permissionId: 14, profileId: 1 },
            { permissionId: 15, profileId: 1 },
            { permissionId: 8, profileId: 2 }
        ];

        await queryInterface.bulkInsert('Permissions_profiles', permissionsProfile, {});
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Permissions_profiles', null, {});
    }
};