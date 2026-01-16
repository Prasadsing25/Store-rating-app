const db = require("../config/db");

exports.ownerDashboard = async (req, res) => {
    try {
        const storeId = req.user.store_id;
        if (!storeId) {
            return res.status(400).json({ message: "Store not linked to owner" });
        }

        const [ratings] = await db.execute(
      `SELECT u.name, u.email, r.rating
       FROM ratings r
       JOIN users u ON r.user_id = u.id
       WHERE r.store_id = ?`,
      [storeId]
    );

        res.json({ratings})
    } catch (err) {
        res.status(500).json({ message: "Owner Server Error", error: err.message });
    }
}