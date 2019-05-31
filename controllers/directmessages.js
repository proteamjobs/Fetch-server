module.exports = {
  list: {
    get: (req, res) => {
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
