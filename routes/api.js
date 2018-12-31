var express = require("express");
var router = express.Router();
import { Lyric, Song, Sequelize, Match, MatchPlayer, Player } from "../models";
import { addMinutes, isPast } from "date-fns";

const MATCH_MAX_WAIT_MINUTES = 10;
const LOBBY_SIZE = 6;

const matchRoom = match => `match-${match.channel}`;

function getRandomSongId(max = 2) {
  return Math.floor(Math.random() * Math.floor(max));
}

const fail = (res, status = 500) => err => {
  res.status(status);

  if (err) {
    console.error(err);
    res.send({ error: err.message });
  } else {
    res.send({ error: "Something went wrong" });
  }
};

const lyricJson = lyric => {
  return {
    body: lyric.body,
    id: lyric.id,
    startOffset: lyric.startOffset,
    object: "lyric"
  };
};

const songLyrics = async song => {
  const lyrics = await song.getLyrics({
    order: ["startOffset"]
  });

  return lyrics.map(lyricJson);
};

const songJson = async song => {
  return {
    id: song.id,
    name: song.name,
    artist: song.artist,
    object: "song",
    lyrics: await songLyrics(song)
  };
};

const playerJson = player => {
  return {
    id: player.id,
    nickname: player.nickname,
    object: "player"
  };
};

const matchPlayerJson = matchPlayer => {
  return {
    id: matchPlayer.id,
    object: "match_player",
    playerStatus: matchPlayer.playerStatus,
    player: playerJson(matchPlayer.player)
  };
};

const matchJson = async match => {
  return {
    id: match.id,
    object: "match",
    status: match.status,
    players: (await MatchPlayer.findAll({ where: { MatchId: match.id } })).map(
      matchPlayerJson
    ),
    song: await songJson(await match.getSong())
  };
};

const getCurrentMatch = async player => {
  const matches = await player.getMatches({
    where: {
      status: {
        [Sequelize.Op.in]: ["lobby", "ingame"]
      }
    }
  });

  return matches[0] || null;
};

const getLobbyMatch = () => {
  return Match.findOne({
    where: {
      status: "lobby"
    },
    order: ["createdAt"]
  });
};

const createMatch = () => {
  return Match.create({
    status: "lobby",
    SongId: getRandomSongId(),
    lobbyExpiresAt: addMinutes(new Date(), MATCH_MAX_WAIT_MINUTES)
  });
};

const findOrMatchmake = async player => {
  const currentMatch = await getCurrentMatch(player);

  if (currentMatch) {
    return currentMatch;
  }

  const lobbyMatch = await getLobbyMatch();
  if (lobbyMatch) {
    await lobbyMatch.addPlayer(player);

    const playersCount = await lobbyMatch.getPlayers().length;

    if (playersCount >= LOBBY_SIZE - 1 || isPast(lobbyMatch.lobbyExpiresAt)) {
      await lobbyMatch.update({
        status: "ingame"
      });
      await lobbyMatch.reload();
    }

    return lobbyMatch;
  }

  const match = await createMatch();
  await match.addPlayer(player);

  return match;
};

export default io => {
  router.get("/songs/:id", (req, res) => {
    Song.findByPk(req.params.id).then(async song => {
      if (!song) {
        res.status(404);
        return res.send(null);
      }

      res.send(await songJson(song));
    }, fail(res));
  });

  router.get("/songs", (req, res) => {
    Song.findAll().then(songs => {
      Promise.all(songs.map(songJson)).then(res.send, fail);
    }, fail(res));
  });

  router.get("/match", (req, res) => {
    getCurrentMatch(req.player).then(async match => {
      if (match) {
        if (match.status === "lobby" && match.lobbyExpiresAt > new Date()) {
          await match.update({
            status: "ended"
          });
          await match.reload();
          io.to(matchRoom(match)).emit("match", await matchJson(match));
        }

        res.send(await matchJson(match));
      } else {
        res.send(null);
      }
    }, fail(res));
  });

  router.post("/match", (req, res) => {
    findOrMatchmake(req.player).then(async match => {
      if (match) {
        const json = await matchJson(match);
        io.to(matchRoom(match)).emit("match", json);
        res.send(json);
      } else {
        res.send(null);
      }
    });
  });

  io.on("connection", socket => {
    let SOCKETS_TO_DEVICES = {};
    socket.on("identify", async deviceToken => {
      SOCKETS_TO_DEVICES[socket.id] = deviceToken;

      const player = await Player.findOne({
        where: {
          deviceToken
        }
      });

      const match = await getCurrentMatch(player);
      const matchPlayer = await MatchPlayer.findOne({
        where: {
          PlayerId: player.id,
          MatchId: match.id
        }
      });

      matchPlayer.update({
        playerStatus: "actve"
      });

      if (match) {
        io.in(matchRoom()).emit("match", await matchJson(match));
        socket.join(matchRoom(match.channel));
      }
    });

    socket.on("disconnect", async () => {
      const deviceToken = SOCKETS_TO_DEVICES[socket.id];
      if (deviceToken) {
        const player = await Player.findOne({
          where: {
            deviceToken
          }
        });

        MatchPlayer.update(
          {
            playerStatus: "inactive"
          },
          {
            where: {
              playerStatus: "active",
              PlayerId: player.id
            }
          }
        );

        io.in(matchRoom()).emit("match", await matchJson(match));
      }
    });
  });

  return router;
};
