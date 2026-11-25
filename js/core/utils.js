"use strict";

"use strict";

const $ = (s, e = document) => e.querySelector(s);
const $$e = (e, s) => [...(e || document).querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const D = n => { const x = new Date(); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10); };
const cdd = (d, n) => { const x = new Date(d + 'T00:00:00Z'); x.setUTCDate(x.getUTCDate() + n); return x.toISOString().slice(0, 10); };
const dow = d => { const x = new Date(d + 'T00:00:00Z'); return (x.getUTCDay() + 6) % 7; };
const fd = s => s ? new Date(s + 'T00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—';
const fdt = s => s ? new Date(s + 'T00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
const inr = n => '₹' + Number(n || 0).toLocaleString('en-IN');
const ini = n => (n || '').split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'MP';

const BK = {
    Completed: 'ok', Installed: 'ok', Active: 'ok', Delivered: 'ok',
    Sent: 'ac', Upcoming: 'ac', Booked: 'ac',
    'Due soon': 'wa', '1st Service Due': 'wa', '2nd Service Due': 'wa', Pending: 'wa', 'Pending Install': 'wa',
    Overdue: 'er', Failed: 'er', Inactive: 'er', Cancelled: 'er'
};
const B = s => `<span class="b ${BK[s] || ''}">${esc(s)}</span>`;

function toast(m, t) {
    const e = document.createElement('div');
    e.className = 't ' + (t || '');
    e.textContent = m;
    $('#ts').append(e);
    setTimeout(() => e.remove(), 3200);
}

function modal(h) {
    $('#mdl').innerHTML = `<div class="ov" data-act="ovl"><div class="md" role="dialog" aria-modal="true">${h}</div></div>`;
    const f = $('#mdl input,#mdl select,#mdl textarea,#mdl .md button');
    f && f.focus();
}

function closeM() {
    const o = $('#mdl .ov');
    if (!o) return;
    o.classList.add('out');
    setTimeout(() => $('#mdl').innerHTML = '', 150);
}

const nmc = c => `<div class="nm"><span class="av">${esc(ini(c.name))}</span><span class="nmt">${esc(c.name)}</span></div>`;

function srvBadge(st, dt) {
    if (st === 'Completed') return B('Completed');
    if (st === 'Sent' || st === 'Reminder Sent') return B('Sent');
    const diff = Math.round((new Date(dt + 'T00:00:00Z') - new Date(D(0) + 'T00:00:00Z')) / 864e5);
    if (diff < 0) return B('Overdue');
    if (diff <= 30) return B('Due soon');
    return B('Upcoming');
}

function userPermSummary(u) {
    const p = u.permissions || {};
    const activeKeys = MODULE_DEFS.filter(m => p[m.id] && p[m.id].enabled).map(m => m.id);
    if (activeKeys.length === MODULE_DEFS.length) return '<span class="b ok">Full Access</span>';
    if (activeKeys.length === 0) return '<span class="b er">No Access</span>';
    return `<span class="b ac">${activeKeys.length}/${MODULE_DEFS.length} Modules</span>`;
}

function dchart(items, o = {}) {
    const fmt = o.fmt || String, mx = Math.max(1, ...items.map(x => x.v)), s = Math.pow(10, Math.floor(Math.log10(mx))), st = [1, 2, 2.5, 5, 10].find(x => x * s * 4 >= mx) * s, top = st * 4, len = items.length;
    let xHTML = '';
    if (o.all) {
        xHTML = `<div class="dc-x wrap">${items.map(x => `<span title="${esc(x.t || x.fl || x.l)}"><span class="xl-s">${esc(x.sl || x.l)}</span><span class="xl-f">${esc(x.fl || x.l)}</span></span>`).join('')}</div>`;
    } else {
        const k = Math.min(len, o.maxL || 5, Math.max(2, Math.floor((len + 1) / 2)));
        const ticks = len <= 1 ? [0] : Array.from({ length: k }, (_, t) => Math.round(t * (len - 1) / (k - 1)));
        xHTML = `<div class="dc-x dc-xt">${ticks.map((idx, ti) => {
            const align = len <= 1 ? 'center' : ti == 0 ? 'left' : ti == ticks.length - 1 ? 'right' : 'center';
            return `<span style="text-align:${align}" title="${esc(items[idx].t || items[idx].fl || items[idx].l)}">${esc(items[idx].l)}</span>`;
        }).join('')}</div>`;
    }
    return `<div class="dc"><div class="dc-p"><div class="dc-g">${[4, 3, 2, 1, 0].map(i => `<span><em>${esc(o.ax ? o.ax(st * i) : cmpN(st * i))}</em></span>`).join('')}</div><div class="dc-b">${items.map(x => `<div class="dc-c" data-tip="${esc(x.t || x.fl || x.l)}|${esc(fmt(x.v))}"><i style="height:${x.v ? Math.max(1.5, x.v / top * 100) : 0}%;background:${x.c || 'var(--ac)'}"></i></div>`).join('')}</div></div>${xHTML}</div>`;
}

function donut(items, fmt, ctr) {
    items = items.filter(x => x.v > 0);
    const T = items.reduce((s, x) => s + x.v, 0);
    if (!T) return '<div class="empty">No data to display</div>';
    const r = 68, C = 2 * Math.PI * r, gp = items.length > 1 ? 2.5 : 0, pc = x => (x.v / T * 100).toFixed(1), top = items.reduce((a, x) => x.v > a.v ? x : a, items[0]);
    let off = 0;
    const seg = items.map((x, i) => {
        const d = Math.max(0, x.v / T * C - gp);
        const s = `<circle class="ds" data-dsi="${i}" cx="100" cy="100" r="${r}" fill="none" stroke="${x.c || rcol(i)}" stroke-width="26" stroke-dasharray="${d} ${C - d}" stroke-dashoffset="${-off}" transform="rotate(-90 100 100)" data-tip="${esc(x.l + '|' + fmt(x.v) + ' · ' + pc(x) + '%')}"></circle>`;
        off += x.v / T * C;
        return s;
    }).join('');
    const cn = [[fmt(T), ctr || 'Total', items.length + (items.length == 1 ? ' brand' : ' brands')], ...items.map(x => [fmt(x.v), x.l, pc(x) + '% of total'])];
    const fz = n => n.length > 9 ? 14 : n.length > 7 ? 16 : 18;
    return `<div class="dn3" data-cn="${esc(JSON.stringify(cn))}"><div class="dn3c"><svg viewBox="0 0 200 200" role="img" aria-label="Donut chart: ${esc(ctr || 'Total')}"><circle cx="100" cy="100" r="${r}" fill="none" stroke="var(--bg)" stroke-width="26"/>${seg}<text class="dcv" x="100" y="97" text-anchor="middle" style="font-size:${fz(cn[0][0])}px">${esc(cn[0][0])}</text><text class="dcl" x="100" y="115" text-anchor="middle">${esc(cn[0][1])}</text><text class="dcs" x="100" y="130" text-anchor="middle">${esc(cn[0][2])}</text></svg></div>
<ul>${items.map((x, i) => `<li data-dsi="${i}"><i style="background:${x.c || rcol(i)}"></i><span class="dl" title="${esc(x.l)}">${esc(x.l)}</span><span class="dv">${esc(fmt(x.v))}<small>${pc(x)}%</small></span><div class="db"><b style="width:${pc(x)}%;background:${x.c || rcol(i)}"></b></div></li>`).join('')}</ul>
<div class="dn3f"><div><span>Total</span><b>${esc(fmt(T))}</b></div><div><span>Top Brand</span><b title="${esc(top.l)}">${esc(top.l)} · ${pc(top)}%</b></div><div><span>Brands</span><b>${items.length}</b></div></div></div>`;
}

function dnSet(root, i) {
    const raw = root.dataset.cn;
    if (!raw) return;
    let data;
    try { data = JSON.parse(raw); } catch (e) { return; }
    const a = data[i == null ? 0 : i + 1] || data[0];
    const fz = a[0].length > 9 ? 14 : a[0].length > 7 ? 16 : 18;
    const vEl = root.querySelector('.dcv');
    if (vEl) {
        vEl.textContent = a[0];
        vEl.style.fontSize = fz + 'px';
    }
    const lEl = root.querySelector('.dcl');
    if (lEl) lEl.textContent = a[1].length > 18 ? a[1].slice(0, 17) + '…' : a[1];
    const sEl = root.querySelector('.dcs');
    if (sEl) sEl.textContent = a[2];
    root.classList.toggle('hv', i != null);
    root.querySelectorAll('[data-dsi]').forEach(x => x.classList.toggle('hot', x.dataset.dsi == i));
}

let REP_RANGE = 'all';
