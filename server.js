// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Reservations
// =============================================================
var tables = [
  {
    routeName: "table1",
    customerName: "Abc",
    phoneNumber: 222-222-2222,
    customerEmail: "eater1@now.com",
    customerID: 01
  },

  {
    routeName: "table2",
    customerName: "Def",
    phoneNumber: 222-333-3333,
    customerEmail: "eater2@now.com",
    customerID: 02
  },

  {
    routeName: "table3",
    customerName: "Ghi",
    phoneNumber: 222-444-4444,
    customerEmail: "eater3@now.com",
    customerID: 03
  },
]

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });
  
  app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
  });
  
  // Displays all tables
  app.get("/api/tables", function(req, res) {
    return res.json(tables);
  });
  
  // Displays a single table, or returns false
  app.get("/api/tables/:tables", function(req, res) {
    var chosen = req.params.tables;
  
    console.log(chosen);
  
    for (var i = 0; i < tables.length; i++) {
      if (chosen === tables[i].routeName) {
        return res.json(tables[i]);
      }
    }
  
    return res.json(false);
  });
  
  // Create New tables - takes in JSON input
  app.post("/api/tables", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newtable = req.body;
  
    // Using a RegEx Pattern to remove spaces from newtable
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newtable.routeName = newtable.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newtable);
  
    tables.push(newtable);
  
    res.json(newtable);
  });
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });