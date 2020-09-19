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


// HTML Routes
// ==============================================================
// Basic HTML route that sends the user first to the  notes Page
app.get("/notes", function(req, res) {
   
    res.sendFile(path.join(__dirname, "../../notes.html"));
  });

// Basic HTML route that sends the user first to the index Page
app.get("*", function(req, res) {
   
    res.sendFile(path.join(__dirname, "../../index.html"));
  });
  

// API GET Request
// ================================================================
// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

// Gets and returns all notes from the database
app.get("/api/notes", function(req, res) {
    return res.json((__dirname, "../../../db/db.json"));
  });

// API POST Request
// ==================================================================
// * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.





// API DELETE Request
// ====================================================================
// * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.






  // Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
