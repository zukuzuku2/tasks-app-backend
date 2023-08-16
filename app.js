const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.routes");
const taskRouter = require("./routes/tasks.routes");

const app = express();
const { PORT = 3000, MONGODB_URI = "mongodb://127.0.0.1:27017/tasksdb" } =
  process.env;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api", authRouter);
app.use("/api", taskRouter);
app.use((err, req, res, next) => {
  res.status(err.statusCode).json({ message: err.message });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Conexión exitosa");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Escuchando por el puerto ${PORT}`);
});
