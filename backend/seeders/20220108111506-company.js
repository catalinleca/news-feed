'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Company", [{
      id: 1,
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      name: "Romaguera-Jacobson",
      catchPhrase: "Face to face bifurcated interface",
      bs: "e-enable strategic applications",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      name: "Robel-Corkery",
      catchPhrase: "Multi-tiered zero tolerance productivity",
      bs: "transition cutting-edge web services",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 4,
      name: "Keebler LLC",
      catchPhrase: "User-centric fault-tolerant solution",
      bs: "revolutionize end-to-end systems",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 5,
      name: "Considine-Lockman",
      catchPhrase: "Synchronised bottom-line interface",
      bs: "e-enable innovative applications",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 6,
      name: "Abernathy Group",
      catchPhrase: "Implemented secondary concept",
      bs: "e-enable extensible e-tailers",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 7,
      name: "Yost and Sons",
      catchPhrase: "Switchable contextually-based project",
      bs: "aggregate real-time technologies",
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Company', null, {});
  }
};
