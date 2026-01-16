const { body } = require("express-validator");

exports.registerValidation = [
    body("name").isLength({ min: 20, max: 60 }),
    body("email").isEmail(),
    body("address").isLength( {max: 400}),
    body("password")
        .isLength({ min: 8, max: 16})
        .matches(/[A-Z]/)
        .matches(/[@$!%*?&]/)
]