"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "JamesRhodes",
          password: "skymissle",
          email: "warmachine@avengers.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "PeterParker",
          password: "scarletspider",
          email: "spider-man@avengers.com",
          createdAt: new Date(),
          updatedAt: new Date(),          
        }
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
