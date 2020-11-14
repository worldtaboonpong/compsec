const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
const router = express.Router();
const routes = require("./routes");

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("Connected to db")
);

routes(router);

const corsOptions = {
  origin : 'http://localhost:3000',
  credentials: true
}
app.use(cors(corsOptions));
app.use(bodyParser.json());

const helmet = require("helmet");
app.use(helmet());

app.use("/api", router);

app.listen(5000, () => console.log("Server is running"));
