const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({
  origin: "*",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api/test", require("./routes/test.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/stores", require("./routes/store.routes"));
app.use("/api/owner", require("./routes/owner.routes"));
app.use("/api/ratings", require("./routes/rating.routes"));

module.exports = app;