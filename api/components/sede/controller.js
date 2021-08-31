const error = require('../../../utils/error');

module.exports = class Sede {
    constructor({ Sedes, Cities, User }) {
        
        this.sedeModel = Sedes;
        this.cityModel = Cities;
        this.userModel = User;
    }
  
    async list(){

        return this.sedeModel.findAll({
            attributes: {
                exclude: [
                    "id",
                    "cityId",
                    "CityId",
                    "createdAt",
                    "updatedAt"
                ]
            },
            include: [{
                model: this.userModel,
                as: "users",
                attributes: ["firstName"]
            }]
        });

    };

    async get( sede ){

        return this.sedeModel.findAll({
            attributes: {
                exclude: [
                    "id",
                    "cityId",
                    "CityId",
                    "createdAt",
                    "updatedAt"
                ]
            },
            include: [{
                model: this.cityModel,
                attributes: ["city"]
            }],
            where: { sede, active: true }
        });

    };

    async register(body) {
        let sede = {
            sede: body.sede,
            cityId: body.cityId
        };

        const exists = await this.get( body.sede );
        if (exists.length) {
            throw error('Sede ya registrada', 401);
        }

        const registered = await this.sedeModel.create(sede, {
            attributes: {
                exclude: ['createdAt']
            }
        });

        return JSON.parse(JSON.stringify(registered));

    };

    async update(body){
        let sede = body.sede.toLowerCase();
        const exists = await this.get( sede );
        if (!exists.length) {
            throw error('No existe la Sede', 401);
        }
        console.log(body)
        this.sedeModel.update({ cityId: body.cityId }, {where: { sede , active: 1 } });

        return "Actualizados correctamente";

    };

    async remove( sede  ){

        sede = sede.toLowerCase();

        const exists = await this.get( sede );

        if (!exists.length) {
            throw error('No existe la Ciudad', 401);
        }

        await this.sedeModel.update( { active: false }, { where: { sede } } );

        return "Eliminado exitosamente";

    };

};