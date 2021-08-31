'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Permissions_Profiles', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        permissionId: {
            type: Sequelize.INTEGER
        },
        profileId: {
            type: Sequelize.INTEGER
        }
    },{
        timestamps: false
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Permissions_Profiles');
  }
};