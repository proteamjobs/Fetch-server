var express = require("express");
var router = express.Router();
const controllers = require("../controllers");

router.post("/addParcelInfo", controllers.parcels.addParcelInfo.post);
router.get("/trackParcel", controllers.parcels.trackParcel.get);

module.exports = router;
