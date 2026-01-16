const router = require("express").Router();
const { auth } = require("../middlewares/auth");

router.get("/protected", auth, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user
  });
});

module.exports = router;
