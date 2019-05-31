module.exports = {
  list: {
    get: (req, res) => {
      res.status(201).send("GET /travels/list OK!");
    }
  },
  detail: {
    get: (req, res) => {
      res.status(201).send("GET /travels/detail OK!");
    }
  },
  create: {
    post: (req, res) => {
      res.status(201).send("POST /travels/create OK!");
    }
  }
};
