var express = require("express");
var router = express.Router();
const controllers = require("../controllers");

router.get("/list", controllers.directmessages.list.get);
router.get("/detail", controllers.directmessages.detail.get);
router.post("/send", controllers.directmessages.send.post);

module.exports = router;
