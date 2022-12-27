const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());
app.use(helmet())
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected To Data Base"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/login", require("./routes/login"));
app.use("/api/register", require("./routes/users"));
app.use("/api/phones", require("./routes/phones"));
app.use("/api/cars", require("./routes/cars"));
app.use("/api/apartments", require("./routes/apartments"));
app.use("/api/electronics", require("./routes/electronics"));
app.use("/api/favorites", require("./routes/favorites"));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
