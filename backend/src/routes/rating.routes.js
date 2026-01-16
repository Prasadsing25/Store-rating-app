const router = require("express").Router();
const { auth, authorize } = require("../middlewares/auth");
const ratingController = require("../controllers/rating.controller");

router.post("/", auth, authorize("USER"), ratingController.submitRating);

module.exports = router;