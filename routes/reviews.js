var express = require("express");
var router = express.Router();
const controllers = require("../controllers");

router.post("/addReview", controllers.reviews.addReview.post);

module.exports = router;
