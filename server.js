const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const path = require('path');

const app = express();
const port = 3000;

// HARDCODED SECRET - Security Risk
const ADMIN_PASSWORD = "admin123";

app.use(bodyParser.json());
app.use(express.static('.'));

// TODO: Refactor this entire file into controllers and models
// TODO: Use environment variables for secrets

// Get all notes
app.get('/notes', (req, res) => {
    // Inefficient Logic: Fetch everything and filter later if user is provided
    // Also SQL Injection vulnerability
    let query = "SELECT * FROM notes";
    
    if (req.query.user) {
        // VULNERABILITY: SQL Injection via string concatenation
        query = "SELECT * FROM notes WHERE user = '" + req.query.user + "'";
    }

    db.all(query, (err, rows) => {
        if (err) {
            // Minimal Error Handling
            res.status(500).send("Error fetching notes");
            return;
        }
        res.json(rows);
    });
});

// Create a note
app.post('/notes', (req, res) => {
    const { user, content } = req.body;

    // No Input Validation
    // Duplicate Code: Hand-writing the insert query instead of a reusable function
    const query = "INSERT INTO notes (user, content) VALUES ('" + user + "', '" + content + "')";
    
    db.run(query, function(err) {
        if (err) {
            res.status(500).send("Error saving note");
            return;
        }
        res.json({ id: this.lastID });
    });
});

// Delete a note
// NO AUTHENTICATION: Anyone can delete any note
app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    
    // TODO: add authentication
    db.run("DELETE FROM notes WHERE id = " + id, (err) => {
        if (err) {
            res.status(500).send("Error deleting note");
            return;
        }
        res.send("Note deleted");
    });
});

// Filter notes (Duplicate logic of /notes but slightly different)
app.get('/filter', (req, res) => {
    const user = req.query.user;
    
    // Inefficient Logic: Fetching all then filtering in JS
    db.all("SELECT * FROM notes", (err, rows) => {
        if (err) {
            res.status(500).send("Error");
            return;
        }
        const filtered = rows.filter(n => n.user === user);
        res.json(filtered);
    });
});

app.listen(port, () => {
    console.log(`QuickNote app listening at http://localhost:${port}`);
});
