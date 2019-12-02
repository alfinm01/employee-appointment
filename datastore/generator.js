/**
 * Generator model abstraction
 */

const db = require('./config');
const employee = require('./employee')

exports.getWorkUnit = (id) => {
	return new Promise((resolve, reject) => {
		db.any('SELECT * FROM unit_kerja WHERE id_pegawai = ' + id)
			.then(data => {
				resolve(data);
			})
			.catch(e => { 
				reject(e);
			})
	})
}

exports.assignWorkUnit = (id, unit_kerja) => {
	return new Promise((resolve, reject) => {
		db.one('UPDATE pegawai SET unit_kerja = $1 WHERE id = ' + id + ' RETURNING *', unit_kerja)
			.then(data => {
				resolve(data);
			})
			.catch(e => {
				reject(e);
			})
	})
}

exports.getPosition = (id) => {
	return new Promise((resolve, reject) => {
		db.any('SELECT * FROM jabatan WHERE id_pegawai = ' + id)
			.then(data => {
				resolve(data);
			})
			.catch(e => { 
				reject(e);
			})
	})
}

exports.assignPosition = (id, payload) => {
	return new Promise((resolve, reject) => {
		const info = [
			id,
			payload.kategori,
			payload.nama
		] 
		db.any('INSERT INTO jabatan(id_pegawai, kategori, nama, waktu_mulai) VALUES($1, $2, $3, CURRENT_TIMESTAMP)', info)
			.then(data => {
				resolve(data);
			})
			.catch(e => { 
				reject(e);
			})
	})
}

exports.generateEmail = (id, payload, unit_kerja) => {
	return new Promise((resolve, reject) => {
		const email = payload.username + '@' + unit_kerja.unit_kerja + 'itb.ac.id';
		db.one('UPDATE pegawai SET email_organisasi = $1 WHERE id = ' + id + ' RETURNING *', email)
			.then(data => {
				resolve(data);
			})
			.catch(e => { 
				reject(e);
			})
	})
}

exports.getRemuneration = (id) => {
	return new Promise((resolve, reject) => {
		db.any('SELECT * FROM remunerasi WHERE id_pegawai = ' + id)
			.then(data => {
				resolve(data);
			})
			.catch(e => { 
				reject(e);
			})
	})
}

exports.renumerasi = (id) => {
	return new Promise((resolve, reject) => {
		const pegawai = employee.getEmployeeById(id)
		const gaji = pegawai.is_menikah * 5 + pegawai.jumlah_anak * 2550 + pegawai.is_pns * 60 + pegawai.is_tendik * 110 
		db.one('INSERT INTO remunerasi(id_pegawai, gaji, waktu_mulai) VALUES($1, $2, CURRENT_TIMESTAMP) RETURNING *', [id, gaji])
			.then(data => {
				resolve(data);
			})
			.catch(e => { 
				reject(e);
			})
	})
}
/*menikah anak isPNS isTendik*/