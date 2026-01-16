const app = require("./app");

app.listen(5000, () => {
    console.log("Sever is running on port 5000");
});

const db = require("./config/db");

db.query("SELECT 1")
  .then(() => console.log("Database connected"))
  .catch(err => console.error(" DB error", err));
