/**
 * Uploader endpoints
 * Prefix: /uploader
 */

const express = require('express');
const router = express.Router();
const file = require('../datastore/file');
const createResponse = require('../response');

const fs = require('fs');

router.get('/list/certificate/:id', async (req, res) => {
	try {
		const certificates = await file.getListCertificate(req.params.id);
		const result = createResponse(certificates, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.get('/sertifikat/:id', async function(req, res) {
	try {
		const data = fs.readFileSync('./public/sertifikat/sertifikat_' + req.params.id + '.pdf');
		res.contentType("application/pdf");
		res.send(data);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
}) 

router.post('/sertifikat/:id', async (req, res) => {
	try {
		await file.uploadSertifikat(req.params.id, req.files.sertifikasi);
		const result = createResponse('Berhasil upload file', 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.delete('/sertifikat/:id', async (req, res) => {
	try {
		await file.deleteSertifikat(req.params.id);
		const result = createResponse('Berhasil hapus file', 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.get('/berkas/pengaktifan/:id', async (req, res) => {
	try {
		const data = fs.readFileSync('./public/surat-pengaktifan/surat_pengaktifan_' + req.params.id + '.pdf');
		res.contentType("application/pdf");
		res.send(data);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.post('/berkas/pengaktifan/:id', async (req, res) => {
	try {
		await file.uploadBerkasSuratPengaktifan(req.params.id, req.files.suratPengaktifan);
		const result = createResponse('Berhasil upload file', 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.get('/berkas/rekomendasi/:id', async (req, res) => {
	try {
		const data = fs.readFileSync('./public/surat-rekomendasi/surat_rekomendasi_' + req.params.id + '.pdf');
		res.contentType("application/pdf");
		res.send(data);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.post('/berkas/rekomendasi/:id', async (req, res) => {
	try {
		await file.uploadBerkasSuratRekomendasi(req.params.id, req.files.suratRekomendasi);
		const result = createResponse('Berhasil upload file', 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.get('/list/fingerprint/:id', async (req, res) => {
	try {
		const fingerprints = await file.getListFingerprint(req.params.id);
		const result = createResponse(fingerprints, 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.get('/fingerprint/:id/:nama_jari', async (req, res) => {
	try {
		const data = fs.readFileSync('./public/fingerprint/' + req.params.id + '_' + req.params.nama_jari);
		res.send(data);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

router.post('/fingerprint/:id', async (req, res) => {
	try {
		await file.uploadFingerprint(req.params.id, req.body.nama_jari, req.files.fingerprint);
		const result = createResponse('Berhasil upload fingerprint', 200);
		res.json(result);
	}
	catch(e) {
		console.log(e);
		const result = createResponse(e.toString(), 400);
		res.json(result);
	}
})

module.exports = router;