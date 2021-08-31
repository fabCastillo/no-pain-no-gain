'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const date = new Date;

    let cities = [
        { city: "bogota", createdAt: date, updatedAt:  date},
        { city: "medellin", createdAt: date, updatedAt:  date}
    ];

    await queryInterface.bulkInsert('Cities', cities, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cities', null, {});
  }
};
