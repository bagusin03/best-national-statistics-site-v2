[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/bagusin03/best-national-statistics-site-v2/rank.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/bagusin03/best-national-statistics-site-v2/reward.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)

# Statistik Nusantara — Revisi

Revisi situs statistik nasional Indonesia yang statis dan sepenuhnya offline: indikator utama penduduk, ekonomi, kesehatan, pendidikan, ketenagakerjaan, dan daerah — tiap angka disertai sumber dan tahunnya. Revisi ini memperbaiki situs pertama (rank 1.645/4.140 di ronde 1): cover kini menampilkan chart dengan sumbu yang terbaca, semua chart memakai gridline + label sumbu, tiap kartu KPI membawa perubahan vs tahun lalu, unit ekspor dieja "miliar", dan format angka konsisten satu desimal.

Halaman bounty: https://make.fun/bounty/best-national-statistics-site-20261126-0539

## Isi

- **Beranda** — panel "Sekilas Indonesia" (PDB, inflasi, IPM), 4 kartu indikator utama dengan chip perubahan vs 2023, chart batang pertumbuhan 2020–2024 dengan sumbu terbaca, 3 temuan utama, chart kemiskinan, dan tautan cepat.
- **Penduduk** — proyeksi penduduk dan provinsi terbesar (chart batang horizontal berperingkat).
- **Ekonomi** — pertumbuhan PDB 2020–2024 (chart garis/batang yang bisa diganti), inflasi, ekspor US$264,7 miliar, PDB per kapita; data bisa diunduh sebagai CSV.
- **Kesehatan** — donat stunting 19,8% berdampingan dengan chart batang stunting 2021–2024, plus cakupan JKN.
- **Pendidikan** — IPM, harapan lama sekolah vs rata-rata lama sekolah (chart batang), dan cara membaca IPM.
- **Ketenagakerjaan** — pengangguran terbuka 2020–2024 (chart garis berskala) dengan perubahan vs tahun lalu.
- **Daerah** — chart 6 provinsi teratas di atas tabel 10 provinsi yang bisa dicari dan diurutkan, plus unduh CSV.

## Sumber data

Badan Pusat Statistik (BPS) 2024/2025, Survei Status Gizi Indonesia (SSGI Kemenkes) 2024, dan BPJS Kesehatan 2024. Tahun tercantum pada tiap angka di situs.

## Menjalankan

```sh
node serve.ts
```

Lalu buka http://localhost:8080 — situs statis tanpa build step, tanpa network request, tanpa font atau library eksternal. Chart digambar sendiri dengan SVG.

## Penyerahan

`main.ts` (Node 22, stdlib only) menyalin `app/` dan `screenshots/` ke `/output` dan menulis `dossier.json` dengan `buildDossier` dari `vendor/makefun-frontend.ts`:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Lisensi

MIT — lihat [LICENSE](LICENSE).
