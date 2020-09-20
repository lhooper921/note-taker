// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

const notes= require("./db/db.json")
const uuid = require('uuid');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;



// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


// HTML Routes
// ==============================================================
// Basic HTML route that sends the user first to the  notes Page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
} );

app.get("/", function(req, res) {
 
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
// API GET Request
// ================================================================
// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

// Gets and returns all notes from the database
app.get("/api/notes", function(req, res) {
  fs.readFile(path.join(__dirname, "./db/db.json"), function(err,data){

  }
  );
 return res.json(notes)
  });

// API POST Request
// ==================================================================
// * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

// Create New notes - takes in JSON input
app.post("/api/notes", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newNote = {
    id: uuid.v4(),
    title: req.body.title,
    text: req.body.text,
  }
  if(!newNote.title || !newNote.text){
    res.status(400).json({msg: 'Please include a title and text'})
} 


  console.log(newNote);

  notes.push(newNote);

  res.json(notes, );
});

// API DELETE Request
// ====================================================================
// * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

// uuid
// Get single note
app.put('/api/notes/:id', (req, res) => {
  const found = notes.some(note => note.id == parseInt(req.params.id));

  // If specified id exists then return the member info associated with that id
  if (found) {
  const updNote = req.body;
  notes.forEach(note => {
      if(note.id === parseInt(req.params.id)){
          note.title = updNote.title ? updNote.title : note.title;
          note.text = updNote.text ? updNote.text: note.text;

          res.json({msg:'Note was updated', note});
      }
  })
   
  //  if id does not exists, return 400 error and message 
  } else {
      res.status(400).json({msg:` No notes with the id of ${req.params.id}`})
  }
  
});

// Delete single note
app.delete('/api/notes/:id', (req, res) => {
  const found = notes.some(note => note.id == parseInt(req.params.id));
console.log({notes: notes.filter(note => note.id !== parseInt(req.params.id))});
  // If specified id exists then return the member info associated with that id
  if (found) {
   res.json({msg: 'Note deleted', notes: notes.filter(note => note.id !== parseInt(req.params.id))});  
   
  //  if id does not exists, return 400 error and message 
  } else {
      res.status(400).json({msg:` No note with the id of ${req.params.id}`})
  }
  
});




  // Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
