const { expect } = require('@jest/globals');
const controller = require('../../components/auth/controller');
const database = require('../../../store/models');

let Auth = new controller(database);

describe('GET user/controller.js', () => {

    test('Obtener ingreso', async () => {

        let login = {
            "username_or_email": "batman",
            "password": "12345"
        }

        let user = await Auth.login(login);

        expect(user.length === 0).toBe(false)

    });

})