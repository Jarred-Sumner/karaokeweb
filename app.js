import { sequelize, Player } from "./models";

import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import { ExpressPeerServer as PeerJS } from "peer";
import apiRouter from "./routes/api";

var peer;
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const playerMiddleware = (req, res, next) => {
  if (req.header("x-device-id")) {
    Player.findOrCreate({
      where: {
        deviceToken: req.header("x-device-id")
      },
      defaults: {
        lastHeartbeat: new Date()
      }
    }).then(
      results => {
        req.player = results[0];
        next();
      },
      err => {
        res.status(500);
        res.send({ error: "someting bad" });
        console.error(err);
      }
    );
  } else {
    res.status(401);
    res.send({ error: "missing x-device-id header" });
  }
};

app.use("/api", playerMiddleware, apiRouter);
function setupPeerServer(server) {
  peer = PeerJS(server, {
    debug: process.env.NODE_ENV === "development",
    proxied: process.env.NODE_ENV !== "development"
  });
  app.use("/api/peerjs", peer);
}

module.exports = sequelize
  .sync()
  .then(() => [app, setupPeerServer], console.error);
