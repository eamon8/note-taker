// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
// 


// Sets up the Express App

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
// Star Wars Characters (DATA)
let rawdata = fs.readFileSync(path.resolve(__dirname, 'assets/db/db.json'));
let notes = JSON.parse(rawdata);



// // Routes

// // Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));

app.get('/api/notes', (req, res) => res.json(notes));

// // Displays all characters
// app.get('/', (req, res) => res.json(characters));

// // Displays a single character, or returns false
// app.get('/api/characters/:character', (req, res) => {
//   const chosen = req.params.character;

//   console.log(chosen);

//   /* Check each character routeName and see if the same as "chosen"
//    If the statement is true, send the character back as JSON,
//    otherwise tell the user no character was found */

//   for (let i = 0; i < characters.length; i++) {
//     if (chosen === characters[i].routeName) {
//       return res.json(characters[i]);
//     }
//   }

//   return res.json(false);
// });

// Create New Characters - takes in JSON input
app.post('/api/notes', (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newCharacter = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newCharacter.routeName = newCharacter.title.replace(/\s+/g, '').toLowerCase();
  console.log(newCharacter);

  notes.push(newCharacter);
  res.json(newCharacter);

  fs.appendFileSync(path.resolve(__dirname, 'assets/db/db.json'), JSON.parse(newCharacter));
// //////////////////////////////
// fs.thing("assets/db/db.json", (err,) => {
//     if( err) throw err;
  
//     var data = JSON.parse(newCharacter);
//     console.log(newCharacter);
//   });
//   console.log(newCharacter);
//   var student = {
//     age: "23"
//   };
  
//   fs.appendFileSync("assets/db/db.json", "age: 23");
//   // var writeData = fs.writeFileSync("test.json", JSON.stringify(student));
//////////////////////////////
});
// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
