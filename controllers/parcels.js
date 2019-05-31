module.exports = {
  addParcelInfo: {
    post: (req, res) => {
      res.status(201).send("POST /parcels/addParcelInfo OK!");
    }
  },
  trackParcel: {
    get: (req, res) => {
      res.status(201).send("GET /directmessages/trackParcel OK!");
    }
  }
};
