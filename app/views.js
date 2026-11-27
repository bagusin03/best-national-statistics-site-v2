// Halaman-halaman situs. Setiap halaman memakai angka dari data.js dan
// chart dari charts.js; tidak ada angka yang ditulis langsung di sini
// tanpa sumber. Kontrol interaktif (urutkan, cari, ganti chart, unduh CSV)
// dihubungkan oleh main.js lewat atribut data-action.
import { HEADLINE, GROWTH, INFLATION, POVERTY, JOBLESS, STUNTING, SCHOOLING, PROVINCES, ECONOMY_FACTS, SOURCES } from "./data.js";
import { barChart, lineChart, donutChart, hbarChart, fmt1 } from "./charts.js";

function deltaChip(k) {
  if (!k.delta) return "";
  return `<span class="delta ${k.deltaTone === "good" ? "good" : "flat"}">${k.delta}</span>`;
}

function kpiCards(items) {
  return `<div class="kpi-grid">` + items.map((k) =>
    `<div class="kpi"><div class="kpi-label">${k.label}</div><div class="kpi-value">${k.value}</div>`
    + `<div class="kpi-note">${k.note}</div>${deltaChip(k)}<div class="kpi-source">Sumber: ${k.source}</div></div>`
  ).join("") + `</div>`;
}

function sourceLine(source) {
  return `<p class="source">Sumber: ${source}. Angka dibulatkan; lihat publikasi asli untuk rincian.</p>`;
}

function islandsSvg() {
  // Motif kepulauan abstrak: titik-titik membentuk gugusan pulau Indonesia.
  const dots = [[8, 26], [22, 18], [38, 24], [52, 14], [66, 22], [80, 12], [96, 20], [112, 14], [126, 24], [140, 16], [30, 40], [58, 44], [88, 40], [118, 44], [46, 58], [76, 56], [104, 60]];
  return `<svg class="islands" width="180" height="70" viewBox="0 0 150 70" aria-hidden="true">`
    + dots.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${3 + (i % 3)}" fill="#e8a33d" opacity="${0.45 + (i % 3) * 0.2}"/>`).join("")
    + `</svg>`;
}

export function homePage() {
  return `
  <section class="hero">
    <div>
      <h1>Indonesia dalam <em>angka</em>,<br>tanpa perlu jadi ahli statistik.</h1>
      <p>Indikator utama penduduk, ekonomi, kesehatan, pendidikan, dan ketenagakerjaan — tiap angka disertai sumber dan tahunnya, supaya bisa dikutip dengan tenang.</p>
      <p class="updated">Data terbaru: Februari 2025 (pengangguran) · 2024 (lainnya) · Diperbarui November 2026</p>
    </div>
    <div class="glance">
      <h2>Sekilas Indonesia</h2>
      <div class="glance-row"><span>PDB 2024</span><strong>Rp22.139 T</strong></div>
      <div class="glance-row"><span>Inflasi Desember 2024</span><strong>1,57%</strong></div>
      <div class="glance-row"><span>IPM 2024</span><strong>75,02</strong></div>
      ${islandsSvg()}
    </div>
  </section>
  ${kpiCards(HEADLINE)}
  <h2>Pertumbuhan ekonomi, 2020–2024</h2>
  <p class="lede">Setelah kontraksi 2020, ekonomi tumbuh di atas 5% tiga tahun berturut-turut. Batang memakai garis nol — 2020 memang negatif.</p>
  <div class="card chart-wrap">${barChart(GROWTH, { unit: "%", height: 200 })}
  ${sourceLine(SOURCES.bps2024)}</div>
  <h2>Temuan utama</h2>
  <div class="findings">
    <div class="finding"><strong>8,57%</strong>Kemiskinan September 2024 — terendah dalam lima tahun, turun 0,79 poin dari 2023.</div>
    <div class="finding"><strong>19,8%</strong>Stunting balita 2024 — turun 4,6 poin sejak 2021 (24,4%). Target pemerintah: di bawah 14% pada 2029.</div>
    <div class="finding"><strong>1,57%</strong>Inflasi Desember 2024 — terendah dalam lima tahun, setelah sempat 5,51% pada 2022.</div>
  </div>
  <h2>Kemiskinan terus turun</h2>
  <p class="lede">Persentase penduduk miskin mencapai titik terendah dalam lima tahun terakhir pada September 2024.</p>
  <div class="card chart-wrap">${barChart(POVERTY, { unit: "%", color: "#0e4f4a" })}
  ${sourceLine(SOURCES.bps2024)}</div>
  <h2>Mulai dari yang paling dicari</h2>
  <div class="quick-links">
    <a href="#/ekonomi">Pertumbuhan ekonomi 5,03% →</a>
    <a href="#/penduduk">Penduduk 281,6 juta →</a>
    <a href="#/daerah">Provinsi terbesar →</a>
    <a href="#/kesehatan">Stunting turun ke 19,8% →</a>
  </div>`;
}

