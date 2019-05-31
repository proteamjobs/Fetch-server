var express = require("express");
var router = express.Router();
const controllers = require("../controllers");

/* GET users listing. */
router.get("/list", controllers.orders.list.get);
router.get("/detail", controllers.orders.detail.get);
router.post("/create", controllers.orders.create.post);
router.post("/addapplier", controllers.orders.addapplier.post);
router.post("/pickfetcher", controllers.orders.pickfetcher.post);

module.exports = router;
