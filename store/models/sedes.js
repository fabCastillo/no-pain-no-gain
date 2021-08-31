'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Sedes extends Model {
        static associate(models) {
            
            // define association here
            models.Sedes.belongsTo(models.Cities);
            

            models.Sedes.hasOne(models.User, {
                foreignKey: 'sedeId',
                as: 'users'
            });
        }
    };
    Sedes.init({
        sede: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
        cityId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Sedes'
    });

    return Sedes;
};