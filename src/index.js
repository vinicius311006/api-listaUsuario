const express = require('express'); // importing express
const helmet = require('helmet'); // importing helmet
const cors = require('cors'); // importing cors
const path = require('path'); // importing path
const app = express(); // shortcut for express
const routes = require('./routes'); // importing ./routes.js (Routes)
const db = require('./db'); // importing ./db.js (Database)

app.use(express.json()); // tell app to use express.json
app.use(express.urlencoded({ extended: false })); // handle URL-encoded data

// Configure CORS
app.use(cors({
    allowedHeaders: ['Content-Type'], // Allow Content-Type header
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'] // Allow specific methods
}));

app.use(helmet()); // use helmet for security

app.use('/', routes); // configure root route (/)
app.listen(3333, () => { // start server
    console.log("SERVIDOR RODANDO");
});