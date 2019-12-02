/**
 * File model abstraction
 */

const db = require('./config');

exports.getListCertificate = (id) => {
	return new Promise((resolve, reject) => {
		db.any('SELECT * FROM sertifikasi WHERE id_pegawai = ' + id)
			.then(data => {
				resolve(data);
			})
			.catch(e => { 
				reject(e);
			})
	})
}

exports.uploadSertifikat = (id, file) => {
	return new Promise((resolve, reject) => {
		const path = './public/sertifikat/sertifikat_' + id + '.pdf';
        file.mv(path);
        const info = [ id, path ];
		db.any('INSERT INTO sertifikasi(id_pegawai, sertifikat, uploaded_at) VALUES($1, $2, CURRENT_TIMESTAMP)', info)
			.then(data => {
				resolve(data);
			})
			.catch(e => { 
				reject(e);
			})
	})
}

exports.deleteSertifikat = (id) => {
	return new Promise((resolve, reject) => {
		db.any('DELETE FROM sertifikasi WHERE id_pegawai = ' + id)
			.then(data => {
				resolve(data);
			})
			.catch(e => {
				reject(e);
			})
	})
}

exports.uploadBerkasSuratPengaktifan = (id, file) => {
	return new Promise((resolve, reject) => {
        const path = './public/surat-pengaktifan/surat_pengaktifan_' + id + '.pdf';
        file.mv(path);
        const info = [
        	id,
        	path
        ]
		db.any('INSERT INTO berkas(id_pegawai, surat_pengaktifan) VALUES($1, $2)', info)
			.then(data => {
				resolve(data);
			})
			.catch(e => { 
				reject(e);
			})
	})
}

exports.uploadBerkasSuratRekomendasi = (id, file) => {
	return new Promise((resolve, reject) => {
        const path = './public/surat-rekomendasi/surat_rekomendasi_' + id + '.pdf';
        file.mv(path);
        const info = [
        	id,
        	path
        ]
		db.any('INSERT INTO berkas(id_pegawai, surat_rekomendasi_fakultas) VALUES($1, $2)', info)
			.then(data => {
				resolve(data);
			})
			.catch(e => { 
				reject(e);
			})
	})
}

exports.getListFingeprint = (id) => {
	return new Promise((resolve, reject) => {
		db.any('SELECT * FROM sidik_jari WHERE id_pegawai = ' + id)
			.then(data => {
				resolve(data);
			})
			.catch(e => { 
				reject(e);
			})
	})
}

exports.uploadFingerprint = (id, nama_jari, fingerprint) => {
	return new Promise((resolve, reject) => {
		const info = [
        	id,
			nama_jari,
			fingerprint
        ]
        const path = `./public/fingerprint/${info[0]}_${info[1]}`;
        file.mv(path);
        
		db.any('INSERT INTO sidik_jari(id_pegawai, nama_jari, fingerprint) VALUES($1, $2, $3)', info)
			.then(data => {
				resolve(data);
			})
			.catch(e => { 
				reject(e);
			})
	})
}

exports.deleteFingerprint = (id) => {
	return new Promise((resolve, reject) => {
		db.any('DELETE FROM sidik_jari WHERE id_pegawai = ' + id)
			.then(data => {
				resolve(data);
			})
			.catch(e => {
				reject(e);
			})
	})
}

/* exports.downloadBerkas = (id, payload, unit_kerja) => {
	return new Promise((resolve, reject) => {
		db.one('UPDATE pegawai SET email_organisasi = $1 WHERE id = ' + id + ' RETURNING *', email)
			.then(data => {
				resolve(data);
			})
			.catch(e => { 
				reject(e);
			})
	})
} */