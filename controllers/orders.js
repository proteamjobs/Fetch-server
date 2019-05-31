module.exports = {
  list: {
    get: (req, res) => {
      res.status(201).send("GET /orders/list OK!");
    }
  },
  detail: {
    get: (req, res) => {
      res.status(201).send("GET /orders/detail OK!");
    }
  },
  create: {
    post: (req, res) => {
      res.status(201).send("POST /orders/create OK!");
    }
  },
  addapplier: {
    post: (req, res) => {
      res.status(201).send("POST /orders/addapplier OK!");
    }
  },
  pickfetcher: {
    post: (req, res) => {
      res.status(201).send("POST /orders/pickfetcher OK!");
    }
  }
};
