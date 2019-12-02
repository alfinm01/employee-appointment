/**
 * Employee model abstraction
 */

const db = require('./config');


exports.getAllEmployees = () => {
	return new Promise((resolve, reject) => {
		db.any('SELECT * FROM pegawai')
			.then(data => {
				resolve(data);
			})
			.catch(e => {
				reject(e);
			})
	})
}

exports.getEmployeeById = (id) => {
	return new Promise((resolve, reject) => {
		db.one('SELECT * FROM pegawai WHERE id = ' + id)
			.then(data => {
				resolve(data);
			})
			.catch(e => {
				reject(e);
			})
	})
}

exports.createEmployee = (payload) => {
	return new Promise((resolve, reject) => {
		console.log(payload);

		const info = [
			payload.nama,
			payload.alamat || null,
			payload.email_personal || null,
			payload.no_telepon || null,
			payload.nip || null,
			payload.is_tendik || false,
			payload.is_pns || false,
			payload.tanggal_lahir || null,
			payload.tempat_lahir || null,
			payload.sma || null,
			payload.sarjana || null,
			payload.magister || null,
			payload.doktor || null,
			payload.is_menikah || false,
			payload.jumlah_anak || null
		];

		db.one('INSERT INTO pegawai(nama, alamat, email_personal, no_telepon, nip, is_tendik, is_pns, tanggal_lahir, tempat_lahir, sma, sarjana, magister, doktor, is_menikah, jumlah_anak, waktu_pengangkatan)'
			+ ' VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, CURRENT_TIMESTAMP) RETURNING *', info)
		    .then(data => {
		        resolve(data);
		    })
		    .catch(e => {
		        reject(e);
		    });
	})
}

exports.updateEmployeeById = (id, payload) => {
	return new Promise((resolve, reject) => {
		const info = [
			payload.nama,
			payload.alamat || null,
			payload.email_personal || null,
			payload.no_telepon || null,
			payload.nip || null,
			payload.is_pns || false,
			payload.tanggal_lahir || null,
			payload.tempat_lahir || null,
			payload.sma || null,
			payload.sarjana || null,
			payload.magister || null,
			payload.doktor || null,
			payload.is_menikah || false,
			payload.jumlah_anak || null,
			payload.is_tendik || false,
		];

		db.one('UPDATE pegawai SET nama = $1, alamat = $2, email_personal = $3, no_telepon = $4, nip = $5, is_pns = $6, tanggal_lahir = $7, tempat_lahir = $8, sma = $9, sarjana = $10, magister = $11, doktor = $12, is_menikah = $13, jumlah_anak = $14, is_tendik = $15' +
			   ' WHERE id = ' + id + ' RETURNING *', info)
			.then(data => {
				resolve(data);
			})
			.catch(e => { 
				reject(e);
			})
	})
}

exports.deleteEmployeeById = (id) => {
	return new Promise((resolve, reject) => {
		db.any('DELETE FROM pegawai WHERE id = ' + id)
			.then(data => {
				resolve(data);
			})
			.catch(e => {
				reject(e);
			})
	})
}