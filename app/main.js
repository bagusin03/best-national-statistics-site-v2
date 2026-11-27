// Router hash + penghubung kontrol interaktif. Satu tugas: membaca hash,
// merender halaman dari views.js, lalu menghidupkan tombol dan kolom cari
// di halaman itu. Tidak ada network request di file ini.
import { homePage, pendudukPage, ekonomiPage, kesehatanPage, pendidikanPage, ketenagakerjaanPage, daerahPage, notFoundPage } from "./views.js";
import { PROVINCES, GROWTH } from "./data.js";
import { fmt1 } from "./charts.js";

const app = document.getElementById("app");
let chartMode = "line";
let daerahSort = "pop";
let daerahQuery = "";

function setActiveNav(route) {
  document.querySelectorAll(".mainnav a").forEach((a) => {
    a.classList.toggle("active", a.dataset.route === route);
  });
}

function render() {
  const hash = location.hash.replace(/^#/, "") || "/";
  const route = hash.split("?")[0];
  setActiveNav(route);
  if (route === "/") app.innerHTML = homePage();
  else if (route === "/penduduk") app.innerHTML = pendudukPage();
  else if (route === "/ekonomi") app.innerHTML = ekonomiPage(chartMode);
  else if (route === "/kesehatan") app.innerHTML = kesehatanPage();
  else if (route === "/pendidikan") app.innerHTML = pendidikanPage();
  else if (route === "/ketenagakerjaan") app.innerHTML = ketenagakerjaanPage();
  else if (route === "/daerah") app.innerHTML = daerahPage(filteredProvinces(), daerahSort);
  else app.innerHTML = notFoundPage();
  wireControls();
  window.scrollTo(0, 0);
}

function filteredProvinces() {
  const q = daerahQuery.trim().toLowerCase();
  if (!q) return PROVINCES;
  return PROVINCES.filter((p) => p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q));
}

function sortedProvinces(rows) {
  return [...rows].sort((a, b) =>
    daerahSort === "name" ? a.name.localeCompare(b.name, "id") : b.pop - a.pop);
}

function provinceRows(rows) {
  return rows.map((p) =>
    `<tr><td>${p.name}</td><td>${p.capital}</td><td>${fmt1(p.pop)} jt</td></tr>`).join("");
}

function refreshDaerahTable() {
  const rows = sortedProvinces(filteredProvinces());
  document.getElementById("tabel-daerah").innerHTML = provinceRows(rows);
  const count = document.getElementById("jumlah-daerah");
  if (count) count.textContent = `${rows.length} provinsi ditampilkan.`;
}

function downloadCsv(kind) {
  let text = "";
  if (kind === "growth") {
    text = "tahun,pertumbuhan_pdb_persen\n" + GROWTH.map((g) => `${g.year},${g.value}`).join("\n") + "\n";
  } else {
    text = "provinsi,ibu_kota,penduduk_juta\n" + PROVINCES.map((p) => `${p.name},${p.capital},${p.pop}`).join("\n") + "\n";
  }
  const url = URL.createObjectURL(new Blob([text], { type: "text/csv" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = kind === "growth" ? "pertumbuhan-pdb-2020-2024.csv" : "penduduk-provinsi-2024.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function wireControls() {
  const search = document.getElementById("cari-daerah");
  if (search) {
    search.value = daerahQuery;
    search.addEventListener("input", () => {
      daerahQuery = search.value;
      refreshDaerahTable();
    });
  }
}

document.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-action]");
  if (!btn) return;
  const action = btn.dataset.action;
  if (action === "chart-mode") {
    chartMode = btn.dataset.mode;
    render();
  } else if (action === "sort-daerah") {
    daerahSort = btn.dataset.sort;
    render();
  } else if (action === "download-csv") {
    downloadCsv(btn.dataset.csv);
  }
});

window.addEventListener("hashchange", render);
render();
