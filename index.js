const express = require("express");
const path = require("path");
const port = 8000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Controller One
app.get("/", function (req, res) {
  return res.render("home", { title: "Contacts List" });
});

// Controller Two
app.get("/practice", function (req, res) {
  return res.render("practice", { title: "Practice Page" });
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server", err);
  }
  console.log("Server is running on port:", port);
});
