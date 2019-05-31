module.exports = {
  list: {
    get: (req, res) => {
      res.status(201).send("GET /notifications/list OK!");
    }
  }
};