export function pendudukPage() {
  return `
  <h2>Penduduk Indonesia</h2>
  <p class="lede">Indonesia adalah negara berpenduduk terbesar keempat di dunia. Lebih dari separuh penduduk tinggal di Pulau Jawa.</p>
  ${kpiCards([
    { label: "Penduduk", value: "281,6 jt", note: "Proyeksi, sekitar", source: SOURCES.bps2024 },
    { label: "Pulau terpadat", value: "Jawa", note: "±56% penduduk Indonesia", source: SOURCES.bps2024 },
    { label: "Provinsi terbesar", value: "Jawa Barat", note: "50,4 juta jiwa, sekitar", source: SOURCES.bps2024 },
  ])}
  <h2>Provinsi dengan penduduk terbanyak</h2>
  <div class="card">${hbarChart(PROVINCES.slice(0, 6).map((p) => ({ label: p.name, value: p.pop })), { unit: " jt" })}
  ${sourceLine(SOURCES.bps2024 + " — proyeksi penduduk 2024, dibulatkan ke 0,1 juta")}</div>
  <div class="card"><h3>Kenapa angka ini penting?</h3>
  <p>Jumlah penduduk menentukan kebutuhan sekolah, rumah sakit, lapangan kerja, dan infrastruktur. Perencana daerah memakai angka provinsi — bukan angka nasional — untuk menghitung kebutuhan layanan di wilayahnya. Lihat tabel lengkapnya di halaman <a href="#/daerah">Daerah</a>.</p></div>`;
}

export function ekonomiPage(mode = "line") {
  const chart = mode === "bar" ? barChart(GROWTH, { unit: "%" }) : lineChart(GROWTH, { unit: "%" });
  return `
  <h2>Ekonomi Indonesia</h2>
  <p class="lede">PDB 2024 mencapai Rp22.139 triliun dengan pertumbuhan 5,03%. Halaman ini merangkum pertumbuhan, inflasi, dan perdagangan.</p>
  ${kpiCards(ECONOMY_FACTS)}
  <h2>Pertumbuhan ekonomi, 2020–2024</h2>
  <div class="card">
    <div class="toolbar">
      <span class="segmented" role="group" aria-label="Jenis chart">
        <button data-action="chart-mode" data-mode="line" aria-pressed="${mode === "line"}">Garis</button>
        <button data-action="chart-mode" data-mode="bar" aria-pressed="${mode === "bar"}">Batang</button>
      </span>
      <button class="secondary" data-action="download-csv" data-csv="growth">Unduh data (CSV)</button>
    </div>
    <div class="chart-wrap">${chart}</div>
    ${sourceLine(SOURCES.bps2024)}
  </div>
  <h2>Inflasi Desember, 2020–2024</h2>
  <p class="lede">Inflasi 2024 sebesar 1,57% — terendah dalam lima tahun — setelah sempat 5,51% pada 2022.</p>
  <div class="card chart-wrap">${barChart(INFLATION, { unit: "%", color: "#e8a33d" })}
  ${sourceLine(SOURCES.bps2024)}</div>`;
}

export function kesehatanPage() {
  return `
  <h2>Kesehatan Indonesia</h2>
  <p class="lede">Dua capaian yang paling sering dicari: stunting balita yang terus turun, dan cakupan jaminan kesehatan yang hampir menyeluruh.</p>
  <div class="two-col">
    <div class="card"><h3>Stunting balita, 2024</h3>
      <div class="donut-row">${donutChart(19.8, { label: "stunting, 2024" })}
      <p><strong>19,8%</strong> balita mengalami stunting pada 2024 — turun dari 24,4% pada 2021. Target pemerintah adalah di bawah 14% pada 2029.</p></div>
      ${sourceLine(SOURCES.ssgi2024)}</div>
    <div class="card"><h3>Stunting, 2021–2024</h3>
      <div class="chart-wrap">${barChart(STUNTING, { unit: "%", height: 200 })}</div>
      ${sourceLine(SOURCES.ssgi2024)}</div>
  </div>
  <div class="stack" style="margin-top:16px">
    <div class="card"><h3>Jaminan kesehatan</h3>
    <ul class="fact-list">
      <li><strong>±98%</strong> penduduk tercakup JKN — ${SOURCES.bpjs2024}</li>
      <li><strong>10.000+</strong> puskesmas melayani di seluruh kabupaten/kota — Kemenkes, 2024</li>
    </ul></div>
  </div>`;
}

