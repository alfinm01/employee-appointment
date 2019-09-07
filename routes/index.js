/**
 * Index endpoints
 * Prefix: /
 * COBA-COBA
 */

const express = require('express');
const router = express.Router();
const path = require('path');

/**
 * Time logger in console
 */
router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

/**
 * Home page route
 */
router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/../views/index.html'));
	//res.send('Hello World!');
});

/**
 * About route
 */
router.get('/about', (req, res) => {
	res.send('About us');
});

/**
 * Sitemap route
 */
router.get('/sitemap', (req, res) => {
	res.send('Sitemap us');
});

module.exports = router;