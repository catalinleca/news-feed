'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [{
      id: 1,
      name: "testuser",
      companyId: 7,
      username: "test",
      password: "f8ff32b60776c5b697a53f596e67ad867660f44802bd3d31dc97a63f00f58f919f0eb6d2cf9122d01e74e694652491f36f8677de4af5a60a9d8e21de1acf70f3.8328d95914d72385", // 12345678
      email: "test@mail.com",
      phone: "758931519",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      name: "testuser2",
      companyId: 7,
      username: "test2",
      password: "f8ff32b60776c5b697a53f596e67ad867660f44802bd3d31dc97a63f00f58f919f0eb6d2cf9122d01e74e694652491f36f8677de4af5a60a9d8e21de1acf70f3.8328d95914d72385", // 12345678
      email: "test2@mail.com",
      phone: "758931519",
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
