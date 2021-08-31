'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Profile extends Model {

        static associate(models) {

            // define association here
            models.Profile.hasOne(models.User, {
                foreignKey: 'profileId',
                as: 'users'
            });

        }
    };
    Profile.init({
    profile: DataTypes.STRING,
    description: DataTypes.STRING
    }, {
    sequelize,
    modelName: 'Profile',
    });
    return Profile;
};