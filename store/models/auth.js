'use strict';

const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Auth extends Model {

        static associate(models) {

            models.Auth.hasOne(models.User, {
                foreignKey: 'authId',
                as: 'users'
            });

        }

    };
    Auth.init({
        userName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Auth',
        hooks: {
            beforeCreate: async(auth) => {
                const hashedPassword = await bcrypt.hash(auth.password, 5);
                auth.password = hashedPassword;
            },
    
            beforeBulkUpdate: async(auth) => {
              if(auth.attributes.password) {
                const hashedPassword = await bcrypt.hash(auth.attributes.password, 5);
                auth.attributes.password = hashedPassword;
              }
            }
        }
    });
    return Auth;
};