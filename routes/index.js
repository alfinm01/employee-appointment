/**
 * Index endpoints
 * Prefix: /
 * COBA-COBA
 */

const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../datastore/config');

/* CRUD test */

/**
 * Get all users
 */
router.get('/users', (req, res) => {
	db.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
	    if (error) {
	    	throw error;
	    }
	    res.status(200).json(results.rows);
	 });
});

/**
 * Get user by id
 */
router.get('/user/:id', (req, res) => {
	const id = parseInt(req.params.id);

	db.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
	    if (error) {
	    	throw error;
	    }
	    res.status(200).json(results.rows);
	});
});

/**
 * Create user
 */
router.post('/user', (req, res) => {
	const { name, email } = req.body;

	db.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
	    if (error) {
	    	throw error;
	    }
	    res.status(201).send(`User added with ID: ${result.insertId}`);
	});
});

/**
 * Update user by id
 */
router.put('/user/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const { name, email } = req.body;

	db.query(
	    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
	    [name, email, id],
	    (error, results) => {
		    if (error) {
		    	throw error;
		    }
		    res.status(200).send(`User modified with ID: ${id}`);
	    }
	)
});

/**
 * Delete user by id
 */
router.delete('/user/:id', (req, res) => {
	const id = parseInt(req.params.id);

	pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
	    if (error) {
	    	throw error;
	    }
	    res.status(200).send(`User deleted with ID: ${id}`);
	});
});

/* Web views */

/**
 * Home page route
 */
router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/../views/index.html'));
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