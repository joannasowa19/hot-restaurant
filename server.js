// Dependencies
// ===========================================================
const express = require("express"); // this is calling to the "express" framework
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000; // "||" this means OR

// set up the express app to handle data parsing
app.use(express.urlencoded({ extend: true }));
app.use(express.json());
// Data
// ===========================================================
// fake reservation - making data to test api route
const rsvp = [];
const waitlist = [];
// Routes
// ===========================================================
// GENERAL ROUTE
// ** html route ** //
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/tables.html"));
});

app.get("/form", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/form.html"));
});

// ** API routes ** //
app.get("/api/rsvp", (req, res) => {
  return res.json(rsvp);
});

app.get("/api/waitlist", (req, res) => {
  return res.json(waitlist);
});

app.post("/api/tables", (req, res) => {
  // getting raw data from client //
  // format for database //
  if (rsvp.length < 4) {
    rsvp.push(req.body);
    res.json(true);
  } else {
    waitlist.push(req.body);
    res.json(false); // this will send back "false" to front end saying it was not added by back end but provided by client //
  }
});
app.post("/api/clear", (req, res) => {
  rsvp.length = 0;
  waitlist.length = 0;
  res.json(true);
});

// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
