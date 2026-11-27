// Pembuat chart SVG tanpa library: batang, garis, donat, dan batang
// horizontal. Setiap chart memakai gridline + label sumbu agar nilainya
// terbaca sekilas, juga saat screenshot diperkecil. Semua fungsi
// mengembalikan string SVG yang bisa disisipkan ke halaman.
const NS = "http://www.w3.org/2000/svg";
const TEAL = "#0e4f4a";
const TEAL_DARK = "#0a3835";
const AMBER = "#e8a33d";
const SAND = "#f2e7c9";
const GRID = "#e3dcc4";
const INK = "#1d2b29";
const MUTED = "#5c6b68";

// Tulis angka Indonesia: koma desimal, satu angka di belakang koma bila bulat.
export function fmt(v) {
  const s = String(v);
  return s.includes(".") ? s.replace(".", ",") : s;
}
export function fmt1(v) {
  return v.toFixed(1).replace(".", ",");
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function axisLabel(d) {
  return d.label ?? d.year;
}

// Lima garis grid yang rapi: bagi rentang jadi 4 langkah yang dibulatkan.
function gridTicks(min, max) {
  const span = max - min || 1;
  const raw = span / 4;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = Math.ceil(raw / mag) * mag;
  const start = Math.ceil(min / step) * step;
  const ticks = [];
  for (let t = start; t <= max + 1e-9; t += step) ticks.push(Math.round(t * 100) / 100);
  if (ticks.length < 2) ticks.push(max);
  return ticks;
}

function gridLines(ticks, y, w, padL) {
  return ticks.map((t) =>
    `<line x1="${padL}" y1="${y(t).toFixed(1)}" x2="${w - 10}" y2="${y(t).toFixed(1)}" stroke="${GRID}" stroke-width="1"/>`
    + `<text x="${padL - 8}" y="${(y(t) + 4).toFixed(1)}" text-anchor="end" font-size="12" fill="${MUTED}">${fmt(t)}</text>`
  ).join("");
}

// Chart batang vertikal dengan skala. data: [{label|year, value}]
export function barChart(data, { height = 230, unit = "%", color = TEAL } = {}) {
  const w = 640, padL = 52, padB = 34, padT = 24;
  const values = data.map((d) => d.value);
  const max = Math.max(...values, 0);
  const min = Math.min(0, ...values);
  const ticks = gridTicks(min, max);
  const plotH = height - padT - padB;
  const plotW = w - padL - 12;
  const y = (v) => padT + ((max - v) / (max - min || 1)) * plotH;
  const zeroY = y(0);
  const step = plotW / data.length;
  const bw = Math.min(74, step * 0.62);
  let bars = "";
  data.forEach((d, i) => {
    const x = padL + i * step + (step - bw) / 2;
    const top = Math.min(y(d.value), zeroY);
    const h = Math.abs(zeroY - y(d.value));
    const fill = d.value < 0 ? "#b3541e" : color;
    bars += `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${bw}" height="${Math.max(h, 2).toFixed(1)}" rx="5" fill="${fill}"/>`
      + `<text x="${(x + bw / 2).toFixed(1)}" y="${(top - 7).toFixed(1)}" text-anchor="middle" font-size="13" font-weight="700" fill="${INK}">${fmt(d.value)}${unit}</text>`
      + `<text x="${(x + bw / 2).toFixed(1)}" y="${height - 12}" text-anchor="middle" font-size="12" fill="${MUTED}">${esc(axisLabel(d))}</text>`;
  });
  return `<svg viewBox="0 0 ${w} ${height}" role="img" aria-label="Diagram batang" xmlns="${NS}">`
    + gridLines(ticks, y, w, padL)
    + `<line x1="${padL}" y1="${zeroY.toFixed(1)}" x2="${w - 10}" y2="${zeroY.toFixed(1)}" stroke="${MUTED}" stroke-width="1.5"/>`
    + bars + `</svg>`;
}

// Chart garis dengan skala, area tipis, dan titik berlabel.
export function lineChart(data, { height = 230, unit = "%", color = AMBER } = {}) {
  const w = 640, padL = 52, padB = 34, padT = 24;
  const values = data.map((d) => d.value);
  const max = Math.max(...values, 0);
  const min = Math.min(0, ...values);
  const ticks = gridTicks(min, max);
  const plotH = height - padT - padB;
  const plotW = w - padL - 16;
  const x = (i) => padL + (i / (data.length - 1)) * plotW;
  const y = (v) => padT + ((max - v) / (max - min || 1)) * plotH;
  const pts = data.map((d, i) => `${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(" ");
  const area = `${padL},${y(0).toFixed(1)} ` + pts + ` ${x(data.length - 1).toFixed(1)},${y(0).toFixed(1)}`;
  let dots = "";
  data.forEach((d, i) => {
    // Label titik pertama digeser ke kanan supaya tidak menabrak label sumbu-y.
    const nearAxis = x(i) < padL + 40;
    const lx = nearAxis ? x(i) + 12 : x(i);
    const anchor = nearAxis ? "start" : "middle";
    dots += `<circle cx="${x(i).toFixed(1)}" cy="${y(d.value).toFixed(1)}" r="5.5" fill="#fff" stroke="${color}" stroke-width="3"/>`
      + `<text x="${lx.toFixed(1)}" y="${(y(d.value) - 12).toFixed(1)}" text-anchor="${anchor}" font-size="13" font-weight="700" fill="${INK}">${fmt(d.value)}${unit}</text>`
      + `<text x="${x(i).toFixed(1)}" y="${height - 12}" text-anchor="middle" font-size="12" fill="${MUTED}">${esc(axisLabel(d))}</text>`;
  });
  return `<svg viewBox="0 0 ${w} ${height}" role="img" aria-label="Diagram garis" xmlns="${NS}">`
    + gridLines(ticks, y, w, padL)
    + `<polygon points="${area}" fill="${color}" opacity="0.12"/>`
    + `<line x1="${padL}" y1="${y(0).toFixed(1)}" x2="${w - 10}" y2="${y(0).toFixed(1)}" stroke="${MUTED}" stroke-width="1.5"/>`
    + `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>`
    + dots + `</svg>`;
}

// Donat untuk satu pangsa (mis. 19,8% dari 100), angka besar di tengah.
export function donutChart(share, { label = "", color = TEAL } = {}) {
  const r = 62, c = 2 * Math.PI * r;
  const dash = (share / 100) * c;
  return `<svg viewBox="0 0 170 170" width="170" height="170" style="flex:none" role="img" aria-label="${esc(label)}" xmlns="${NS}">`
    + `<circle cx="85" cy="85" r="${r}" fill="none" stroke="${SAND}" stroke-width="24"/>`
    + `<circle cx="85" cy="85" r="${r}" fill="none" stroke="${color}" stroke-width="24" stroke-dasharray="${dash.toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 85 85)" stroke-linecap="round"/>`
    + `<text x="85" y="81" text-anchor="middle" font-size="27" font-weight="800" fill="${INK}">${fmt(share)}%</text>`
    + `<text x="85" y="102" text-anchor="middle" font-size="11.5" fill="${MUTED}">${esc(label)}</text></svg>`;
}

// Batang horizontal berperingkat untuk provinsi.
export function hbarChart(rows, { unit = " jt" } = {}) {
  const max = Math.max(...rows.map((r) => r.value));
  return rows.map((r, i) => {
    const pct = (r.value / max) * 100;
    return `<div class="hbar-row"><span class="hbar-rank">${i + 1}</span><span class="hbar-label">${esc(r.label)}</span>`
      + `<span class="hbar-track"><span class="hbar-fill" style="width:${pct.toFixed(1)}%"></span></span>`
      + `<span class="hbar-value">${fmt1(r.value)}${unit}</span></div>`;
  }).join("");
}
