const auth = require('../auth');
const error = require('../../../utils/error');

module.exports = ( { User, Auth } ) => {
  
    async function list(){

        return User.findAll({
            attributes: {
                exclude: [
                    "id",
                    "updatedAt",
                    "authId",
                    "AuthId"
                ]
            }
        });

    };

    async function get( document ){

        return User.findAll({
            attributes: {
                exclude: [
                    "id",
                    "active",
                    "AuthId",
                    "authId",
                    "updatedAt",
                ]
            },
            include: [{
                model: Auth,
                attributes: ["userName"]
            }],
            where: { document, active: true }
        });

    };

    async function get_credentials(username) {

        return Auth.findAll({
            attributes: ['id'],
            where: { username, active: true }
        });

    }

    async function register(body) {
        
        const user_exists = await get( body.document );
        if (user_exists.length) {
            throw error('Usuario ya registrado', 401);
        }

        let user = {
            
            document: body.document,
            firstName: body.firstName,
            lastName: body.lastName,

        }

        let credentials = {
            userName: body.username,
            email: body.email,
            password: body.password
        }

        const credentials_exists = await get_credentials ( body.username );
        if (credentials_exists.length) {
            throw error('userName ya en uso', 401);
        }

        const credentials_registered = await Auth.create(credentials)
        let id_credential = JSON.parse(JSON.stringify(credentials_registered)).id;
        
        user.authId = id_credential
        const user_registered = await User.create(user);

        return JSON.parse(JSON.stringify(user_registered));

    };

    async function update(body){
        const document = body.document;
        const user_exists = await get( body.document );
        if (!user_exists.length) {
            throw error('No existe el usuario', 401);
        }
        
        delete body.document;

        let userName = JSON.parse(JSON.stringify(user_exists[0])).Auth.userName;

        let user_update = {
            firstName: body.firstName,
            lastName: body.lastName,
        };

        let credential_update = {
            email: body.email,
            userName: body.username,
            password: body.password
        };

        Auth.update( credential_update, { where: { userName, active: true } });
        User.update( user_update, {where: { document, active: true } });

        return "Actualizados correctamente";

    };

    async function remove( document ){
        
        const user_exists = await get( document );
        if (!user_exists.length) {
            throw error('No existe el usuario', 401);
        }

        let userName_credential = JSON.parse(JSON.stringify(user_exists[0])).Auth.userName;
        await Auth.update( { active: false }, { where: { userName: userName_credential } } );
        await User.update( { active: false }, { where: { document } } );

        return "Eliminado exitosamente";

    };

    function sum(a, b) {
        return a + b;
    }

    return {
        list,
        get,
        register,
        update,
        remove,
        sum
    };
};