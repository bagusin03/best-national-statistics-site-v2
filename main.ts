// Statistik Nusantara (revisi) — program penyerahan, Node 22 stdlib saja.
// Satu tugas: menyalin app/ dan screenshots/ dari repo ini ke /output
// (atau MAKEFUN_OUTPUT_DIR di luar grader) lalu menulis dossier.json
// dengan buildDossier dari vendor/makefun-frontend.ts. File vendor itu
// tidak diubah. Dua kali jalan harus menghasilkan byte yang sama.
import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
if (!existsSync(join(here, 'app'))) {
  throw new Error('app/ tidak ditemukan di repo — tidak ada yang bisa diserahkan');
}
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// Batas gate: teks dossier max 160 KiB, max 4 screenshot @ 256 KiB,
// app/ max 993 file/dir dan 16 MiB. Dijalankan 2x sebelum submit dan
// kedua run harus byte-identik (dossier.json dibandingkan dengan sha256).
// Opsi di bawah ini adalah batas gate itu sendiri — jangan diubah tanpa
// memeriksa RULES.txt, karena buildDossier menolak app/ yang melampauinya.
const DOSSIER_LIMITS = { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 };
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, DOSSIER_LIMITS),
);
