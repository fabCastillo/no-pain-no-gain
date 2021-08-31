'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {

        const date = new Date;
        let users = [
            { document: 123, firstName: 'prueba 1', lastName: 'test 1', active: true, authId: 1, profileId: 1, sedeId: 1, createdAt: date, updatedAt:  date},
            { document: 456, firstName: 'prueba 2', lastName: 'test 2', active: true, authId: 2, profileId: 1, sedeId: 2, createdAt: date, updatedAt:  date},
            { document: 789, firstName: 'prueba 4', lastName: 'test 4', active: true, authId: 3, profileId: 2, sedeId: 2, createdAt: date, updatedAt:  date},
            { document: 987, firstName: 'prueba 5', lastName: 'test 5', active: true, authId: 4, profileId: 2, sedeId: 1, createdAt: date, updatedAt:  date},
            { document: 654, firstName: 'prueba 6', lastName: 'test 6', active: true, authId: 5, profileId: 2, sedeId: 2, createdAt: date, updatedAt:  date},
            { document: 321, firstName: 'prueba 7', lastName: 'test 7', active: true, authId: 6, profileId: 2, sedeId: 1, createdAt: date, updatedAt:  date}
        ];

        await queryInterface.bulkInsert('Users', users, {});
        
    },

    down: async (queryInterface, Sequelize) => {

        await queryInterface.bulkDelete('Users', null, {});

    }
};
