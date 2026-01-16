const jwt = require("jsonwebtoken");

exports.genrateToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "id" }
    );
};