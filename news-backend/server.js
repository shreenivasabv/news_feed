require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("./services/newsCron");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());


app.use('/images', express.static('images'));
app.use("/api/news", require("./routes/newsRoutes"));
app.use("/api/external", require("./routes/newsApiRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/admin", require("./routes/adminAuthRoutes"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);