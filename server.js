// require necessary packages
const express = require("express");
const path = require("path");
const api = require("./routes/notes.js");

// set port
const PORT = process.env.PORT || 3001;
// assign express package for easier use
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);
// statically serve files located in "public"
app.use(express.static("public"));

// homepage route
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));

// note taking page route
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));

// run server
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));
