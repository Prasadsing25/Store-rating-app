const db = require("../config/db");

//Add store
exports.addStore = async (req, res) => {
    try {
        const { name, email, address, owner_id } = req.body;

        if (!name || !address) {
            return res.status(400).json({ message: "Name and Address are required" });
        }

        await db.query(
            "INSERT INTO stores (name, email, address, owner_id) VALUES (?,?,?,?)",
            [name, email, address, owner_id ]
        );

        res.status(201).json({ message: "Store added successfully" });
        console.log(req.body)
    } catch (err) {
        console.log("Add Store Error:", err);
    }
}

//View all store
exports.getStores = async (req, res) => {
    try {
        const [stores] = await db.query(`
            SELECT s.id, s.name, s.email, s.address,
            IFNULL(AVG(r.rating),0) AS rating
            FROM stores s
            LEFT JOIN ratings r ON s.id = r.store_id
            GROUP BY s.id
            `);

            res.json(stores);
    } catch (err) {
        res.status(500).json({message:"Server Error", err})
    }
}

//Update Store
exports.updateStore = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address } = req.body;

        if (!name || !address) {
            return res.status(400).json({message: "All fields required"});
        }

        const [result] = await db.execute(
            "UPDATE stores SET name= ?, address = ? WHERE id= ?",
            [name, address, id]
        )
        if (result.affectedRows === 0) {
            return res.status(404).json({message: "Store not found"});
        }

        res.json({message: "Store updated sucessfully"});
    } catch (err) {
        res.status(501).json({message: "Server Error", err})
    }
}

//Delete Store
exports.deleteStore = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.execute("DELETE FROM stores WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({message: "Store not found"});
        }
        res.json({message: "Store Deleted sucessfully"});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


exports.getAllStoresWithRatings = async (req, res) => {
  try {
    const userId = req.user.id; // JWT user id

    const [stores] = await db.query(`
      SELECT 
        s.id, 
        s.name, 
        s.address,
        IFNULL(AVG(r.rating), 0) AS avg_rating,
        (SELECT rating FROM ratings r2 WHERE r2.user_id = ? AND r2.store_id = s.id) AS user_rating
      FROM stores s
      LEFT JOIN ratings r ON r.store_id = s.id
      GROUP BY s.id
    `, [userId]);

    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
