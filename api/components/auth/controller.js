const auth = require('../../../auth');
const bcrypt = require('bcrypt');
const error = require('../../../utils/error');
const { Op } = require('sequelize');

module.exports = function({ Auth, User, sequelize }) {

    async function login({ username_or_email, password }) {

        let dataUser = await Auth.findOne({
            include: [{
                model: User,
                as: "users"
            }],
            where: { 
                [Op.or]: [
                    { username: username_or_email  }, 
                    { email: username_or_email  }
                ]
            }
        });

        if (!dataUser) {
            throw error('Not Found', 200);
        }

        dataUser = JSON.parse(JSON.stringify(dataUser));
        

        const isValid = await bcrypt.compare(password, dataUser.password);

        if (!isValid) {
            throw error('Informacion Invalida', 401);
        }

        const scopes = await sequelize.query(`
            SELECT
                pr.profile,
                pm.name as "description",
                pm.slug
            FROM profiles pr
            INNER JOIN users ON ( pr.id = users.profileId )
            INNER JOIN permissions_profiles pp ON ( pr.id = pp.profileId )
            INNER JOIN permissions pm ON ( pp.permissionId = pm.id )
            WHERE users.id = :userId`, {
                replacements: {
                    userId: dataUser.users.id
                },
                type: sequelize.QueryTypes.SELECT
        });

        const permission = scopes.map(permission => (permission.slug));

        const user = {

            token: auth.sign({ id: dataUser.users.id }),
            user: dataUser.users,
            permission,
            rol: scopes[0].profile

        }
        
        if (scopes[0].profile !== "Administrador") {

            throw new error('Usuario no permitido', 401);

        }

        return user;
    }

    return {
        login
    }

}