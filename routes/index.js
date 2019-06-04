var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  console.log("This is localhost:3001/");
  res.render("index", { title: "Express" });
});
router.get("/login", function(req, res, next) {
  console.log("This is localhost:3001/login");
  res.render("index", { title: "Express" });
});
module.exports = router;
