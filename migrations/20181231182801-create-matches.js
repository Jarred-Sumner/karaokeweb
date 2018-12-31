"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
      .then(() =>
        queryInterface.createTable("Matches", {
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
          },
          channel: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.literal("uuid_generate_v4()")
          },
          lobbyExpiresAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          status: {
            type: Sequelize.ENUM({
              values: ["lobby", "ingame", "ended"]
            }),
            allowNull: false,
            defaultValue: "lobby"
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          SongId: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: "Songs", // name of Target model
              key: "id" // key in Target model that we're referencing
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
          }
        })
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Matches");
  }
};
