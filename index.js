/**
 * Main server
 */

require('dotenv').config();

const express = require('express');
var cors = require('cors');
const app = express();
const fileUpload = require('express-fileupload')

app.use(cors());

// Configure body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

// Register routes
app.use('/employee', require('./routes/employee'));
app.use('/generate', require('./routes/generator'));
app.use('/file', require('./routes/file'));

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