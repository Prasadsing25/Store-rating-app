const db = require("../config/db")

exports.getStores = async (req, res) => {
    try {
        const [stores] = await db.execute(`
        SELECT 
        s.id,
        s.name,
        s.address,
        IFNULL(ROUND(AVG(r.rating),1), 0) AS rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      GROUP BY s.id
        `);

        res.json(stores);
    } catch (error) {
        res.status(500).json({message: "Failed to fetch stores", error})
    }
};

exports.rateStore = async (req, res) => {
    try {
        const { storeId, rating } = req.body;

        if (rating< 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be 1 to 5"})
        }

        await db.execute(
            `INSERT INTO ratings (user_id, store_id, rating)
            VALUES (?,?,?)
            ON DUPLICATE KEY UPDATE rating = ?`,
            [req.user.id, storeId, rating, rating]
        );
        
        res.json({message: "Rating submitted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Rating failed", error })
    }
};