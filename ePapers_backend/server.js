// Includes
const express = require("express");
const decoder = require("body-parser");
const dotenv = require("dotenv");
const func = require("./assets/verifier");
const cors = require("cors");

// App configurations
const app = express();
const port = process.env.PORT || 3001;
dotenv.config();
app.use(cors());
// Router Importing
const userRouter = require("./router/user");
const rootRouter = require("./router/root");

// Utilities 
app.use(decoder.json());
app.use("/", rootRouter);
app.use("/user", userRouter);

// App listening
app.listen(port, (req, res) => {
  console.log("listening on port " + port);
});
