const db = require("../config/db");

exports.submitRating = async (req, res) => {
    try {
        console.log("USER:", req.user);
        console.log("BODY:", req.body);

        const userId = req.user.id;
        const { store_id, rating } = req.body;

        if (!store_id || !rating) {
            return res.status(400).json({ message: "store_id and rating required" });
        }

        await db.query(
            `INSERT INTO ratings (user_id, store_id, rating)
            VALUES (?,?,?)
            ON DUPLICATE KEY UPDATE rating = VALUES(rating)`,
            [userId, store_id, rating]
        );
        res.json({ message: "Rating submitted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", err })
    }
}