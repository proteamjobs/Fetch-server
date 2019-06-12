const db = require("../models");

module.exports = {
  detail: {
    get: (req, res) => {
      res.status(201).send("GET /notice/detail OK!");
    }
  },
  create: {
    post: (req, res) => {
      console.log(req.body);
      db.notices
        .create({
          title: req.body.title,
          message: req.body.message
        })
        .then(() => {
          res.status(201).send("POST /notice/create OK!");
        });
    }
  }
};
