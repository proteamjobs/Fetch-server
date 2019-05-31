const fakeDataOrdersList = require("../fakeData/fakeDataOrdersList.js");

module.exports = {
  list: {
    get: (req, res) => {
      if (req.query.max) {
        res.status(200).send(fakeDataOrdersList);
      } else {
        res.status(200).send("GET /orders/list OK!");
      }
    }
  },
  detail: {
    get: (req, res) => {
      res.status(200).send("GET /orders/detail OK!");
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