export function pendidikanPage() {
  return `
  <h2>Pendidikan Indonesia</h2>
  <p class="lede">Indeks Pembangunan Manusia 2024 sebesar 75,02 — kategori tinggi — ditopang antara lain oleh capaian pendidikan.</p>
  ${kpiCards([
    { label: "IPM", value: "75,02", note: "Kategori tinggi", source: SOURCES.bps2024 },
    { label: "Harapan lama sekolah", value: "13,2 thn", note: "Sekitar, 2024", source: SOURCES.bps2024 },
    { label: "Rata-rata lama sekolah", value: "9,1 thn", note: "Sekitar, 2024", source: SOURCES.bps2024 },
  ])}
  <h2>Lama sekolah, 2024</h2>
  <p class="lede">Selisih 4,1 tahun antara harapan dan rata-rata lama sekolah menunjukkan pendidikan yang masih harus mengejar: anak hari ini diperkirakan bersekolah lebih lama daripada generasi sebelumnya.</p>
  <div class="card chart-wrap">${barChart(SCHOOLING, { unit: " thn", color: "#0e4f4a" })}
  ${sourceLine(SOURCES.bps2024)}</div>
  <div class="card"><h3>Apa arti angka-angka ini?</h3>
  <p><strong>Harapan lama sekolah 13,2 tahun</strong> berarti anak usia 7 tahun pada 2024 diperkirakan dapat mengenyam pendidikan selama itu. <strong>Rata-rata lama sekolah 9,1 tahun</strong> berarti penduduk usia 25 tahun ke atas rata-rata menamatkan pendidikan setara kelas 3 SMP. Keduanya naik perlahan dari tahun ke tahun. ${sourceLine(SOURCES.bps2024)}</p></div>
  <div class="card"><h3>Cara membaca IPM</h3>
  <p>IPM menggabungkan kesehatan (angka harapan hidup), pendidikan (harapan dan rata-rata lama sekolah), dan standar hidup layak (pengeluaran per kapita). Nilai 75,02 menempatkan Indonesia pada kategori pembangunan manusia tinggi menurut klasifikasi UNDP yang dipakai BPS.</p></div>`;
}

export function ketenagakerjaanPage() {
  return `
  <h2>Ketenagakerjaan Indonesia</h2>
  <p class="lede">Pengangguran terbuka turun lima tahun berturut-turut dan mencapai 4,76% pada Februari 2025 — terendah sejak sebelum pandemi.</p>
  ${kpiCards([
    { label: "Pengangguran terbuka", value: "4,76%", note: "Februari 2025", source: SOURCES.bps2025 },
    { label: "Angkatan kerja", value: "153,1 jt", note: "Februari 2025", source: SOURCES.bps2025 },
    { label: "Pengangguran Agu 2024", value: "4,91%", note: "Agustus 2024", source: SOURCES.bps2024, delta: "▼ 0,41 pp dari Agu 2023", deltaTone: "good" },
  ])}
  <h2>Pengangguran terbuka (Agustus), 2020–2024</h2>
  <div class="card chart-wrap">${lineChart(JOBLESS, { unit: "%" })}
  ${sourceLine(SOURCES.bps2024)}</div>
  <div class="card"><h3>Membaca angka pengangguran</h3>
  <p>Angka ini adalah persentase angkatan kerja yang tidak bekerja dan sedang mencari pekerjaan. Angka Februari dan Agustus tidak bisa dibandingkan langsung karena musim kerja berbeda — bandingkan Februari dengan Februari, Agustus dengan Agustus.</p></div>`;
}

export function daerahPage(rows, sortKey = "pop") {
  const sorted = [...rows].sort((a, b) => sortKey === "name" ? a.name.localeCompare(b.name, "id") : b.pop - a.pop);
  const body = sorted.map((p) =>
    `<tr><td>${p.name}</td><td>${p.capital}</td><td>${fmt1(p.pop)} jt</td></tr>`).join("");
  return `
  <h2>Daerah: 10 provinsi berpenduduk terbanyak</h2>
  <p class="lede">Tiga provinsi di Jawa — Jawa Barat, Jawa Timur, Jawa Tengah — menampung lebih dari 130 juta jiwa, sekitar 46% penduduk Indonesia.</p>
  <h2>Enam provinsi teratas</h2>
  <div class="card">${hbarChart(PROVINCES.slice(0, 6).map((p) => ({ label: p.name, value: p.pop })), { unit: " jt" })}
  ${sourceLine(SOURCES.bps2024 + " — proyeksi penduduk 2024, dibulatkan ke 0,1 juta jiwa")}</div>
  <div class="card">
    <div class="toolbar">
      <input type="search" id="cari-daerah" placeholder="Cari provinsi atau ibu kota…" aria-label="Cari provinsi">
      <span class="segmented" role="group" aria-label="Urutan tabel">
        <button data-action="sort-daerah" data-sort="pop" aria-pressed="${sortKey === "pop"}">Terbanyak dulu</button>
        <button data-action="sort-daerah" data-sort="name" aria-pressed="${sortKey === "name"}">Abjad (A–Z)</button>
      </span>
      <button class="secondary" data-action="download-csv" data-csv="provinsi">Unduh data (CSV)</button>
    </div>
    <p class="match-count" id="jumlah-daerah">${rows.length} provinsi ditampilkan.</p>
    <table><thead><tr><th>Provinsi</th><th>Ibu kota</th><th>Penduduk</th></tr></thead>
    <tbody id="tabel-daerah">${body}</tbody></table>
    ${sourceLine(SOURCES.bps2024 + " — proyeksi penduduk 2024, dibulatkan ke 0,1 juta jiwa")}
  </div>`;
}

export function notFoundPage() {
  return `<div class="notfound"><h2>Halaman tidak ditemukan</h2>
  <p>Alamat yang Anda buka tidak ada di situs ini.</p>
  <p><a href="#/">Kembali ke Beranda</a></p></div>`;
}
