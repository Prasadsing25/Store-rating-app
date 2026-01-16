const db = require("../config/db");

//Admin Dashboard
exports.dashboard = async (req, res) => {
  try {
    const [[users]] = await db.query("SELECT COUNT(*) AS total FROM users");
    const [[stores]] = await db.query("SELECT COUNT(*) AS total FROM stores");
    const [[ratings]] = await db.query("SELECT COUNT(*) AS total FROM ratings");

    res.json({
      users: users.total,
      stores: stores.total,
      ratings: ratings.total
    });
  } catch (error) {
    res.status(500).json({ message: "Dashboard error", error });
  }
};

// // Add New Store (Admin Only)
// exports.addStore = async (req, res) => {
//   try {
//     const { name, email, address, ownerId } = req.body;

//     if (!name || !address) {
//       return res.status(400).json({ message: "Store name and address required" });
//     }

//     await db.execute(
//       `INSERT INTO stores (name, email, address, owner_id)
//        VALUES (?, ?, ?, ?)`,
//       [name, email, address, ownerId || null]
//     );

//     res.status(201).json({ message: "Store added successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding store", error });
//   }
// };


//Get All Users (Admin + Normal + Store Owner)
exports.getUsers = async (req, res) => {
  try {
    const { name, email, address, role } = req.query;

    let query = `SELECT id, name, email, address, role FROM users WHERE 1=1`;
    const values = [];

    if (name) {
      query += " AND name LIKE ?";
      values.push(`%${name}%`);
    }
    if (email) {
      query += " AND email LIKE ?";
      values.push(`%${email}%`);
    }
    if (address) {
      query += " AND address LIKE ?";
      values.push(`%${address}%`);
    }
    if (role) {
      query += " AND role = ?";
      values.push(role);
    }

    const [users] = await db.execute(query, values);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};


// // Get All Stores with Average Rating
// exports.getStores = async (req, res) => {
//   try {
//     const query = `
//       SELECT 
//         s.id,
//         s.name,
//         s.email,
//         s.address,
//         ROUND(AVG(r.rating), 1) AS rating
//       FROM stores s
//       LEFT JOIN ratings r ON s.id = r.store_id
//       GROUP BY s.id
//     `;

//     const [stores] = await db.execute(query);
//     res.json(stores);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching stores", error });
//   }
// };