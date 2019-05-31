module.exports = {
  addReview: {
    post: (req, res) => {
      res.status(201).send("POST /reviews/addReview OK!");
    }
  }
};
