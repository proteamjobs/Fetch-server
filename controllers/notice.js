module.exports = {
  detail: {
    get: (req, res) => {
      res.status(201).send("GET /notice/detail OK!");
    }
  }
};
