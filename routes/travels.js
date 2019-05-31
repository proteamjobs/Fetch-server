var express = require("express");
var router = express.Router();
const controllers = require("../controllers");

router.get("/list", controllers.travels.list.get);
router.get("/detail", controllers.travels.detail.get);
router.post("/create", controllers.travels.create.post);

module.exports = router;
