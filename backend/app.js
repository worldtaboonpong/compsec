const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
const router = express.Router();
const routes = require("./routes");

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("Connected to db")
);

routes(router);

app.use(cors());
app.use(bodyParser.json());

app.use("/api", router);

app.listen(5000, () => console.log("Server is running"));
