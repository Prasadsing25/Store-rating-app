//Register and Login
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const jwt = require("jsonwebtoken");
// const { genrateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
    const { name, email, password, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
        "INSERT INTO users (name, email, password, address) VALUES (?,?,?,?)",
        [name, email, hashedPassword, address, "USER"]
    );

    res.json({ message: "User registered Successfully"});
};

exports.login = async (req, res) => {
    try {
        console.log("REQ BODY:", req.body);
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }
        const [rows] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        if (rows.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { 
                id: user.id, 
                role: user.role,
                store_id: user.store_id 
             },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.json({ message: "Login successful", token , user: { id : user.id, name: user.name, email: user.email, address: user.address, role: user.role } });
    } catch (err) {
        console.error("LOGIN ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
}