const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.routes");
const taskRouter = require("./routes/tasks.routes");

const app = express();
const { PORT, MONGODB_URI } = process.env;

app.use(express.json());
app.use(morgan("dev"));
app.use("/api", authRouter);
app.use("/api", taskRouter);
app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
});

//Conexión a la base de datos
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Conexión exitosa");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", (req, res) => res.send("Hola mundo"));

app.listen(PORT, () => {
  console.log(`Escuchando por el puerto ${PORT}`);
});
