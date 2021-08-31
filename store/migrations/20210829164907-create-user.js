'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      document: {
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      authId: {
        type: Sequelize.INTEGER,
        ondDelete: 'CASCADE',
        references: {
            model: 'Auths',
            key: 'id'
        }
      },
      profileId: {
        type: Sequelize.INTEGER,
        ondDelete: 'CASCADE',
        references: {
            model: 'Profiles',
            key: 'id'
        }
      },
      sedeId: {
        type: Sequelize.INTEGER,
        ondDelete: 'CASCADE',
        references: {
            model: 'Sedes',
            key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};