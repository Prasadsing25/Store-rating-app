const router = require("express").Router();
const { auth, authorize } = require("../middlewares/auth");
const adminCtrl = require("../controllers/admin.controller");

router.use(auth, authorize("ADMIN"));

router.get("/dashboard", auth, authorize("ADMIN"), adminCtrl.dashboard)

module.exports = router;