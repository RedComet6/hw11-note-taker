// require necessary packages
const notes = require("express").Router();
const { append } = require("express/lib/response");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const notesFile = "./db/db.json";

// GET Route for viewing submitted notes
notes.get("/notes", (req, res) => {
    fs.readFile(notesFile, "utf8", (err, data) => res.json(JSON.parse(data)));
});

// POST route for adding new notes to database file
notes.post("/notes", (req, res) => {
    // deconstruct request body to assigned variables
    const { title, text } = req.body;

    // if body exists, create new note and write to database file
    if (req.body) {
        // new note with title, text, and unique ID
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        // reads database for existing notes, parses data, adds new note into parsed data
        fs.readFile(notesFile, "utf8", (err, data) => {
            if (err) {
                console.error(err);
            } else {
                // parse data so that it can accept methods
                const parsedData = JSON.parse(data);
                // add new note into parsed data array
                parsedData.push(newNote);
                // write new array to the database file
                fs.writeFile(notesFile, JSON.stringify(parsedData), (err) => (err ? console.error(err) : console.log("Successfully added a note!")));
            }
        });
        // respond with confirmation upon completing an addition
        res.json(`Successfully added a new note`);
    } else {
        // error catch
        res.error("Error in adding new note");
    }
});

// DELETE route for removing notes from database file
notes.delete("/notes/:id", (req, res) => {
    // if ID parameter exists, compare database array to find desired note and then remove it
    if (req.params.id) {
        // assign var to route parameter
        const deletedNoteId = req.params.id;

        fs.readFile(notesFile, "utf8", (err, data) => {
            if (err) {
                // error catch
                console.error(err);
            } else {
                // parse data to accept methods
                const parsedData = JSON.parse(data);
                // assign var to the index of the notes array that matches the ID passed into the route
                const deletedNoteIndex = parsedData.findIndex((note) => note.id === deletedNoteId);
                // assign var to the note associated with the ID passed into the route
                const deletedNote = parsedData[deletedNoteIndex];
                // remove the desired note from the notes array
                parsedData.pop(deletedNote);
                // write the newly shortened array to the database file
                fs.writeFile(notesFile, JSON.stringify(parsedData), (err) => (err ? console.error(err) : console.log("Successfully deleted a note!")));
            }
        });
        // respond with confirmation upon completing a deletion
        res.json(`Successfully deleted a note!`);
    } else {
        // error catch
        res.error("Error in deleting a note");
    }
});

// export to allow use in server.js
module.exports = notes;
