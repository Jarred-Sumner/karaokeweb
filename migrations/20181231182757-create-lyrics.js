"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Lyrics", {
      body: { type: Sequelize.STRING, allowNull: false },
      startOffset: { type: Sequelize.FLOAT, allowNull: false },
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
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
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Lyrics");
  }
};
