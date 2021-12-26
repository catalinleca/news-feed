'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Company", [{
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, {
      name: "Romaguera-Jacobson",
      catchPhrase: "Face to face bifurcated interface",
      bs: "e-enable strategic applications",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, {
      name: "Robel-Corkery",
      catchPhrase: "Multi-tiered zero tolerance productivity",
      bs: "transition cutting-edge web services",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, {
      name: "Keebler LLC",
      catchPhrase: "User-centric fault-tolerant solution",
      bs: "revolutionize end-to-end systems",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, {
      name: "Considine-Lockman",
      catchPhrase: "Synchronised bottom-line interface",
      bs: "e-enable innovative applications",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, {
      name: "Abernathy Group",
      catchPhrase: "Implemented secondary concept",
      bs: "e-enable extensible e-tailers",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, {
      name: "Yost and Sons",
      catchPhrase: "Switchable contextually-based project",
      bs: "aggregate real-time technologies",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Company', null, {});

  }
};
