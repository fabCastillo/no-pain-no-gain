'use strict';

const bcrypt = require('bcrypt');

module.exports = {

    up: async(queryInterface, Sequelize) => {

        const pass = await bcrypt.hash('12345', 5);
        let auths = [
            { username: 'batman', email: 'batman@dc.com.co', password: pass, createdAt: new Date, updatedAt: new Date },
            { username: 'ironman', email: 'ironman@marvel.com.co', password: pass, createdAt: new Date, updatedAt: new Date },
            { username: 'superman', email: 'superman@dc.com.co', password: pass, createdAt: new Date, updatedAt: new Date },
            { username: 'flash', email: 'flash@dc.com.co', password: pass, createdAt: new Date, updatedAt: new Date },
            { username: 'arrow', email: 'arrow@dc.com.co', password: pass, createdAt: new Date, updatedAt: new Date },
            { username: 'spiderman', email: 'spiderman@marvel.com.co', password: pass, createdAt: new Date, updatedAt: new Date },
            { username: 'capitán', email: 'capitan@marvel.com.co', password: pass, createdAt: new Date, updatedAt: new Date }
        ];

        await queryInterface.bulkInsert('Auths', auths, {});

    },

    down: async(queryInterface, Sequelize) => {

        await queryInterface.bulkDelete('Auths', null, {});
        
    }
};