'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permissions_Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Permissions_Profiles.init({
    permissionId: DataTypes.INTEGER,
    profileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Permissions_Profiles',
  });
  return Permissions_Profiles;
};