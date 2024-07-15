const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();
const cookies = require("cookie-parser");

const mongodb = require("./Configuration/database");
const routes = require("./routes/routes");

const corsOptions = {
  origin: process.env.FRONTEND,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookies());
app.use('/api', routes);

app.listen(4000, (err) => {
  if (err) throw err;
  console.log("server running on port 4000");
  mongodb();
});
