const error = require('../../../utils/error');

module.exports = class User {

    constructor ({ User, Auth, Sedes, Cities, Profile }) {

        this.userModel = User;
        this.authModel = Auth;
        this.sedeModel = Sedes;
        this.cityModel = Cities;
        this.profileModel = Profile;

    };

    async list(){

        return this.userModel.findAll({
            attributes: {
                exclude: [
                    "id",
                    "updatedAt",
                    "authId",
                    "AuthId",
                    "profileId",
                    "ProfileId",
                    "sedeId",
                    "SedeId",
                ]
            }
        });

    };

    async get( document ){

        return this.userModel.findAll({
            attributes: {
                exclude: [
                    "id",
                    "active",
                    "AuthId",
                    "authId",
                    "updatedAt",
                    "profileId",
                    "ProfileId",
                    "sedeId",
                    "SedeId",
                ]
            },
            include: [{
                model: this.authModel,
                attributes: ["userName"]
            },{
                model: this.profileModel,
                attributes: ["profile"]
            },{
                model: this.sedeModel,
                attributes: ["sede"],
                include: [{
                    model: this.cityModel,
                    attributes: ["city"],
                    
                }]
            }],
            where: { document: document, active: true }
        });

    };

    async get_credentials(username) {

        return this.authModel.findAll({
            attributes: ['id'],
            where: { username, active: true }
        });

    }

    async register(body) {
        
        const user_exists = await this.get( body.document );
        if (user_exists.length) {
            throw error('Usuario ya registrado', 401);
        }

        let user = {
            
            document: body.document,
            firstName: body.firstName,
            lastName: body.lastName,
            profileId: body.profileId,
            sedeId: body.sedeId

        }

        let credentials = {
            userName: body.username,
            email: body.email,
            password: body.password
        }

        const credentials_exists = await this.get_credentials ( body.username );
        if (credentials_exists.length) {
            throw error('userName ya en uso', 401);
        }

        const credentials_registered = await this.authModel.create(credentials)
        let id_credential = JSON.parse(JSON.stringify(credentials_registered)).id;
        
        user.authId = id_credential
        const user_registered = await this.userModel.create(user);

        return JSON.parse(JSON.stringify(user_registered));

    };

    async update(body){

        const document = body.document;
        const user_exists = await this.get( body.document );
        if (!user_exists.length) {
            throw error('No existe el usuario', 401);
        }
        
        delete body.document;

        let userName = JSON.parse(JSON.stringify(user_exists[0])).Auth.userName;

        let user_update = {
            firstName: body.firstName,
            lastName: body.lastName
        };

        let credential_update = {
            email: body.email,
            userName: body.username,
            password: body.password
        };

        this.authModel.update( credential_update, { where: { userName, active: true } });
        this.userModel.update( user_update, {where: { document, active: true } });

        return "Actualizados correctamente";

    };

    async remove( document ){
        
        const user_exists = await this.get( document );
        if (!user_exists.length) {
            throw error('No existe el usuario', 401);
        }

        let userName_credential = JSON.parse(JSON.stringify(user_exists[0])).Auth.userName;
        await this.authModel.update( { active: false }, { where: { userName: userName_credential } } );
        await this.userModel.update( { active: false }, { where: { document } } );

        return "Eliminado exitosamente";

    };

};