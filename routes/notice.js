var express = require("express");
var router = express.Router();
const controllers = require("../controllers");

router.get("/detail", controllers.notice.detail.get);
router.post("/create", controllers.notice.create.post);

module.exports = router;
