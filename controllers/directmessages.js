const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../config/jwtConfig");
const db = require("../models");

module.exports = {
  list: {
    get: async (req, res) => {
      passport.authenticate("jwt", { session: false }, (err, user, info) => {
        console.log(user);
      });
      res.status(201).send("GET /directmessages/list OK!");
    }
  },
  detail: {
    get: (req, res) => {
      res.status(201).send(`GET /directmessages/detail OK! ${req.query}`);
    }
  },
  send: {
    post: (req, res) => {
      res.status(201).send("POST /directmessages/send OK!");
    }
  }
};
