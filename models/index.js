"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

export const Player = sequelize.define("Players", {
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
});

export const Song = sequelize.define("Songs", {
  name: { type: Sequelize.STRING, allowNull: false },
  artist: { type: Sequelize.STRING, allowNull: false },
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
});

export const Lyric = sequelize.define("Lyrics", {
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
  }
});

Lyric.belongsTo(Song);
Song.hasMany(Lyric);

export const Match = sequelize.define("Matches", {
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
  status: {
    type: Sequelize.ENUM({
      values: ["lobby", "ingame", "ended"]
    }),
    allowNull: false,
    defaultValue: "lobby"
  },
  lobbyExpiresAt: {
    allowNull: false,
    type: Sequelize.DATE
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

export const MatchPlayer = sequelize.define("MatchPlayers", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  playerStatus: {
    allowNull: false,
    type: Sequelize.ENUM({
      values: ["inactive", "active"]
    }),
    defaultValue: "inactive"
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
  }
});

Match.belongsTo(Song);
Match.belongsToMany(Player, { through: "MatchPlayers" });
Player.belongsToMany(Match, { through: "MatchPlayers" });

export const MatchTurn = sequelize.define("MatchTurns", {
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

MatchTurn.belongsTo(Player);
Player.hasMany(MatchTurn);
Match.hasMany(MatchTurn);
MatchTurn.belongsTo(Match);

Match.hasMany(MatchTurn);

export { sequelize, Sequelize };
