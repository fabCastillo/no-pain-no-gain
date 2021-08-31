'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

    class Cities extends Model {
        static associate(models) {
            
            models.Cities.hasOne(models.Sedes, {
                foreignKey: 'cityId',
                as: 'sedes'
            });

        }
    };
    
    Cities.init({
        city: DataTypes.STRING,
        active: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Cities',
    });

    return Cities;
};