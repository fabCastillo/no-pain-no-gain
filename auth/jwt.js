const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { User: userModel, sequelize } = require('../store/models');

passport.use(
    new Strategy({
            secretOrKey: process.env.AUTH_JWT_SECRET || 'muysecreto!',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async function(tokenPayload, done) {
            try {
                let user = await userModel.findOne({
                    where: { id: tokenPayload.id },
                    attributes: {
                        exclude: [
                            'createdAt',
                            'updatedAt'
                        ]
                    },
                    
                });

                if (!user) {
                    return done({ message: 'unauthorized!!' }, false);
                }

                user = user.toJSON();

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
                            userId: user.id
                        },
                        type: sequelize.QueryTypes.SELECT
                });
                
                done(null, {
                    ...user, 
                    profile: scopes[0].profile, 
                    scopes
                });

            } catch (error) {
                return done(error);
            }
        }
    )
);