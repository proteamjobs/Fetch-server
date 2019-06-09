const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.get("/info", controllers.users.info.get);
router.post("/signin", controllers.users.signin.post);
router.delete("/deleteaccount", controllers.users.deleteaccount.delete);
router.post("/signup/register", controllers.users.register.post);
router.get("/signup/checkemail", controllers.users.checkemail.get);
router.get("/signout", controllers.users.signout.get);
router.put("/changeprofile", controllers.users.changeprofile.update);
router.get("/travellist", controllers.users.travellist.get);
router.get("/orderlist", controllers.users.orderlist.get);
router.get("/applylist", controllers.users.applylist.get);

module.exports = router;
