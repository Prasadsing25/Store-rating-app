const router = require("express").Router();
const { auth, authorize } = require("../middlewares/auth");
const ownerController = require("../controllers/owner.controller");

router.get("/dashboard", auth, authorize("STORE_OWNER"), ownerController.ownerDashboard);

module.exports = router;