/**
 * Generator endpoints
 * Prefix: /generate
 */

const express = require('express');
const router = express.Router();
const employee = require('../datastore/employee');
const generator = require('../datastore/generator');
const createResponse = require('../response');

const fs = require('fs');
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");


router.get('/identity/:id', async (req, res) => {
	try {
		const userInfo = await employee.getEmployeeById(req.params.id);
		const jabatan = await generator.getPosition(req.params.id);
		const unit_kerja = await generator.getWorkUnit(req.params.id);
		const remunerasi = await generator.getRemuneration(req.params.id);

		ejs.renderFile('./pdf/template-dokumen-identitas.ejs', {userInfo: userInfo, jabatan: jabatan, unit_kerja: unit_kerja, remunerasi: remunerasi}, (err, data) => {
		    if (err) {
		          res.send(err);
		    } else {
		        let options = {
		            "height": "11.25in",
		            "width": "8.5in",
		            "header": {
		                "height": "20mm"
		            },
		            "footer": {
		                "height": "20mm",
		            },
		        };
		        pdf.create(data, options).toFile("./public/identity-document/identity_" + req.params.id + ".pdf", function (err, data) {
		            if (err) {
		                res.send(err);
		            } else {
		                //res.send("File created successfully");
		                console.log('File created successfully');
		                const data = fs.readFileSync("./public/identity-document/identity_" + req.params.id + ".pdf");
						res.contentType("application/pdf");
						res.send(data);
		            }
		        });
		    }
		});
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.get('/appointment-letter/:id', async (req, res) => {
	try {
		const userInfo = await employee.getEmployeeById(req.params.id);
		const jabatan = await generator.getPosition(req.params.id);
		const unit_kerja = await generator.getWorkUnit(req.params.id);

		ejs.renderFile('./pdf/template-sk.ejs', {userInfo: userInfo, jabatan: jabatan, unit_kerja: unit_kerja}, (err, data) => {
		    if (err) {
		          res.send(err);
		    } else {
		        let options = {
		            "height": "11.25in",
		            "width": "8.5in",
		            "header": {
		                "height": "20mm"
		            },
		            "footer": {
		                "height": "20mm",
		            },
		        };
		        pdf.create(data, options).toFile("./public/appointment-letter/sk_" + req.params.id + ".pdf", function (err, data) {
		            if (err) {
		                res.send(err);
		            } else {
		                //res.send("File created successfully");
		                console.log('File created successfully');
		                const data = fs.readFileSync("./public/appointment-letter/sk_" + req.params.id + ".pdf");
						res.contentType("application/pdf");
						res.send(data);
		            }
		        });
		    }
		});
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.get('/work-unit/:id', async (req, res) => {
	try {
		const pegawai = await generator.getWorkUnit(req.params.id);
		const result = createResponse(pegawai, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.post('/work-unit/:id', async (req, res) => {
	try {
		const pegawai = await generator.assignWorkUnit(req.params.id, req.body.unit_kerja);
		const result = createResponse(pegawai, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.get('/position/:id', async (req, res) => {
	try {
		const pegawai = await generator.getPosition(req.params.id);
		const result = createResponse(pegawai, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.post('/position/:id', async (req, res) => {
	try {
		const pegawai = await generator.assignPosition(req.params.id, req.body);
		const result = createResponse(pegawai, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.post('/email/:id', async (req, res) => {
	try {
		const user = await employee.getEmployeeById(req.params.id);
		const unit_kerja = await generator.getWorkUnit(req.params.id);

		if (unit_kerja) {
			const pegawai = await generator.generateEmail(req.params.id, req.body, unit_kerja);
			const result = createResponse(pegawai, 200);
			res.json(result);
		}
		else {
			res.json(createResponse("Pegawai belum di-assign ke unit kerja", 400));
		}
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.get('/remuneration/:id', async (req, res) => {
	try {
		const pegawai = await generator.getRemuneration(req.params.id);
		const result = createResponse(pegawai, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.post('/remuneration/:id', async (req, res) => {
	try {
		const gaji = await generator.renumerasi(req.params.id);
		const result = createResponse(gaji, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})



module.exports = router;