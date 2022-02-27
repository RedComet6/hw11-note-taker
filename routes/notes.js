const notes = require("express").Router();
const fs = require("fs");
const notesFile = "./db/db.json";

// GET Route for retrieving submitted notes
notes.get("/notes", (req, res) => {
    fs.readFile(notesFile, "utf8", (err, data) => res.json(JSON.parse(data)));
});

notes.post("/notes", (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
        };

        fs.readFile(notesFile, "utf8", (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedData = JSON.parse(data);
                parsedData.push(newNote);
                fs.writeFile(notesFile, JSON.stringify(parsedData), (err) => (err ? console.error(err) : console.log("Success!")));
            }
        });
        res.json(`Succesfully added a new note`);
    } else {
        res.error("Error in adding new note");
    }
});

module.exports = notes;
