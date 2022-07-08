const express = require("express");
const cors = require("cors");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

//routes
//configure all routes in pipeline via filesystem
readdirSync("./routes").map((r) => {
  app.use("/", require("./routes/" + r));
});

//database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connect to db successfully"))
  .catch((err) => console.log("error connecting to mongo db", err));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("server is listening...");
});
