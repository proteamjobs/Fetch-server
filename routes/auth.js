var express = require("express");
var router = express.Router();
const controllers = require("../controllers");
// const passport = require("passport");

// TODO 제거 예정
// router.get("/", function(req, res, next) {
//   console.log("This is localhost:3001/auth/");
//   // res.render("index", { title: "Express" });
// });

router.get("/google", controllers.auth.google.get);
router.get("/google/callback", controllers.auth.google.callback.get);
router.get("/facebook", controllers.auth.facebook.get);
router.get("/check", controllers.auth.check.get);

module.exports = router;
