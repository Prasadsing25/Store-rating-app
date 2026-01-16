const router = require("express").Router();
const { auth, authorize } = require("../middlewares/auth");
const storeController = require("../controllers/store.controller");

// router.use(auth, authorize("STORE_OWNER", "ADMIN"));

router.get("/", auth, storeController.getAllStoresWithRatings); //all can view stores
router.post("/", auth, authorize("ADMIN"), storeController.addStore); //only admin can create
router.put("/:id", auth, authorize("ADMIN"), storeController.updateStore); //only admin can update
router.delete("/:id", auth, authorize("ADMIN"), storeController.deleteStore); //only admin can delete

module.exports = router;