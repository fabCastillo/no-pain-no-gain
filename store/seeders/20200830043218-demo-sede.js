'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    const date = new Date;

    let sedes = [
        { sede: "Campin", cityId: 1, createdAt: date, updatedAt:  date},
        { sede: "Box-pin",  cityId: 1, createdAt: date, updatedAt:  date},
        { sede: "Sede-K",  cityId: 1, createdAt: date, updatedAt:  date},
        { sede: "MultyB",  cityId: 1, createdAt: date, updatedAt:  date},
        { sede: "Yox Defensi",  cityId: 1, createdAt: date, updatedAt:  date},
        { sede: "Halpines",  cityId: 2, createdAt: date, updatedAt:  date},
        { sede: "Fist Candela",  cityId: 2, createdAt: date, updatedAt:  date},
        { sede: "Agro Exterior",  cityId: 2, createdAt: date, updatedAt:  date},
        { sede: "Kit Boxing",  cityId: 1, createdAt: date, updatedAt:  date}
    ];

    await queryInterface.bulkInsert('Sedes', sedes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Sedes', null, {});
  }
};
