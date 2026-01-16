const router = require("express").Router();
const { auth, authorize } = require("../middlewares/auth");
const user = require("../controllers/user.controller");

router.use(auth, authorize("USER"));

router.get("/stores", user.getStores);
router.get("/rate", user.rateStore);

module.exports = router;