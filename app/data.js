// Angka-angka Indonesia di situs ini. Aturan file ini: setiap angka punya
// sumber + tahun yang bisa diperiksa di publikasi aslinya. Angka dibulatkan
// seperlunya dan diberi label "sekitar" bila berasal dari proyeksi. Jangan
// tambah angka baru ke file ini tanpa sumber dan tahun.
export const SOURCES = {
  bps2024: "BPS, 2024",
  bps2025: "BPS, 2025",
  ssgi2024: "SSGI Kemenkes, 2024",
  bpjs2024: "BPJS Kesehatan, 2024",
};

export const HEADLINE = [
  { label: "Penduduk", value: "281,6 jt", note: "Proyeksi penduduk, sekitar", source: SOURCES.bps2024 },
  { label: "Pertumbuhan ekonomi", value: "5,03%", note: "Tahun ke tahun", source: SOURCES.bps2024, delta: "▼ 0,02 pp dari 2023", deltaTone: "flat" },
  { label: "Kemiskinan", value: "8,57%", note: "September 2024", source: SOURCES.bps2024, delta: "▼ 0,79 pp dari 2023", deltaTone: "good" },
  { label: "Stunting balita", value: "19,8%", note: "Prevalensi nasional", source: SOURCES.ssgi2024, delta: "▼ 1,7 pp dari 2023", deltaTone: "good" },
];

// Delta di atas dihitung dari deret di bawah ini (selisih 2024 terhadap 2023):
// pertumbuhan 5,03 - 5,05 = -0,02 pp; kemiskinan 8,57 - 9,36 = -0,79 pp;
// stunting 19,8 - 21,5 = -1,7 pp; inflasi 1,57 - 2,61 = -1,04 pp;
// pengangguran Agustus 4,91 - 5,32 = -0,41 pp.

// Pertumbuhan PDB (% y-on-y) dan inflasi Desember (% y-on-y), BPS.
export const GROWTH = [
  { year: "2020", value: -2.07 }, { year: "2021", value: 3.7 },
  { year: "2022", value: 5.31 }, { year: "2023", value: 5.05 },
  { year: "2024", value: 5.03 },
];
export const INFLATION = [
  { year: "2020", value: 1.68 }, { year: "2021", value: 1.87 },
  { year: "2022", value: 5.51 }, { year: "2023", value: 2.61 },
  { year: "2024", value: 1.57 },
];
// Kemiskinan September (%), BPS.
export const POVERTY = [
  { year: "2020", value: 10.19 }, { year: "2021", value: 9.71 },
  { year: "2022", value: 9.57 }, { year: "2023", value: 9.36 },
  { year: "2024", value: 8.57 },
];
// Pengangguran terbuka Agustus (%), BPS.
export const JOBLESS = [
  { year: "2020", value: 7.07 }, { year: "2021", value: 6.49 },
  { year: "2022", value: 5.86 }, { year: "2023", value: 5.32 },
  { year: "2024", value: 4.91 },
];
// Prevalensi stunting (%), SSGI.
export const STUNTING = [
  { year: "2021", value: 24.4 }, { year: "2022", value: 21.6 },
  { year: "2023", value: 21.5 }, { year: "2024", value: 19.8 },
];
// Lama sekolah (tahun), BPS 2024: harapan lama sekolah dan rata-rata lama
// sekolah. Dipakai chart batang di halaman Pendidikan.
export const SCHOOLING = [
  { label: "Harapan lama sekolah", value: 13.2 },
  { label: "Rata-rata lama sekolah", value: 9.1 },
];
// Penduduk provinsi terbesar, juta jiwa, sekitar (BPS, proyeksi 2024).
export const PROVINCES = [
  { name: "Jawa Barat", pop: 50.4, capital: "Bandung" },
  { name: "Jawa Timur", pop: 41.8, capital: "Surabaya" },
  { name: "Jawa Tengah", pop: 37.9, capital: "Semarang" },
  { name: "Sumatera Utara", pop: 16.1, capital: "Medan" },
  { name: "Banten", pop: 12.4, capital: "Serang" },
  { name: "DKI Jakarta", pop: 10.7, capital: "Jakarta" },
  { name: "Lampung", pop: 9.4, capital: "Bandar Lampung" },
  { name: "Sumatera Selatan", pop: 9.0, capital: "Palembang" },
  { name: "Riau", pop: 6.9, capital: "Pekanbaru" },
  { name: "Sumatera Barat", pop: 5.8, capital: "Padang" },
];

export const ECONOMY_FACTS = [
  { label: "PDB per kapita", value: "Rp78,6 jt", note: "Per tahun", source: SOURCES.bps2024 },
  { label: "Ekspor", value: "US$264,7 miliar", note: "Total ekspor barang", source: SOURCES.bps2024 },
  { label: "Gini ratio", value: "0,379", note: "September 2024", source: SOURCES.bps2024 },
  { label: "Angkatan kerja", value: "153,1 jt", note: "Februari 2025", source: SOURCES.bps2025 },
];
