const notes = require("express").Router();
const { append } = require("express/lib/response");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const notesFile = "./db/db.json";

// GET Route for retrieving submitted notes
notes.get("/notes", (req, res) => {
    fs.readFile(notesFile, "utf8", (err, data) => res.json(JSON.parse(data)));
});

// POST route for adding new notes
notes.post("/notes", (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        fs.readFile(notesFile, "utf8", (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedData = JSON.parse(data);
                parsedData.push(newNote);
                fs.writeFile(notesFile, JSON.stringify(parsedData), (err) => (err ? console.error(err) : console.log("Successfully added a note!")));
            }
        });
        res.json(`Successfully added a new note`);
    } else {
        res.error("Error in adding new note");
    }
});

// delete route
notes.delete("/notes/:id", (req, res) => {
    if (req.params.id) {
        const deletedNoteId = req.params.id;

        fs.readFile(notesFile, "utf8", (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedData = JSON.parse(data);
                const deletedNoteIndex = parsedData.findIndex((note) => note.id === deletedNoteId);
                const deletedNote = parsedData[deletedNoteIndex];
                parsedData.pop(deletedNote);
                fs.writeFile(notesFile, JSON.stringify(parsedData), (err) => (err ? console.error(err) : console.log("Successfully deleted a note!")));
            }
        });
        res.json(`Successfully deleted a note!`);
    } else {
        res.error("Error in deleting a note");
    }
});

module.exports = notes;
