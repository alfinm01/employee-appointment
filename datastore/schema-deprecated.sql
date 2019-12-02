/**
 * Database pengangkatanpegawai schema
 */

CREATE TABLE pegawai(
	id serial PRIMARY KEY,
	nama VARCHAR (75) NOT NULL,
	email_personal VARCHAR (75),
	email_organisasi VARCHAR (75),
	alamat VARCHAR (255),
	no_telepon NUMERIC (15),
	is_pns BOOLEAN,
	nip NUMERIC (30),
	unit_kerja VARCHAR (50),
	jabatan_struktural VARCHAR (75),
	jabatan_fungsional VARCHAR (75),
	gaji NUMERIC (20),
	is_menikah BOOLEAN,
	jumlah_anak INTEGER,
	created_at TIMESTAMP
);

CREATE TABLE berkas(
	id_pegawai INTEGER NOT NULL,
	sk_pengangkatan bytea,
	surat_pengaktifan bytea,
	surat_rekomendasi_fakultas bytea,
	fingerprint bytea,

	FOREIGN KEY (id_pegawai) REFERENCES pegawai (id) ON DELETE CASCADE
);

CREATE TABLE sertifikasi(
	id_pegawai INTEGER NOT NULL,
	sertifikat bytea,

	FOREIGN KEY (id_pegawai) REFERENCES pegawai (id) ON DELETE CASCADE
);