"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("Players", {
        deviceToken: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        lastHeartbeat: { type: Sequelize.DATE, allowNull: false },
        nickname: { type: Sequelize.STRING, allowNull: true },
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
      .then(() => {
        return queryInterface.addIndex("Players", {
          fields: ["deviceToken"],
          unique: true
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Players");
  }
};
