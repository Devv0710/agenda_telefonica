require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

const personRoute = require("./routes/personRouter")
const infoRouter = require("../src/routes/infoRouter")

// Middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.static("dist"));

// Rutas
app.use("/api/persons", personRoute)
app.use("/info", infoRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const errorHandler = (error, req, res, next) => {
  console.log(error);
  res.status(500).json({ "error": `${error}` })
  next();
};

app.use(errorHandler);
