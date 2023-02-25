const express = require("express");
const path = require("path");
const port = 8000;

const db = require("./config/mongoose");
const Contact = require("./models/contact");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Middleware parser
app.use(express.urlencoded());

// // Custom Middleware 1
// app.use(function (req, res, next) {
//   console.log("MiddleWare 1 called.");
//   next(); // If next() isn't called the page will stuck at loading.
// });

// // Custom Middleware 2
// app.use(function (req, res, next) {
//   console.log("MiddleWare 2 called.");
//   next();
// });

app.use(express.static("assets"));

let contactList = [
  {
    name: "Tonny Stark",
    phone: "1111111111",
  },
  {
    name: "Deep",
    phone: 1234567890,
  },
  {
    name: "Aditya",
    phone: 1234568901,
  },
];

// Controller One
app.get("/", function (req, res) {
  return res.render("home", {
    title: "Contacts List",
    contactList,
  });
});

// Controller Two
app.get("/practice", function (req, res) {
  return res.render("practice", { title: "Practice Page" });
});

// New contact route
app.post("/create-contact", function (req, res) {
  //Adding new contact details to the array
  // contactList.push({
  //   name: req.body.name,
  //   phone: req.body.phone,
  // });
  contactList.push(req.body); // shorthand
  return res.redirect("back"); // we can either use '/' or just write 'back'.
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server", err);
  }
  console.log(`Server is running on port: ${port}`);
});

//For deleting a contact
app.get("/delete-contact", function (req, res) {
  //Get the query from the url
  let phone = req.query.phone;

  let contactIndex = contactList.findIndex((contact) => contact.phone == phone);

  if (contactIndex != -1) {
    contactList.splice(contactIndex, 1);
  }

  return res.redirect("back");
});
