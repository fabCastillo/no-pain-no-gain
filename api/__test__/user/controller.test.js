const { expect } = require('@jest/globals');
const controller = require('../../components/user/controller');
const database = require('../../../store/models');

let User = new controller(database);

describe('GET user/controller.js', () => {

    test('Obtener Objeto con función List', async () => {

        let user = await User.list();

        let json = {
            document: 123,
            firstName: 'prueba 1',
            lastName: 'test 1',
            active: true
        }

        delete user[0].dataValues.createdAt

        expect( user[0].dataValues ).toStrictEqual(json);

    });

    test('Obtener Id del usuario', async () => {

        let username = 'superman';

        let user = await User.get_credentials(username);

        expect( user[0].dataValues ).toStrictEqual({ id: 3});

    });

})