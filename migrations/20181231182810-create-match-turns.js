"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("MatchTurns", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      lyricIDs: {
        type: Sequelize.ARRAY({
          type: Sequelize.INTEGER
        }),
        allowNull: false,
        defaultValue: []
      },
      MatchId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Matches", // name of Target model
          key: "id" // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      PlayerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Players", // name of Target model
          key: "id" // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      endedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM({
          values: ["enqueued", "active", "ended"]
        }),
        allowNull: false,
        defaultValue: "enqueued"
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("MatchTurns");
  }
};
