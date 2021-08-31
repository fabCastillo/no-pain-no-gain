const auth = require('../auth');
const error = require('../../../utils/error');

module.exports = class City {
    
    constructor({ Cities, Sedes, sequelize } ) {
        this.cityModel = Cities;
        this.sedeModel = Sedes;
        this.sequelize = sequelize;
    }
  
    async list(){

        const result = await this.sequelize.query(`
            SELECT 
                users.document,
                CONCAT(users.firstName, " ", users.lastName) AS "fullName",
                auths.userName,
                p.profile,
                sedes.sede,
                cities.city
            FROM users
            INNER JOIN auths ON ( users.authId = auths.id )
            INNER JOIN profiles p ON ( users.profileId = p.id )
            RIGHT JOIN  sedes ON ( users.sedeId = sedes.id )
            INNER JOIN cities ON ( sedes.cityId = cities.id )
            ORDER BY cities.city
        `);
        
        const OrderJson = (value) => {
            
            const cities = value;
            let city = {};
            
            cities.forEach((element, index) => {

                if (!city[element.city]) {
                    city[element.city]= { sede: {} }
                }
        
                if (!city[element.city]['sede'][element.sede]) {
                    city[element.city]['sede'][element.sede] =  [ ]
                }
        
                if (city[element.city]['sede'][element.sede]) {
                    city[element.city]['sede'][element.sede].push(element.userName)
                }
        
            });

            return city;
        }

        const data2 = OrderJson(result[0]);

        return data2

    };

    async get( city ){
       
        return this.cityModel.findAll({
            attributes: {
                exclude: [
                    "id",
                    "createdAt",
                    "updatedAt"
                ]
            },
            include: [{
                model: this.sedeModel,
                as: "sedes",
                attributes: ["sede"]
            }],
            where: { city , active: true }
        });

    };

    async register({ city }) {

        city = city.toLowerCase();

        const exists = await this.get( city );
        if (exists.length) {
            throw error('Ciudad ya registrada', 401);
        }

        const registered = await this.cityModel.create({city});

        return JSON.parse(JSON.stringify(registered));

    };

    async update({ city }){
        city = city.toLowerCase();
        const exists = await this.get( city );
        if (!exists.length) {
            throw error('No existe la Ciudad', 401);
        }
        
        this.cityModel.update( city, {where: { city , active: true } });

        return "Actualizados correctamente";

    };

    async remove( city ){
        city = city.toLowerCase();

        const exists = await this.get( city );
        
        if (!exists.length) {
            throw error('No existe la Ciudad', 401);
        }

        await this.cityModel.update( { active: false }, { where: { city } } );

        return "Eliminado exitosamente";

    };

};