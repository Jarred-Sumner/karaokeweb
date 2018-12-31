"use strict";

module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define(
    "Player",
    {
      device_token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      lastHeartbeat: { type: DataTypes.DATE, allowNull: false },
      nickname: { type: DataTypes.STRING, allowNull: true },
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }
    },
    {}
  );
  Player.associate = function(models) {
    // associations can be defined here
  };
  return Player;
};
