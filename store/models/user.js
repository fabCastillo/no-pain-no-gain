'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {

        static associate(models) {

            // User tiene una Authentication
            models.User.belongsTo(models.Auth);
            models.User.belongsTo(models.Profile);
            models.User.belongsTo(models.Sedes);

        }

    };
    User.init({
        document: DataTypes.INTEGER,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
        authId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'User',
    });

    return User;

};