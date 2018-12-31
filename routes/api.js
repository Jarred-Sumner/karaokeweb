var express = require("express");
var router = express.Router();
import { Lyric, Song, Sequelize, Match, MatchPlayer } from "../models";
import { addMinutes, isPast } from "date-fns";

const MATCH_MAX_WAIT_MINUTES = 10;
const LOBBY_SIZE = 6;

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

const matchJson = async match => {
  return {
    id: match.id,
    object: "match",
    status: match.status,
    players: (await match.getPlayers()).map(playerJson),
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
      res.send(await matchJson(match));
    } else {
      res.send(null);
    }
  });
});

module.exports = router;
