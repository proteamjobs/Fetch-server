var express = require("express");
var router = express.Router();
const controllers = require("../controllers");

/* GET users listing. */
router.get("/list", controllers.notifications.list.get);

module.exports = router;
