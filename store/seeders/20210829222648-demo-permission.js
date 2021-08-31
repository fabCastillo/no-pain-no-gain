'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {

        let permissions = [

            {
                slug: 'read_user',
                name: 'Leer usuario propio'
            },
            {
                slug: 'update_user',
                name: 'Actualizar usuario propio'
            },
            {
                slug: 'delete_user',
                name: 'Eliminar usuario propio'
            },
            {
                slug: 'read_sede',
                name: 'Leer Sede'
            },
            {
                slug: 'create_sede',
                name: 'Crear Sede'
            },
            {
                slug: 'update_sede',
                name: 'Actualizar Sede'
            },
            {
                slug: 'delete_sede',
                name: 'Elminar Sede'
            },
            {
                slug: 'read_users',
                name: 'Leer usuarios'
            },
            {
                slug: 'create_users',
                name: 'Crear usuarios'
            },
            {
                slug: 'update_users',
                name: 'Actualizar usuarios'
            },
            {
                slug: 'delete_users',
                name: 'Elminar usuarios'
            },
            {
                slug: 'read_cities',
                name: 'Leer Ciudades'
            },
            {
                slug: 'create_cities',
                name: 'Crear Ciudades'
            },
            {
                slug: 'update_cities',
                name: 'Actualizar Ciudades'
            },
            {
                slug: 'delete_cities',
                name: 'Elminar Ciudades'
            },
            {
                slug: 'Login',
                name: 'Iniciar sesión'
            }
        ];

        await queryInterface.bulkInsert('Permissions', permissions, {});
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Permissions', null, {});
    }
};