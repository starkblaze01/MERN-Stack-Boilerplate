const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const users = require("./routers/api/users");
const profile = require("./routers/api/profile");
const projects = require("./routers/api/projects");

const app = express();

app.get("/", (req, res) => res.send("Hello!"));

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// connect to mongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/projects", projects);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
