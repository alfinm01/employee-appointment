/**
 * Employee endpoints
 * Prefix: /employee
 */

const express = require('express');
const router = express.Router();
const employee = require('../datastore/employee');
const createResponse = require('../response');


router.get('/', async (req, res) => {
	try {
		const pegawai = await employee.getAllEmployees();
		const result = createResponse(pegawai, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.post('/', async (req, res) => {
	try {
		const pegawai = await employee.createEmployee(req.body);
		const result = createResponse(pegawai, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.get('/:id', async (req, res) => {
	try {
		const pegawai = await employee.getEmployeeById(req.params.id);
		const result = createResponse(pegawai, 200);
		res.json(result);
	}
	catch (e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.put('/:id', async (req, res) => {
	try {
		const pegawai = await employee.updateEmployeeById(req.params.id, req.body);
		const result = createResponse(pegawai, 200);
		res.json(result);
	}
	catch (e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.delete('/:id', async (req, res) => {
	try {
		await employee.deleteEmployeeById(req.params.id);
		const result = createResponse(null, 200);
		res.json(result);
	}
	catch (e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

module.exports = router;