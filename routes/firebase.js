var express = require("express");
var router = express.Router();
const controllers = require("../controllers");

router.post("/token", controllers.firebase.token.post);

module.exports = router;
