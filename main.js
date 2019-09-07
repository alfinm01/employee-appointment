/**
 * Main server
 */

require('dotenv').config();

var express = require('express');
var app = express();

// Register routes
app.use('/', require('./routes/index'));

// Run the server!
const start = async () => {
    try {
    	// Isi PORT di file .env (default: 3000)
        const server = await app.listen(process.env.PORT);
		console.info(`Server listening on ${server.address().port}`);
    } catch (err) {
        console.error(err);
    }
};

start();