"use strict";

const $ = (s, e = document) => e.querySelector(s), esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function mpLogo(s = 32) {
    return `<svg viewBox="0 0 40 40" width="${s}" height="${s}" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex:none;border-radius:10px;overflow:hidden">
<defs>
<linearGradient id="mpAcG" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
<stop offset="0%" stop-color="#0284c7"/>
<stop offset="100%" stop-color="#0369a1"/>
</linearGradient>
</defs>
<rect width="40" height="40" rx="10" fill="url(#mpAcG)"/>
<rect x="7" y="8" width="26" height="11" rx="2.5" fill="#ffffff" fill-opacity="0.95"/>
<rect x="9.5" y="14" width="21" height="2" rx="1" fill="#0284c7" fill-opacity="0.35"/>
<circle cx="29" cy="11.5" r="1.3" fill="#10b981"/>
<path d="M20 22v12M15 25.5l10 5M25 25.5l-10 5" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
<path d="M18 23.5l2-1.5 2 1.5M18 32.5l2 1.5 2-1.5M15.5 27.5l-.5-2.5 2.5.5M24.5 27.5l.5-2.5-2.5.5M15.5 28.5l-.5 2.5 2.5-.5M24.5 28.5l.5 2.5-2.5-.5" stroke="#7dd3fc" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="20" cy="28" r="2.2" fill="#38bdf8"/>
</svg>`;
}
const IC = { logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9', home: 'M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z', users: 'M16 20v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 20v-1a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8', wind: 'M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7a3 3 0 1 1-3 3', wrench: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z', zap: 'M13 2L3 14h8l-1 8 10-12h-8z', msg: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', star: 'M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5 7.5-.7z', cal: 'M3 5h18v16H3zM3 10h18M8 3v4M16 3v4', chart: 'M4 20V10M10 20V4M16 20v-8M22 20H2', list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01', file: 'M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8zM14 3v5h5', team: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M4 21a8 8 0 0 1 16 0', gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M12 2v3M12 19v3M2 12h3M19 12h3', plus: 'M12 5v14M5 12h14', menu: 'M3 6h18M3 12h18M3 18h18', search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16M21 21l-4.3-4.3', bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M10 21h4', moon: 'M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z', more: 'M5 12h.01M12 12h.01M19 12h.01' };
const ic = n => `<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${IC[n]}"/></svg>`;
const D = n => { const x = new Date(); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10) };
const fd = s => s ? new Date(s + 'T00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—';
const inr = n => '₹' + Number(n || 0).toLocaleString('en-IN');
const ini = n => n.split(' ').map(w => w[0]).join('').slice(0, 2);
const BK = { Completed: 'ok', Delivered: 'ok', Eligible: 'ok', Resolved: 'ok', Active: 'ok', Sent: 'ac', Booked: 'ac', Assigned: 'ac', 'Due soon': 'wa', Pending: 'wa', 'In Progress': 'wa', 'On Hold': 'wa', Due: 'wa', Failed: 'er', Overdue: 'er', Open: 'er', Cancelled: 'er' };
const B = s => `<span class="b ${BK[s] || ''}">${esc(s)}</span>`;

const KEY = 'mpac-demo-v1';
const MODULE_DEFS = [
    { id: 'retail', title: 'Retail & POS', desc: 'Products, stock levels, orders, suppliers, and billing invoices', icon: 'cart', hasEdit: true, hasDelete: true },
    { id: 'service', title: 'Service & AMC', desc: 'Job scheduling, technician dispatch, maintenance calendar, and plans', icon: 'wrench', hasEdit: true, hasDelete: true },
    { id: 'customers', title: 'Customers & Assets', desc: 'Customer directory, installed AC units, warranty & service history', icon: 'users', hasEdit: true, hasDelete: true },
    { id: 'engagement', title: 'Customer Engagement', desc: 'Automated reminders, SMS/WhatsApp messaging, templates, and feedback', icon: 'msg', hasEdit: true, hasDelete: true },
    { id: 'reports', title: 'Insights & Analytics', desc: 'Financial reports, technician performance metrics, and inventory valuation', icon: 'chart', hasExport: true },
    { id: 'admin', title: 'System Administration', desc: 'Staff user accounts, permission matrix, and system configuration', icon: 'gear', hasManage: true }
];

const PRESETS = {
    admin: {
        label: 'Full Administrator',
        desc: 'Unrestricted access to all modules and system controls',
        perms: {
            retail: { enabled: true, view: true, edit: true, delete: true },
            service: { enabled: true, view: true, edit: true, delete: true },
            customers: { enabled: true, view: true, edit: true, delete: true },
            engagement: { enabled: true, view: true, edit: true, delete: true },
            reports: { enabled: true, view: true, export: true },
            admin: { enabled: true, view: true, manage: true }
        }
    },
    manager: {
        label: 'Operations Manager',
        desc: 'Operations across Service, Retail, Customers, and Reporting',
        perms: {
            retail: { enabled: true, view: true, edit: true, delete: false },
            service: { enabled: true, view: true, edit: true, delete: true },
            customers: { enabled: true, view: true, edit: true, delete: false },
            engagement: { enabled: true, view: true, edit: true, delete: false },
            reports: { enabled: true, view: true, export: true },
            admin: { enabled: false, view: false, manage: false }
        }
    },
    tech: {
        label: 'Service Technician',
        desc: 'Field service jobs, calendar dispatch, and customer lookup',
        perms: {
            retail: { enabled: false, view: false, edit: false, delete: false },
            service: { enabled: true, view: true, edit: true, delete: false },
            customers: { enabled: true, view: true, edit: false, delete: false },
            engagement: { enabled: false, view: false, edit: false, delete: false },
            reports: { enabled: false, view: false, export: false },
            admin: { enabled: false, view: false, manage: false }
        }
    },
    cashier: {
        label: 'Retail Cashier / POS',
        desc: 'Point of sale, product catalog, customer registry, and invoices',
        perms: {
            retail: { enabled: true, view: true, edit: true, delete: false },
            service: { enabled: false, view: false, edit: false, delete: false },
            customers: { enabled: true, view: true, edit: true, delete: false },
            engagement: { enabled: false, view: false, edit: false, delete: false },
            reports: { enabled: false, view: false, export: false },
            admin: { enabled: false, view: false, manage: false }
        }
    },
    support: {
        label: 'Customer Support',
        desc: 'Customer relations, messages, automations, and feedback',
        perms: {
            retail: { enabled: false, view: false, edit: false, delete: false },
            service: { enabled: true, view: true, edit: false, delete: false },
            customers: { enabled: true, view: true, edit: true, delete: false },
            engagement: { enabled: true, view: true, edit: true, delete: false },
            reports: { enabled: false, view: false, export: false },
            admin: { enabled: false, view: false, manage: false }
        }
    }
};

const defaultUsers = [
    { id: 'U1', name: 'Rajesh Amin', email: 'rajesh@mobilepoint.in', phone: '+91 98250 11001', status: 'Active', lastLogin: 'Just now', preset: 'admin', permissions: JSON.parse(JSON.stringify(PRESETS.admin.perms)) },
    { id: 'U2', name: 'Hetal Modi', email: 'hetal@mobilepoint.in', phone: '+91 98250 11002', status: 'Active', lastLogin: '2 hours ago', preset: 'manager', permissions: JSON.parse(JSON.stringify(PRESETS.manager.perms)) },
    { id: 'U3', name: 'Suresh Rathod', email: 'suresh@mobilepoint.in', phone: '+91 98250 11003', status: 'Active', lastLogin: 'Yesterday', preset: 'tech', permissions: JSON.parse(JSON.stringify(PRESETS.tech.perms)) },
    { id: 'U4', name: 'Imran Sheikh', email: 'imran@mobilepoint.in', phone: '+91 98250 11004', status: 'Active', lastLogin: '3 days ago', preset: 'tech', permissions: JSON.parse(JSON.stringify(PRESETS.tech.perms)) },
    { id: 'U5', name: 'Pooja Vyas', email: 'pooja@mobilepoint.in', phone: '+91 98250 11005', status: 'Active', lastLogin: '5 days ago', preset: 'cashier', permissions: JSON.parse(JSON.stringify(PRESETS.cashier.perms)) }
];

function userPermSummary(u) {
    const p = u.permissions || {};
    const activeKeys = MODULE_DEFS.filter(m => p[m.id] && p[m.id].enabled).map(m => m.id);
    if (activeKeys.length === MODULE_DEFS.length) {
        return '<span class="b ok">Full Access (6/6)</span>';
    }
    if (activeKeys.length === 0) {
        return '<span class="b er">No Access</span>';
    }
    const tags = activeKeys.slice(0, 3).map(k => {
        const def = MODULE_DEFS.find(m => m.id === k);
        return `<span class="tag-pill">${esc(def.title.split(' ')[0])}</span>`;
    }).join(' ');
    return `<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap"><span class="b ac">${activeKeys.length} of 6 Modules</span> ${tags}${activeKeys.length > 3 ? `<span class="mu" style="font-size:11px">+${activeKeys.length - 3}</span>` : ''}</div>`;
}

function seed() {
    const team = [['T1', 'Suresh Rathod', 'Technician', 'Alkapuri'], ['T2', 'Imran Sheikh', 'Technician', 'Manjalpur'], ['T3', 'Dinesh Chauhan', 'Technician', 'Karelibaug'], ['T4', 'Hetal Modi', 'Manager', 'All areas'], ['T5', 'Rajesh Amin', 'Owner', 'All areas']].map(([id, name, role, area]) => ({ id, name, role, area, active: true }));
    const plans = [{ id: 'P1', name: 'Complimentary AC Service', visits: 2, days: 180, start: 'Purchase date', active: true }, { id: 'P2', name: 'Premium Care', visits: 4, days: 90, start: 'Purchase date', active: true }];
    const nm = ['Aarav Patel|Vadodara', 'Diya Shah|Ahmedabad', 'Rohan Mehta|Surat', 'Ananya Joshi|Vadodara', 'Kabir Desai|Anand', 'Meera Trivedi|Vadodara', 'Vikram Solanki|Bharuch', 'Isha Parmar|Surat', 'Nikhil Rana|Vadodara', 'Pooja Vyas|Ahmedabad', 'Harsh Gandhi|Nadiad', 'Sneha Kulkarni|Vadodara'];
    const bm = [['Daikin', 'FTKF35 1.0T'], ['LG', 'PS-Q19 1.5T'], ['Voltas', '185V Vectra 1.5T'], ['Hitachi', 'Kashikoi 1.5T'], ['Samsung', 'AR18 1.5T'], ['Blue Star', 'IC318 1.5T']], chs = ['WhatsApp', 'SMS', 'Email'];
    const customers = [], assets = [], jobs = [], msgs = [], fb = [];
    nm.forEach((s, i) => {
        const [n, c] = s.split('|'), id = 'C' + (101 + i); customers.push({ id, name: n, city: c, phone: '+91 98250 ' + String(10000 + i * 3917).slice(-5), email: n.split(' ')[0].toLowerCase() + '@example.in', ch: chs[i % 3], service: true, promo: i % 5 != 4, active: i != 10 });
        for (let j = 0; j < (i % 4 == 0 ? 2 : 1); j++) { const b = bm[(i + j) % 6]; assets.push({ sn: 'MP' + (4100 + i * 2 + j), cid: id, brand: b[0], model: b[1], pur: D(-(40 + i * 17 + j * 9)), plan: i % 7 == 6 ? '' : (i % 3 == 0 ? 'P2' : 'P1'), inv: 'INV-' + (2201 + i * 2 + j), amt: 32000 + i * 2500 }) }
    });
    const st = ['Completed', 'Booked', 'Assigned', 'In Progress', 'Due', 'Completed', 'On Hold', 'Booked', 'Completed', 'Due'], ty = ['Routine service', 'Gas refill', 'Deep cleaning', 'Repair'];
    st.forEach((s, k) => { const a = assets[k + (k > 6 ? 1 : 0)]; jobs.push({ id: 'J' + (3001 + k), cid: a.cid, ac: a.sn, type: ty[k % 4], due: D(k - 5), appt: s == 'Completed' ? D(-k - 2) : s == 'Due' ? '' : D(k % 4), tech: s == 'Due' ? '' : team[k % 3].name, status: s, paid: !a.plan, amt: a.plan ? 0 : 1200, notes: '' }) });
    const tp = ['Customer visit greeting', 'Purchase thank-you', 'Installation follow-up', 'Complimentary service reminder', 'Booking confirmation', 'Service completion', 'Feedback request', 'Next-service reminder', 'Complaint follow-up', 'Seasonal offer'];
    const ss = ['Delivered', 'Delivered', 'Failed', 'Sent', 'Pending', 'Delivered', 'Failed', 'Delivered', 'Delivered', 'Sent', 'Delivered', 'Failed'], er = { WhatsApp: 'Number not registered on WhatsApp', SMS: 'Template mismatch (simulated)', Email: 'Mailbox full' };
    ss.forEach((s, k) => { const ch = chs[k % 3]; msgs.push({ id: 'M' + (7001 + k), cid: 'C' + (101 + k), ch, tpl: tp[k % 10], status: s, retries: s == 'Failed' ? 1 : 0, err: s == 'Failed' ? er[ch] : '', time: D(-(k % 5)) }) });
    [[5, 'Technician was prompt and polite.'], [4, 'Good service, slight delay.'], [2, 'AC still not cooling properly after service.'], [5, 'Very professional.'], [1, 'Technician arrived late and left a mess.'], [4, 'Satisfied overall.']].forEach(([r, c], i) => fb.push({ id: 'F' + (501 + i), cid: 'C' + (101 + i), job: 'J' + (3001 + i), rating: r, comment: c, status: r <= 2 ? 'Open' : 'None', staff: '', notes: '', time: D(-i - 1) }));
    const fl = [['Customer visit greeting', 'Customer visit logged', 'WhatsApp', 0], ['AC purchase thank-you', 'Purchase recorded', 'WhatsApp', 0], ['Installation follow-up', 'Installation completed', 'WhatsApp', 3], ['Complimentary-service reminder', 'Service due in N days', 'WhatsApp', 14], ['Booking confirmation', 'Appointment booked', 'SMS', 0], ['Technician assignment notice', 'Technician assigned', 'SMS', 0], ['Service completion thank-you', 'Job completed', 'WhatsApp', 0], ['Feedback request', 'Job completed', 'WhatsApp', 1], ['Low-rating escalation', 'Rating of 2 or below', 'Internal task', 0], ['Next-service reminder', 'Next service due in N days', 'WhatsApp', 14], ['Seasonal promotional campaign', 'Scheduled campaign', 'Email', 0], ['Failed-message alert', 'Message failed', 'Internal task', 0]].map(([name, trig, ch, lead], i) => ({ id: 'W' + (i + 1), name, trig, ch, lead, on: i != 10, fb: ch == 'WhatsApp' ? 'SMS' : 'None' }));
    const bodies = ['Hello {{name}}, thank you for visiting Mobile Point.', 'Thank you {{name}} for purchasing your {{brand}} AC.', 'Hi {{name}}, how is your new AC working?', 'Hi {{name}}, your complimentary AC service is due on {{date}}.', 'Hi {{name}}, your service is booked for {{date}}.', 'Hi {{name}}, your AC service is complete. Thank you!', 'Hi {{name}}, how was your service? Rate us 1 to 5.', 'Hi {{name}}, your next AC service is due on {{date}}.', 'Hi {{name}}, we are sorry about your experience. Our manager will call you.', 'Hi {{name}}, summer offers on AC maintenance are here.'];
    const tpls = tp.map((name, i) => ({ id: 'TP' + (i + 1), name, ch: chs[i % 3], cat: i == 9 ? 'Promotional offers' : i == 6 ? 'Feedback requests' : i == 4 ? 'Appointment confirmations' : 'Utility/service updates', body: bodies[i], on: true }));
    return { customers, assets, jobs, msgs, fb, flows: fl, tpls, team, plans, read: [], users: JSON.parse(JSON.stringify(defaultUsers)), set: { theme: 'light', accent: '#4F46E5', dens: 'comfortable', view: 'list' }, ...retail() };
}
let S; try { S = JSON.parse(localStorage.getItem(KEY) || 'null') } catch (e) { } S = S || seed();
if (!S.set) S.set = { theme: 'light', accent: '#4F46E5', dens: 'comfortable', view: 'list' };
else if (S.set.theme === 'system' || !S.set.theme) S.set.theme = 'light';
if (!S.users || !S.users.length) {
    S.users = JSON.parse(JSON.stringify(defaultUsers));
} else {
    S.users.forEach(u => {
        if (!u.permissions) {
            const pKey = u.role === 'Owner' ? 'admin' : u.role === 'Manager' ? 'manager' : u.role === 'Technician' ? 'tech' : u.role === 'Billing Staff' ? 'cashier' : 'support';
            u.preset = pKey;
            u.permissions = JSON.parse(JSON.stringify(PRESETS[pKey].perms));
        }
        delete u.role;
    });
}
const AUTH_KEY = 'mp_auth_user';
let currentUser = null;
try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) {
        currentUser = JSON.parse(raw);
    } else if (localStorage.getItem('mp_logged_out') !== '1') {
        currentUser = (S.users && S.users[0]) || defaultUsers[0];
        localStorage.setItem(AUTH_KEY, JSON.stringify(currentUser));
    }
} catch (e) {
    currentUser = (S.users && S.users[0]) || defaultUsers[0];
}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)) } catch (e) { } };

const cust = id => S.customers.find(c => c.id === id) || { name: 'Unknown', phone: '', email: '' };
const asset = sn => S.assets.find(a => a.sn === sn) || { brand: '—', model: '' };
function entl(a) {
    const p = S.plans.find(x => x.id === a.plan); if (!p) return { s: 'No plan' };
    const used = S.jobs.filter(j => j.ac === a.sn && j.status == 'Completed' && !j.paid).length; if (used >= p.visits) return { s: 'Fully used', left: 0 };
    const b = new Date(a.pur + 'T00:00'); b.setDate(b.getDate() + p.days * (used + 1)); const due = b.toISOString().slice(0, 10), k = Math.round((b - new Date(D(0) + 'T00:00')) / 864e5);
    return { due, left: p.visits - used, s: k < 0 ? 'Overdue' : k <= 30 ? 'Due soon' : 'Eligible' }
}

function toast(m, t) { const e = document.createElement('div'); e.className = 't ' + (t || ''); e.textContent = m; $('#ts').append(e); setTimeout(() => e.remove(), 3200) }
function modal(h) { $('#mdl').innerHTML = `<div class="ov" data-act="ovl"><div class="md" role="dialog" aria-modal="true">${h}</div></div>`; const f = $('#mdl input,#mdl select,#mdl textarea,#mdl .md button'); f && f.focus() }
function closeM() { const o = $('#mdl .ov'); if (!o) return; o.classList.add('out'); setTimeout(() => $('#mdl').innerHTML = '', 150) }
function sim(id) { const m = S.msgs.find(x => x.id === id); if (!m) return; m.status = 'Pending'; setTimeout(() => { m.status = 'Sent'; save(); rr() }, 900); setTimeout(() => { m.status = 'Delivered'; m.err = ''; save(); rr(); toast('Message ' + m.id + ' delivered (simulated)') }, 2200) }
const rr = () => { if (V.k !== '' && !/\/(new|edit)/.test(V.page)) render(true) };

const NAV = [['overview', 'Overview', 'home'], ['customers', 'Customers', 'users'], ['assets', 'AC Assets', 'wind'], ['services', 'Service Management', 'wrench'], ['calendar', 'Calendar', 'cal'], ['automations', 'Automations', 'zap'], ['messages', 'Messages', 'msg'], ['feedback', 'Feedback & Complaints', 'star'], ['reports', 'Reports', 'chart'], ['plans', 'Service Plans', 'list'], ['templates', 'Message Templates', 'file'], ['team', 'Team & Technicians', 'team'], ['users', 'Users & Permissions', 'users'], ['settings', 'Settings', 'gear']];
const nmc = c => `<div class="nm"><span class="av">${esc(ini(c.name))}</span><span class="nmt">${esc(c.name)}</span></div>`;
const P = {
    users: {
        t: 'Users & Permissions',
        s: 'Manage user access, module-level privileges, and operational security.',
        add: ['Add user', 'user-new'],
        chips: ['All', 'Full Access', 'Partial Access', 'Active', 'Inactive'],
        chip: (r, c) => {
            if (c === 'Active' || c === 'Inactive') return r.status === c;
            const cnt = MODULE_DEFS.filter(m => (r.user.permissions || {})[m.id]?.enabled).length;
            if (c === 'Full Access') return cnt === MODULE_DEFS.length;
            if (c === 'Partial Access') return cnt > 0 && cnt < MODULE_DEFS.length;
            return true;
        },
        rows: () => (S.users || []).map(u => ({
            id: u.id,
            name: u.name,
            email: u.email,
            phone: u.phone || '—',
            status: u.status || 'Active',
            lastLogin: u.lastLogin || 'Never',
            user: u
        })),
        cols: [
            ['User', r => `<div class="nm"><span class="av">${esc(ini(r.name))}</span><span><b>${esc(r.name)}</b><small class="mu" style="display:block;font-weight:400">${esc(r.email)}</small></span></div>`],
            ['Module Permissions', r => userPermSummary(r.user)],
            ['Phone', r => esc(r.phone)],
            ['Last login', r => `<span class="mu">${esc(r.lastLogin)}</span>`],
            ['Status', r => B(r.status)]
        ],
        open: id => go('users/' + id)
    },
    customers: {
        t: 'Customers', s: 'Everyone who has bought or serviced an AC with Mobile Point.', add: ['Add customer', 'add-cust'], chips: ['All', 'Due soon', 'Overdue'], chip: (r, c) => r.ds == c,
        rows: () => S.customers.map(c => { const as = S.assets.filter(a => a.cid == c.id), e = as.map(entl).filter(x => x.due).sort((a, b) => a.due > b.due ? 1 : -1)[0]; return { ...c, units: as.length, due: e?.due || '', ds: e?.s || '—' } }),
        cols: [['Customer', nmc], ['Mobile', r => esc(r.phone)], ['Units', r => r.units], ['Next service', r => r.due ? `<span class="ns-val"><span class="ns-date">${fd(r.due)}</span>${r.ds != '—' ? B(r.ds) : ''}</span>` : '<span class="mu">—</span>'], ['Preferred', r => esc(r.ch)], ['Status', r => B(r.active ? 'Active' : 'Inactive')]], open: id => profile(id)
    },
    assets: {
        t: 'AC Assets', s: 'Every AC registered, with plan entitlement calculated from real dates.', chips: ['All', 'Eligible', 'Due soon', 'Overdue', 'Fully used'], chip: (r, c) => r.es == c,
        rows: () => S.assets.map(a => ({ id: a.sn, ...a, cn: cust(a.cid).name, es: entl(a).s, due: entl(a).due })),
        cols: [['Serial', r => esc(r.sn)], ['Customer', r => esc(r.cn)], ['AC', r => esc(r.brand + ' ' + r.model)], ['Purchased', r => fd(r.pur)], ['Invoice', r => esc(r.inv)], ['Next free service', r => fd(r.due)], ['Entitlement', r => B(r.es)]], open: id => profile(S.assets.find(a => a.sn == id).cid)
    },
    services: {
        t: 'Service Management', s: 'Jobs from due reminder to completion.', add: ['Schedule service', 'add-job'], chips: ['All', 'Due', 'Booked', 'Assigned', 'In Progress', 'Completed', 'On Hold', 'Cancelled'], chip: (r, c) => r.status == c,
        rows: () => S.jobs.map(j => ({ ...j, cn: cust(j.cid).name, acn: asset(j.ac).brand + ' ' + asset(j.ac).model })),
        cols: [['Job', r => esc(r.id)], ['Customer', r => esc(r.cn)], ['AC', r => esc(r.acn)], ['Type', r => esc(r.type)], ['Appointment', r => fd(r.appt)], ['Technician', r => esc(r.tech || 'Unassigned')], ['Billing', r => r.paid ? 'Paid ' + inr(r.amt) : 'Complimentary'], ['Status', r => B(r.status)]], open: id => jobM(id)
    },
    automations: {
        t: 'Automations', s: 'Workflows that message customers at the right time. Sending is simulated in this demo.', chips: ['All', 'Active', 'Paused'], chip: (r, c) => (c == 'Active') == r.on,
        rows: () => S.flows.map(f => ({ ...f, sn: f.on ? 'Active' : 'Paused' })), cols: [['Workflow', r => `<b>${esc(r.name)}</b>`], ['Trigger', r => esc(r.trig)], ['Channel', r => esc(r.ch)], ['Lead / delay', r => r.lead + ' days'], ['Status', r => `<button class="sw" role="switch" aria-checked="${r.on}" aria-label="Toggle ${esc(r.name)}" data-act="flow" data-id="${r.id}"></button>`]], open: id => flowM(id)
    },
    messages: {
        t: 'Messages', s: 'Delivery status below is simulated. No real messages are sent from this demo.', chips: ['All', 'Failed', 'Pending', 'Sent', 'Delivered'], chip: (r, c) => r.status == c,
        rows: () => S.msgs.map(m => ({ ...m, cn: cust(m.cid).name })), cols: [['Customer', r => esc(r.cn)], ['Channel', r => esc(r.ch)], ['Template', r => esc(r.tpl)], ['Date', r => fd(r.time)], ['Retries', r => r.retries], ['Status', r => B(r.status)]], open: id => msgM(id)
    },
    feedback: {
        t: 'Feedback & Complaints', s: 'Low ratings create a review task for staff. They never trigger promotions.', add: ['Record feedback', 'add-fb'], chips: ['All', 'Open', 'Resolved'], chip: (r, c) => r.status == c,
        rows: () => S.fb.map(f => ({ ...f, cn: cust(f.cid).name })), cols: [['Customer', r => esc(r.cn)], ['Job', r => esc(r.job)], ['Rating', r => `<span aria-label="${r.rating} out of 5">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>`], ['Comment', r => esc(r.comment)], ['Assigned', r => esc(r.staff || '—')], ['Complaint', r => r.status == 'None' ? '—' : B(r.status)]], open: id => fbM(id)
    },
    plans: { t: 'Service Plans', s: 'Entitlements are calculated from each plan, not fixed to six months.', rows: () => S.plans.map(p => ({ ...p, n: S.assets.filter(a => a.plan == p.id).length })), cols: [['Plan', r => `<b>${esc(r.name)}</b>`], ['Included visits', r => r.visits], ['Interval', r => r.days + ' days'], ['Starts from', r => esc(r.start)], ['Assets', r => r.n], ['Status', r => B(r.active ? 'Active' : 'Inactive')]], open: id => toast('Plan editing is not in this build') },
    templates: { t: 'Message Templates', s: 'Provider approval status is simulated.', rows: () => S.tpls, cols: [['Template', r => `<b>${esc(r.name)}</b>`], ['Channel', r => esc(r.ch)], ['Category', r => esc(r.cat)], ['Approval', r => '<span class="b">Simulated: approved</span>'], ['Status', r => B(r.on ? 'Active' : 'Inactive')]], open: id => tplM(id) },
    team: { t: 'Team & Technicians', s: 'Role-based views are frontend simulation only. Real access control belongs on the server.', rows: () => S.team.map(t => ({ ...t, load: S.jobs.filter(j => j.tech == t.name && !['Completed', 'Cancelled'].includes(j.status)).length })), cols: [['Name', r => nmc(r)], ['Role', r => esc(r.role)], ['Area', r => esc(r.area)], ['Open jobs', r => r.load], ['Status', r => B(r.active ? 'Active' : 'Inactive')]], open: () => { } }
};
const V = { k: '', q: '', f: 'All', p: 0 };

Object.assign(IC, { box: 'M21 8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v8', layers: 'M12 2l10 5-10 5L2 7zM2 17l10 5 10-5M2 12l10 5 10-5', swap: 'M7 4L3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7', truck: 'M1 6h13v10H1zM14 10h5l3 3v3h-8zM6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4M18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4', cart: 'M3 4h2l2.5 11h11L21 7H6M9 20h.01M18 20h.01' });
NAV.length = 0; NAV.push(['overview', 'Dashboard', 'home', 'Overview'], ['products', 'Products', 'box', 'Retail'], ['inventory', 'Inventory', 'layers', 'Retail'], ['movements', 'Stock Movements', 'swap', 'Retail'], ['purchases', 'Purchase Orders', 'truck', 'Retail'], ['suppliers', 'Suppliers', 'team', 'Retail'], ['sales', 'Point of Sale', 'cart', 'Retail'], ['invoices', 'Invoices', 'file', 'Retail'], ['customers', 'Customers', 'users', 'Customers'], ['assets', 'AC Assets', 'wind', 'Customers'], ['services', 'Service Jobs', 'wrench', 'Service'], ['calendar', 'Calendar', 'cal', 'Service'], ['plans', 'Service Plans', 'list', 'Service'], ['team', 'Team & Technicians', 'team', 'Service'], ['automations', 'Automations', 'zap', 'Engagement'], ['messages', 'Messages', 'msg', 'Engagement'], ['templates', 'Message Templates', 'file', 'Engagement'], ['feedback', 'Feedback & Complaints', 'star', 'Engagement'], ['reports', 'Reports', 'chart', 'Insights'], ['users', 'Users & Permissions', 'users', 'Administration'], ['settings', 'Settings', 'gear', 'Administration']);
Object.assign(BK, { 'In stock': 'ok', 'Low stock': 'wa', 'Out of stock': 'er', Ordered: 'ac', 'Partially received': 'wa', Received: 'ok', Paid: 'ok' });
function retail() {
    const cats = ['Air Conditioners', 'Refrigerators', 'Washing Machines', 'Televisions', 'Mobile Phones', 'Mobile Accessories', 'Audio & Speakers', 'Small Appliances', 'Cables & Chargers', 'Other Electronics'];
    const R = [['Daikin FTKF35 1.0T Inverter', 'Daikin', 0, 'S', 31500, 37990, 28, 2, 4], ['LG PS-Q19 1.5T Dual Inverter', 'LG', 0, 'S', 34500, 41990, 28, 2, 3], ['Voltas 185V Vectra 1.5T', 'Voltas', 0, 'S', 28900, 34990, 28, 2, 1], ['Hitachi Kashikoi 1.5T 5-Star', 'Hitachi', 0, 'S', 36500, 44990, 28, 2, 0], ['Blue Star IC318 1.5T Inverter', 'Blue Star', 0, 'S', 30500, 36990, 28, 2, 5], ['Samsung 253L Double Door Fridge', 'Samsung', 1, 'S', 22500, 27990, 18, 2, 3], ['LG 7kg Front Load Washer', 'LG', 2, 'S', 24500, 29990, 18, 1, 2], ['Sony Bravia 43in 4K TV', 'Sony', 3, 'S', 33000, 39990, 28, 1, 2], ['Samsung Galaxy M35 8/128', 'Samsung', 4, 'S', 16200, 19999, 18, 3, 9], ['Redmi Note 14 6/128', 'Xiaomi', 4, 'S', 12900, 15999, 18, 3, 2], ['OnePlus Nord CE4 8/256', 'OnePlus', 4, 'S', 20500, 24999, 18, 2, 6], ['iPhone 15 128GB', 'Apple', 4, 'S', 62000, 69900, 18, 2, 0], ['Tempered Glass Universal', 'Mobile Point', 5, 'Q', 45, 199, 18, 20, 86], ['Silicone Back Case', 'Mobile Point', 5, 'Q', 90, 349, 18, 15, 12], ['20W USB-C Fast Charger', 'Mi', 8, 'Q', 320, 699, 18, 10, 34], ['Type-C Cable 1m Braided', 'Boat', 8, 'Q', 110, 399, 18, 15, 7], ['Lightning Cable 1m', 'Mobile Point', 8, 'Q', 140, 449, 18, 10, 22], ['Power Bank 10000mAh', 'Ambrane', 5, 'Q', 650, 1299, 18, 6, 15], ['Airdopes 141 Earbuds', 'Boat', 6, 'Q', 780, 1499, 18, 8, 18], ['JBL Go 3 Speaker', 'JBL', 6, 'Q', 1900, 2999, 18, 5, 4], ['Prestige Mixer Grinder 750W', 'Prestige', 7, 'Q', 2300, 3495, 18, 4, 6], ['Philips Air Fryer 4.1L', 'Philips', 7, 'Q', 5200, 7495, 18, 3, 0], ['AC Stabilizer 4kVA', 'V-Guard', 9, 'Q', 2800, 4290, 18, 3, 8]];
    const products = R.map((r, i) => { const ser = r[3] == 'S', ex = (i == 4 || i == 8) ? 1 : 0, p = { id: 'P' + (1001 + i), sku: 'MP-' + (101 + i), bar: '8901' + (23450 + i * 37) + '1', name: r[0], brand: r[1], cat: cats[r[2]], ser, cost: r[4], price: r[5], mrp: Math.round(r[5] * 1.08 / 10) * 10, gst: r[6], re: r[7], sup: 'SP' + (1 + i % 4), qty: ser ? 0 : r[8], units: [] }; if (ser) for (let k = 0; k < r[8] + ex; k++)p.units.push({ sn: r[1].slice(0, 2).toUpperCase() + (70000 + i * 100 + k), st: (ex && k == 0) ? 'Sold' : 'In stock' }); return p });
    const L = [[['P1013', 3, 199], ['P1015', 2, 699]], [['P1009', 1, 19999, 1]], [['P1005', 1, 36990, 1]], [['P1018', 1, 1299], ['P1016', 2, 399]], [['P1019', 2, 1499]], [['P1021', 1, 3495]], [['P1014', 4, 349], ['P1016', 1, 399]], [['P1020', 1, 2999]]];
    const invoices = L.map((ls, k) => { const lines = ls.map(([p, q, pr, s]) => ({ p, q, pr, sn: s ? products.find(x => x.id == p).units[0].sn : '' })); return { id: 'INV-' + (5001 + L.length - 1 - k), cid: 'C' + (101 + k), date: D(-k), lines, pay: ['UPI', 'Cash', 'Card'][k % 3], total: lines.reduce((a, l) => a + l.q * l.pr, 0), by: 'Hetal Modi' } });
    const run = {}, moves = [], sq = {}; let n = 0; const mk = (p, type, d, ref, why, time) => { const prev = run[p.id] || 0; run[p.id] = prev + d; moves.push({ id: 'SM' + (9001 + n++), p: p.id, type, d, prev, next: prev + d, ref, why, loc: 'Main Store', by: 'Hetal Modi', time }) };
    invoices.forEach(i => i.lines.forEach(l => sq[l.p] = (sq[l.p] || 0) + l.q));
    products.forEach(p => mk(p, 'Opening stock', (p.ser ? p.units.filter(u => u.st == 'In stock').length : p.qty) + (sq[p.id] || 0), 'Opening', 'Initial stock load', D(-30) + ' 10:00'));
    [...invoices].reverse().forEach(i => i.lines.forEach(l => mk(products.find(x => x.id == l.p), 'Sale', -l.q, i.id, 'Retail sale', i.date + ' 15:30')));
    const suppliers = [['SP1', 'Gujarat Cooling Distributors', 'Mehul Bhatt', '98250 41122', '30 days'], ['SP2', 'Vadodara Digital Wholesale', 'Farhan Qureshi', '98251 22873', '15 days'], ['SP3', 'Western Mobiles Trading', 'Nisha Thakkar', '98252 33940', 'Advance'], ['SP4', 'Metro Electronics Supply', 'Karan Malhotra', '98253 14788', '7 days']].map(([id, name, contact, phone, terms], i) => ({ id, name, contact, phone, terms, active: true }));
    const pos = [{ id: 'PO-2001', sup: 'SP1', date: D(-5), status: 'Ordered', lines: [{ p: 'P1003', qty: 4, rec: 0, cost: 28900 }, { p: 'P1004', qty: 3, rec: 0, cost: 36500 }] }, { id: 'PO-2002', sup: 'SP2', date: D(-2), status: 'Ordered', lines: [{ p: 'P1016', qty: 30, rec: 0, cost: 110 }, { p: 'P1022', qty: 6, rec: 0, cost: 5200 }] }, { id: 'PO-2003', sup: 'SP3', date: D(-45), status: 'Received', lines: [{ p: 'P1009', qty: 5, rec: 5, cost: 16200 }] }, { id: 'PO-2004', sup: 'SP4', date: D(0), status: 'Draft', lines: [{ p: 'P1012', qty: 3, rec: 0, cost: 62000 }] }];
    return { cats, products, suppliers, pos, invoices, moves: moves.reverse() }
}
if (!S.products || !S.pos) { Object.assign(S, retail()); save() }
const onh = p => p.ser ? p.units.filter(u => u.st == 'In stock').length : p.qty, stk = p => { const n = onh(p); return n <= 0 ? 'Out of stock' : n <= p.re ? 'Low stock' : 'In stock' };
const prod = id => S.products.find(p => p.id == id) || { name: 'Unknown', units: [], cat: '', gst: 0, price: 0 }, sup = id => S.suppliers.find(s => s.id == id) || { name: 'Unknown' };
const incoming = p => S.pos.filter(o => ['Ordered', 'Partially received'].includes(o.status)).reduce((s, o) => s + o.lines.filter(l => l.p == p.id).reduce((a, l) => a + l.qty - l.rec, 0), 0);
const hue = s => [...s].reduce((a, c) => a + c.charCodeAt(0), 0) % 360, th = p => `<span class="av" style="border-radius:8px;background:hsl(${hue(p.name)} 60% 50%/.15);color:hsl(${hue(p.name)} 60% 45%)">${esc(ini(p.name))}</span>`;
function mv(p, type, d, ref, why) { const n = onh(p); S.moves.unshift({ id: 'SM' + (9001 + S.moves.length), p: p.id, type, d, prev: n - d, next: n, ref, why, loc: 'Main Store', by: 'Rajesh Amin', time: D(0) + ' ' + new Date().toTimeString().slice(0, 5) }) }
const chg = d => (d > 0 ? '+' : '') + d;
Object.assign(P, {
    products: {
        t: 'Products', s: 'Catalog, pricing and live stock. Balances are derived from movements.', add: ['Add product', 'prod-new'], chips: ['All', 'Air Conditioners', 'Mobile Phones', 'Mobile Accessories', 'Low stock', 'Out of stock'], chip: (r, c) => c.includes('stock') ? r.st == c : r.cat == c,
        rows: () => S.products.map(p => ({ id: p.id, name: p.name, sku: p.sku, bar: p.bar, brand: p.brand, cat: p.cat, price: p.price, n: onh(p), st: stk(p), ty: p.ser ? 'Serialized' : 'Quantity', pd: p })),
        cols: [['Product', r => `<div class="nm">${th(r.pd)}<div class="nmt"><small class="sku-tag">${esc(r.sku)}${r.brand ? ' · ' + esc(r.brand) : ''}</small><b class="pn-truncate" title="${esc(r.name)}">${esc(r.name)}</b></div></div>`], ['Category', r => esc(r.cat)], ['Price', r => inr(r.price)], ['On hand', r => r.n], ['Stock', r => B(r.st)], ['Tracking', r => r.ty]], open: id => prodM(id)
    },
    inventory: {
        t: 'Inventory', s: 'On hand, available and incoming stock at Mobile Point Main Store. Incoming is not counted until received.', add: ['Adjust stock', 'adj'], chips: ['All', 'In stock', 'Low stock', 'Out of stock'], chip: (r, c) => r.st == c,
        rows: () => S.products.map(p => ({ id: p.id, name: p.name, n: onh(p), inc: incoming(p), val: onh(p) * p.cost, st: stk(p) })),
        cols: [['Product', r => esc(r.name)], ['On hand', r => r.n], ['Reserved', r => 0], ['Available', r => r.n], ['Incoming', r => r.inc], ['Value at cost', r => inr(r.val)], ['Status', r => B(r.st)]], open: id => prodM(id)
    },
    movements: {
        t: 'Stock Movements', s: 'Audit trail of every quantity change.', chips: ['All', 'Sale', 'Stock receipt', 'Opening stock', 'Stock found', 'Damaged', 'Written off', 'Adjustment'], chip: (r, c) => r.type == c,
        rows: () => S.moves.map(m => ({ ...m, pn: prod(m.p).name })), cols: [['Time', r => esc(r.time)], ['Product', r => esc(r.pn)], ['Type', r => esc(r.type)], ['Change', r => `<b>${chg(r.d)}</b>`], ['Balance', r => r.prev + ' to ' + r.next], ['Reference', r => esc(r.ref)], ['By', r => esc(r.by)]], open: () => { }
    },
    purchases: {
        t: 'Purchase Orders', s: 'Stock increases only when goods are received.', add: ['New purchase order', 'po-new'], chips: ['All', 'Draft', 'Ordered', 'Partially received', 'Received'], chip: (r, c) => r.status == c,
        rows: () => S.pos.map(o => ({ id: o.id, sn: sup(o.sup).name, date: o.date, status: o.status, items: o.lines.length, total: o.lines.reduce((s, l) => s + l.qty * l.cost, 0) })), cols: [['PO', r => `<b>${esc(r.id)}</b>`], ['Supplier', r => esc(r.sn)], ['Date', r => fd(r.date)], ['Lines', r => r.items], ['Total (ex GST)', r => inr(r.total)], ['Status', r => B(r.status)]], open: id => poM(id)
    },
    suppliers: { t: 'Suppliers', s: 'Vendors and open purchasing.', rows: () => S.suppliers.map(s => ({ ...s, po: S.pos.filter(o => o.sup == s.id).length })), cols: [['Supplier', r => `<b>${esc(r.name)}</b>`], ['Contact', r => esc(r.contact)], ['Phone', r => '+91 ' + esc(r.phone)], ['Terms', r => esc(r.terms)], ['Orders', r => r.po], ['Status', r => B('Active')]], open: () => { } }
});
function retailStrip() {
    const rev = S.invoices.reduce((s, i) => s + i.total, 0); let net = 0, cost = 0; S.invoices.forEach(i => i.lines.forEach(l => { const p = prod(l.p); net += l.q * l.pr * 100 / (100 + p.gst); cost += l.q * (p.cost || 0) }));
    const val = S.products.reduce((s, p) => s + onh(p) * p.cost, 0), low = S.products.filter(p => stk(p) != 'In stock'), op = S.pos.filter(o => ['Ordered', 'Partially received'].includes(o.status)).length, days = [...Array(7)].map((_, i) => D(i - 6)), sv = days.map(d => S.invoices.filter(x => x.date == d).reduce((s, x) => s + x.total, 0)), mx = Math.max(1, ...sv);
    return `<div class="kp k4"><button class="k" data-go="invoices">${ic('cart')}<b>${inr(rev)}</b><span>Total sales (${S.invoices.length} invoices)</span></button><button class="k" data-go="reports">${ic('chart')}<b>${net ? Math.round((net - cost) / net * 100) : 0}%</b><span>Gross margin, ex GST</span></button><button class="k" data-go="inventory">${ic('box')}<b>${inr(val)}</b><span>Inventory at cost · ${low.length} low or out</span></button><button class="k" data-go="purchases">${ic('truck')}<b>${op}</b><span>Open purchase orders</span></button></div>
 <div class="gr" style="margin-bottom:16px"><div class="panel"><div class="hd"><h2>Sales, last 7 days</h2><span class="mu">${inr(sv.reduce((a, b) => a + b, 0))}</span></div><div class="bars">${sv.map((v, i) => `<div title="${inr(v)}"><i style="height:${Math.round(v / mx * 80) + 2}px"></i>${fd(days[i]).split(' ')[0]}</div>`).join('')}</div></div><div class="panel"><div class="hd"><h2>Low-stock alerts</h2><button class="btn sm" data-go="inventory" data-f="Low stock">View</button></div>${low.slice(0, 4).map(p => `<div class="li"><div><b>${esc(p.name)}</b><small>${onh(p)} left, reorder at ${p.re}</small></div><button class="btn sm" data-act="po-new" data-id="${p.id}">Reorder</button></div>`).join('') || '<div class="empty">Stock levels are healthy</div>'}</div></div>`
}
function custInv(id) { const l = S.invoices.filter(i => i.cid == id); return l.length ? `<h2 style="margin:14px 0 8px">Purchases</h2>${l.map(i => `<div class="li" style="padding-left:0;cursor:pointer" data-act="inv" data-id="${i.id}"><div><b>${i.id}</b><small>${fd(i.date)} · ${i.lines.map(x => esc(prod(x.p).name)).join(', ')}</small></div><b>${inr(i.total)}</b></div>`).join('')}` : '' }
function prodM(id) {
    const p = prod(id), m5 = S.moves.filter(m => m.p == id).slice(0, 5), sold = S.invoices.reduce((s, i) => s + i.lines.filter(l => l.p == id).reduce((a, l) => a + l.q, 0), 0);
    modal(`<h1>${esc(p.name)}</h1><p>${B(stk(p))} <span class="b">${p.ser ? 'Serialized' : 'Quantity-tracked'}</span></p><dl class="kv"><dt>SKU / barcode</dt><dd>${esc(p.sku)} / ${esc(p.bar)}</dd><dt>Category</dt><dd>${esc(p.cat)}</dd><dt>Price (MRP)</dt><dd>${inr(p.price)} (${inr(p.mrp)})</dd><dt>Cost / GST</dt><dd>${inr(p.cost)} / ${p.gst}%</dd><dt>On hand</dt><dd>${onh(p)} (reorder at ${p.re})</dd><dt>Incoming</dt><dd>${incoming(p)} on open POs</dd><dt>Units sold</dt><dd>${sold}</dd><dt>Supplier</dt><dd>${esc(sup(p.sup).name)}</dd></dl>${p.ser ? `<h2>Serial numbers</h2><p class="mu" style="margin:4px 0 8px">${p.units.map(u => esc(u.sn) + (u.st == 'Sold' ? ' (sold)' : '')).join(', ') || 'None'}</p>` : ''}<h2>Recent movements</h2>${m5.map(m => `<div class="li" style="padding-left:0"><div><b>${esc(m.type)}</b><small>${esc(m.time)} · ${esc(m.ref)}</small></div><b>${chg(m.d)}</b></div>`).join('')}<div class="acts"><button class="btn" data-act="close">Close</button>${p.ser ? '' : `<button class="btn" data-act="adj" data-id="${id}">Adjust stock</button>`}<button class="btn pri" data-act="po-new" data-id="${id}">Create purchase order</button></div>`)
}
function prodF() { modal(`<h1>Add product</h1><form data-form="_prod" novalidate><div class="fg"><label>Product name<input name="name"></label><label>Brand<input name="brand"></label><label>Category<select name="cat">${S.cats.map(c => `<option>${esc(c)}</option>`).join('')}</select></label><label>Tracking<select name="type"><option value="Q">Quantity (accessories)</option><option value="S">Serialized (ACs, phones)</option></select></label><label>Cost price (₹)<input name="cost" type="number" min="0"></label><label>Selling price incl. GST (₹)<input name="price" type="number" min="0"></label><label>GST rate (%)<select name="gst"><option>18</option><option>28</option><option>12</option><option>5</option><option>0</option></select></label><label>Reorder level<input name="re" type="number" min="0" value="5"></label><label>Opening quantity (quantity-tracked)<input name="qty" type="number" min="0" value="0"></label><label>Serial numbers (serialized, comma separated)<input name="sn"></label></div><div class="acts"><button type="button" class="btn" data-act="close">Cancel</button><button class="btn pri">Save product</button></div></form>`) }
function adjF(id) { modal(`<h1>Adjust stock</h1><form data-form="_adj" novalidate><div class="fg"><label>Product *<select name="p" id="adj-p" required><option value="">-- Select Product --</option>${S.products.filter(p => !p.ser).map(p => `<option value="${p.id}" ${p.id == (id ? prod(id).id : '') ? 'selected' : ''} data-sub="${esc(p.sku + ' · On hand: ' + onh(p))}">${esc(p.name)} (${esc(p.sku)})</option>`).join('')}</select></label><label>Adjustment type<select name="t"><option>Stock found</option><option>Damaged</option><option>Written off</option><option>Correction</option></select></label><label>Quantity<input name="q" type="number" min="1"></label><label>Reason<textarea name="r" rows="2"></textarea></label></div><p class="mu">Serialized units change only through receipts and sales.</p><div class="acts"><button type="button" class="btn" data-act="close">Cancel</button><button class="btn pri">Record adjustment</button></div></form>`); if (id && !prod(id).ser && $('[name=p]')) { $('[name=p]').value = id; sxSync($('[name=p]')) } }
function poF(pid) {
    const selP = pid ? prod(pid) : null;
    const supOpts = S.suppliers.map(s => `<option value="${esc(s.id)}"${selP && selP.sup == s.id ? ' selected' : ''} data-sub="${esc((s.contact ? s.contact + ' · ' : '') + (s.city || ''))}">${esc(s.name)}${s.city ? ` (${esc(s.city)})` : ''}</option>`).join('');
    const prodOpts = S.products.map(p => `<option value="${esc(p.id)}"${selP && selP.id == p.id ? ' selected' : ''} data-cost="${p.cost}" data-sup="${esc(p.sup || '')}" data-onh="${onh(p)}" data-sub="${esc(p.sku + ' · Cost: ₹' + p.cost + ' · ' + onh(p) + ' in stock')}">${esc(p.name)} · ${esc(p.sku)} (${onh(p)} in stock)</option>`).join('');
    modal(`<h1>New Purchase Order</h1>
    <p class="mu" style="margin:-6px 0 16px">Order inventory stock directly from registered vendors.</p>
    <form data-form="_po" id="po-form" novalidate>
        <div class="fg">
            <label>Supplier *
                <select name="s" id="po-sup" required>
                    <option value="">-- Select Supplier --</option>
                    ${supOpts}
                </select>
            </label>
            <label>Product *
                <select name="p" id="po-prod" required>
                    <option value="">-- Select Product --</option>
                    ${prodOpts}
                </select>
            </label>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px">
                <label>Quantity *
                    <input name="q" id="po-qty" type="number" min="1" value="${selP ? Math.max(1, selP.re * 2 - onh(selP)) : '1'}" placeholder="e.g. 5" required>
                </label>
                <label>Unit Cost (₹)
                    <input name="c" id="po-cost" type="number" min="0" value="${selP ? selP.cost : ''}" placeholder="${selP ? selP.cost : 'Cost price ex GST'}">
                </label>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px">
                <label>PO Date
                    <input name="date" type="date" value="${D(0)}">
                </label>
                <label>Reference / Notes
                    <input name="notes" placeholder="e.g. PO for seasonal restocking">
                </label>
            </div>
            <div id="po-preview" class="panel pad" style="background:color-mix(in srgb,var(--acs) 20%,var(--sf));display:${selP ? 'block' : 'none'};padding:12px 14px">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
                    <div>
                        <b id="po-prev-title" style="font-size:13.5px">${selP ? esc(selP.name) : ''}</b>
                        <small id="po-prev-sub" class="mu" style="display:block;font-size:11.5px">${selP ? `Current stock: ${onh(selP)} · Reorder point: ${selP.re}` : ''}</small>
                    </div>
                    <div style="text-align:right">
                        <span class="mu" style="font-size:11.5px;display:block">Estimated Subtotal</span>
                        <b id="po-prev-total" style="font-size:15px;color:var(--ac)">${selP ? inr(Math.max(1, selP.re * 2 - onh(selP)) * selP.cost) : '₹0'}</b>
                    </div>
                </div>
            </div>
        </div>
        <div class="acts">
            <button type="button" class="btn" data-act="close">Cancel</button>
            <button type="submit" class="btn pri">Create Purchase Order</button>
        </div>
    </form>`);
    const pSel = $('#po-prod'), sSel = $('#po-sup'), qInp = $('#po-qty'), cInp = $('#po-cost'), prev = $('#po-preview');
    const updatePreview = () => {
        if (!pSel || !pSel.value) {
            if (prev) prev.style.display = 'none';
            return;
        }
        const pr = prod(pSel.value);
        if (!pr) return;
        const q = Math.max(1, +qInp.value || 1);
        const cost = cInp.value !== '' ? (+cInp.value || 0) : pr.cost;
        if (prev) {
            prev.style.display = 'block';
            $('#po-prev-title').textContent = pr.name + ' (' + pr.sku + ')';
            $('#po-prev-sub').textContent = 'Current on hand: ' + onh(pr) + ' · Reorder point: ' + pr.re;
            $('#po-prev-total').textContent = inr(q * cost);
        }
    };
    if (pSel) {
        pSel.addEventListener('change', () => {
            const val = pSel.value;
            if (!val) {
                if (cInp) { cInp.value = ''; cInp.placeholder = 'Cost price ex GST'; }
                updatePreview();
                return;
            }
            const pr = prod(val);
            if (pr) {
                if (sSel && !sSel.value && pr.sup) sSel.value = pr.sup;
                if (cInp) {
                    cInp.value = pr.cost;
                    cInp.placeholder = String(pr.cost);
                }
            }
            updatePreview();
        });
    }
    if (qInp) qInp.addEventListener('input', updatePreview);
    if (cInp) cInp.addEventListener('input', updatePreview);
}
function poM(id) { const o = S.pos.find(x => x.id == id), open = ['Ordered', 'Partially received'].includes(o.status); modal(`<h1>${esc(o.id)}</h1><p>${B(o.status)} <span class="mu">${esc(sup(o.sup).name)} · ${fd(o.date)}</span></p>${o.lines.map(l => `<div class="li" style="padding-left:0"><div><b>${esc(prod(l.p).name)}</b><small>${l.rec} of ${l.qty} received · ${inr(l.cost)} each</small></div><b>${inr(l.qty * l.cost)}</b></div>`).join('')}<div class="acts"><button class="btn" data-act="close">Close</button>${o.status == 'Draft' ? `<button class="btn pri" data-act="po-place" data-id="${id}">Place order</button>` : ''}${open ? `<button class="btn pri" data-act="po-recv" data-id="${id}">Receive goods</button>` : ''}</div>`) }
function recvM(id) { const o = S.pos.find(x => x.id == id); modal(`<h1>Receive goods · ${esc(id)}</h1><form data-form="_recv" data-id="${id}" novalidate><div class="fg">${o.lines.map((l, i) => { const p = prod(l.p), out = l.qty - l.rec; return out > 0 ? `<label>${esc(p.name)} (ordered ${l.qty}, received ${l.rec})<input name="q${i}" type="number" min="0" max="${out}" value="${out}">${p.ser ? `<input name="s${i}" placeholder="Serial numbers, comma separated">` : ''}</label>` : '' }).join('')}</div><div class="acts"><button type="button" class="btn" data-act="close">Cancel</button><button class="btn pri">Receive stock</button></div></form>`) }
function invM(id) { const i = S.invoices.find(x => x.id == id); let tax = 0; const rows = i.lines.map(l => { const p = prod(l.p); tax += l.q * l.pr * p.gst / (100 + p.gst); return `<div class="li" style="padding-left:0"><div><b>${esc(p.name)}</b><small>${l.q} × ${inr(l.pr)} · GST ${p.gst}%${l.sn ? ' · Serial ' + esc(l.sn) : ''}</small></div><b>${inr(l.q * l.pr)}</b></div>` }).join(''); modal(`<h1>${esc(i.id)}</h1><p class="mu">${fd(i.date)} · ${esc(i.cid ? cust(i.cid).name : 'Walk-in customer')} · ${esc(i.pay)} (simulated) ${B('Paid')}</p>${rows}<dl class="kv" style="grid-template-columns:1fr auto"><dt>GST included</dt><dd>${inr(Math.round(tax))}</dd><dt><b>Total</b></dt><dd><b>${inr(i.total)}</b></dd></dl><div class="acts"><button class="btn" data-act="close">Close</button></div>`) }

let CART = [], PQ = '', CUST = '', PAY = 'UPI', PLAN = false; const lineT = l => l.q * prod(l.p).price, cr = () => { const c = $('#cart'); if (c) { c.innerHTML = cartH(); sxAll(); } };
function pgrid() { const q = PQ.toLowerCase(), l = S.products.filter(p => !q || (p.name + p.sku + p.bar + p.cat + p.brand).toLowerCase().includes(q)); return l.map(p => `<button class="pc" data-act="addc" data-id="${p.id}" ${onh(p) ? '' : 'disabled'}><span class="tn" style="background:hsl(${hue(p.name)} 60% 50%/.15);color:hsl(${hue(p.name)} 60% 45%)">${esc(ini(p.name))}</span><b style="font-size:13px">${esc(p.name)}</b><span>${inr(p.price)}</span>${B(stk(p))}</button>`).join('') || '<div class="empty">No products match</div>' }
function cartH() {
    const tot = CART.reduce((s, l) => s + lineT(l), 0), tax = CART.reduce((s, l) => s + lineT(l) * prod(l.p).gst / (100 + prod(l.p).gst), 0), ac = CART.some(l => prod(l.p).cat == 'Air Conditioners');
    return `<div class="hd"><h2>Cart (${CART.length})</h2><button class="btn sm" data-act="cclr">Clear</button></div>${CART.map((l, i) => { const p = prod(l.p); return `<div class="cr"><div style="display:flex;justify-content:space-between;gap:8px"><b>${esc(p.name)}</b><button class="ib" style="width:28px;height:28px" data-act="cx" data-i="${i}" aria-label="Remove">×</button></div>${p.ser ? `<select data-sn="${i}" aria-label="Serial number">${p.units.filter(u => u.st == 'In stock').map(u => `<option ${u.sn == l.sn ? 'selected' : ''}>${esc(u.sn)}</option>`).join('')}</select>` : `<div class="qt"><button data-act="cq" data-i="${i}" data-d="-1" aria-label="Decrease">−</button><b>${l.q}</b><button data-act="cq" data-i="${i}" data-d="1" aria-label="Increase">+</button></div>`}<span class="mu">${inr(lineT(l))}</span></div>` }).join('') || '<div class="empty">Cart is empty. Select a product.</div>'}<div class="pad"><div class="fg"><label>Customer<select id="ccust" name="ccust" aria-label="Customer"><option value="" ${!CUST ? 'selected' : ''}>Walk-in customer (No customer record)</option><option value="__new" ${CUST == '__new' ? 'selected' : ''}>+ Add new customer</option>${S.customers.map(c => `<option value="${c.id}" ${c.id == CUST ? 'selected' : ''} data-sub="${esc(c.phone + (c.city ? ' · ' + c.city : ''))}">${esc(c.name)} · ${esc(c.phone)}</option>`).join('')}</select></label><label>Payment (simulated)<select id="cpay">${['UPI', 'Cash', 'Card', 'Bank transfer'].map(x => `<option ${x == PAY ? 'selected' : ''}>${x}</option>`).join('')}</select></label>${ac && CUST ? `<label class="row"><input type="checkbox" id="cplan" ${PLAN ? 'checked' : ''}>Include Complimentary AC Service plan</label>` : ''}</div><dl class="kv" style="grid-template-columns:1fr auto"><dt>GST included</dt><dd>${inr(Math.round(tax))}</dd><dt><b>Total</b></dt><dd><b>${inr(tot)}</b></dd></dl><button class="btn pri" style="width:100%;justify-content:center" data-act="sale" ${CART.length ? '' : 'disabled'}>Complete sale</button></div>`
}
function salesPage() { return `<div class="pg"><div class="ph"><div><h1>Sales & Invoices</h1><p>Point of sale. Completing a sale deducts stock and logs movements. Payments are simulated.</p></div></div><div class="pos"><div><div class="bar"><div class="sb" style="width:100%">${ic('search')}<input id="pq" placeholder="Search name, SKU, barcode or category" value="${esc(PQ)}" aria-label="Search products"></div></div><div class="pgrid" id="pgrid">${pgrid()}</div></div><div class="panel" id="cart">${cartH()}</div></div><div class="panel" style="margin-top:16px"><div class="hd"><h2>Recent invoices</h2></div>${S.invoices.slice(0, 8).map(i => `<div class="li" data-act="inv" data-id="${i.id}" tabindex="0" style="cursor:pointer"><div><b>${i.id}</b><small>${esc(i.cid ? cust(i.cid).name : 'Walk-in')} · ${fd(i.date)} · ${esc(i.pay)}</small></div><b>${inr(i.total)}</b></div>`).join('')}</div></div>` }
function sale() {
    if (!CART.length) return; if (CUST == '__new') { const mob = /^(\+91)?[\s-]?[6-9]\d{4}[\s-]?\d{5}$/, dg = s => String(s).replace(/\D/g, '').slice(-10); if (!NC.name.trim()) return toast("Enter the new customer's name", 'er'); if (!mob.test(NC.phone.trim())) return toast('Enter a valid 10-digit mobile number for the new customer', 'er'); if (S.customers.some(c => dg(c.phone) == dg(NC.phone))) return toast('A customer with this mobile already exists. Select them instead', 'er') } const need = {}, sns = CART.filter(l => l.sn).map(l => l.sn); if (new Set(sns).size != sns.length) return toast('Duplicate serial number in cart', 'er');
    for (const l of CART) { const p = prod(l.p); if (p.ser) { const u = p.units.find(x => x.sn == l.sn); if (!u || u.st != 'In stock') return toast('Serial ' + l.sn + ' is not available', 'er') } else { need[p.id] = (need[p.id] || 0) + l.q; if (need[p.id] > onh(p)) return toast('Only ' + onh(p) + ' of ' + p.name + ' in stock', 'er') } }
    if (CUST == '__new') { const n = Math.max(100, ...S.customers.map(c => +String(c.id).replace(/\D/g, '') || 0)) + 1; S.customers.unshift({ id: 'C' + n, name: NC.name.trim(), phone: '+91 ' + NC.phone.replace(/^\+91/, '').trim(), email: '', city: NC.city.trim(), ch: 'WhatsApp', service: true, promo: false, active: true }); CUST = 'C' + n; NC = { name: '', phone: '', city: '' }; toast('New customer added') } const id = 'INV-' + (5001 + S.invoices.length), lines = CART.map(l => ({ p: l.p, q: l.q, pr: prod(l.p).price, sn: l.sn || '' }));
    lines.forEach(l => { const p = prod(l.p); if (p.ser) p.units.find(u => u.sn == l.sn).st = 'Sold'; else p.qty -= l.q; mv(p, 'Sale', -l.q, id, 'Retail sale'); if (CUST && p.cat == 'Air Conditioners' && l.sn) S.assets.push({ sn: l.sn, cid: CUST, brand: p.brand, model: p.name, pur: D(0), plan: PLAN ? 'P1' : '', inv: id, amt: l.pr }) });
    S.invoices.unshift({ id, cid: CUST, date: D(0), lines, pay: PAY, total: lines.reduce((a, l) => a + l.q * l.pr, 0), by: 'Rajesh Amin' }); save(); CART = []; PLAN = false; toast('Sale ' + id + ' completed. Payment is simulated'); render(true)
}
function retailAct(d, e) {
    if (retailAct2(d)) return 1; const a = d.act;
    if (a == 'addc') { const p = prod(d.id); if (p.ser) { const used = CART.filter(l => l.p == p.id).map(l => l.sn), u = p.units.find(x => x.st == 'In stock' && !used.includes(x.sn)); if (!u) return toast('No more serial units available', 'er'), 1; CART.push({ p: p.id, q: 1, sn: u.sn }) } else { const l = CART.find(x => x.p == p.id); if ((l ? l.q : 0) + 1 > onh(p)) return toast('Only ' + onh(p) + ' in stock', 'er'), 1; l ? l.q++ : CART.push({ p: p.id, q: 1 }) } cr(); return 1 }
    if (a == 'cq') { const l = CART[+d.i], nq = l.q + +d.d; if (nq > onh(prod(l.p))) return toast('Only ' + onh(prod(l.p)) + ' in stock', 'er'), 1; if (nq < 1) CART.splice(+d.i, 1); else l.q = nq; cr(); return 1 }
    if (a == 'cx') { CART.splice(+d.i, 1); cr(); return 1 }
    if (a == 'cclr') { CART = []; cr(); return 1 }
    if (a == 'sale') { sale(); return 1 }
    if (a == 'inv') { invM(d.id); return 1 }
    if (a == 'prod-new') { prodF(); return 1 }
    if (a == 'adj') { adjF(d.id); return 1 }
    if (a == 'po-new') { poF(d.id); return 1 }
    if (a == 'po-recv') { recvM(d.id); return 1 }
    if (a == 'po-place') { S.pos.find(o => o.id == d.id).status = 'Ordered'; save(); toast('Order placed with supplier (simulated)'); closeM(); render(true); return 1 }
    return 0
}
document.addEventListener('input', e => { if (e.target.id == 'pq') { PQ = e.target.value; $('#pgrid').innerHTML = pgrid() } });
document.addEventListener('change', e => { const t = e.target; if (t.id == 'ccust') { CUST = t.value; PLAN = false; cr() } else if (t.id == 'cpay') PAY = t.value; else if (t.id == 'cplan') PLAN = t.checked; else if (t.dataset.sn != null && t.dataset.sn !== '') { const i = +t.dataset.sn; if (CART.some((l, j) => j != i && l.sn == t.value)) { toast('That serial is already in the cart', 'er'); cr() } else CART[i].sn = t.value } });
document.addEventListener('submit', e => {
    const f = e.target, k = f.dataset.form; if (!k || k[0] != '_') return; e.preventDefault(); $$e(f, '.er').forEach(x => x.remove()); const d = Object.fromEntries(new FormData(f)), n = x => +x, I = x => Number.isInteger(n(x)) && x !== ''; let ok = 1; const E = (m, x) => { ok = 0; err(f, m, x) }, all = S.products.flatMap(p => p.units.map(u => u.sn));
    if (k == '_prod') {
        const ser = d.type == 'S', sns = ser ? d.sn.split(',').map(x => x.trim()).filter(Boolean) : []; if (!d.name.trim()) E('name', 'Enter a product name'); if (d.cost === '' || n(d.cost) < 0) E('cost', 'Enter a cost price'); if (!(n(d.price) > 0)) E('price', 'Enter a selling price above 0'); if (!I(d.re) || n(d.re) < 0) E('re', 'Enter a whole number');
        if (ser && (new Set(sns).size != sns.length || sns.some(s => all.includes(s)))) E('sn', 'Serial numbers must be unique and not already registered'); if (!ser && (!I(d.qty) || n(d.qty) < 0)) E('qty', 'Enter a whole number'); if (!ok) return;
        const i = S.products.length, p = { id: 'P' + (1001 + i), sku: 'MP-' + (101 + i), bar: '8901' + String(Date.now()).slice(-8), name: d.name.trim(), brand: d.brand.trim() || 'Generic', cat: d.cat, ser, cost: n(d.cost), price: n(d.price), mrp: n(d.price), gst: n(d.gst), re: n(d.re), sup: 'SP1', qty: ser ? 0 : n(d.qty), units: sns.map(sn => ({ sn, st: 'In stock' })) }; S.products.push(p); if (onh(p) > 0) mv(p, 'Opening stock', onh(p), p.sku, 'New product'); toast('Product added')
    }
    if (k == '_adj') { const p = prod(d.p), q = n(d.q), s = ['Stock found', 'Correction'].includes(d.t) ? 1 : -1; if (!I(d.q) || q < 1) E('q', 'Enter a whole quantity of 1 or more'); else if (s < 0 && q > onh(p)) E('q', 'Only ' + onh(p) + ' on hand. Stock cannot go below zero'); if (!d.r.trim()) E('r', 'Enter a reason'); if (!ok) return; p.qty += s * q; mv(p, d.t == 'Correction' ? 'Adjustment' : d.t, s * q, 'Manual', d.r.trim()); toast('Stock adjusted') }
    if (k == '_po') {
        if (!d.s) return void E('s', 'Please select a supplier');
        if (!d.p) return void E('p', 'Please select a product');
        if (!I(d.q) || n(d.q) < 1) return void E('q', 'Enter a whole quantity of 1 or more');
        const p = prod(d.p);
        if (!p) return void E('p', 'Selected product is invalid');
        const unitCost = d.c === '' || d.c == null ? p.cost : n(d.c);
        if (unitCost < 0) return void E('c', 'Cost cannot be negative');
        S.pos.unshift({
            id: 'PO-' + (2001 + S.pos.length),
            sup: d.s,
            date: d.date || D(0),
            status: 'Draft',
            notes: (d.notes || '').trim(),
            lines: [{ p: d.p, qty: n(d.q), rec: 0, cost: unitCost }]
        });
        toast('Draft purchase order ' + S.pos[0].id + ' created');
    }
    if (k == '_recv') {
        const o = S.pos.find(x => x.id == f.dataset.id), seen = new Set(all), plan = []; let tot = 0; o.lines.forEach((l, i) => { const out = l.qty - l.rec; if (out <= 0) return; const q = n(d['q' + i] || 0), p = prod(l.p); if (!Number.isInteger(q) || q < 0 || q > out) return E('q' + i, 'Enter 0 to ' + out); let sns = []; if (p.ser && q > 0) { sns = (d['s' + i] || '').split(',').map(x => x.trim()).filter(Boolean); if (sns.length != q) return E('s' + i, 'Enter exactly ' + q + ' serial numbers'); if (new Set(sns).size != q || sns.some(s => seen.has(s))) return E('s' + i, 'Serial numbers must be unique and not already registered'); sns.forEach(s => seen.add(s)) } tot += q; plan.push([l, p, q, sns]) });
        if (!ok) return; if (!tot) return void E('q' + o.lines.findIndex(l => l.qty > l.rec), 'Enter a received quantity');
        plan.forEach(([l, p, q, sns]) => { if (!q) return; l.rec += q; if (p.ser) sns.forEach(sn => p.units.push({ sn, st: 'In stock' })); else p.qty += q; mv(p, 'Stock receipt', q, o.id, 'Goods received') }); o.status = o.lines.every(l => l.rec >= l.qty) ? 'Received' : 'Partially received'; toast(o.id + ' ' + o.status.toLowerCase() + '. Stock updated')
    }
    save(); closeM(); render(true)
});
function tbody(k) {
    const p = P[k]; let r = p.rows(); const q = V.q.toLowerCase(); if (q) r = r.filter(x => Object.values(x).join(' ').toLowerCase().includes(q)); if (V.f != 'All' && p.chip) r = r.filter(x => p.chip(x, V.f));
    const n = r.length, pc = Math.max(1, Math.ceil(n / 15)); V.p = Math.min(V.p, pc - 1); r = r.slice(V.p * 15, V.p * 15 + 15);
    if (!n) return `<div class="empty">${ic('search')}<b>Nothing matches</b><span>Clear the search or choose another filter.</span></div>`;
    return (k == 'products' && SS().view == 'grid' ? `<div class="pgrid" style="padding:16px">${r.map(x => prodCard(x.pd)).join('')}</div>` : `<table class="tbl"><thead><tr>${p.cols.map(c => `<th>${c[0]}</th>`).join('')}</tr></thead><tbody>${r.map(x => `<tr tabindex="0" data-open="${esc(x.id)}">${p.cols.map(c => `<td data-label="${c[0]}"${['Status', 'Entitlement', 'Stock', 'Complaint'].includes(c[0]) ? ' data-status="1"' : ''}>${c[1](x)}</td>`).join('')}</tr>`).join('')}</tbody></table>`) + `<div class="pgn"><span>${V.p * 15 + 1}–${V.p * 15 + r.length} of ${n}</span><span><button class="btn sm" data-act="pg" data-d="-1" ${V.p ? '' : 'disabled'}>Previous</button> <button class="btn sm" data-act="pg" data-d="1" ${V.p < pc - 1 ? '' : 'disabled'}>Next</button></span></div>`
}
function listPage(k) {
    const p = P[k]; return `<div class="pg"><div class="ph"><div><h1>${p.t}</h1><p>${p.s}</p></div>${p.add ? `<button class="btn pri" data-act="${p.add[1]}">${ic('plus')}${p.add[0]}</button>` : ''}</div>
<div class="bar"><div class="sb">${ic('search')}<input id="q" placeholder="Search ${p.t.toLowerCase()}" value="${esc(V.q)}" aria-label="Search ${p.t}"></div>${k == 'products' ? `<div class="chips"><button class="chip${SS().view == 'grid' ? ' on' : ''}" data-act="pv" data-v="grid">Grid</button><button class="chip${SS().view != 'grid' ? ' on' : ''}" data-act="pv" data-v="list">List</button></div>` : ''}${p.chips ? `<div class="chips">${p.chips.map(c => `<button class="chip${V.f == c ? ' on' : ''}" data-chip="${c}">${c}</button>`).join('')}</div>` : ''}</div><div class="panel" id="tb">${tbody(k)}</div></div>`
}
function overview() {
    const as = S.assets.map(entl), pend = S.jobs.filter(j => !['Completed', 'Cancelled'].includes(j.status)).length, fl = S.msgs.filter(m => m.status == 'Failed'), op = S.fb.filter(f => f.status == 'Open');
    const K = [['Total AC customers', S.customers.length, 'users', 'customers', 'All'], ['Services due this month', as.filter(e => ['Due soon', 'Overdue'].includes(e.s)).length, 'cal', 'customers', 'Due soon'], ['Pending service jobs', pend, 'wrench', 'services', 'All'], ['Completed services', S.jobs.filter(j => j.status == 'Completed').length, 'zap', 'services', 'Completed'], ['Feedback awaiting review', op.length, 'star', 'feedback', 'Open'], ['Failed messages', fl.length, 'msg', 'messages', 'Failed']];
    const up = S.jobs.filter(j => j.appt && !['Completed', 'Cancelled'].includes(j.status)).sort((a, b) => a.appt > b.appt ? 1 : -1).slice(0, 5);
    const h = new Date().getHours(), g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
    return `<div class="pg"><div class="ph"><div><h1>${g}, Rajesh</h1><p>${new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}. ${pend} jobs open, ${fl.length} messages need attention. Demo data.</p></div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" data-act="add-job">Schedule service</button><button class="btn pri" data-act="add-cust">${ic('plus')}Add customer</button></div></div>
<div class="kp">${K.map((k, i) => `<button class="k${i == 2 ? ' hl' : ''}" data-go="${k[3]}" data-f="${k[4]}">${ic(k[2])}<b data-n="${k[1]}">0</b><span>${k[0]}</span></button>`).join('')}</div>
${retailStrip()}<div class="gr"><div><div class="panel"><div class="hd"><h2>Upcoming appointments</h2><button class="btn sm" data-go="services" data-f="All">View all</button></div>${up.map(j => `<div class="li" tabindex="0" data-job="${j.id}" style="cursor:pointer"><span class="av">${esc(ini(cust(j.cid).name))}</span><div><b>${esc(cust(j.cid).name)}</b><small>${esc(j.type)} · ${esc(asset(j.ac).brand)} · ${esc(j.tech || 'Unassigned')}</small></div><span>${fd(j.appt)}</span>${B(j.status)}</div>`).join('') || '<div class="empty">No upcoming appointments</div>'}</div>
<div class="panel"><div class="hd"><h2>Service jobs by status</h2></div><div class="bars">${(() => { const L = ['Due', 'Booked', 'Assigned', 'In Progress', 'Completed', 'On Hold', 'Cancelled'].map(s => [s, S.jobs.filter(j => j.status == s).length]), m = Math.max(1, ...L.map(x => x[1])); return L.map(([s, n]) => `<div data-tip="${s}|${n} job${n == 1 ? '' : 's'}"><i style="height:${Math.round(n / m * 80) + 2}px"></i>${s.split(' ')[0]}</div>`).join('') })()}</div></div></div>
<div><div class="panel"><div class="hd"><h2>Needs attention</h2></div>${fl.map(m => `<div class="li"><div><b>${esc(cust(m.cid).name)}</b><small>${esc(m.ch)}: ${esc(m.err)}</small></div><button class="btn sm" data-act="retry" data-id="${m.id}">Retry</button></div>`).join('')}${op.map(f => `<div class="li"><div><b>${esc(cust(f.cid).name)}</b><small>Complaint, rated ${f.rating}/5</small></div><button class="btn sm" data-fb="${f.id}">Review</button></div>`).join('')}${fl.length + op.length ? '' : '<div class="empty">Nothing needs attention</div>'}</div>
<div class="panel"><div class="hd"><h2>Delivery by channel (simulated)</h2></div><div class="pad">${['WhatsApp', 'SMS', 'Email'].map(c => { const m = S.msgs.filter(x => x.ch == c), d = m.filter(x => x.status == 'Delivered').length, p = m.length ? Math.round(d / m.length * 100) : 0; return `<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between"><span>${c}</span><span class="mu">${d} of ${m.length}</span></div><div class="pb"><i style="width:${p}%"></i></div></div>` }).join('')}</div></div></div></div></div>`
}
function calendar() {
    const j = S.jobs.filter(x => x.appt && !['Completed', 'Cancelled'].includes(x.status)), days = {}; j.forEach(x => (days[x.appt] = days[x.appt] || []).push(x));
    const keys = Object.keys(days).sort(), od = keys.filter(k => k < D(0));
    return `<div class="pg"><div class="ph"><div><h1>Calendar</h1><p>Agenda view. Overdue appointments are listed first. Technician clashes are flagged.</p></div><button class="btn pri" data-act="add-job">${ic('plus')}Schedule service</button></div>${keys.map(k => `<div class="panel" style="margin-bottom:12px"><div class="hd"><h2>${new Date(k + 'T00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}</h2>${k < D(0) ? B('Overdue') : k == D(0) ? B('Due soon').replace('Due soon', 'Today') : ''}</div>${days[k].map(x => { const clash = days[k].filter(y => y.tech && y.tech == x.tech).length > 1; return `<div class="li" data-job="${x.id}" tabindex="0" style="cursor:pointer"><div><b>${esc(cust(x.cid).name)}</b><small>${esc(x.type)} · ${esc(x.tech || 'Unassigned')}</small></div>${clash ? '<span class="b er">Technician clash</span>' : ''}${B(x.status)}</div>` }).join('')}</div>`).join('') || '<div class="panel empty">No scheduled appointments</div>'}</div>`
}
function reports() {
    const c = S.jobs.filter(j => j.status == 'Completed'), r = (a, b) => b ? Math.round(a / b * 100) : 0, avg = (S.fb.reduce((s, f) => s + f.rating, 0) / (S.fb.length || 1)).toFixed(1);
    const bar = (l, v, t) => `<div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between"><span>${l}</span><b>${v}${t ? ' of ' + t : ''}</b></div><div class="pb"><i style="width:${r(v, t || Math.max(1, v))}%"></i></div></div>`;
    return `<div class="pg"><div class="ph"><div><h1>Reports</h1><p>Calculated live from the records in this demo.</p></div><button class="btn" data-act="export">Export demo data</button></div><div class="gr"><div class="panel pad"><h2 style="margin-bottom:12px">Services</h2>${bar('Completed vs all jobs', c.length, S.jobs.length)}${bar('Complimentary completed', c.filter(j => !j.paid).length, c.length)}${bar('Paid completed', c.filter(j => j.paid).length, c.length)}${bar('Overdue assets', S.assets.filter(a => entl(a).s == 'Overdue').length, S.assets.length)}</div>
<div class="panel pad"><h2 style="margin-bottom:12px">Satisfaction: average ${avg} / 5</h2>${[5, 4, 3, 2, 1].map(n => bar(n + ' stars', S.fb.filter(f => f.rating == n).length, S.fb.length)).join('')}${bar('Message delivery rate', S.msgs.filter(m => m.status == 'Delivered').length, S.msgs.length)}</div></div></div>`
}
function settings() {
    return `<div class="pg"><div class="ph"><div><h1>Settings</h1><p>Business, messaging and privacy. Integrations are simulated.</p></div></div><div class="gr"><div class="panel pad"><h2>Business</h2><dl class="kv"><dt>Name</dt><dd>Mobile Point</dd><dt>Time zone</dt><dd>Asia/Kolkata</dd><dt>Quiet hours</dt><dd>9:00 pm to 8:00 am</dd><dt>Retry policy</dt><dd>Up to 3 attempts, then manual follow-up</dd></dl><h2>Privacy</h2><p class="mu" style="margin-top:6px">Service messages and promotions use separate consent. Data here lives in this browser’s LocalStorage only. It is not secure storage.</p></div>
<div class="panel pad"><h2>Integrations (simulated)</h2><dl class="kv"><dt>WhatsApp</dt><dd><span class="b">Not connected</span></dd><dt>SMS</dt><dd><span class="b">Not connected</span></dd><dt>Email</dt><dd><span class="b">Not connected</span></dd><dt>Webhooks</dt><dd><span class="b">Not connected</span></dd></dl><p class="mu">API keys are never stored in this prototype.</p><div class="acts" style="justify-content:flex-start"><button class="btn" data-act="export">Export data</button><button class="btn dg" data-act="reset">Reset demo data</button></div></div></div></div>`}

function profile(id) {
    const c = cust(id), as = S.assets.filter(a => a.cid == id);
    const ev = [...S.jobs.filter(j => j.cid == id).map(j => ({ d: j.appt || j.due, t: `${j.id}: ${j.type}`, s: j.status })), ...S.msgs.filter(m => m.cid == id).map(m => ({ d: m.time, t: `${m.tpl} via ${m.ch}`, s: m.status })), ...S.fb.filter(f => f.cid == id).map(f => ({ d: f.time, t: `Rated ${f.rating}/5`, s: f.status == 'None' ? 'Completed' : f.status }))].sort((a, b) => a.d < b.d ? 1 : -1);
    modal(`<h1>${esc(c.name)}</h1><dl class="kv"><dt>Mobile</dt><dd>${esc(c.phone)}</dd><dt>Email</dt><dd>${esc(c.email)}</dd><dt>City</dt><dd>${esc(c.city || '—')}</dd><dt>Service messages</dt><dd>${c.service ? 'Allowed on ' + esc(c.ch) : 'Not allowed'}</dd><dt>Promotions</dt><dd>${c.promo ? 'Opted in' : 'Opted out'}</dd></dl>
 <h2>AC assets</h2>${as.map(a => { const e = entl(a); return `<div class="li" style="padding-left:0"><div><b>${esc(a.brand + ' ' + a.model)}</b><small>${esc(a.sn)} · ${e.left != null ? e.left + ' free visits left · ' : ''}next ${fd(e.due)}</small></div>${B(e.s)}</div>` }).join('') || '<p class="mu">No ACs yet</p>'}
 ${custInv(id)}<h2 style="margin:14px 0 8px">Timeline</h2><div class="tl">${ev.map(e => `<div>${esc(e.t)} ${B(e.s)}<small class="mu" style="display:block">${fd(e.d)}</small></div>`).join('') || '<span class="mu">No activity</span>'}</div>
 <div class="acts"><button class="btn" data-act="close">Close</button><button class="btn" data-act="cust-edit" data-id="${c.id}">Edit</button><button class="btn pri" data-act="add-job" data-c="${c.id}">Schedule service</button></div>`)
}
function jobM(id) {
    const j = S.jobs.find(x => x.id == id); if (!j) return; const c = cust(j.cid), a = asset(j.ac), e = entl(a), done = ['Completed', 'Cancelled'].includes(j.status);
    modal(`<h1>${esc(j.id)} · ${esc(j.type)}</h1><p>${B(j.status)}</p><dl class="kv"><dt>Customer</dt><dd>${esc(c.name)}</dd><dt>AC</dt><dd>${esc(a.brand + ' ' + a.model)}</dd><dt>Entitlement</dt><dd>${e.s}${e.left != null ? ', ' + e.left + ' free left' : ''}</dd><dt>Appointment</dt><dd>${fd(j.appt)}</dd><dt>Technician</dt><dd>${esc(j.tech || 'Unassigned')}</dd><dt>Billing</dt><dd>${j.paid ? 'Paid ' + inr(j.amt) : 'Complimentary'}</dd>${j.notes ? `<dt>Notes</dt><dd>${esc(j.notes)}</dd>` : ''}</dl>
 ${done ? '' : `<div class="fg"><label>Assign technician<select id="tsel">${S.team.filter(t => t.role == 'Technician' && t.active !== false).map(t => `<option ${t.name == j.tech ? 'selected' : ''}>${esc(t.name)}</option>`).join('')}</select></label></div>`}
 <div class="acts"><button class="btn" data-act="close">Close</button>${done ? '' : `<button class="btn dg" data-act="cancel" data-id="${id}">Cancel job</button><button class="btn" data-act="resch" data-id="${id}">Reschedule</button><button class="btn" data-act="assign" data-id="${id}">Assign</button>${j.status == 'Due' || j.status == 'On Hold' ? `<button class="btn" data-act="st" data-s="Booked" data-id="${id}">Confirm booking</button>` : ''}${j.status == 'In Progress' ? '' : `<button class="btn" data-act="st" data-s="In Progress" data-id="${id}">Start</button>`}<button class="btn pri" data-act="complete" data-id="${id}">Complete</button>`}</div>`)
}
function msgM(id) { const m = S.msgs.find(x => x.id == id); modal(`<h1>Message ${esc(m.id)}</h1><p>${B(m.status)} <span class="b">Simulated delivery</span></p><dl class="kv"><dt>Customer</dt><dd>${esc(cust(m.cid).name)}</dd><dt>Channel</dt><dd>${esc(m.ch)}</dd><dt>Template</dt><dd>${esc(m.tpl)}</dd><dt>Attempts</dt><dd>${m.retries + 1}</dd>${m.err ? `<dt>Error</dt><dd class="er">${esc(m.err)}</dd>` : ''}</dl><div class="acts"><button class="btn" data-act="close">Close</button>${m.status == 'Failed' ? `<button class="btn pri" data-act="retry" data-id="${id}">Retry</button>` : ''}</div>`) }
function tplM(id) { const t = S.tpls.find(x => x.id == id); modal(`<h1>${esc(t.name)}</h1><p class="mu">${esc(t.ch)} · ${esc(t.cat)}</p><div class="panel pad" style="margin:12px 0">${esc(t.body).replace(/\{\{name\}\}/g, 'Aarav').replace(/\{\{brand\}\}/g, 'Daikin').replace(/\{\{date\}\}/g, fd(D(14)))}</div><p class="mu">Preview uses sample data. ${t.body.length} characters.</p><div class="acts"><button class="btn" data-act="close">Close</button></div>`) }
function flowM(id) {
    const f = S.flows.find(x => x.id == id); modal(`<h1>${esc(f.name)}</h1><form data-form="flow" data-id="${id}"><div class="fg"><label>Reminder lead time (days)<input name="lead" type="number" min="0" max="60" value="${f.lead}"></label><label>Channel<select name="ch">${['WhatsApp', 'SMS', 'Email', 'Internal task'].map(c => `<option ${c == f.ch ? 'selected' : ''}>${c}</option>`).join('')}</select></label><label>Fallback channel (only if permitted)<select name="fb">${['None', 'SMS', 'Email'].map(c => `<option ${c == f.fb ? 'selected' : ''}>${c}</option>`).join('')}</select></label></div>
 <div class="nd"><div>${ic('zap')}Trigger: ${esc(f.trig)}</div><i></i><div>${ic('list')}Conditions: eligible, consent allowed, no duplicate</div><i></i><div>${ic('cal')}Delay: ${f.lead} days</div><i></i><div>${ic('msg')}${esc(f.ch)} message, then record provider status</div></div>
 <div class="acts"><button type="button" class="btn" data-act="close">Cancel</button><button class="btn pri">Save workflow</button></div></form>`)
}
function fbM(id) { const f = S.fb.find(x => x.id == id); modal(`<h1>Feedback ${esc(f.id)}</h1><p>${'★'.repeat(f.rating)}${'☆'.repeat(5 - f.rating)} ${esc(cust(f.cid).name)}</p><p style="margin:8px 0">${esc(f.comment)}</p>${f.status == 'None' ? '' : `<form data-form="fb" data-id="${id}"><div class="fg"><label>Assign to<select name="staff">${S.team.filter(t => t.role != 'Technician').map(t => `<option ${t.name == f.staff ? 'selected' : ''}>${esc(t.name)}</option>`).join('')}</select></label><label>Resolution notes<textarea name="notes" rows="3" required>${esc(f.notes)}</textarea></label></div><div class="acts"><button type="button" class="btn" data-act="close">Close</button><button class="btn pri">${f.status == 'Open' ? 'Resolve complaint' : 'Update notes'}</button></div></form>`}${f.status == 'None' ? '<div class="acts"><button class="btn" data-act="close">Close</button></div>' : ''}`) }
const opts = (a, f) => a.map(x => `<option value="${esc(x[0])}"${x[2] ? ` data-sub="${esc(x[2])}"` : ''}>${esc(x[1])}</option>`).join('');
function formM(t) {
    const forms = {
        cust: `<h1>Add customer</h1><form data-form="cust" novalidate><div class="fg"><label>Full name<input name="name" required></label><label>Mobile (+91)<input name="phone" inputmode="tel" placeholder="98250 12345" required></label><label>Email<input name="email" type="email"></label><label>City<input name="city"></label><label>Preferred channel<select name="ch"><option>WhatsApp</option><option>SMS</option><option>Email</option></select></label><label class="row"><input type="checkbox" name="service" checked>Allow service messages (booking, reminders)</label><label class="row"><input type="checkbox" name="promo">Allow promotional messages (separate consent)</label></div><div class="acts"><button type="button" class="btn" data-act="close">Cancel</button><button class="btn pri">Save customer</button></div></form>`,
        job: `<h1>Schedule service</h1><form data-form="job" novalidate><div class="fg"><label>Customer AC Unit *<select name="ac" required><option value="">-- Select AC Unit --</option>${opts(S.assets.map(a => [a.sn, cust(a.cid).name + ' — ' + a.brand + ' ' + a.model + ' (' + entl(a).s + ')', 'SN: ' + a.sn + ' · ' + cust(a.cid).phone]))}</select></label><label>Service type<select name="type"><option>Routine service</option><option>Gas refill</option><option>Deep cleaning</option><option>Repair</option></select></label><label>Appointment date<input name="appt" type="date" min="${D(0)}" required></label><label>Technician<select name="tech"><option value="">Assign later</option>${opts(S.team.filter(t => t.role == 'Technician' && t.active !== false).map(t => [t.name, t.name, t.phone || '']))}</select></label></div><div class="acts"><button type="button" class="btn" data-act="close">Cancel</button><button class="btn pri">Book service</button></div></form>`,
        fb: `<h1>Record feedback</h1><form data-form="addfb" novalidate><div class="fg"><label>Completed job<select name="job">${opts(S.jobs.filter(j => j.status == 'Completed').map(j => [j.id, j.id + ' · ' + cust(j.cid).name]))}</select></label><label>Rating (1 to 5)<select name="r"><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select></label><label>Comment<textarea name="c" rows="2"></textarea></label></div><div class="acts"><button type="button" class="btn" data-act="close">Cancel</button><button class="btn pri">Save feedback</button></div></form>`,
        done: `<h1>Complete service</h1><form data-form="done" data-id="${t}" novalidate><div class="fg"><label>Completion notes<textarea name="n" rows="3" required></textarea></label><label>Amount charged (₹)<input name="amt" type="number" min="0" value="0"></label><label class="row"><input type="checkbox" name="fbk" checked>Send feedback request (simulated)</label></div><div class="acts"><button type="button" class="btn" data-act="close">Cancel</button><button class="btn pri">Mark completed</button></div></form>`
    };
    modal(forms[t])
}
function err(f, n, m) { const el = f.elements[n]; el.setAttribute('aria-invalid', 'true'); el.insertAdjacentHTML('afterend', '<span class="er">' + m + '</span>'); return 0 }

let DIRTY = false, PIMG = '', CV = innerWidth < 820 ? 'agenda' : 'month', CM = 0, CT = '', ST = 'Appearance';
const SS = () => S.set || (S.set = { theme: 'light', accent: '#4F46E5', dens: 'comfortable', view: 'list', store: 'Mobile Point', gstin: '24ABCDE1234F1Z5', addr: 'Alkapuri, Vadodara, Gujarat 390007', phone: '+91 98250 00000', email: 'accounts@mobilepoint.example', inter: '0' });
function applySet() { const s = SS(), r = document.documentElement; r.dataset.theme = s.theme || 'light'; r.style.setProperty('--ac', s.accent); r.style.setProperty('--acs', 'color-mix(in srgb,' + s.accent + ' 14%,var(--sf))'); document.body.classList.toggle('dc', s.dens == 'compact') }
const nf = (p, w) => `<div class='pg'><div class='empty'>${ic('search')}<b>${w} not found</b><button class='btn' data-act='nav' data-p='${p}'>Go back</button></div></div>`;
const hsn = p => p.hsn || ({ 'Air Conditioners': '8415', 'Refrigerators': '8418', 'Washing Machines': '8450', 'Televisions': '8528', 'Mobile Phones': '8517' })[p.cat] || '8504';
const ART = { 'Air Conditioners': '<rect x="8" y="20" width="48" height="18" rx="4"/><path d="M14 44h36M18 50h28"/>', 'Refrigerators': '<rect x="18" y="8" width="28" height="48" rx="3"/><path d="M18 28h28M24 16v6M24 34v8"/>', 'Washing Machines': '<rect x="12" y="8" width="40" height="48" rx="4"/><circle cx="32" cy="36" r="12"/><path d="M18 16h8"/>', 'Televisions': '<rect x="6" y="12" width="52" height="34" rx="3"/><path d="M24 54h16M32 46v8"/>', 'Mobile Phones': '<rect x="20" y="6" width="24" height="52" rx="5"/><path d="M29 52h6"/>', 'Mobile Accessories': '<rect x="16" y="14" width="32" height="36" rx="6"/><path d="M26 22h12"/>', 'Audio & Speakers': '<rect x="16" y="8" width="32" height="48" rx="6"/><circle cx="32" cy="34" r="10"/><circle cx="32" cy="18" r="3"/>', 'Cables & Chargers': '<path d="M22 8v14h20V8M26 22v8a6 6 0 0 0 12 0v-8M32 36v20"/>', 'Small Appliances': '<path d="M20 20h24l-3 34H23zM24 12h16M28 8h8"/>' };
const art = c => `<svg viewBox='0 0 64 64' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>${ART[c] || '<rect x="14" y="14" width="36" height="36" rx="6"/>'}</svg>`;
const pimg = (p, c) => p.img ? `<img src='${esc(p.img)}' alt='${esc(p.name)}' class='${c}'>` : `<div class='${c}' style='background:hsl(${hue(p.cat || 'x')} 55% 50%/.12);color:hsl(${hue(p.cat || 'x')} 55% 42%)'>${art(p.cat)}</div>`;
function prodCard(p) { const n = onh(p), t = p.price * 100 / (100 + p.gst), m = Math.round((t - p.cost) / t * 100); return `<button class='pc' data-act='popen' data-id='${p.id}'>${pimg(p, 'pimg')}<b style='font-size:13px;line-height:1.3'>${esc(p.name)}</b><span class='mu' style='font-size:12px'>${esc(p.brand)} · ${esc(p.sku)}</span><span class='mu' style='font-size:12px'>${esc(p.cat)}</span><span><b>${inr(p.price)}</b>${p.mrp > p.price ? ` <s class='mu'>${inr(p.mrp)}</s>` : ''}</span><span>${B(stk(p))} <span class='b'>${p.ser ? 'Serial' : 'Qty'} · ${n}</span></span><span class='mu' style='font-size:12px'>Margin ${m}%</span></button>` }
P.products.open = P.inventory.open = id => go('products/' + id);
function subPage(p) { if (p == 'notifications') return notifPage(); if (p == 'activity') return actPage(); const a = p.split('/'); if (a[0] == 'users' && a[1]) return userPermissionsPage(a[1]); if (FMK[a[0]] && (a[1] == 'new' || a[1] == 'edit')) return fpage(FMK[a[0]], a[2]); if (a[0] == 'invoices' && a[1]) return invPage(a[1]); if (a[0] == 'products' && a[1]) { if (a[1] == 'new') return prodFormPage(); if (a[1] == 'edit') return prodFormPage(a[2]); return prodPage(a[1]) } if (a[0] == 'sales' && a[1]) return invPage(a[1]); return null }
function prodPage(id) {
    const p = S.products.find(x => x.id == id); if (!p) return nf('products', 'Product'); const mvs = S.moves.filter(m => m.p == id).slice(0, 8), sold = S.invoices.reduce((s, i) => s + i.lines.filter(l => l.p == id).reduce((a, l) => a + l.q, 0), 0), t = p.price * 100 / (100 + p.gst);
    return `<div class='pg'><nav class='bc mu'><button class='lnk' data-act='nav' data-p='products'>Products</button> / ${esc(p.name)}</nav><div class='ph'><div><h1>${esc(p.name)}</h1><p>${esc(p.brand)} · ${esc(p.sku)} · ${esc(p.cat)}${p.active === false ? ' · Inactive' : ''}</p></div><div style='display:flex;gap:8px;flex-wrap:wrap'><button class='btn' data-act='pdup' data-id='${id}'>Duplicate</button>${p.ser ? '' : `<button class='btn' data-act='adj' data-id='${id}'>Adjust stock</button>`}<button class='btn' data-act='po-new' data-id='${id}'>Create purchase order</button><button class='btn pri' data-act='pedit' data-id='${id}'>Edit</button></div></div>
 <div class='cw2'><div class='panel pad'>${pimg(p, 'pimg')}<dl class='kv' style='grid-template-columns:96px 1fr'><dt>Price</dt><dd>${inr(p.price)}${p.mrp > p.price ? ' (MRP ' + inr(p.mrp) + ')' : ''}</dd><dt>Cost</dt><dd>${inr(p.cost)} · margin ${Math.round((t - p.cost) / t * 100)}%</dd><dt>GST / HSN</dt><dd>${p.gst}% / ${hsn(p)}</dd><dt>Barcode</dt><dd>${esc(p.bar)}</dd><dt>Supplier</dt><dd>${esc(sup(p.sup).name)}</dd><dt>Warranty</dt><dd>${p.warr ? p.warr + ' months' : 'Not set'}</dd></dl>${p.desc ? `<p class='mu'>${esc(p.desc)}</p>` : ''}</div>
 <div style='display:grid;gap:16px'><div class='kp k4' style='margin:0'><div class='k'><b>${onh(p)}</b><span>On hand</span></div><div class='k'><b>${incoming(p)}</b><span>Incoming (not yet received)</span></div><div class='k'><b>${sold}</b><span>Units sold</span></div><div class='k'><b style='font-size:16px;margin-top:14px'>${stk(p)}</b><span>Reorder at ${p.re}</span></div></div>${p.ser ? `<div class='panel pad'><h2>Serial numbers</h2><p class='mu' style='margin-top:6px'>${p.units.map(u => esc(u.sn) + (u.st == 'Sold' ? ' (sold)' : '')).join(', ') || 'None'}</p></div>` : ''}<div class='panel'><div class='hd'><h2>Stock movements</h2></div>${mvs.map(m => `<div class='li'><div><b>${esc(m.type)}</b><small>${esc(m.time)} · ${esc(m.ref)} · ${esc(m.why)}</small></div><b>${chg(m.d)}</b><span class='mu'>${m.prev} to ${m.next}</span></div>`).join('') || '<div class="empty">No movements yet</div>'}</div></div></div></div>`
}
function prodFormPage(id) {
    const e = id ? S.products.find(x => x.id == id) : null; if (id && !e) return nf('products', 'Product'); PIMG = e ? e.img || '' : ''; DIRTY = false; const v = k => e ? esc(e[k] ?? '') : (k == 're' ? String(SS().re || 5) : ''), f = (l, n, x = '') => `<label>${l}<input name='${n}' ${x}></label>`, num = (l, n, k, m) => f(l, n, `type='number' min='0' value='${v(k)}' ${m || ''}`);
    return `<div class='pg'><nav class='bc mu'><button class='lnk' data-act='nav' data-p='products'>Products</button> / ${e ? esc(e.name) + ' / Edit' : 'Add product'}</nav><div class='ph'><div><h1>${e ? 'Edit product' : 'Add product'}</h1><p>${e ? 'Changes update the catalog, inventory and future sales.' : 'Create a catalog item. Opening stock is logged as a stock movement.'}</p></div></div>
 <fieldset id='pf' style='border:0;min-width:0'><div class='fgrid'>
 <div class='panel pad'><h2>Basic information</h2><div class='fg'>${f('Product name *', 'name', `value='${v('name')}'`)}${f('Brand', 'brand', `value='${v('brand')}'`)}<label>Category<select name='cat'>${S.cats.map(c => `<option ${e && e.cat == c ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select></label><label>Description<textarea name='desc' rows='2'>${v('desc')}</textarea></label></div></div>
 <div class='panel pad'><h2>Product media</h2><p class='ps'>A clear front-facing photo helps staff find the right item.</p><div style='display:flex;flex:1;margin-top:8px'>${uploader()}</div></div>
 <div class='panel pad'><h2>Identifiers and tax</h2><div class='fg'>${f('SKU *', 'sku', `value='${e ? esc(e.sku) : 'MP-' + (101 + S.products.length)}'`)}${f('Barcode', 'bar', `value='${v('bar')}'`)}${f('HSN code', 'hsn', `value='${e ? esc(hsn(e)) : ''}'`)}<label>GST rate (%)<select name='gst'>${[18, 28, 12, 5, 0].map(g => `<option ${(e ? e.gst == g : g == (+SS().gst || 18)) ? 'selected' : ''}>${g}</option>`).join('')}</select></label></div></div>
 <div class='panel pad'><h2>Pricing</h2><div class='fg'>${num('Cost price (₹) *', 'cost', 'cost')}${num('Selling price incl. GST (₹) *', 'price', 'price')}${num('MRP (₹)', 'mrp', 'mrp')}</div><p class='mu' id='mgn' style='margin-top:6px'></p></div>
 <div class='panel pad'><h2>Stock and tracking</h2><div class='fg'><label>Tracking<select name='type' ${e ? 'disabled' : ''}><option value='Q' ${e && !e.ser ? 'selected' : ''}>Quantity</option><option value='S' ${e && e.ser ? 'selected' : ''}>Serial numbers</option></select></label>${e ? `<p class='mu'>On hand: ${onh(e)}. Stock changes through receipts, sales and adjustments.</p>` : f('Opening quantity (quantity-tracked)', 'qty', `type='number' min='0' value='0'`) + f('Opening serials (serialized, comma separated)', 'sn')}${num('Reorder level', 're', 're')}</div></div>
 <div class='panel pad'><h2>Supplier and status</h2><div class='fg'><label>Supplier<select name='sup'>${S.suppliers.map(s => `<option value='${s.id}' ${e && e.sup == s.id ? 'selected' : ''}>${esc(s.name)}</option>`).join('')}</select></label>${num('Warranty (months)', 'warr', 'warr')}<label class='row'><input type='checkbox' name='active' ${!e || e.active !== false ? 'checked' : ''}>Active</label></div></div>
 </div></fieldset><div class='sticky'><button class='btn' data-act='pcancel'>Cancel</button><button class='btn pri' data-act='psave' data-id='${id || ''}'>Save product</button></div></div>`
}
function psave(id) {
    const pf = $('#pf'); $$e(pf, '.er').forEach(x => x.remove()); const d = {};[...pf.elements].forEach(x => { if (x.name) d[x.name] = x.type == 'checkbox' ? x.checked : x.value }); let ok = 1; const E = (n, m) => { ok = 0; err(pf, n, m) }, n = x => +x, I = x => x !== '' && Number.isInteger(n(x)) && n(x) >= 0;
    if (!d.name.trim()) E('name', 'Enter a product name'); if (!d.sku.trim()) E('sku', 'Enter a SKU'); else if (S.products.some(p => p.sku.toLowerCase() == d.sku.trim().toLowerCase() && p.id != id)) E('sku', 'This SKU is already used');
    if (d.cost === '' || n(d.cost) < 0) E('cost', 'Enter a cost price'); if (!(n(d.price) > 0)) E('price', 'Enter a selling price above 0'); if (d.mrp !== '' && n(d.mrp) < n(d.price)) E('mrp', 'MRP cannot be below the selling price'); if (!I(d.re)) E('re', 'Enter a whole number'); if (d.warr !== '' && !I(d.warr)) E('warr', 'Enter whole months');
    const ser = id ? prod(id).ser : d.type == 'S', sns = !id && ser ? d.sn.split(',').map(x => x.trim()).filter(Boolean) : [];
    if (!id) { if (ser && (new Set(sns).size != sns.length || sns.some(s => S.products.some(p => p.units.some(u => u.sn == s))))) E('sn', 'Serial numbers must be unique and not already registered'); if (!ser && !I(d.qty)) E('qty', 'Enter a whole number') }
    if (!ok) return; const f = { name: d.name.trim(), brand: d.brand.trim() || 'Generic', cat: d.cat, desc: d.desc.trim(), sku: d.sku.trim(), bar: d.bar.trim(), hsn: d.hsn.trim(), gst: n(d.gst), cost: n(d.cost), price: n(d.price), mrp: d.mrp === '' ? n(d.price) : n(d.mrp), re: n(d.re), sup: d.sup, warr: d.warr === '' ? 0 : n(d.warr), active: d.active, img: PIMG }; let p;
    if (id) { p = prod(id); Object.assign(p, f) } else { p = { ...f, id: 'P' + (1001 + S.products.length), ser, qty: ser ? 0 : n(d.qty), units: sns.map(sn => ({ sn, st: 'In stock' })) }; if (!p.bar) p.bar = '8901' + String(Date.now()).slice(-8); S.products.push(p); if (onh(p) > 0) mv(p, 'Opening stock', onh(p), p.sku, 'New product') }
    DIRTY = false; save(); toast(id ? 'Product updated' : 'Product added'); go('products/' + p.id)
}
function words(n) { const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'], b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'], t = x => x < 20 ? a[x] : b[x / 10 | 0] + (x % 10 ? ' ' + a[x % 10] : ''), h = x => x > 99 ? a[x / 100 | 0] + ' Hundred' + (x % 100 ? ' ' + t(x % 100) : '') : t(x); if (!n) return 'Zero'; let s = '';[[1e7, 'Crore'], [1e5, 'Lakh'], [1e3, 'Thousand']].forEach(([v, w]) => { if (n >= v) { s += h(Math.floor(n / v)) + ' ' + w + ' '; n %= v } }); return (s + (n ? h(n) : '')).trim() }
function invPage(id) {
    const i = S.invoices.find(x => x.id == id); if (!i) return nf('sales', 'Invoice'); const s = SS(), c = i.cid ? cust(i.cid) : null, inter = s.inter == '1'; let tx = 0, gt = 0;
    const rows = i.lines.map((l, k) => { const p = prod(l.p), t = l.q * l.pr * 100 / (100 + p.gst), g = l.q * l.pr - t; tx += t; gt += g; return `<tr><td>${k + 1}</td><td>${esc(p.name)}${l.sn ? `<br><small>Serial: ${esc(l.sn)}</small>` : ''}</td><td>${hsn(p)}</td><td>${l.q}</td><td>${inr(Math.round(l.pr * 100 / (100 + p.gst)))}</td><td>0</td><td>${inr(Math.round(t))}</td><td>${p.gst}%</td><td>${inr(Math.round(g))}</td><td>${inr(l.q * l.pr)}</td></tr>` }).join('');
    const rt = Math.round(tx), rg = Math.round(gt);
    return `<div class='pg'><nav class='bc mu noprint'><button class='lnk' data-act='nav' data-p='invoices'>Invoices</button> / ${esc(i.id)}</nav><div class='ph noprint'><div><h1>Invoice ${esc(i.id)}</h1><p>Viewing or printing never changes stock. Stock was deducted once when the sale was completed.</p></div><div style='display:flex;gap:8px;flex-wrap:wrap'>${c ? `<button class='btn' data-act='nav' data-p='customers'>Customers</button>` : ''}<button class='btn' data-act='nav' data-p='sales'>New sale</button><button class='btn pri' data-act='print'>Print or save as PDF</button></div></div>
 <div class='doc'><div style='display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;border-bottom:2px solid #17191F;padding-bottom:12px'><div style='display:flex;gap:12px;align-items:center'>${s.logo ? `<img src='${esc(s.logo)}' alt='Logo' style='width:44px;height:44px;object-fit:contain'>` : `<img src='assets/icon.svg' alt='Logo' style='width:44px;height:44px;border-radius:12px;object-fit:contain'>`}<div><b style='font-size:18px'>${esc(s.store)}</b><div>${esc(s.addr)}</div><div>${esc(s.phone)} · ${esc(s.email)}</div><div>GSTIN: ${esc(s.gstin)}</div></div></div><div style='text-align:right'><b style='font-size:16px'>TAX INVOICE</b><div>No: <b>${esc(i.id)}</b></div><div>Date: ${new Date(i.date + 'T00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div></div></div>
 <div style='display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin:12px 0'><div><b>Billed to</b><div>${esc(c ? c.name : 'Walk-in customer')}</div>${c ? `<div>${esc(c.city || '')} · ${esc(c.phone)}</div>` : ''}</div><div style='text-align:right'><b>Payment</b><div>${esc(i.pay)} · Paid (simulated)</div><div>Supply: ${inter ? 'Inter-state (IGST)' : 'Intra-state (CGST + SGST)'}</div></div></div>
 <div class='dw'><table><thead><tr><th>#</th><th>Description</th><th>HSN</th><th>Qty</th><th>Rate</th><th>Disc.</th><th>Taxable</th><th>GST</th><th>GST amt</th><th>Total</th></tr></thead><tbody>${rows}</tbody></table></div>
 <div class='tot' style='margin-top:12px'><div><span>Taxable amount</span><span>${inr(rt)}</span></div>${inter ? `<div><span>IGST</span><span>${inr(rg)}</span></div>` : `<div><span>CGST</span><span>${inr(Math.floor(rg / 2))}</span></div><div><span>SGST</span><span>${inr(rg - Math.floor(rg / 2))}</span></div>`}<div><span>Round-off</span><span>${inr(i.total - rt - rg)}</span></div><div style='border-top:2px solid #17191F;font-weight:700;font-size:15px'><span>Grand total</span><span>${inr(i.total)}</span></div></div>
 <p style='margin-top:8px'><b>Amount in words:</b> Rupees ${words(i.total)} only</p><p style='margin-top:12px;color:#667085'>Terms: ${esc(s.terms || 'Goods once sold are covered by manufacturer warranty only.')} Demo document, not a certified tax invoice.</p><div style='display:flex;justify-content:space-between;margin-top:40px'><span>Thank you for shopping at ${esc(s.store)}.</span><span style='border-top:1px solid #17191F;padding-top:4px'>Authorized signatory</span></div></div></div>`
}
function resched(id, date) { const j = S.jobs.find(x => x.id == id); if (!j || !date) return; if (['Completed', 'Cancelled'].includes(j.status)) return toast('Completed or cancelled jobs cannot be moved', 'er'); if (date < D(0)) return toast('Cannot schedule in the past', 'er'); if (j.appt == date) return; if (j.tech && S.jobs.some(x => x.id != id && x.tech == j.tech && x.appt == date && !['Completed', 'Cancelled'].includes(x.status)) && !confirm(j.tech + ' already has a job on ' + fd(date) + '. Schedule anyway?')) return; j.appt = date; if (j.status == 'Due') j.status = 'Booked'; save(); toast(id + ' moved to ' + fd(date)); render(true) }
const evc = (j, dr) => `<button class='ev ${BK[j.status] || ''}' ${dr ? "draggable='true'" : ''} data-job='${j.id}' title='${esc(cust(j.cid).name)}, ${esc(j.type)}, ${esc(j.tech || 'Unassigned')}, ${j.status}'>${esc(cust(j.cid).name.split(' ')[0])} · ${esc(j.type)} · ${j.status}</button>`;
function calendar() {
    const b = new Date(); b.setDate(1); b.setMonth(b.getMonth() + CM); const y = b.getFullYear(), mo = b.getMonth(), fw = new Date(y, mo, 1).getDay(), dim = new Date(y, mo + 1, 0).getDate(), pd = x => String(x).padStart(2, '0'), js = S.jobs.filter(j => j.status != 'Cancelled' && (!CT || j.tech == CT)), act = j => !['Completed', 'Cancelled'].includes(j.status), un = js.filter(j => !j.appt && act(j));
    let cells = ''; for (let i = 0; i < fw; i++)cells += '<div></div>'; for (let d = 1; d <= dim; d++) { const iso = `${y}-${pd(mo + 1)}-${pd(d)}`; cells += `<div class='cd${iso == D(0) ? ' today' : ''}' data-date='${iso}'><span class='dn'>${d}</span>${js.filter(j => j.appt == iso).map(j => evc(j, act(j))).join('')}</div>` }
    const ag = js.filter(j => j.appt).sort((a, b) => a.appt > b.appt ? 1 : -1).map(x => `<div class='li' data-job='${x.id}' tabindex='0' style='cursor:pointer'><span class='mu' style='width:56px'>${fd(x.appt)}</span><div><b>${esc(cust(x.cid).name)}</b><small>${esc(x.type)} · ${esc(x.tech || 'Unassigned')}</small></div>${B(x.status)}</div>`).join('') || '<div class="empty">No appointments</div>';
    return `<div class='pg'><div class='ph'><div><h1>Calendar</h1><p>Drag a job onto a date to reschedule it, or open it and choose Reschedule.</p></div><button class='btn pri' data-act='add-job'>${ic('plus')}New appointment</button></div><div class='bar'><button class='btn sm' data-act='cal' data-v='prev' aria-label='Previous month'>‹</button><button class='btn sm' data-act='cal' data-v='today'>Today</button><button class='btn sm' data-act='cal' data-v='next' aria-label='Next month'>›</button><b>${new Date(y, mo, 1).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</b><div class='chips'><button class='chip${CV == 'month' ? ' on' : ''}' data-act='cal' data-v='month'>Month</button><button class='chip${CV == 'agenda' ? ' on' : ''}' data-act='cal' data-v='agenda'>Agenda</button></div><select id='ctech' aria-label='Technician' style='height:34px;border-radius:8px;border:1px solid var(--bd);background:var(--sf);padding:0 8px'><option value=''>All technicians</option>${S.team.filter(t => t.role == 'Technician' && t.active !== false).map(t => `<option ${t.name == CT ? 'selected' : ''}>${esc(t.name)}</option>`).join('')}</select></div>
 <div class='cw'><div class='panel'>${CV == 'month' ? `<div class='cg'>${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => `<div class='mu' style='min-height:0;font-size:12px;text-align:center'>${d}</div>`).join('')}${cells}</div>` : ag}</div><div class='panel'><div class='hd'><h2>Unscheduled (${un.length})</h2></div><div class='pad'>${un.map(j => evc(j, 1)).join('') || '<span class="mu">All jobs are scheduled</span>'}</div></div></div></div>`
}
function settings() {
    const s = SS(), seg = (k, o) => `<div class='chips' style='margin-top:6px'>${o.map(([v, l]) => `<button class='chip${s[k] == v ? ' on' : ''}' data-act='set' data-k='${k}' data-v='${v}'>${l}</button>`).join('')}</div>`, inp = (k, l) => `<label>${l}<input data-set='${k}' value='${esc(s[k])}'></label>`;
    const body = ST == 'Appearance' ? `<div class='fg'><div><b>Theme</b>${seg('theme', [['light', 'Light'], ['dark', 'Dark'], ['system', 'System']])}</div><div><b>Accent colour</b><div class='chips' style='margin-top:6px'>${['#4F46E5', '#0E7490', '#15803D', '#B45309', '#BE185D'].map(c => `<button class='chip' data-act='set' data-k='accent' data-v='${c}' aria-label='Accent ${c}' aria-pressed='${s.accent == c}' style='width:34px;padding:0;background:${c};border:3px solid ${s.accent == c ? 'var(--tx)' : 'transparent'}'></button>`).join('')}</div></div><div><b>Density</b>${seg('dens', [['comfortable', 'Comfortable'], ['compact', 'Compact']])}</div><div><b>Default product view</b>${seg('view', [['list', 'List'], ['grid', 'Grid']])}</div><div class='panel pad'><b>Preview</b><p class='mu'>Buttons, badges and links follow this accent.</p><button class='btn pri'>Primary</button> <span class='b ac'>Booked</span></div></div>` : ST == 'Business' ? `<div class='fg'>${inp('store', 'Store name')}${inp('gstin', 'GSTIN (demo value)')}${inp('addr', 'Address')}${inp('phone', 'Phone')}${inp('email', 'Email')}</div><p class='mu'>These details appear on printed invoices.</p>` : ST == 'Data' ? `<p class='mu'>Data lives in this browser’s LocalStorage. It is not secure storage, and frontend permissions are not real security.</p><div class='acts' style='justify-content:flex-start'><button class='btn' data-act='export'>Export JSON</button><label class='btn'>Import JSON<input id='imp' type='file' accept='application/json' hidden></label><button class='btn dg' data-act='reset'>Reset demo data</button></div>` : `<div class='fg'><label>Tax treatment on invoices<select data-set='inter'><option value='0' ${s.inter != '1' ? 'selected' : ''}>Intra-state (CGST + SGST)</option><option value='1' ${s.inter == '1' ? 'selected' : ''}>Inter-state (IGST)</option></select></label></div><p class='mu'>Demo tax settings, not a certified tax solution.</p>`;
    return `<div class='pg'><div class='ph'><div><h1>Settings</h1><p>Appearance and business details apply immediately and persist after refresh.</p></div></div><div class='chips' style='margin-bottom:12px'>${['Appearance', 'Business', 'Invoice & tax', 'Data'].map(t => `<button class='chip${ST == t ? ' on' : ''}' data-act='tab' data-v='${t}'>${t}</button>`).join('')}</div><div class='panel pad' style='max-width:640px'>${body}</div></div>`
}
function retailAct2(d) {
    if (notifAct(d)) return 1;
    switch (d.act) {
        case 'inv': go('invoices/' + d.id); return 1; case 'prod-new': go('products/new'); return 1; case 'popen': go('products/' + d.id); return 1; case 'pedit': go('products/edit/' + d.id); return 1; case 'pcancel': go('products'); return 1; case 'psave': psave(d.id); return 1;
        case 'pdup': { const o = prod(d.id), p = { ...o, id: 'P' + (1001 + S.products.length), sku: o.sku + '-COPY', name: o.name + ' (copy)', qty: 0, units: [], bar: '8901' + String(Date.now()).slice(-8) }; S.products.push(p); save(); toast('Duplicated. Review the copy and save'); go('products/edit/' + p.id); return 1 }
        case 'pv': SS().view = d.v; save(); render(true); return 1; case 'set': SS()[d.k] = d.v; save(); applySet(); render(true); return 1; case 'tab': ST = d.v; render(true); return 1;
        case 'cal': calNav(d.v); return 1;
        case 'resch': modal(`<h1>Reschedule ${esc(d.id)}</h1><div class='fg'><label>New date<input type='date' id='rsd' min='${D(0)}' value='${S.jobs.find(x => x.id == d.id).appt || D(1)}'></label></div><div class='acts'><button class='btn' data-act='close'>Cancel</button><button class='btn pri' data-act='resave' data-id='${d.id}'>Save</button></div>`); return 1;
        case 'resave': resched(d.id, $('#rsd').value); closeM(); return 1; case 'print': window.print(); return 1
    }return 0
}
document.addEventListener('dragstart', e => { const j = e.target.closest && e.target.closest('[data-job][draggable]'); if (j) { e.dataTransfer.setData('text/plain', j.dataset.job); e.dataTransfer.effectAllowed = 'move' } });
document.addEventListener('dragover', e => { if (e.target.closest && e.target.closest('.cd')) e.preventDefault() });
document.addEventListener('drop', e => { const c = e.target.closest && e.target.closest('.cd'); if (!c) return; e.preventDefault(); const id = e.dataTransfer.getData('text/plain'); if (id) resched(id, c.dataset.date) });
document.addEventListener('input', e => { if (e.target.closest && e.target.closest('#pf')) DIRTY = true });
document.addEventListener('change', e => {
    const t = e.target; if (t.dataset && t.dataset.set) { SS()[t.dataset.set] = t.value; save(); toast('Setting saved') }
    else if (t.id == 'ctech') { CT = t.value; render(true) }
    else if (t.id == 'imp') { const fl = t.files[0]; if (fl) fl.text().then(x => { try { const o = JSON.parse(x); if (!['customers', 'jobs', 'products', 'invoices', 'moves', 'pos'].every(k => Array.isArray(o[k]))) throw 0; if (!confirm('Replace all current demo data with this file? Export a backup first if needed.')) return; S = o; save(); applySet(); toast('Data imported'); render(true) } catch (ex) { toast('Import failed: not a valid Mobile Point export', 'er') } }) }
    else if (t.id == 'pfile') { const fl = t.files[0]; if (!fl) return; const r = new FileReader(); r.onload = () => { const im = new Image(); im.onload = () => { const c = document.createElement('canvas'), k = Math.min(1, 360 / im.width); c.width = im.width * k; c.height = im.height * k; c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); PIMG = c.toDataURL('image/jpeg', .75); DIRTY = true; $('#pimgbox').firstElementChild.outerHTML = `<img src='${PIMG}' alt='Preview' class='pimg'>` }; im.src = r.result }; r.readAsDataURL(fl) }
});
window.addEventListener('hashchange', () => { const h = location.hash.slice(1) || 'overview'; if (h == V.page) return; if (DIRTY && !confirm('You have unsaved changes. Leave this page?')) { location.hash = V.page; return } DIRTY = false; V.page = h; V.k = ['overview', 'calendar', 'reports', 'settings'].includes(h) ? '' : h; V.f = 'All'; V.q = ''; V.p = 0; render() });
applySet();

Object.assign(IC, { pulse: 'M3 12h4l3-8 4 16 3-8h4', check: 'M20 6L9 17l-5-5', chev: 'M9 18l6-6-6-6' });
NAV.splice(1, 0, ['notifications', 'Notifications', 'bell', 'Overview'], ['activity', 'Activity', 'pulse', 'Overview']);
let NT = 'all', NF = 'All', AF = 'All', AQ = '', AN = 20;
const nrd = () => S.nread || (S.nread = []), isRd = id => nrd().includes(id), ago = t => { const d = t.slice(0, 10), n = Math.round((new Date(D(0) + 'T00:00') - new Date(d + 'T00:00')) / 864e5); return n < 0 ? 'Due ' + fd(d) : n == 0 ? 'Today' : n == 1 ? 'Yesterday' : n < 30 ? n + ' days ago' : fd(d) };
function notifs() {
    const L = [], cu = id => cust(id).name;
    S.msgs.filter(m => m.status == 'Failed').forEach(m => L.push({ id: 'm:' + m.id, c: 'Messages', sev: 'er', ic: 'msg', h: 'Message failed', d: `${m.ch} to ${cu(m.cid)}: ${m.err}`, t: m.time, go: ['messages', 'Failed'] }));
    S.fb.filter(f => f.status == 'Open').forEach(f => L.push({ id: 'f:' + f.id, c: 'Complaints', sev: 'er', ic: 'star', h: 'Low rating from ' + cu(f.cid), d: `${f.rating}/5: ${f.comment}`, t: f.time, go: ['feedback', 'Open'] }));
    S.jobs.filter(j => !['Completed', 'Cancelled'].includes(j.status) && (j.status == 'Due' || !j.tech)).forEach(j => L.push({ id: 'j:' + j.id + j.status, c: 'Service', sev: 'wa', ic: 'wrench', h: j.id + (j.tech ? ' is due' : ' needs a technician'), d: `${cu(j.cid)} · ${j.type}`, t: j.appt || j.due || D(0), go: ['services', 'All'] }));
    S.assets.forEach(a => { const e = entl(a); if (e.s == 'Overdue') L.push({ id: 'a:' + a.sn, c: 'Service', sev: 'wa', ic: 'cal', h: 'Free service overdue', d: `${cu(a.cid)} · ${a.brand} ${a.model}`, t: e.due, go: ['assets', 'Overdue'] }) });
    S.products.filter(p => p.active !== false && stk(p) != 'In stock').forEach(p => L.push({ id: 's:' + p.id + stk(p), c: 'Stock', sev: stk(p) == 'Out of stock' ? 'er' : 'wa', ic: 'box', h: p.name + (stk(p) == 'Out of stock' ? ' is out of stock' : ' is low'), d: `${onh(p)} on hand, reorder at ${p.re}`, t: D(0), go: ['inventory', stk(p)] }));
    S.pos.filter(o => ['Ordered', 'Partially received'].includes(o.status)).forEach(o => L.push({ id: 'p:' + o.id + o.status, c: 'Purchasing', sev: 'ac', ic: 'truck', h: o.id + ' awaiting delivery', d: `${sup(o.sup).name} · ${o.status}`, t: o.date, go: ['purchases', o.status] }));
    const r = { er: 0, wa: 1, ac: 2 }; return L.sort((a, b) => r[a.sev] - r[b.sev] || (a.t < b.t ? 1 : -1))
}
const unreadN = () => notifs().filter(n => !isRd(n.id)).length;
const bellBadge = () => { const n = unreadN(); return n ? `<i class='bdg'>${n > 9 ? '9+' : n}</i>` : '' };
const nItem = n => { const u = !isRd(n.id); return `<div class='nti${u ? ' un' : ''}' data-act='nread' data-id='${esc(n.id)}' role='button' tabindex='0'><span class='nic ${n.sev}'>${ic(n.ic)}</span><span class='ntx'><b>${esc(n.h)}</b><small>${esc(n.d)}</small><span class='nm2'><span class='b ${n.sev}'>${n.c}</span><em>${esc(ago(n.t))}</em></span></span>${u ? `<button class='nck' data-act='nmark' data-id='${esc(n.id)}' aria-label='Mark as read' title='Mark as read'>${ic('check')}</button><i class='ud'></i>` : ''}</div>` };
function npHTML() {
    const L = notifs(), u = L.filter(n => !isRd(n.id)), rd = L.filter(n => isRd(n.id)), ls = NT == 'un' ? [['', u]] : [['New', u], ['Earlier', rd]], body = ls.map(([t, a]) => a.length ? `${t ? `<div class='np-s'>${t}</div>` : ''}${a.map(nItem).join('')}` : '').join('');
    return `<div class='np-h'><div><b>Notifications</b><small>${u.length ? u.length + ' need your attention' : 'You are all caught up'}</small></div><button class='lnk' data-act='nall' ${u.length ? '' : 'disabled'}>Mark all read</button></div><div class='np-t'><div class='seg'><button class='${NT == 'all' ? 'on' : ''}' data-act='ntab' data-v='all'>All<span>${L.length}</span></button><button class='${NT == 'un' ? 'on' : ''}' data-act='ntab' data-v='un'>Unread<span>${u.length}</span></button></div></div><div class='np-l fx'>${body || `<div class='empty'>${ic('check')}<b>All caught up</b><span>New alerts will appear here.</span></div>`}</div><div class='np-f'><button class='npv' data-act='nav' data-p='notifications'>View all notifications ${ic('chev')}</button></div>`
}
function npPos() { const p = $('#np'), b = $('#bl'); if (!p || !b) return; const r = b.getBoundingClientRect(); p.style.top = (r.bottom + 10) + 'px'; p.style.maxHeight = `min(580px, calc(100vh - ${Math.round(r.bottom + 16)}px))`; if (innerWidth > 820) p.style.right = Math.max(12, innerWidth - r.right - 6) + 'px' }
function npClose() { const p = $('#np'); if (!p) return; p.classList.add('out'); setTimeout(() => p.remove(), 140) }
function npToggle() { const o = $('#np'); if (o) { if (!o.classList.contains('out')) npClose(); return 1 } const p = document.createElement('div'); p.id = 'np'; p.className = 'np'; p.setAttribute('role', 'dialog'); p.setAttribute('aria-label', 'Notifications'); p.innerHTML = npHTML(); document.body.append(p); npPos(); return 1 }
const npRef = () => { const p = $('#np'); if (p) { const sc = p.querySelector('.np-l'); const t = sc ? sc.scrollTop : 0; p.innerHTML = npHTML(); p.querySelector('.np-l').classList.remove('fx'); p.querySelector('.np-l').scrollTop = t } const b = $('#bl'); if (b) b.innerHTML = ic('bell') + bellBadge() };
function notifPage() {
    const L = notifs(), u = L.filter(n => !isRd(n.id)), cats = ['All', 'Unread', ...new Set(L.map(n => n.c))], sh = L.filter(n => NF == 'All' || (NF == 'Unread' ? !isRd(n.id) : n.c == NF));
    return `<div class='pg'><div class='ph'><div><h1>Notifications</h1><p>Alerts generated from live records. Fixing the underlying issue removes the alert. ${u.length} unread.</p></div><button class='btn' data-act='nall' ${u.length ? '' : 'disabled'}>Mark all as read</button></div><div class='chips' style='margin-bottom:12px'>${cats.map(c => `<button class='chip${NF == c ? ' on' : ''}' data-act='nf' data-v='${c}'>${c}${c == 'Unread' ? ' (' + u.length + ')' : ''}</button>`).join('')}</div><div class='panel'>${sh.map(n => `<div class='li${isRd(n.id) ? '' : ' nun'}'><div class='li-main'><span class='nic ${n.sev}'>${ic(n.ic)}</span><div><b>${esc(n.h)}</b><small>${esc(n.d)}</small><small>${esc(ago(n.t))} · ${n.c}</small></div></div><div class='li-acts'><button class='btn sm' data-act='nunread' data-id='${esc(n.id)}'>${isRd(n.id) ? 'Mark unread' : 'Mark read'}</button><button class='btn sm' data-act='nread' data-id='${esc(n.id)}'>Open</button></div></div>`).join('') || `<div class='empty'>${ic('bell')}<b>Nothing here</b><span>No notifications match this filter.</span></div>`}</div></div>`
}
const KC = { Sales: 'ok', Inventory: 'wa', Feedback: 'wa' };
function feed() {
    const A = [], T = s => s.length > 10 ? s : s + ' 00:00', cu = id => id ? cust(id).name : 'Walk-in';
    S.invoices.forEach(i => A.push({ t: T(i.date), k: 'Sales', ic: 'cart', h: `Invoice ${i.id} ${i.status == 'Cancelled' ? 'cancelled' : 'created'}`, d: `${cu(i.cid)} · ${inr(i.total)} · ${i.pay}`, by: i.by || 'Staff', p: 'invoices' }));
    S.moves.filter(m => !['Opening stock', 'Sale'].includes(m.type)).forEach(m => A.push({ t: T(m.time), k: 'Inventory', ic: 'box', h: `${m.type}: ${prod(m.p).name}`, d: `${chg(m.d)} units, balance ${m.prev} to ${m.next} · ${m.ref}`, by: m.by, p: 'movements' }));
    S.pos.forEach(o => A.push({ t: T(o.date), k: 'Purchasing', ic: 'truck', h: `${o.id} ${o.status.toLowerCase()}`, d: `${sup(o.sup).name} · ${o.lines.length} line${o.lines.length == 1 ? '' : 's'}`, by: 'Staff', p: 'purchases' }));
    S.jobs.filter(j => j.appt || j.due).forEach(j => A.push({ t: T(j.appt || j.due), k: 'Service', ic: 'wrench', h: `${j.id} ${j.status.toLowerCase()}`, d: `${cu(j.cid)} · ${j.type}`, by: j.tech || 'Unassigned', p: 'services' }));
    S.msgs.forEach(m => A.push({ t: T(m.time), k: 'Messages', ic: 'msg', h: `${m.tpl}: ${m.status.toLowerCase()}`, d: `${cu(m.cid)} via ${m.ch} (simulated)`, by: 'Automation', p: 'messages' }));
    S.fb.forEach(f => A.push({ t: T(f.time), k: 'Feedback', ic: 'star', h: `${f.rating}-star feedback`, d: `${cu(f.cid)}: ${f.comment}`, by: 'Customer', p: 'feedback' }));
    return A.filter(a => a.t.slice(0, 10) <= D(0)).sort((a, b) => a.t < b.t ? 1 : -1)
}
const aItem = a => `<button class='nti' data-act='nav' data-p='${a.p}'><span class='nic ${KC[a.k] || ''}'>${ic(a.ic)}</span><span class='ntx'><b>${esc(a.h)}</b><small>${esc(a.d)}</small><em>${esc(a.by)} · ${a.t.slice(11) != '00:00' ? a.t.slice(11) + ' · ' : ''}${esc(ago(a.t))}</em></span></button>`;
function actList() { const q = AQ.toLowerCase(), L = feed().filter(a => (AF == 'All' || a.k == AF) && (!q || (a.h + a.d + a.by).toLowerCase().includes(q))), sh = L.slice(0, AN); let g = '', o = ''; sh.forEach(a => { const w = ago(a.t), lb = w == 'Today' || w == 'Yesterday' ? w : fd(a.t.slice(0, 10)); if (lb != g) { g = lb; o += `<div class='gh'>${lb}</div>` } o += aItem(a) }); return (o || `<div class='empty'>${ic('pulse')}<b>No activity found</b><span>Try another filter or search.</span></div>`) + (L.length > AN ? `<div style='padding:12px;text-align:center'><button class='btn sm' data-act='amore'>Show more (${L.length - AN})</button></div>` : '') }
function actPage() { return `<div class='pg'><div class='ph'><div><h1>Activity</h1><p>Recent sales, stock, purchasing, service, message and feedback events, built from your records.</p></div></div><div class='bar'><div class='sb'>${ic('search')}<input id='aq' placeholder='Search activity' value='${esc(AQ)}' aria-label='Search activity'></div><div class='chips'>${['All', 'Sales', 'Inventory', 'Purchasing', 'Service', 'Messages', 'Feedback'].map(c => `<button class='chip${AF == c ? ' on' : ''}' data-act='af' data-v='${c}'>${c}</button>`).join('')}</div></div><div class='panel' id='alist'>${actList()}</div></div>` }
const adHTML = () => `<div class='ad-h'><b>Recent activity</b><button class='ib' data-act='adx' aria-label='Close activity' title='Close'>×</button></div><div class='ad-l'>${feed().slice(0, 14).map(aItem).join('')}</div><div class='np-f'><button class='btn sm' data-act='nav' data-p='activity'>Open full activity page</button></div>`;
function adClose() { const a = $('#ad'); if (a) { a.classList.remove('open'); $('#adb').classList.remove('open') } }
function adToggle() { let a = $('#ad'); if (!a) { a = document.createElement('aside'); a.id = 'ad'; a.className = 'ad'; a.setAttribute('aria-label', 'Activity'); const b = document.createElement('div'); b.id = 'adb'; b.className = 'adb'; b.dataset.act = 'adx'; document.body.append(b, a) } if (a.classList.contains('open')) { adClose(); return 1 } const n = $('#np'); if (n) n.remove(); a.innerHTML = adHTML(); void a.offsetWidth; a.classList.add('open'); $('#adb').classList.add('open'); return 1 }
function notifAct(d) {
    switch (d.act) {
        case 'bell': { const a = $('#ad'); if (a) adClose(); return npToggle() }
        case 'nread': { const n = notifs().find(x => x.id == d.id); if (!isRd(d.id)) { nrd().push(d.id); save() } const p = $('#np'); if (p) p.remove(); npRef(); if (n) go(n.go[0], n.go[1]); else render(true); return 1 }
        case 'nall': notifs().forEach(n => { if (!isRd(n.id)) nrd().push(n.id) }); save(); npRef(); if (V.page == 'notifications') render(true); toast('All notifications marked as read'); return 1;
        case 'nunread': { const i = nrd().indexOf(d.id); if (i >= 0) nrd().splice(i, 1); else nrd().push(d.id); save(); npRef(); render(true); return 1 }
        case 'ntab': NT = d.v; npRef(); { const l = $('.np-l'); if (l) { l.classList.remove('fx'); void l.offsetWidth; l.classList.add('fx') } } return 1;
        case 'nmark': { if (!isRd(d.id)) { nrd().push(d.id); save() } npRef(); if (V.page == 'notifications' || V.page == 'overview') render(true); return 1 }
        case 'nf': NF = d.v; render(true); return 1;
        case 'actd': return adToggle(); case 'adx': adClose(); return 1;
        case 'af': AF = d.v; AN = 20; render(true); return 1; case 'amore': AN += 20; render(true); return 1
    }return 0
}
document.addEventListener('click', e => { const t = e.target; if (!t.closest) return; if (t.closest('#np [data-act=nav]')) { const p = $('#np'); p && p.remove() } if (t.closest('#ad [data-act=nav]')) adClose(); const p = $('#np'); if (p && !t.closest('#np') && !t.closest('[data-act=bell]')) p.remove() });
document.addEventListener('keydown', e => { if (e.key == 'Escape') { const p = $('#np'); if (p) p.remove(); adClose() } });
document.addEventListener('keydown', e => { if ((e.key == 'Enter' || e.key == ' ') && e.target.matches && e.target.matches('.nti[role=button]')) { e.preventDefault(); e.target.click() } });
addEventListener('resize', npPos);
document.addEventListener('input', e => { if (e.target.id == 'aq') { AQ = e.target.value; AN = 20; $('#alist').innerHTML = actList() } });
function drPos() { const p = $('#drp'); if (!p || !DP || !DP.btn || innerWidth <= 700) return; if (!DP.btn.isConnected) { drClose(); return } const r = DP.btn.getBoundingClientRect(), w = p.offsetWidth; if (r.bottom < 0 || r.top > innerHeight) { drClose(); return } p.style.top = Math.max(8, Math.min(r.bottom + 6, innerHeight - p.offsetHeight - 8)) + 'px'; p.style.left = (r.right - w >= 8 ? r.right - w : Math.max(8, Math.min(r.left, innerWidth - w - 8))) + 'px' }
addEventListener('scroll', e => { const t = e.target; if (t && t.nodeType == 1 && t.closest('#drp')) return; drPos() }, true); addEventListener('resize', drPos);

document.addEventListener('submit', e => {
    if (e.target && e.target.id === 'login-form') {
        e.preventDefault();
        const fd = new FormData(e.target);
        const em = (fd.get('email') || '').trim();
        const pw = (fd.get('password') || '').trim();
        if (!em) return toast('Please enter your email or username', 'er');
        if (!pw) return toast('Please enter your password', 'er');
        const emLower = em.toLowerCase();
        let matched = (S.users || []).find(x => x.email.toLowerCase() === emLower || x.name.toLowerCase() === emLower);
        if (!matched) {
            matched = {
                id: 'U' + Date.now().toString().slice(-4),
                name: em.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
                email: em.includes('@') ? em : em + '@mobilepoint.in',
                phone: '+91 98250 00000',
                preset: 'admin',
                permissions: JSON.parse(JSON.stringify(PRESETS.admin.perms)),
                status: 'Active',
                lastLogin: 'Just now'
            };
            (S.users = S.users || []).push(matched);
            save();
        } else {
            matched.lastLogin = 'Just now';
            save();
        }
        currentUser = matched;
        V.authView = 'login';
        localStorage.removeItem('mp_logged_out');
        localStorage.setItem(AUTH_KEY, JSON.stringify(currentUser));
        toast('Welcome back, ' + currentUser.name);
        render();
        return;
    }
    if (e.target && e.target.id === 'forgot-form') {
        e.preventDefault();
        const fd = new FormData(e.target);
        const em = (fd.get('email') || '').trim();
        if (!em) return toast('Please enter your registered email', 'er');
        V.authResetEmail = em;
        V.authView = 'reset';
        toast('Verification code sent to ' + em);
        render();
        return;
    }
    if (e.target && e.target.id === 'reset-pw-form') {
        e.preventDefault();
        const fd = new FormData(e.target);
        const pw = (fd.get('password') || '').trim();
        const cpw = (fd.get('confirm') || '').trim();
        if (pw.length < 6) return toast('Password must be at least 6 characters', 'er');
        if (pw !== cpw) return toast('Passwords do not match', 'er');
        const em = (V.authResetEmail || '').toLowerCase();
        const matched = (S.users || []).find(x => x.email.toLowerCase() === em);
        if (matched) {
            matched.password = pw;
            save();
        }
        V.authView = 'login';
        toast('Password updated successfully! Please sign in with your new password.');
        render();
        return;
    }
    const f = e.target, k = f.dataset.form; if (!k || k[0] == '_') return; e.preventDefault(); $e(f, '.er').forEach(x => x.remove()); const d = Object.fromEntries(new FormData(f)), id = f.dataset.id; let ok = 1;
    if (k == 'user-permissions') {
        const u = (S.users || []).find(x => x.id === id);
        if (!u) return;
        if (!d.name.trim()) return void err(f, 'name', 'Enter full name');
        if (!d.email.trim()) return void err(f, 'email', 'Enter email address');
        u.name = d.name.trim();
        u.email = d.email.trim();
        u.phone = d.phone ? d.phone.trim() : '—';
        u.status = d.status;
        const perms = {};
        MODULE_DEFS.forEach(mod => {
            perms[mod.id] = {
                enabled: !!f.querySelector(`[name="mod_${mod.id}_enabled"]`)?.checked,
                view: !!f.querySelector(`[name="mod_${mod.id}_view"]`)?.checked,
                edit: !!f.querySelector(`[name="mod_${mod.id}_edit"]`)?.checked,
                delete: !!f.querySelector(`[name="mod_${mod.id}_delete"]`)?.checked,
                export: !!f.querySelector(`[name="mod_${mod.id}_export"]`)?.checked,
                manage: !!f.querySelector(`[name="mod_${mod.id}_manage"]`)?.checked
            };
        });
        u.permissions = perms;
        save();
        if (currentUser && currentUser.id === u.id) {
            currentUser = { ...currentUser, name: u.name, email: u.email, permissions: u.permissions };
            localStorage.setItem(AUTH_KEY, JSON.stringify(currentUser));
        }
        toast('Permissions updated for ' + u.name);
        render(true);
        return;
    }
    if (k == 'user-new') {
        if (!d.name.trim()) return void err(f, 'name', 'Enter full name');
        if (!d.email.trim()) return void err(f, 'email', 'Enter email address');
        const uId = 'U' + (101 + (S.users || []).length);
        const pDef = PRESETS[d.preset] || PRESETS.tech;
        const nu = {
            id: uId,
            name: d.name.trim(),
            email: d.email.trim(),
            phone: d.phone ? d.phone.trim() : '—',
            preset: d.preset || 'tech',
            permissions: JSON.parse(JSON.stringify(pDef.perms)),
            status: d.status || 'Active',
            lastLogin: 'Never'
        };
        (S.users = S.users || []).push(nu);
        save();
        closeM();
        toast('User ' + nu.name + ' added');
        go('users/' + nu.id);
        return;
    }
    if (k == 'cust') {
        if (!d.name.trim()) ok = err(f, 'name', 'Enter the full name'); if (!/^(\+91)?[\s-]?[6-9]\d{4}[\s-]?\d{5}$/.test(d.phone.trim())) ok = err(f, 'phone', 'Enter a valid 10-digit Indian mobile number'); if (d.email && !/^\S+@\S+\.\S+$/.test(d.email)) ok = err(f, 'email', 'Enter a valid email'); if (!ok) return;
        S.customers.unshift({ id: 'C' + (100 + S.customers.length + 1 + Math.floor(Math.random() * 900)), name: d.name.trim(), phone: '+91 ' + d.phone.replace(/^\+91/, '').trim(), email: d.email, city: d.city, ch: d.ch, service: !!d.service, promo: !!d.promo, active: true }); toast('Customer added')
    }
    if (k == 'job') {
        if (!d.appt) return void err(f, 'appt', 'Choose a date'); const a = S.assets.find(x => x.sn == d.ac), en = entl(a), clash = d.tech && S.jobs.some(j => j.tech == d.tech && j.appt == d.appt && !['Completed', 'Cancelled'].includes(j.status));
        S.jobs.unshift({ id: 'J' + (3001 + S.jobs.length), cid: a.cid, ac: a.sn, type: d.type, due: en.due || d.appt, appt: d.appt, tech: d.tech, status: d.tech ? 'Assigned' : 'Booked', paid: !['Eligible', 'Due soon', 'Overdue'].includes(en.s), amt: ['Eligible', 'Due soon', 'Overdue'].includes(en.s) ? 0 : 1200, notes: '' });
        S.msgs.unshift({ id: 'M' + (7001 + S.msgs.length), cid: a.cid, ch: cust(a.cid).ch, tpl: 'Booking confirmation', status: 'Pending', retries: 0, err: '', time: D(0) }); sim(S.msgs[0].id); toast(clash ? 'Booked. Technician already has a job that day' : 'Service booked. Confirmation queued (simulated)')
    }
    if (k == 'addfb') { const j = S.jobs.find(x => x.id == d.job); if (!j) return; const r = +d.r; S.fb.unshift({ id: 'F' + (501 + S.fb.length), cid: j.cid, job: j.id, rating: r, comment: d.c || 'No comment', status: r <= 2 ? 'Open' : 'None', staff: '', notes: '', time: D(0) }); toast(r <= 2 ? 'Low rating: complaint opened for staff review' : 'Feedback saved') }
    if (k == 'flow') { const x = S.flows.find(w => w.id == id); x.lead = +d.lead; x.ch = d.ch; x.fb = d.fb; toast('Workflow saved') }
    if (k == 'fb') { const x = S.fb.find(w => w.id == id); x.staff = d.staff; x.notes = d.notes; if (x.status == 'Open') x.status = 'Resolved'; toast('Complaint updated') }
    if (k == 'done') {
        if (!d.n.trim()) return void err(f, 'n', 'Add completion notes'); const j = S.jobs.find(x => x.id == id); j.status = 'Completed'; j.notes = d.n; j.done = new Date().toISOString(); if (+d.amt > 0) { j.paid = true; j.amt = +d.amt }
        const add = t => { S.msgs.unshift({ id: 'M' + (7001 + S.msgs.length), cid: j.cid, ch: cust(j.cid).ch, tpl: t, status: 'Pending', retries: 0, err: '', time: D(0) }); sim(S.msgs[0].id) }; add('Service completion'); if (d.fbk) add('Feedback request');
        const e = entl(asset(j.ac)); toast('Completed. ' + (e.due ? 'Next free service ' + fd(e.due) : 'No further free visits'))
    }
    save(); closeM(); render(true)
});
function $$e(e, s) { return [...e.querySelectorAll(s)] }
document.addEventListener('click', e => {
    const t = e.target, a = t.closest('[data-act]');
    if (t.closest('[data-chip]')) { V.f = t.closest('[data-chip]').dataset.chip; V.p = 0; return render(true) }
    const g = t.closest('[data-go]'); if (g) { return go(g.dataset.go, g.dataset.f) }
    if (a) { if (a.dataset.act == 'ovl' && t !== a) return; return act(a, e) }
    const o = t.closest('[data-open]'), jb = t.closest('[data-job]'), fb = t.closest('[data-fb]'); if (jb) jobM(jb.dataset.job); else if (fb) fbM(fb.dataset.fb); else if (o && P[V.k] && !t.closest('button')) P[V.k].open(o.dataset.open)
});
document.addEventListener('keydown', e => { if (e.key == 'Escape') closeM(); if (e.key == '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { e.preventDefault(); ($('#gq') || { focus() { } }).focus() } if (e.key == 'Enter' && e.target.matches('tr[data-open]')) e.target.click() });
document.addEventListener('input', e => { if (e.target.id == 'q') { V.q = e.target.value; V.p = 0; $('#tb').innerHTML = tbody(V.k) } });

function act(a, e) {
    const d = a.dataset, j = () => S.jobs.find(x => x.id == d.id); if (retailAct(d, e)) return;
    switch (d.act) {
        case 'ovl': case 'close': return closeM();
        case 'menu': return innerWidth <= 820 ? $('#app').classList.toggle('dr') : $('#app').classList.toggle('col');
        case 'drawer': return $('#app').classList.remove('dr');
        case 'nav': $('#app').classList.remove('dr'); return go(d.p);
        case 'theme': { const r = document.documentElement, next = r.dataset.theme == 'dark' ? 'light' : 'dark'; r.dataset.theme = next; SS().theme = next; save(); return }
        case 'add-cust': closeM(); return go('customers/new'); case 'add-fb': return formM('fb');
        case 'add-job': formM('job'); if (d.c) { const s = $('[name=ac]'); const m = S.assets.find(x => x.cid == d.c); m && (s.value = m.sn) } return;
        case 'new': return modal('<h1>Create new</h1><div class="fg"><button class="btn" data-act="add-cust">Add customer</button><button class="btn" data-act="add-job">Schedule service</button><button class="btn" data-act="add-fb">Record feedback</button></div>');
        case 'bell': { const n = [...S.msgs.filter(m => m.status == 'Failed').map(m => `Failed ${m.ch} message to ${cust(m.cid).name}`), ...S.fb.filter(f => f.status == 'Open').map(f => `Low rating from ${cust(f.cid).name}`), ...S.jobs.filter(j => j.status == 'Due' || (!j.tech && j.status != 'Completed' && j.status != 'Cancelled')).map(j => `${j.id} needs a technician or booking`)]; return modal(`<h1>Notifications</h1>${n.map(x => `<div class="li" style="padding-left:0">${esc(x)}</div>`).join('') || '<div class="empty">All clear</div>'}<div class="acts"><button class="btn" data-act="close">Close</button></div>`) }
        case 'st': j().status = d.s; save(); toast('Status updated to ' + d.s); closeM(); return render(true);
        case 'assign': { const x = j(); x.tech = $('#tsel').value; if (x.status == 'Due' || x.status == 'Booked') x.status = 'Assigned'; save(); toast('Assigned to ' + x.tech + '. Notification queued (simulated)'); closeM(); return render(true) }
        case 'complete': return formM('done'), $('[data-form=done]').dataset.id = d.id;
        case 'cancel': if (confirm('Cancel this job? The customer will not be notified automatically.')) { j().status = 'Cancelled'; save(); toast('Job cancelled'); closeM(); render(true) } return;
        case 'retry': { const m = S.msgs.find(x => x.id == d.id); m.retries++; save(); sim(m.id); toast('Retry queued (simulated)'); closeM(); return render(true) }
        case 'flow': { e.stopPropagation(); const f = S.flows.find(x => x.id == d.id); f.on = !f.on; save(); toast(f.name + (f.on ? ' activated' : ' paused')); return render(true) }
        case 'pg': V.p = Math.max(0, V.p + +d.d); return $('#tb').innerHTML = tbody(V.k);
        case 'export': { const u = URL.createObjectURL(new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' })), l = document.createElement('a'); l.href = u; l.download = 'ac-care-demo.json'; l.click(); return }
        case 'reset': if (confirm('Reset all demo data? Your changes will be lost.')) { S = seed(); save(); toast('Demo data reset'); render(true) } return;
        case 'logout': {
            currentUser = null;
            localStorage.removeItem(AUTH_KEY);
            localStorage.setItem('mp_logged_out', '1');
            toast('Logged out successfully');
            render();
            return;
        }
        case 'go-forgot': {
            V.authView = 'forgot';
            render();
            return;
        }
        case 'go-login': {
            V.authView = 'login';
            render();
            return;
        }
        case 'toggle-pw': {
            const tid = d.target || 'login-pw';
            const inp = document.getElementById(tid);
            if (inp) {
                const isPw = inp.type === 'password';
                inp.type = isPw ? 'text' : 'password';
                a.textContent = isPw ? 'Hide' : 'Show';
            }
            return;
        }
        case 'apply-preset': {
            const pDef = PRESETS[d.preset];
            if (!pDef) return;
            MODULE_DEFS.forEach(mod => {
                const mP = pDef.perms[mod.id] || { enabled: false };
                const enCb = document.querySelector(`[name="mod_${mod.id}_enabled"]`);
                if (enCb) {
                    enCb.checked = !!mP.enabled;
                    const sub = document.querySelector(`#perm-sub-${mod.id}`);
                    if (sub) {
                        sub.style.opacity = mP.enabled ? '' : '.45';
                        sub.style.pointerEvents = mP.enabled ? '' : 'none';
                    }
                }
                ['view', 'edit', 'delete', 'export', 'manage'].forEach(f => {
                    const cb = document.querySelector(`[name="mod_${mod.id}_${f}"]`);
                    if (cb) cb.checked = !!mP[f];
                });
            });
            toast('Applied preset: ' + pDef.label);
            return;
        }
        case 'user-new': return userNewM();
        case 'user-del': {
            if (currentUser && d.id === currentUser.id) return toast('You cannot delete your own account', 'er');
            if (!confirm('Are you sure you want to delete this user?')) return;
            S.users = (S.users || []).filter(u => u.id !== d.id);
            save();
            closeM();
            toast('User removed');
            render(true);
            return;
        }
    }
}
function go(p, f, q) { if (DIRTY && !confirm('You have unsaved changes. Leave this page?')) return; DIRTY = false; V.k = ['overview', 'calendar', 'reports', 'settings'].includes(p) ? '' : p; V.f = f || 'All'; V.q = q || ''; V.p = 0; V.page = p; location.hash = p; render() }
function loginPage() {
    return `<div class="auth-wrap">
    <div class="auth-card">
        <div class="auth-header">
            <div class="auth-logo-box">${mpLogo(54)}</div>
            <h1>Mobile Point</h1>
            <p>AC Care &amp; Retail Management ERP</p>
        </div>
        <form id="login-form" data-form="auth-login" class="auth-form">
            <div class="auth-field">
                <label for="login-email">Email or Username</label>
                <div class="auth-input-wrap">
                    <input id="login-email" name="email" class="auth-input" type="text" value="rajesh@mobilepoint.in" placeholder="name@mobilepoint.in" required autofocus autocomplete="username" style="padding-right:14px">
                </div>
            </div>
            <div class="auth-field">
                <label for="login-pw">Password</label>
                <div class="auth-input-wrap">
                    <input id="login-pw" name="password" class="auth-input" type="password" value="admin123" placeholder="Enter your password" required autocomplete="current-password">
                    <button type="button" class="auth-pw-btn" data-act="toggle-pw" data-target="login-pw" tabindex="-1">Show</button>
                </div>
            </div>
            <div class="auth-options">
                <label class="auth-chk">
                    <input type="checkbox" name="remember" checked>
                    <span>Keep me signed in</span>
                </label>
                <button type="button" class="auth-link" data-act="go-forgot" style="background:none;border:0;padding:0">Forgot password?</button>
            </div>
            <button type="submit" class="auth-submit-btn">Sign In to Dashboard</button>
        </form>
        <div class="auth-footer">Mobile Point Enterprise ERP v6.2 · Vadodara, Gujarat</div>
    </div>
</div>`;
}

function forgotPage() {
    return `<div class="auth-wrap">
    <div class="auth-card">
        <div class="auth-header">
            <div class="auth-logo-box">${mpLogo(52)}</div>
            <h1>Reset Password</h1>
            <p>Enter your registered email address and we will send you instructions to recover your account.</p>
        </div>
        <form id="forgot-form" data-form="auth-forgot" class="auth-form">
            <div class="auth-field">
                <label for="forgot-email">Registered Staff Email</label>
                <div class="auth-input-wrap">
                    <input id="forgot-email" name="email" class="auth-input" type="email" placeholder="name@mobilepoint.in" required autofocus autocomplete="email" style="padding-right:14px">
                </div>
            </div>
            <button type="submit" class="auth-submit-btn">Send Verification Code</button>
            <button type="button" class="auth-sec-btn" data-act="go-login">Back to Sign In</button>
        </form>
        <div class="auth-footer">Mobile Point Enterprise · Security &amp; Access</div>
    </div>
</div>`;
}

function resetPage() {
    const em = V.authResetEmail || 'user@mobilepoint.in';
    return `<div class="auth-wrap">
    <div class="auth-card">
        <div class="auth-header">
            <div class="auth-badge">${ic('check')} Code Sent</div>
            <h1>Create New Password</h1>
            <p>We've sent a 6-digit verification code to <b style="color:var(--tx)">${esc(em)}</b>.</p>
        </div>
        <form id="reset-pw-form" data-form="auth-reset" class="auth-form">
            <div class="auth-field">
                <label for="reset-otp">Verification Code</label>
                <div class="auth-input-wrap">
                    <input id="reset-otp" name="otp" class="auth-input" value="482910" maxlength="6" placeholder="Enter 6-digit code" required style="letter-spacing:0.18em;font-weight:700;font-size:16px;text-align:center;padding-right:14px">
                </div>
            </div>
            <div class="auth-field">
                <label for="reset-new-pw">New Password</label>
                <div class="auth-input-wrap">
                    <input id="reset-new-pw" name="password" class="auth-input" type="password" placeholder="Minimum 6 characters" required minlength="6" autocomplete="new-password">
                    <button type="button" class="auth-pw-btn" data-act="toggle-pw" data-target="reset-new-pw" tabindex="-1">Show</button>
                </div>
            </div>
            <div class="auth-field">
                <label for="reset-confirm-pw">Confirm New Password</label>
                <div class="auth-input-wrap">
                    <input id="reset-confirm-pw" name="confirm" class="auth-input" type="password" placeholder="Re-enter password" required minlength="6" autocomplete="new-password">
                    <button type="button" class="auth-pw-btn" data-act="toggle-pw" data-target="reset-confirm-pw" tabindex="-1">Show</button>
                </div>
            </div>
            <button type="submit" class="auth-submit-btn">Update Password &amp; Sign In</button>
            <button type="button" class="auth-sec-btn" data-act="go-login">Cancel and Return</button>
        </form>
        <div class="auth-footer">Need help? Contact system administrator at Vadodara HO.</div>
    </div>
</div>`;
}

function userPermissionsPage(id) {
    const u = (S.users || []).find(x => x.id === id);
    if (!u) return nf('users', 'User');
    const isSelf = currentUser && currentUser.id === u.id;
    const perms = u.permissions || {};
    const activeCount = MODULE_DEFS.filter(m => perms[m.id] && perms[m.id].enabled).length;

    const moduleCards = MODULE_DEFS.map(mod => {
        const p = perms[mod.id] || { enabled: false, view: false };
        return `<div class="panel pad perm-card" data-mod="${mod.id}">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid var(--bd)">
                <div style="display:flex;align-items:center;gap:10px">
                    <span class="nic ok" style="width:36px;height:36px;border-radius:10px;display:grid;place-items:center">${ic(mod.icon)}</span>
                    <div>
                        <b style="font-size:14.5px;display:block">${esc(mod.title)}</b>
                        <span class="mu" style="font-size:11.5px">${esc(mod.desc)}</span>
                    </div>
                </div>
                <label class="sw-wrap" title="Toggle module access">
                    <input type="checkbox" name="mod_${mod.id}_enabled" class="perm-mod-toggle" data-mod="${mod.id}" ${p.enabled ? 'checked' : ''}>
                    <span class="sw-slider"></span>
                </label>
            </div>
            <div class="perm-sub-list" id="perm-sub-${mod.id}" style="${p.enabled ? '' : 'opacity:.45;pointer-events:none'}">
                <label class="perm-row">
                    <input type="checkbox" name="mod_${mod.id}_view" class="perm-cb" ${p.view ? 'checked' : ''}>
                    <div>
                        <b>View & Browse Records</b>
                        <small class="mu">Access module dashboard, listings, and detail cards</small>
                    </div>
                </label>
                ${mod.hasEdit ? `<label class="perm-row">
                    <input type="checkbox" name="mod_${mod.id}_edit" class="perm-cb" ${p.edit ? 'checked' : ''}>
                    <div>
                        <b>Create & Edit Records</b>
                        <small class="mu">Add new entries, update statuses, and modify records</small>
                    </div>
                </label>` : ''}
                ${mod.hasDelete ? `<label class="perm-row">
                    <input type="checkbox" name="mod_${mod.id}_delete" class="perm-cb" ${p.delete ? 'checked' : ''}>
                    <div>
                        <b>Delete & Void Records</b>
                        <small class="mu">Remove records, void invoices, or cancel operational orders</small>
                    </div>
                </label>` : ''}
                ${mod.hasExport ? `<label class="perm-row">
                    <input type="checkbox" name="mod_${mod.id}_export" class="perm-cb" ${p.export ? 'checked' : ''}>
                    <div>
                        <b>Export Data & Financials</b>
                        <small class="mu">Download Excel/CSV reports and financial summaries</small>
                    </div>
                </label>` : ''}
                ${mod.hasManage ? `<label class="perm-row">
                    <input type="checkbox" name="mod_${mod.id}_manage" class="perm-cb" ${p.manage ? 'checked' : ''}>
                    <div>
                        <b>Manage Configuration</b>
                        <small class="mu">Configure global settings, backups, and security policies</small>
                    </div>
                </label>` : ''}
            </div>
        </div>`;
    }).join('');

    return `<div class="pg">
        <nav class="bc mu" style="margin-bottom:16px">
            <button class="lnk" data-act="nav" data-p="users">Users</button> / ${esc(u.name)} / Permissions
        </nav>
        <div class="ph" style="align-items:center;margin-bottom:24px">
            <div style="display:flex;gap:16px;align-items:center">
                <span class="av lg" style="width:52px;height:52px;font-size:18px">${esc(ini(u.name))}</span>
                <div>
                    <h1 style="display:flex;align-items:center;gap:10px;margin:0">
                        ${esc(u.name)}
                        ${B(u.status || 'Active')}
                    </h1>
                    <p class="mu" style="margin:2px 0 0">${esc(u.email)} · ${esc(u.phone || 'No phone')} · User ID: ${esc(u.id)}</p>
                </div>
            </div>
            <div style="display:flex;gap:8px">
                ${!isSelf ? `<button type="button" class="btn tr er" data-act="user-del" data-id="${esc(u.id)}">Delete User</button>` : ''}
                <button type="button" class="btn tr" data-act="nav" data-p="users">Back to Users</button>
                <button type="submit" form="user-perm-form" class="btn">Save Permissions</button>
            </div>
        </div>
        
        <form id="user-perm-form" data-form="user-permissions" data-id="${esc(u.id)}">
            <div class="panel pad" style="margin-bottom:20px">
                <h2 style="padding:0 0 12px;border-bottom:1px solid var(--bd);margin-bottom:16px;font-size:16px">User Profile</h2>
                <div class="fg" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px">
                    <div class="fld">
                        <label>Full Name</label>
                        <input name="name" value="${esc(u.name)}" required>
                    </div>
                    <div class="fld">
                        <label>Email Address</label>
                        <input name="email" type="email" value="${esc(u.email)}" required>
                    </div>
                    <div class="fld">
                        <label>Phone Number</label>
                        <input name="phone" value="${esc(u.phone || '')}" placeholder="+91 98250 12345">
                    </div>
                    <div class="fld">
                        <label>Account Status</label>
                        <select name="status">
                            <option value="Active"${u.status === 'Active' ? ' selected' : ''}>Active</option>
                            <option value="Inactive"${u.status === 'Inactive' ? ' selected' : ''}>Inactive</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="panel pad" style="margin-bottom:20px;background:color-mix(in srgb,var(--acs) 25%,var(--sf))">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
                    <div>
                        <b style="font-size:14.5px">Permission Presets</b>
                        <p class="mu" style="font-size:12.5px;margin:2px 0 0">Apply a recommended access profile across all modules in one click.</p>
                    </div>
                    <div class="seg" style="flex-wrap:wrap">
                        <button type="button" class="btn sm tr" data-act="apply-preset" data-preset="admin">Full Admin</button>
                        <button type="button" class="btn sm tr" data-act="apply-preset" data-preset="manager">Ops Manager</button>
                        <button type="button" class="btn sm tr" data-act="apply-preset" data-preset="tech">Service Tech</button>
                        <button type="button" class="btn sm tr" data-act="apply-preset" data-preset="cashier">Retail POS</button>
                        <button type="button" class="btn sm tr" data-act="apply-preset" data-preset="support">Support</button>
                    </div>
                </div>
            </div>

            <div style="display:flex;justify-content:space-between;align-items:center;margin:24px 0 12px">
                <div>
                    <h2 style="font-size:17px;margin:0">Module Access & Permissions</h2>
                    <span class="mu" style="font-size:13px">${activeCount} of 6 modules currently active</span>
                </div>
            </div>
            
            <div class="perm-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin-bottom:28px">
                ${moduleCards}
            </div>

            <div class="panel pad" style="display:flex;justify-content:space-between;align-items:center;position:sticky;bottom:16px;box-shadow:0 12px 32px rgba(0,0,0,.15);z-index:20">
                <div class="mu" style="font-size:13px">Changes will take effect immediately upon saving.</div>
                <div style="display:flex;gap:10px">
                    <button type="button" class="btn tr" data-act="nav" data-p="users">Cancel</button>
                    <button type="submit" class="btn">Save Permissions</button>
                </div>
            </div>
        </form>
    </div>`;
}

function userNewM() {
    modal(`<h1>Add New System User</h1>
    <p class="mu">Create staff credentials with customizable module permissions.</p>
    <form data-form="user-new">
        <div class="fg" style="margin-top:14px">
            <div class="fld">
                <label>Full Name *</label>
                <input name="name" placeholder="e.g. Ramesh Patel" required autofocus>
            </div>
            <div class="fld">
                <label>Email Address *</label>
                <input name="email" type="email" placeholder="ramesh@mobilepoint.in" required>
            </div>
            <div class="fld">
                <label>Phone Number</label>
                <input name="phone" placeholder="+91 98250 00000">
            </div>
            <div class="fld">
                <label>Initial Password</label>
                <input name="password" type="password" value="mobilepoint@123" required>
            </div>
            <div class="fld">
                <label>Permission Preset</label>
                <select name="preset">
                    <option value="tech">Service Technician (Field Ops & Jobs)</option>
                    <option value="cashier">Retail Cashier (POS & Billing)</option>
                    <option value="manager">Operations Manager (Service & Retail)</option>
                    <option value="support">Customer Support (CRM & Feedback)</option>
                    <option value="admin">Full Administrator (Unrestricted)</option>
                </select>
            </div>
            <div class="fld">
                <label>Status</label>
                <select name="status">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>
        </div>
        <div class="df" style="margin-top:16px;gap:8px;justify-content:flex-end">
            <button type="button" class="btn tr" data-act="close">Cancel</button>
            <button type="submit" class="btn">Create User</button>
        </div>
    </form>`);
}

function render(keep) {
    if (!currentUser) {
        const appEl = $('#app'); if (appEl) appEl.style.display = 'none';
        const bnEl = $('#bn'); if (bnEl) bnEl.style.display = 'none';
        let lv = $('#login-view');
        if (!lv) {
            lv = document.createElement('div');
            lv.id = 'login-view';
            document.body.prepend(lv);
        }
        lv.style.display = 'block';
        lv.innerHTML = V.authView == 'forgot' ? forgotPage() : V.authView == 'reset' ? resetPage() : loginPage();
        return;
    }
    const lv = $('#login-view'); if (lv) lv.style.display = 'none';
    const appEl = $('#app'); if (appEl) appEl.style.display = '';
    const bnEl = $('#bn'); if (bnEl) bnEl.style.display = '';
    const p0 = V.page || 'overview', p = p0.split('/')[0], sp = subPage(p0); const m = $('#main');
    m.innerHTML = sp != null ? sp : p == 'sales' ? salesPage() : p == 'overview' ? overview() : p == 'calendar' ? calendar() : p == 'reports' ? reports() : p == 'settings' ? settings() : listPage(p);
    if (keep) m.firstElementChild.style.animation = 'none';
    $('#nv').innerHTML = NAV.map((n, i) => (n[3] != (NAV[i - 1] || [])[3] ? '<div class="gh lb">' + n[3] + '</div>' : '') + `<button class="ni${n[0] == p ? ' on' : ''}" data-act="nav" data-p="${n[0]}" title="${n[1]}"${n[0] == p ? ' aria-current="page"' : ''}>${ic(n[2])}<span class="lb">${n[1]}</span></button>`).join('');
    $('#bn').innerHTML = [['overview', 'Home', 'home'], ['products', 'Products', 'box'], ['customers', 'Customers', 'users'], ['services', 'Services', 'wrench']].map(n => `<button class="${n[0] == p ? 'on' : ''}" data-act="nav" data-p="${n[0]}">${ic(n[2])}${n[1]}</button>`).join('') + `<button data-act="menu">${ic('more')}More</button>`;
    $('#mb').innerHTML = ic('menu'); $('#nb').innerHTML = ic('plus') + '<span class="cl">New</span>'; $('#bl').innerHTML = ic('bell') + bellBadge(); $('#th').innerHTML = ic('moon'); $('#ab').innerHTML = ic('pulse');
    const ub = $('#user-badge');
    if (ub && currentUser) {
        ub.innerHTML = `<span class="av" title="${esc(currentUser.name)}">${esc(ini(currentUser.name))}</span><div class="lb us-info"><b title="${esc(currentUser.name)}">${esc(currentUser.name)}</b><small title="${esc(currentUser.email)}">${esc(currentUser.email)}</small></div><button class="ib lb" data-act="logout" aria-label="Sign out" title="Sign out">${ic('logout')}</button>`;
    }
    if (!$('#gq')) $('#gsb').innerHTML = ic('search') + '<input id="gq" placeholder="Search products, customers, invoices…  (press /)" aria-label="Global search" autocomplete="off">';
    $$e(m, '[data-n]').forEach(el => { const n = +el.dataset.n, t0 = performance.now(), run = t => { const x = Math.min(1, (t - t0) / 600); el.textContent = Math.round(n * x); x < 1 && requestAnimationFrame(run) }; matchMedia('(prefers-reduced-motion:reduce)').matches || keep ? el.textContent = n : requestAnimationFrame(run) })
}

Object.assign(IC, { upl: 'M12 16V4M7 9l5-5 5 5M4 20h16' });
const PAL = ['#4F46E5', '#0E9F6E', '#F59E0B', '#E11D48', '#0891B2', '#9333EA', '#64748B', '#EA580C', '#84CC16', '#DB2777'];
const RP = { rg: '30d', from: '', to: '', cmp: true, tab: 'Overview', cat: '', sup: '', tech: '', st: '', grp: 'day', cm: 'rev', pm: 'cnt', tm: 'units', sort: {} };
const RTABS = ['Overview', 'Sales', 'Products', 'Inventory', 'Purchasing', 'Customers', 'AC Services', 'Messaging'], RRG = [['today', 'Today'], ['7d', 'Last 7 days'], ['30d', 'Last 30 days'], ['tm', 'This month'], ['pm', 'Previous month'], ['ty', 'This year'], ['cu', 'Custom range']];
const RTB = [], RTM = new Map, rn = n => Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 1 });
function rrange() {
    const t = D(0), y = +t.slice(0, 4), m = +t.slice(5, 7), p2 = n => String(n).padStart(2, '0'), dd = (a, n) => { const x = new Date(a + 'T00:00:00Z'); x.setUTCDate(x.getUTCDate() + n); return x.toISOString().slice(0, 10) }; let f, e = t;
    switch (RP.rg) { case 'today': f = t; break; case '7d': f = dd(t, -6); break; case '30d': f = dd(t, -29); break; case 'tm': f = `${y}-${p2(m)}-01`; break; case 'pm': f = `${m == 1 ? y - 1 : y}-${p2(m == 1 ? 12 : m - 1)}-01`; e = dd(`${y}-${p2(m)}-01`, -1); break; case 'ty': f = `${y}-01-01`; break; default: f = RP.from || dd(t, -29); e = RP.to || t }
    if (f > e) [f, e] = [e, f]; const n = Math.round((new Date(e) - new Date(f)) / 864e5) + 1; return { f, e, n, pf: dd(f, -n), pe: dd(f, -1), dd }
}

const emp = m => `<div class="empty">${ic('chart')}<b>No data</b><span>${m || 'Nothing recorded for this date range and filters.'}</span></div>`;
const rcol = i => PAL[i % PAL.length], lgd = s => `<div class="rl">${s.map((x, i) => `<span><i style="background:${x.c || rcol(i)}"></i>${esc(x.n)}</span>`).join('')}</div>`;
function rsvg(w, h, inner, lbl) { return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(lbl)}" style="width:100%;height:auto;display:block;font-size:11px;fill:currentColor;color:var(--mu)">${inner}</svg>` }
function rgrid(W, H, mx, fmt, L, T, B2) { const s = Math.pow(10, Math.floor(Math.log10(mx || 1))), st = [1, 2, 2.5, 5, 10].find(x => x * s * 4 >= mx) * s, top = st * 4; let o = ''; for (let i = 0; i <= 4; i++) { const y = T + (H - T - B2) * (1 - i / 4); o += `<line x1="${L}" x2="${W - 8}" y1="${y}" y2="${y}" stroke="var(--bd)" stroke-width="1"/><text x="${L - 6}" y="${y + 4}" text-anchor="end">${esc(fmt(st * i))}</text>` } return { o, top } }
function rxl(keys, lab, x, H, B2) { const n = keys.length, step = Math.max(1, Math.ceil(n / 7)); return keys.map((k, i) => i % step ? '' : `<text x="${x(i)}" y="${H - B2 + 16}" text-anchor="middle">${esc(lab(k))}</text>`).join('') }
function lineC(keys, lab, ser, o = {}) {
    const fmt = o.fmt || rn, W = 640, H = 250, L = 56, T = 10, B2 = 28, n = keys.length, all = ser.flatMap(s => s.v); if (!n || !all.some(v => v)) return emp(); const g = rgrid(W, H, Math.max(...all), fmt, L, T, B2), x = i => n > 1 ? L + i * (W - 8 - L) / (n - 1) : (L + W - 8) / 2, y = v => T + (H - T - B2) * (1 - v / g.top); let o2 = g.o + rxl(keys, lab, x, H, B2);
    ser.forEach((s, si) => { const c = s.c || rcol(si), pts = s.v.map((v, i) => `${x(i)},${y(v)}`); if (o.area && si == 0) o2 += `<path d="M${x(0)},${y(0)} L${pts.join(' L')} L${x(n - 1)},${y(0)}Z" fill="${c}" opacity=".12"/>`; o2 += `<polyline points="${pts.join(' ')}" fill="none" stroke="${c}" stroke-width="2" stroke-linejoin="round" ${s.dash ? 'stroke-dasharray="5 4"' : ''}/>`; if (n <= 45) o2 += s.v.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="4" fill="${c}" data-tip="${esc(lab(keys[i]) + '|' + s.n + ': ' + fmt(v))}"></circle>`).join('') });
    return `<div class="rc">${rsvg(W, H, o2, o.title || 'Line chart')}${lgd(ser)}</div>`
}
function barC(keys, lab, ser, o = {}) {
    const fmt = o.fmt || rn, W = 640, H = 250, L = 56, T = 10, B2 = 28, n = keys.length; if (!n) return emp(); const tot = keys.map((_, i) => o.stack ? ser.reduce((s, x) => s + x.v[i], 0) : Math.max(...ser.map(x => x.v[i]))); if (!tot.some(v => v)) return emp(); const g = rgrid(W, H, Math.max(...tot), fmt, L, T, B2), bw = (W - 8 - L) / n, x = i => L + bw * i + bw / 2, y = v => T + (H - T - B2) * (1 - v / g.top); let o2 = g.o + rxl(keys, lab, x, H, B2);
    keys.forEach((k, i) => { let acc = 0; ser.forEach((s, si) => { const v = s.v[i]; if (!v) return; const c = s.c || rcol(si), w = o.stack ? bw * .62 : bw * .7 / ser.length, x0 = o.stack ? x(i) - w / 2 : L + bw * i + bw * .15 + w * si, y0 = o.stack ? y(acc + v) : y(v), h = o.stack ? y(acc) - y(acc + v) : y(0) - y(v); o2 += `<rect x="${x0}" y="${y0}" width="${w}" height="${Math.max(1, h)}" rx="2" fill="${c}" data-tip="${esc(lab(k) + '|' + s.n + ': ' + fmt(v))}"></rect>`; acc += v }) });
    return `<div class="rc">${rsvg(W, H, o2, o.title || 'Bar chart')}${lgd(ser)}</div>`
}
function hbar(items, fmt) { items = items.filter(x => x.v > 0); if (!items.length) return emp(); const mx = Math.max(...items.map(x => x.v)); return `<div class="hb">${items.map((x, i) => { const a = x.go ? `data-rgo="${esc(x.go)}"` : x.rf ? `data-rf="${esc(x.rf[0])}|${esc(x.rf[1])}"` : '', inner = `<span class="hl" title="${esc(x.l)}">${esc(x.l)}</span><span class="ht"><i style="width:${Math.max(2, x.v / mx * 100)}%;background:${rcol(i)}"></i></span><b>${esc(fmt(x.v))}${x.t ? ' <span class="mu" style="font-weight:400">' + esc(x.t) + '</span>' : ''}</b>`; return a ? `<button class="hr" ${a} data-tip="${esc(x.l + '|' + fmt(x.v))}">${inner}</button>` : `<div class="hr">${inner}</div>` }).join('')}</div>` }
function donut(items, fmt, ctr) {
    items = items.filter(x => x.v > 0); const T = items.reduce((s, x) => s + x.v, 0); if (!T) return emp(); let off = 0; const r = 60, C = 2 * Math.PI * r, seg = items.map((x, i) => { const d = x.v / T * C, s = `<circle cx="80" cy="80" r="${r}" fill="none" stroke="${x.c || rcol(i)}" stroke-width="22" stroke-dasharray="${d} ${C - d}" stroke-dashoffset="${-off}" transform="rotate(-90 80 80)" data-tip="${esc(x.l + '|' + fmt(x.v) + ' (' + (x.v / T * 100).toFixed(1) + '%)')}"></circle>`; off += d; return s }).join('');
    return `<div class="dn2"><div style="width:160px;flex:none">${rsvg(160, 160, seg + `<text x="80" y="78" text-anchor="middle" style="font-size:15px;font-weight:700;fill:var(--tx)">${esc(fmt(T))}</text><text x="80" y="94" text-anchor="middle">${esc(ctr || 'Total')}</text>`, 'Donut chart')}</div><ul>${items.map((x, i) => { const a = x.go ? `data-rgo="${esc(x.go)}" style="cursor:pointer"` : ''; return `<li ${a}><i style="background:${x.c || rcol(i)}"></i><span>${esc(x.l)}</span><b style="margin-left:auto">${esc(fmt(x.v))}</b><span class="mu">${(x.v / T * 100).toFixed(1)}%</span></li>` }).join('')}</ul></div>`
}
function heat(byDate, R) {
    const days = []; for (let d = R.f; d <= R.e && days.length < 371; d = R.dd(d, 1))days.push(d); if (!days.some(d => byDate[d])) return emp('No sales in this range.'); const mx = Math.max(...days.map(d => byDate[d] || 0)), pad = (new Date(days[0] + 'T00:00:00Z').getUTCDay() + 6) % 7;
    return `<div class="ht2" role="img" aria-label="Sales by day">${'<span style="visibility:hidden"></span>'.repeat(pad)}${days.map(d => { const v = byDate[d] || 0; return `<span data-tip="${fd(d)}|${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(d + 'T00:00:00Z').getUTCDay()]}: ${v ? inr(Math.round(v)) : 'no sales'}" ${v ? `style="background:color-mix(in srgb,var(--ac) ${Math.round(18 + v / mx * 82)}%,var(--bg))"` : ''}></span>` }).join('')}</div><div class="rl" style="padding:0 14px 12px">Rows: Mon to Sun. Less <span>${[18, 40, 60, 80, 100].map(p => `<i style="background:color-mix(in srgb,var(--ac) ${p}%,var(--bg));margin-right:2px"></i>`).join('')}</span> More (relative to the busiest day, ${inr(Math.round(mx))})</div>`
}
function rtab(id, title, cols, rows, o = {}) {
    const s = RP.sort[id]; rows = [...rows]; if (s) rows.sort((a, b) => (typeof a[s.k] == 'number' ? a[s.k] - b[s.k] : String(a[s.k] ?? '').localeCompare(String(b[s.k] ?? ''))) * s.d); rows = rows.slice(0, 50); const tb = { title, head: cols.map(c => c[0]), rows: rows.map(r => cols.map(c => r[c[1]])) };
    const h = `<div class="panel ${o.full ? 'full' : ''}" style="overflow-x:auto"><div class="hd"><h2>${esc(title)}</h2><span class="mu">${rows.length} row${rows.length == 1 ? '' : 's'}${o.note ? ' · ' + o.note : ''}</span></div><div class="rt-sortbar"><span class="mu">Sort:</span>${cols.filter(c => c[0]).map(c => `<button class="chip sm${s && s.k == c[1] ? ' on' : ''}" data-rsort="${id}|${c[1]}">${esc(c[0])}${s && s.k == c[1] ? (s.d > 0 ? ' ↑' : ' ↓') : ''}</button>`).join('')}</div>${rows.length ? `<table class="tbl rt"><thead><tr>${cols.map(c => `<th ${s && s.k == c[1] ? `aria-sort="${s.d > 0 ? 'ascending' : 'descending'}"` : ''}><button data-rsort="${id}|${c[1]}">${esc(c[0])}</button></th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr ${r.go ? `data-rgo="${esc(r.go)}" tabindex="0"` : ''}>${cols.map(c => `<td data-label="${esc(c[0])}"${['Status', 'Complaint', 'Payment'].includes(c[0]) ? ' data-status="1"' : ''}>${c[2] ? c[2](r[c[1]], r) : esc(r[c[1]])}</td>`).join('')}</tr>`).join('')}</tbody></table>` : emp()}</div>`; RTM.set(h, tb); return h
}
const rsel = (k, opts, v) => `<select data-rsel="${k}" aria-label="${k}">${opts.map(([a, b]) => `<option value="${esc(a)}" ${a == v ? 'selected' : ''}>${esc(b)}</option>`).join('')}</select>`;
const rcp = (t, body, ctl, help) => `<div class="panel"><div class="hd"><h2>${t}${help ? ` <span class="mu" title="${esc(help)}" style="cursor:help">ⓘ</span>` : ''}</h2>${ctl || ''}</div>${body}</div>`;
function reports() {
    const R = rrange(), t = D(0), inR = (d, a, b) => d >= a && d <= b, sum = (a, k) => a.reduce((s, x) => s + x[k], 0), by = (a, f) => { const m = {}; a.forEach(x => (m[f(x)] = m[f(x)] || []).push(x)); return m }; RTB.length = 0;
    const mk = (a, b) => { const o = []; S.invoices.forEach(i => { if (i.status == 'Cancelled' || !inR(i.date, a, b)) return; i.lines.forEach(l => { const p = prod(l.p); if (RP.cat && p.cat != RP.cat || RP.sup && p.sup != RP.sup) return; const g = l.q * l.pr; o.push({ inv: i.id, cid: i.cid, date: i.date, pay: i.pay, p: l.p, pn: p.name, cat: p.cat, q: l.q, g, n: g * 100 / (100 + p.gst), c: l.q * (p.cost || 0) }) }) }); return o };
    const cur = mk(R.f, R.e), prv = mk(R.pf, R.pe), ag = x => { const g = sum(x, 'g'), n = sum(x, 'n'), c = sum(x, 'c'), iv = new Set(x.map(l => l.inv)).size; return { g, n, c, gp: n - c, mg: n ? (n - c) / n * 100 : 0, q: sum(x, 'q'), iv, aov: iv ? g / iv : 0 } }, A = ag(cur), Z = ag(prv), cmp = RP.cmp && prv.length > 0;
    const dl = (a, b) => cmp && b > 0 ? `<small>${a >= b ? '▲' : '▼'} ${Math.abs((a - b) / b * 100).toFixed(1)}% vs previous period</small>` : `<small>${RP.cmp ? 'No prior-period data' : '&nbsp;'}</small>`;
    const K = (l, v, s, go) => `<${go ? 'button data-rgo="' + go + '"' : 'div'} class="k"><span>${l}</span><b>${v}</b>${s || '<small>&nbsp;</small>'}</${go ? 'button' : 'div'}>`;

    const bk = d => RP.grp == 'month' ? d.slice(0, 7) : RP.grp == 'week' ? (() => { const x = new Date(d + 'T00:00:00Z'); x.setUTCDate(x.getUTCDate() - (x.getUTCDay() + 6) % 7); return x.toISOString().slice(0, 10) })() : d, keysOf = (a, b) => { const o = []; for (let d = a; d <= b; d = R.dd(d, 1)) { const k = bk(d); if (o[o.length - 1] !== k) o.push(k) } return o }, keys = keysOf(R.f, R.e), pk = keysOf(R.pf, R.pe), lab = k => k.length == 7 ? new Date(k + '-01T00:00').toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }) : fd(k),
        ser = (L, ks, f) => { const m = {}; L.forEach(l => { const k = bk(l.date); m[k] = (m[k] || 0) + f(l) }); return ks.map(k => m[k] || 0) };

    const PR = S.products.filter(p => (!RP.cat || p.cat == RP.cat) && (!RP.sup || p.sup == RP.sup)), val = sum(PR.map(p => ({ v: onh(p) * p.cost })), 'v'), low = PR.filter(p => stk(p) == 'Low stock'), oos = PR.filter(p => stk(p) == 'Out of stock'), OPN = ['Ordered', 'Partially received'];
    const PO = S.pos.filter(o => inR(o.date, R.f, R.e) && (!RP.sup || o.sup == RP.sup)).map(o => { const ls = o.lines.filter(l => !RP.cat || prod(l.p).cat == RP.cat); return { o, ls, qty: sum(ls, 'qty'), rec: sum(ls, 'rec'), val: ls.reduce((s, l) => s + l.qty * l.cost, 0), out: OPN.includes(o.status) ? ls.reduce((s, l) => s + (l.qty - l.rec), 0) : 0, outv: OPN.includes(o.status) ? ls.reduce((s, l) => s + (l.qty - l.rec) * l.cost, 0) : 0 } }).filter(x => x.ls.length), openPO = PO.filter(x => OPN.includes(x.o.status));
    const first = {};[...S.invoices].filter(i => i.cid && i.status != 'Cancelled').sort((a, b) => a.date > b.date ? 1 : -1).forEach(i => { if (!first[i.cid]) first[i.cid] = i.date }); const newC = Object.keys(first).filter(c => inR(first[c], R.f, R.e));
    const jd = j => j.appt || j.due, JB = S.jobs.filter(j => inR(jd(j), R.f, R.e) && (!RP.tech || j.tech == RP.tech) && (!RP.st || j.status == RP.st)), isOv = j => !['Completed', 'Cancelled'].includes(j.status) && jd(j) < t, FB = S.fb.filter(f => inR(f.time, R.f, R.e)), avg = FB.length ? FB.reduce((s, f) => s + f.rating, 0) / FB.length : 0, MS = S.msgs.filter(m => inR(m.time, R.f, R.e));
    const catR = Object.entries(by(cur, l => l.cat)).map(([c, a]) => { const x = ag(a); return { cat: c, rev: Math.round(x.g), units: x.q, gp: Math.round(x.gp), mg: +x.mg.toFixed(1), inv: x.iv, go: 'products|' + c } }).sort((a, b) => b.rev - a.rev);
    const prodR = Object.entries(by(cur, l => l.p)).map(([id, a]) => { const x = ag(a), p = prod(id); return { id, name: p.name, cat: p.cat, units: x.q, rev: Math.round(x.g), gp: Math.round(x.gp), go: 'products/' + id } });
    const pay = Object.entries(by(cur, l => l.pay)).map(([m, a]) => ({ l: m, v: Math.round(sum(a, 'g')) }));
    const custR = Object.entries(by(cur.filter(l => l.cid), l => l.cid)).map(([c, a]) => { const x = ag(a); return { name: cust(c).name, phone: cust(c).phone, inv: x.iv, rev: Math.round(x.g), aov: Math.round(x.aov) } }).sort((a, b) => b.rev - a.rev);
    const m1 = v => inr(Math.round(v)), supR = S.suppliers.filter(s => !RP.sup || s.id == RP.sup).map(s => { const a = PO.filter(x => x.o.sup == s.id && x.o.status != 'Cancelled'), o2 = a.filter(x => OPN.includes(x.o.status)); return { name: s.name, po: a.length, ordered: Math.round(sum(a, 'val')), received: Math.round(a.reduce((q, x) => q + x.ls.reduce((z, l) => z + l.rec * l.cost, 0), 0)), open: Math.round(sum(o2, 'outv')), oq: sum(o2, 'out') } });
    const tm = { units: ['Units sold', 'units', rn], rev: ['Revenue', 'rev', m1], gp: ['Gross profit', 'gp', m1] }[RP.tm], cmM = { rev: ['Revenue (gross)', 'g', m1], units: ['Units sold', 'q', rn], gp: ['Gross profit', 'gp', m1] }[RP.cm];
    const filt = `<div class="panel rb"><div class="row2">${rsel('rg', RRG, RP.rg)}${RP.rg == 'cu' ? `<input type="date" data-rsel="from" value="${R.f}" aria-label="From"><input type="date" data-rsel="to" value="${R.e}" aria-label="To">` : ''}<label class="row" style="display:flex;gap:6px;align-items:center"><input type="checkbox" data-rsel="cmp" ${RP.cmp ? 'checked' : ''}>Compare with previous period</label></div>
 <div class="row2">${rsel('cat', [['', 'All categories'], ...S.cats.map(c => [c, c])], RP.cat)}${rsel('sup', [['', 'All suppliers'], ...S.suppliers.map(s => [s.id, s.name])], RP.sup)}${rsel('tech', [['', 'All technicians'], ...S.team.filter(x => x.role == 'Technician').map(x => [x.name, x.name])], RP.tech)}${rsel('st', [['', 'All service statuses'], ...['Due', 'Booked', 'Assigned', 'In Progress', 'Completed', 'On Hold', 'Cancelled'].map(x => [x, x])], RP.st)}<span style="flex:1"></span><button class="btn sm" data-ract="reset">Reset filters</button><button class="btn sm" data-ract="refresh">Refresh</button><button class="btn sm" data-act="print">Print</button><button class="btn sm pri" data-ract="csv">Export CSV</button></div>
 <div class="mu" style="font-size:12px"><b>${fd(R.f)} to ${fd(R.e)}</b> (${R.n} day${R.n > 1 ? 's' : ''}) · ${cmp ? 'compared with ' + fd(R.pf) + ' to ' + fd(R.pe) : RP.cmp ? 'no data in the previous period, so no comparison is shown' : 'comparison off'} · <span class="b">Demo data</span> Seeded history is short, so most charts are sparse. Nothing is simulated to fill gaps. Sales use GST-inclusive invoice totals; net = ex-GST; COGS uses each product's current cost.</div></div>
 <div class="chips" role="tablist" style="margin-bottom:12px">${RTABS.map(x => `<button class="chip${RP.tab == x ? ' on' : ''}" role="tab" aria-selected="${RP.tab == x}" data-rtab="${x}">${x}</button>`).join('')}</div>`;
    const kpis = `<div class="rk">${K('Gross sales', m1(A.g), dl(A.g, Z.g))}${K('Net sales (ex GST)', m1(A.n), dl(A.n, Z.n))}${K('Gross profit', m1(A.gp), `<small>Margin ${A.mg.toFixed(1)}%</small>`)}${K('Invoices', A.iv, dl(A.iv, Z.iv), 'invoices')}${K('Avg invoice', m1(A.aov), dl(A.aov, Z.aov))}${K('Units sold', A.q, dl(A.q, Z.q))}${K('Stock at cost', m1(val), '<small>Current snapshot</small>', 'inventory')}${K('Low / out of stock', low.length + ' / ' + oos.length, '<small>Current snapshot</small>', 'inventory|Low stock')}${K('Open POs', openPO.length, `<small>Outstanding ${m1(sum(openPO, 'outv'))} ex GST</small>`, 'purchases')}${K('New customers', newC.length, '<small>By first invoice date</small>', 'customers')}${K('Services done / overdue', JB.filter(j => j.status == 'Completed').length + ' / ' + JB.filter(isOv).length, '', 'services')}${K('Avg rating', FB.length ? avg.toFixed(1) + ' / 5' : '—', `<small>${FB.length} review${FB.length == 1 ? '' : 's'}</small>`, 'feedback')}</div>`;
    const gsel = rsel('grp', [['day', 'Daily'], ['week', 'Weekly'], ['month', 'Monthly']], RP.grp);
    const trend = rcp('Sales and profit trend', lineC(keys, lab, [{ n: 'Gross sales', v: ser(cur, keys, l => l.g) }, { n: 'Net sales', v: ser(cur, keys, l => l.n) }, { n: 'Cost of goods', v: ser(cur, keys, l => l.c) }, { n: 'Gross profit', v: ser(cur, keys, l => l.n - l.c) }, ...(cmp ? [{ n: 'Gross sales, previous period', v: ser(prv, pk, l => l.g).slice(0, keys.length).concat(Array(Math.max(0, keys.length - pk.length)).fill(0)), c: '#94A3B8', dash: 1 }] : [])], { fmt: m1, title: 'Sales trend' }), gsel, 'Previous period is aligned bucket by bucket.');
    const cum = (() => { let a = 0; return ser(cur, keys, l => l.g).map(v => a += v) })(), area = rcp('Revenue trajectory (cumulative)', lineC(keys, lab, [{ n: 'Cumulative gross sales', v: cum }], { fmt: m1, area: 1, title: 'Cumulative revenue' }), '');
    const cats = [...new Set(cur.map(l => l.cat))], stackC = rcp('Category sales over time', barC(keys, lab, cats.map((c, i) => ({ n: c, v: ser(cur.filter(l => l.cat == c), keys, l => l[cmM[1]]), c: rcol(i) })), { stack: 1, fmt: cmM[2], title: 'Category sales' }), rsel('cm', [['rev', 'Revenue'], ['units', 'Units'], ['gp', 'Gross profit']], RP.cm));
    const payC = rcp('Payment method mix', donut(pay, m1, 'Gross sales'), '', 'Payment methods are recorded as simulated.'), top = rcp('Top 10 products', hbar([...prodR].sort((a, b) => b[tm[1]] - a[tm[1]]).slice(0, 10).map(p => ({ l: p.name, v: p[tm[1]], go: p.go })), tm[2]), rsel('tm', [['units', 'Units'], ['rev', 'Revenue'], ['gp', 'Gross profit']], RP.tm));
    const hl = donut([{ l: 'In stock', v: PR.length - low.length - oos.length, c: '#0E9F6E', go: 'inventory|In stock' }, { l: 'Low stock', v: low.length, c: '#F59E0B', go: 'inventory|Low stock' }, { l: 'Out of stock', v: oos.length, c: '#E11D48', go: 'inventory|Out of stock' }], rn, 'Products'), health = rcp('Inventory health', hl, '');
    const vc = Object.entries(by(PR, p => p.cat)).map(([c, a]) => ({ l: c, v: Math.round(a.reduce((s, p) => s + onh(p) * p.cost, 0)), rf: ['cat', c] })).sort((a, b) => b.v - a.v), valC = rcp('Stock value at cost by category', hbar(vc, m1), '', 'Click a bar to filter the table below to that category.');
    const stRows = ['Draft', 'Ordered', 'Partially received', 'Received', 'Cancelled'], pst = rcp('Purchase orders by supplier and status', (() => { const sk = S.suppliers.filter(s => PO.some(x => x.o.sup == s.id)); return barC(sk.map(s => s.id), id => sup(id).name.split(' ')[0], stRows.map((st, i) => ({ n: st, c: ['#94A3B8', '#4F46E5', '#F59E0B', '#0E9F6E', '#E11D48'][i], v: sk.map(s => PO.filter(x => x.o.sup == s.id && x.o.status == st).reduce((a, x) => a + (RP.pm == 'cnt' ? 1 : x.val), 0)) })), { stack: 1, fmt: RP.pm == 'cnt' ? rn : m1, title: 'Purchase orders' }) })(), rsel('pm', [['cnt', 'Order count'], ['val', 'Order value']], RP.pm));
    const sup2 = rcp('Purchases by supplier (ordered value)', hbar(supR.map(s => ({ l: s.name, v: s.ordered })), m1), '', 'Lead time and on-time delivery are not shown: receipts store no dates.');
    const newS = ser(cur.filter(l => l.cid && first[l.cid] == l.date).map(l => ({ date: l.date, c: l.cid })).filter((x, i, a) => a.findIndex(y => y.c == x.c) == i), keys, () => 1), acq = rcp('New customers over time', lineC(keys, lab, [{ n: 'New customers (first invoice)', v: newS }], { title: 'New customers' }), '', 'Customer records have no created date, so “new” means first invoice. Repeat-vs-first needs more invoice history than the demo has.');
    const conc = rcp('Top customers by revenue', hbar(custR.slice(0, 10).map(c => ({ l: c.name, v: c.rev, t: c.inv + ' inv' })), m1), '');
    const techs = [...new Set(JB.map(j => j.tech || 'Unassigned'))], wl = rcp('Service workload by technician', barC(techs, x => x.split(' ')[0], [['Completed', j => j.status == 'Completed', '#0E9F6E'], ['Pending', j => !['Completed', 'Cancelled'].includes(j.status) && !isOv(j), '#4F46E5'], ['Overdue', isOv, '#E11D48'], ['Cancelled', j => j.status == 'Cancelled', '#94A3B8']].map(([n, f, c]) => ({ n, c, v: techs.map(x => JB.filter(j => (j.tech || 'Unassigned') == x && f(j)).length) })), { title: 'Service workload' }), '');
    const pl = S.plans.map(p => { const as = S.assets.filter(a => a.plan == p.id), used = as.reduce((s, a) => s + (entl(a).left != null ? p.visits - entl(a).left : 0), 0), rem = as.reduce((s, a) => s + (entl(a).left || 0), 0); return { name: p.name, assets: as.length, used, rem, up: as.filter(a => ['Due soon', 'Overdue'].includes(entl(a).s)).length } }), plc = rcp('Service plan usage', barC(pl.map(p => p.name), x => x.split(' ')[0], [{ n: 'Used visits', v: pl.map(p => p.used) }, { n: 'Remaining visits', v: pl.map(p => p.rem) }], { stack: 1, title: 'Plan usage' }), '', 'Used = plan visits minus free visits left, per registered AC.');
    const fbc = rcp('Ratings (1 to 5 stars)', barC([1, 2, 3, 4, 5], x => x + '★', [{ n: 'Reviews', v: [1, 2, 3, 4, 5].map(n => FB.filter(f => f.rating == n).length) }], { title: 'Ratings' }), '');
    const byD = {}; cur.forEach(l => byD[l.date] = (byD[l.date] || 0) + l.g); const hm = rcp('Sales activity by day', heat(byD, R), '');

    const tInv = rtab('inv', 'Sales invoices', [['Invoice', 'id'], ['Date', 'date', fd], ['Customer', 'cn'], ['Payment', 'pay', x => `<span class="b ok">${esc(x)}</span>`], ['Units', 'q'], ['Gross', 'g', m1], ['Net', 'n', m1], ['Gross profit', 'gp', m1]], Object.entries(by(cur, l => l.inv)).map(([id, a]) => { const x = ag(a); return { id, date: a[0].date, cn: a[0].cid ? cust(a[0].cid).name : 'Walk-in', pay: a[0].pay, q: x.q, g: Math.round(x.g), n: Math.round(x.n), gp: Math.round(x.gp), go: 'invoices/' + id } }), { full: 1 }),
        tCat = rtab('cat', 'Category performance', [['Category', 'cat'], ['Revenue', 'rev', m1], ['Units', 'units'], ['Gross profit', 'gp', m1], ['Margin %', 'mg'], ['Invoices', 'inv']], catR),
        tTop = rtab('top', 'Top products', [['Product', 'name'], ['Category', 'cat'], ['Units', 'units'], ['Revenue', 'rev', m1], ['Gross profit', 'gp', m1]], prodR.sort((a, b) => b.units - a.units)),
        tLow = rtab('low', 'Low-stock products', [['Product', 'name'], ['On hand', 'n'], ['Reorder at', 're'], ['Incoming', 'inc'], ['Status', 'st', x => B(x)], ['', 'id', (x) => `<button class="btn sm" data-act="po-new" data-id="${x}">Reorder</button>`]], [...low, ...oos].map(p => ({ id: p.id, name: p.name, n: onh(p), re: p.re, inc: incoming(p), st: stk(p), go: 'products/' + p.id })), { full: 1 }),
        tVal = rtab('val', 'Stock valuation (at cost)', [['Product', 'name'], ['Category', 'cat'], ['On hand', 'n'], ['Unit cost', 'cost', m1], ['Value', 'v', m1]], PR.map(p => ({ name: p.name, cat: p.cat, n: onh(p), cost: p.cost, v: onh(p) * p.cost, go: 'products/' + p.id })), { full: 1, note: RP.cat ? 'filtered to ' + RP.cat : '' }),
        tSup = rtab('sup', 'Supplier purchases', [['Supplier', 'name'], ['POs', 'po'], ['Ordered (ex GST)', 'ordered', m1], ['Received value', 'received', m1], ['Open value', 'open', m1], ['Outstanding qty', 'oq']], supR, { full: 1 }),
        tPO = rtab('po', 'Purchase orders', [['PO', 'id'], ['Supplier', 'sn'], ['Date', 'date', fd], ['Status', 'status', x => B(x)], ['Ordered qty', 'qty'], ['Received qty', 'rec'], ['Outstanding qty', 'out'], ['Value (ex GST)', 'val', m1]], PO.map(x => ({ id: x.o.id, sn: sup(x.o.sup).name, date: x.o.date, status: x.o.status, qty: x.qty, rec: x.rec, out: x.out, val: Math.round(x.val), go: 'purchases' })), { full: 1 }),
        tCus = rtab('cus', 'Customer rankings', [['Customer', 'name'], ['Mobile', 'phone'], ['Invoices', 'inv'], ['Revenue', 'rev', m1], ['Avg order', 'aov', m1]], custR, { full: 1 }),
        tTech = rtab('tech', 'Technician performance', [['Technician', 'n'], ['Completed', 'c'], ['Pending', 'p'], ['Overdue', 'o'], ['Cancelled', 'x']], techs.map(n => { const a = JB.filter(j => (j.tech || 'Unassigned') == n); return { n, c: a.filter(j => j.status == 'Completed').length, p: a.filter(j => !['Completed', 'Cancelled'].includes(j.status) && !isOv(j)).length, o: a.filter(isOv).length, x: a.filter(j => j.status == 'Cancelled').length } })),
        tSvc = rtab('svc', 'Service status', [['Job', 'id'], ['Customer', 'cn'], ['Type', 'type'], ['Date', 'd', fd], ['Technician', 'tech'], ['Status', 'status', x => B(x)]], JB.map(j => ({ id: j.id, cn: cust(j.cid).name, type: j.type, d: jd(j), tech: j.tech || 'Unassigned', status: isOv(j) ? 'Overdue' : j.status, go: 'services' })), { full: 1 }),
        tPl = rtab('pl', 'Service plans', [['Plan', 'name'], ['ACs', 'assets'], ['Used visits', 'used'], ['Remaining', 'rem'], ['Due soon or overdue', 'up']], pl),
        tFb = rtab('fb', 'Feedback and complaints', [['Customer', 'cn'], ['Rating', 'rating'], ['Comment', 'comment'], ['Complaint', 'status', x => x == 'None' ? '—' : B(x)], ['Date', 'time', fd]], FB.map(f => ({ ...f, cn: cust(f.cid).name, go: 'feedback' })), { full: 1 }),
        tMs = rtab('ms', 'Messages (delivery is simulated)', [['Customer', 'cn'], ['Channel', 'ch'], ['Template', 'tpl'], ['Date', 'time', fd], ['Status', 'status', x => B(x)]], MS.map(m => ({ ...m, cn: cust(m.cid).name, go: 'messages' })), { full: 1 }),
        mst = ['Delivered', 'Sent', 'Pending', 'Failed'], chs = ['WhatsApp', 'SMS', 'Email'], msg = rcp('Messages by channel and status (simulated)', barC(chs, x => x, mst.map((s, i) => ({ n: s, c: ['#0E9F6E', '#4F46E5', '#F59E0B', '#E11D48'][i], v: chs.map(c => MS.filter(m => m.ch == c && m.status == s).length) })), { stack: 1, title: 'Messages' }), '');
    const T = { Overview: [trend, payC, top, health, tInv], Sales: [area, stackC, hm, payC, tCat, tInv], Products: [top, tTop, tCat], Inventory: [health, valC, tLow, tVal], Purchasing: [pst, sup2, tSup, tPO], Customers: [acq, conc, tCus], 'AC Services': [wl, plc, fbc, tTech, tSvc, tPl, tFb], Messaging: [msg, tMs] }[RP.tab];
    RTB.length = 0; T.forEach(h => RTM.has(h) && RTB.push(RTM.get(h))); RTM.clear();
    return `<div class="pg" id="rp"><div class="ph"><div><h1>Reports</h1><p>Calculated from this browser's records. Filters apply to every chart, KPI and table.</p></div></div>${filt}${RP.tab == 'Overview' ? kpis : ''}<div class="rg">${T.join('')}</div></div>`
}
function rcsv() {
    const R = rrange(), q = v => { let s = v == null ? '' : String(v); if (/^[=+@]/.test(s) || /^-[^0-9.]/.test(s)) s = "'" + s; return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s }; if (!RTB.length) return toast('Nothing to export for this report', 'er');
    const out = [['Report', RP.tab], ['Date range', R.f + ' to ' + R.e], ['Filters', ['cat', 'sup', 'tech', 'st'].filter(k => RP[k]).map(k => k + '=' + RP[k]).join('; ') || 'none'], ['Note', 'Demo data; GST-inclusive invoice totals; at most 50 rows per table']].map(r => r.map(q).join(',')); RTB.forEach(t => { out.push('', '# ' + t.title, t.head.map(q).join(','), ...t.rows.map(r => r.map(q).join(','))) });
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['\uFEFF' + out.join('\r\n')], { type: 'text/csv;charset=utf-8' })); a.download = `mobile-point-${RP.tab.toLowerCase().replace(/\W+/g, '-')}-${R.f}-to-${R.e}.csv`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1e3); toast('CSV exported: ' + RTB.length + ' table(s)')
}
document.addEventListener('click', e => {
    const t = e.target, c = id => t.closest('[' + id + ']'); let x;
    if (x = c('data-rtab')) { RP.tab = x.dataset.rtab; return render(true) } if (x = c('data-rsort')) { const [i, k] = x.dataset.rsort.split('|'), s = RP.sort[i]; RP.sort[i] = { k, d: s && s.k == k ? -s.d : 1 }; return render(true) }
    if (x = c('data-rf')) { const [k, v] = x.dataset.rf.split('|'); RP[k] = RP[k] == v ? '' : v; return render(true) }
    if (x = c('data-ract')) { const a = x.dataset.ract; if (a == 'csv') rcsv(); else if (a == 'refresh') { render(true); toast('Report refreshed') } else { Object.assign(RP, { rg: '30d', from: '', to: '', cmp: true, cat: '', sup: '', tech: '', st: '', grp: 'day', cm: 'rev', pm: 'cnt', tm: 'units', sort: {} }); render(true) } return }
    if ((x = c('data-rgo')) && !t.closest('button:not([data-rgo])')) { const [p, f] = x.dataset.rgo.split('|'); go(p, f) }
});
document.addEventListener('keydown', e => { if (e.key == 'Enter' && e.target.matches && e.target.matches('tr[data-rgo]')) e.target.click() });
document.addEventListener('change', e => { const t = e.target; if (!t.dataset || t.dataset.rsel == null) return; RP[t.dataset.rsel] = t.type == 'checkbox' ? t.checked : t.value; if (t.dataset.rsel == 'from' || t.dataset.rsel == 'to') RP.rg = 'cu'; render(true) });

const UPL = { max: 5 * 1048576, types: ['image/jpeg', 'image/png', 'image/webp'], dim: 800, out: 350000 };
function upH(err, key) { const PIMG = UPK[key || 'prod'].get(); return `<input type="file" class="upf" accept="${UPL.types.join(',')}" hidden aria-label="Choose image file">${PIMG ? `<div class="upv"><img src="${esc(PIMG)}" alt="Image preview"></div><div class="upa"><button type="button" class="btn sm" data-upb>Replace image</button><button type="button" class="btn sm dg" data-upr>Remove image</button></div>` : `<div class="upz" tabindex="0" role="button" data-upb aria-label="Drag and drop an image here, or press Enter to browse files"><span class="uic">${ic('upl')}</span><b>Drag and drop an image here</b><span>or <u>Browse files</u></span><small>JPG, PNG or WebP · max ${UPL.max / 1048576} MB · resized to ${UPL.dim}px</small></div>`}<p class="er" role="alert" ${err ? '' : 'hidden'}>${esc(err || '')}</p><small class="mu">Saved in this browser (localStorage) only. Nothing is uploaded to a server.</small>` }
const uploader = (k = 'prod') => `<div class="up" data-up="${k}">${upH('', k)}</div>`;
function upProc(f, box) {
    const key = box.dataset.up || 'prod', set = m => box.innerHTML = upH(m, key); if (!f) return; if (!UPL.types.includes(f.type)) return set('Unsupported format. Use JPG, PNG or WebP.'); if (f.size > UPL.max) return set('File is too large. Maximum is ' + UPL.max / 1048576 + ' MB.');
    const u = URL.createObjectURL(f), im = new Image(); im.onload = () => { URL.revokeObjectURL(u); try { const k = Math.min(1, UPL.dim / Math.max(im.width, im.height)), c = document.createElement('canvas'); c.width = Math.max(1, Math.round(im.width * k)); c.height = Math.max(1, Math.round(im.height * k)); const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(im, 0, 0, c.width, c.height); let q = .82, d = c.toDataURL('image/jpeg', q); while (d.length > UPL.out && q > .4) { q -= .1; d = c.toDataURL('image/jpeg', q) } if (d.length > UPL.out) throw 0; UPK[key].set(d); set('') } catch (x) { set('Could not process this image. Your previous image was kept.') } }; im.onerror = () => { URL.revokeObjectURL(u); set('This file could not be read as an image. It may be corrupt.') }; im.src = u
}
document.addEventListener('click', e => { const b = e.target.closest('[data-upb]'), r = e.target.closest('[data-upr]'); if (b) b.closest('.up').querySelector('.upf').click(); if (r) { const u = r.closest('.up'), k = u.dataset.up || 'prod'; UPK[k].set(''); u.innerHTML = upH('', k) } });
document.addEventListener('keydown', e => { if ((e.key == 'Enter' || e.key == ' ') && e.target.matches && e.target.matches('.upz')) { e.preventDefault(); e.target.click() } });
document.addEventListener('change', e => { if (e.target.classList && e.target.classList.contains('upf')) upProc(e.target.files[0], e.target.closest('.up')) });
['dragenter', 'dragover'].forEach(v => document.addEventListener(v, e => { const z = e.target.closest && e.target.closest('.upz'); if (z) { e.preventDefault(); z.classList.add('over') } }));
document.addEventListener('dragleave', e => { const z = e.target.closest && e.target.closest('.upz'); z && z.classList.remove('over') });
document.addEventListener('drop', e => { const z = e.target.closest && e.target.closest('.upz'); if (z) { e.preventDefault(); upProc(e.dataTransfer.files[0], z.closest('.up')) } });

function cb(name, items, o = {}) { const cur = items.find(i => String(i[0]) == String(o.val ?? '')); return `<div class="cb" data-cb><input type="hidden" name="${name}" ${o.id ? `id="${o.id}"` : ''} value="${esc(o.val ?? '')}"><input class="cbi" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-haspopup="listbox" autocomplete="off" placeholder="${esc(o.ph || 'Search…')}" value="${esc(cur ? cur[1] : '')}" data-items='${esc(JSON.stringify(items))}'>${o.clear ? '<button type="button" class="cbx" data-cbx aria-label="Clear selection">×</button>' : ''}</div>` }
function cbSync() { document.querySelectorAll('[data-cb]').forEach(b => { const h = b.children[0], i = b.querySelector('.cbi'), it = JSON.parse(i.dataset.items), c = it.find(x => String(x[0]) == h.value); i.value = c ? c[1] : '' }) }
let CBL = null, CBI = -1; function cbClose() { if (CBL) { CBL.remove(); CBL = null } document.querySelectorAll('.cbi[aria-expanded=true]').forEach(i => { i.setAttribute('aria-expanded', 'false'); i.removeAttribute('aria-activedescendant') }); CBI = -1 }
function cbOpen(inp, all) {
    cbClose(); const it = JSON.parse(inp.dataset.items), q = all ? '' : inp.value.toLowerCase().trim(), m = it.filter(x => !q || (x[1] + ' ' + (x[2] || '')).toLowerCase().includes(q)).slice(0, 50), r = inp.getBoundingClientRect(), u = document.createElement('ul'); u.className = 'cbl'; u.id = 'cbl'; u.setAttribute('role', 'listbox');
    const spaceBelow = innerHeight - r.bottom - 12, spaceAbove = r.top - 12, flip = spaceBelow < 180 && spaceAbove > spaceBelow;
    const maxH = Math.max(100, Math.min(260, flip ? spaceAbove : spaceBelow));
    u.style.maxHeight = maxH + 'px';
    u.style.minWidth = Math.min(r.width, innerWidth - 16) + 'px';
    u.style.left = Math.max(8, Math.min(r.left, innerWidth - r.width - 8)) + 'px';
    u.style.top = (flip ? r.top - Math.min(260, (m.length || 1) * 44) - 4 : r.bottom + 4) + 'px';
    u.innerHTML = m.map((x, i) => `<li role="option" id="cbo${i}" data-v="${esc(x[0])}" aria-selected="false"><span>${esc(x[1])}</span>${x[2] ? `<small>${esc(x[2])}</small>` : ''}</li>`).join('') || '<li class="none" role="option" aria-disabled="true">No matches</li>'; document.body.append(u); CBL = u; window.CBT = Date.now(); inp.setAttribute('aria-expanded', 'true'); inp.setAttribute('aria-controls', 'cbl'); CBI = -1
}
function cbPick(inp, v) { const h = inp.parentNode.children[0]; h.value = v; cbSync(); cbClose(); h.dispatchEvent(new Event('change', { bubbles: true })); DIRTY = DIRTY || !!inp.closest('#pf') }
document.addEventListener('focusin', e => { if (e.target.classList.contains('cbi')) cbOpen(e.target, true) });
document.addEventListener('input', e => { if (e.target.classList.contains('cbi')) cbOpen(e.target, false) });
document.addEventListener('keydown', e => {
    const i = e.target; if (!i.classList || !i.classList.contains('cbi')) return; const L = CBL ? [...CBL.querySelectorAll('li[data-v]')] : [];
    if (e.key == 'ArrowDown' || e.key == 'ArrowUp') { e.preventDefault(); if (!CBL) cbOpen(i, true); const l2 = [...CBL.querySelectorAll('li[data-v]')]; if (!l2.length) return; CBI = (CBI + (e.key == 'ArrowDown' ? 1 : -1) + l2.length) % l2.length; l2.forEach((x, k) => x.setAttribute('aria-selected', k == CBI)); i.setAttribute('aria-activedescendant', l2[CBI].id); l2[CBI].scrollIntoView({ block: 'nearest' }) }
    else if (e.key == 'Enter' && CBL) { e.preventDefault(); const x = L[CBI >= 0 ? CBI : 0]; if (x) cbPick(i, x.dataset.v) } else if (e.key == 'Escape' && CBL) { e.stopPropagation(); cbClose(); cbSync() }
});
document.addEventListener('mousedown', e => { const li = e.target.closest && e.target.closest('.cbl li[data-v]'); if (li) { e.preventDefault(); cbPick(document.querySelector('.cbi[aria-expanded=true]'), li.dataset.v) } else if (!e.target.closest('.cb,.cbl')) { cbClose(); cbSync() } });
document.addEventListener('click', e => { const x = e.target.closest('[data-cbx]'); if (x) { const b = x.parentNode, h = b.children[0]; h.value = ''; cbSync(); h.dispatchEvent(new Event('change', { bubbles: true })) } });
window.addEventListener('resize', cbClose); document.addEventListener('scroll', e => { if (CBL && Date.now() - (window.CBT || 0) > 300 && !(e.target.closest && e.target.closest('.cbl'))) cbClose() }, true);

function pfx() { const f = $('#pf'); if (!f) return; const g = n => f.elements[n], ty = g('type'), ser = ty && ty.value == 'S', q = g('qty'), s = g('sn'); if (q && s) { q.closest('label').hidden = ser; s.closest('label').hidden = !ser } const c = +(g('cost') || {}).value, p = +(g('price') || {}).value, gs = +(g('gst') || {}).value, m = $('#mgn'); if (m) m.textContent = p > 0 && c >= 0 ? (() => { const n = p * 100 / (100 + gs); return 'Margin preview (ex GST): ' + inr(Math.round(n - c)) + ' · ' + ((n - c) / n * 100).toFixed(1) + '%. Preview only; prices are not changed.' })() : 'Enter cost and selling price to preview margin.' }
document.addEventListener('input', e => { if (e.target.closest && e.target.closest('#pf')) pfx() }); document.addEventListener('change', e => { if (e.target.closest && e.target.closest('#pf')) pfx() });
const _rn = render; render = function (k) { _rn(k); pfx(); cbSync() };

const UPK = { prod: { get: () => PIMG, set: v => { PIMG = v; DIRTY = true } }, logo: { get: () => SS().logo || '', set: v => { SS().logo = v; save(); toast(v ? 'Logo updated' : 'Logo removed') } } };

const TIP = document.createElement('div'); TIP.className = 'tip'; TIP.setAttribute('role', 'tooltip'); document.body.append(TIP);
function tipShow(el, x, y) { const [h, ...r] = el.dataset.tip.split('|'); TIP.innerHTML = `<b>${esc(h)}</b>${esc(r.join('|'))}`; TIP.classList.add('on'); const w = TIP.offsetWidth, hh = TIP.offsetHeight; TIP.style.left = Math.min(innerWidth - w - 8, Math.max(8, x - w / 2)) + 'px'; TIP.style.top = (y - hh - 14 < 8 ? y + 18 : y - hh - 14) + 'px' }
document.addEventListener('mousemove', e => { const t = e.target.closest && e.target.closest('[data-tip]'); t ? tipShow(t, e.clientX, e.clientY) : TIP.classList.remove('on') });
document.addEventListener('click', e => { const t = e.target.closest && e.target.closest('[data-tip]'); if (t && matchMedia('(hover:none)').matches) tipShow(t, e.clientX, e.clientY) });
document.addEventListener('scroll', () => TIP.classList.remove('on'), true);

let GR = null, GI = -1; const gn = s => String(s).toLowerCase().replace(/\s/g, '');
function gsearch(q) {
    q = gn(q); if (!q) return []; const m = (...a) => gn(a.join(' ')).includes(q), T = (l, a) => [l, a.slice(0, 5)];
    return [T('Products', S.products.filter(p => m(p.name, p.sku, p.bar, p.units.map(u => u.sn).join(' '))).map(p => ({ t: p.name, s: p.sku + ' · ' + onh(p) + ' in stock', k: 'p', id: p.id }))), T('Customers', S.customers.filter(c => m(c.name, c.phone)).map(c => ({ t: c.name, s: c.phone, k: 'c', id: c.id }))), T('Invoices', S.invoices.filter(i => m(i.id)).map(i => ({ t: i.id, s: fd(i.date) + ' · ' + inr(i.total), k: 'i', id: i.id }))), T('Purchase orders', S.pos.filter(o => m(o.id)).map(o => ({ t: o.id, s: sup(o.sup).name + ' · ' + o.status, k: 'o', id: o.id }))), T('Suppliers', S.suppliers.filter(s => m(s.name)).map(s => ({ t: s.name, s: s.contact, k: 's', id: s.id }))), T('Service jobs', S.jobs.filter(j => m(j.id, cust(j.cid).name)).map(j => ({ t: j.id + ' · ' + cust(j.cid).name, s: j.type + ' · ' + j.status, k: 'j', id: j.id })))].filter(g => g[1].length)
}
function gClose() { GR && GR.remove(); GR = null; GI = -1 }
function gOpen(k, id) { gClose(); const i = $('#gq'); i && (i.value = ''); ({ p: () => go('products/' + id), c: () => profile(id), i: () => go('invoices/' + id), o: () => poM(id), s: () => supM(id), j: () => jobM(id) })[k]() }
document.addEventListener('input', e => { if (e.target.id != 'gq') return; gClose(); const g = gsearch(e.target.value), r = e.target.getBoundingClientRect(), u = document.createElement('div'); u.className = 'gsr'; u.setAttribute('role', 'listbox'); u.style.cssText = `left:${r.left}px;top:${r.bottom + 6}px;width:${Math.max(r.width, 320)}px`; u.innerHTML = e.target.value.trim() ? g.map(([l, a]) => `<h3>${l}</h3>` + a.map(x => `<div role="option" aria-selected="false" data-gk="${x.k}" data-gid="${esc(x.id)}"><span>${esc(x.t)}</span><small>${esc(x.s)}</small></div>`).join('')).join('') || '<div class="mu" style="padding:12px">No results</div>' : ''; if (u.innerHTML) { document.body.append(u); GR = u } });
document.addEventListener('keydown', e => { if (e.target.id != 'gq') return; const o = GR ? [...GR.querySelectorAll('[data-gk]')] : []; if (e.key == 'ArrowDown' || e.key == 'ArrowUp') { e.preventDefault(); if (!o.length) return; GI = (GI + (e.key == 'ArrowDown' ? 1 : -1) + o.length) % o.length; o.forEach((x, i) => x.setAttribute('aria-selected', i == GI)); o[GI].scrollIntoView({ block: 'nearest' }) } else if (e.key == 'Enter' && o.length) { e.preventDefault(); const x = o[GI >= 0 ? GI : 0]; gOpen(x.dataset.gk, x.dataset.gid) } else if (e.key == 'Escape') gClose() });
document.addEventListener('mousedown', e => { const x = e.target.closest && e.target.closest('[data-gk]'); if (x) { e.preventDefault(); gOpen(x.dataset.gk, x.dataset.gid) } else if (e.target.id != 'gq') gClose() });

const FMK = { suppliers: 'supplier', team: 'team', customers: 'customer' };
const FM = {
    supplier: { nm: 'Suppliers', back: 'suppliers', L: () => S.suppliers, pre: 'SP', def: { terms: '30 days', active: true }, sec: [['Business', [['Supplier name *', 'name'], ['GSTIN', 'gstin'], ['Payment terms', 'terms', 'sel', ['Advance', '7 days', '15 days', '30 days', '45 days']]]], ['Contact', [['Contact person *', 'contact'], ['Mobile *', 'phone', 'tel'], ['Email', 'email', 'email'], ['Address', 'addr', 'area']]], ['Status', [['Active', 'active', 'chk']]]] },
    team: { nm: 'Team', back: 'team', L: () => S.team, pre: 'T', def: { role: 'Technician', active: true }, sec: [['Profile', [['Full name *', 'name'], ['Role', 'role', 'sel', ['Technician', 'Manager', 'Owner', 'Front desk']], ['Service area', 'area']]], ['Contact', [['Mobile', 'phone', 'tel'], ['Email', 'email', 'email']]], ['Status', [['Active', 'active', 'chk']]]] },
    customer: { nm: 'Customers', back: 'customers', L: () => S.customers, pre: 'C', def: { ch: 'WhatsApp', service: true, promo: false, active: true }, sec: [['Customer', [['Full name *', 'name'], ['Mobile *', 'phone', 'tel'], ['Email', 'email', 'email'], ['City', 'city']]], ['Messaging', [['Preferred channel', 'ch', 'sel', ['WhatsApp', 'SMS', 'Email']], ['Allow service messages', 'service', 'chk'], ['Allow promotional messages (separate consent)', 'promo', 'chk'], ['Active', 'active', 'chk']]]] }
};
function fpage(k, id) {
    const M = FM[k], e = id ? M.L().find(x => x.id == id) : null; if (id && !e) return nf(M.back, 'Record'); DIRTY = false; const v = n => e ? e[n] : M.def[n], val = n => { let x = v(n); return esc(x == null ? '' : String(x).replace(/^\+91 /, '')) }, fld = ([l, n, t, o]) => t == 'sel' ? `<label>${l}<select name="${n}">${o.map(x => `<option ${v(n) == x ? 'selected' : ''}>${x}</option>`).join('')}</select></label>` : t == 'chk' ? `<label class="row"><input type="checkbox" name="${n}" ${v(n) ? 'checked' : ''}>${l}</label>` : t == 'area' ? `<label>${l}<textarea name="${n}" rows="2">${val(n)}</textarea></label>` : `<label>${l}<input name="${n}" type="${t || 'text'}" value="${val(n)}"></label>`;
    return `<div class="pg"><nav class="bc mu"><button class="lnk" data-act="nav" data-p="${M.back}">${M.nm}</button> / ${e ? 'Edit ' + esc(e.name) : 'New'}</nav><div class="ph"><div><h1>${e ? 'Edit' : 'Add'} ${k == 'team' ? 'team member' : k}</h1><p>${e ? 'Changes apply across the app.' : 'Required fields are marked *. Data stays in this browser.'}</p></div></div><form id="fpf" novalidate onsubmit="return false"><div class="fgrid">${M.sec.map(([h, fs]) => `<div class="panel pad"><h2>${h}</h2><div class="fg">${fs.map(fld).join('')}</div></div>`).join('')}</div></form><div class="sticky"><button class="btn" data-act="fcancel" data-k="${k}">Cancel</button><button class="btn pri" data-act="fsave" data-k="${k}" data-id="${id || ''}">Save</button></div></div>`
}
function fsave(k, id) {
    const f = $('#fpf'), M = FM[k], L = M.L(); $$e(f, '.er').forEach(x => x.remove()); const d = {};[...f.elements].forEach(x => { if (x.name) d[x.name] = x.type == 'checkbox' ? x.checked : x.value.trim() }); let ok = 1; const E = (n, m) => { ok = 0; err(f, n, m) }, mob = /^(\+91)?[\s-]?[6-9]\d{4}[\s-]?\d{5}$/, dg = s => String(s).replace(/\D/g, '').slice(-10), o = L.filter(x => x.id != id);
    if (!d.name) E('name', 'Enter a name'); else if (k == 'supplier' && o.some(x => x.name.toLowerCase() == d.name.toLowerCase())) E('name', 'A supplier with this name already exists');
    if (k == 'supplier' && !d.contact) E('contact', 'Enter a contact person');
    if (k != 'team' && !mob.test(d.phone || '')) E('phone', 'Enter a valid 10-digit mobile number'); else if (k == 'team' && d.phone && !mob.test(d.phone)) E('phone', 'Enter a valid 10-digit mobile number'); else if (d.phone && k == 'customer' && o.some(x => dg(x.phone) == dg(d.phone))) E('phone', 'A customer with this mobile already exists');
    if (d.email && !/^\S+@\S+\.\S+$/.test(d.email)) E('email', 'Enter a valid email'); if (!ok) return;
    if (d.phone) d.phone = k == 'customer' ? '+91 ' + d.phone.replace(/^\+91/, '').trim() : d.phone.replace(/^\+91/, '').trim();
    if (id) Object.assign(L.find(x => x.id == id), d); else { const r = { id: M.pre + (Math.max(100 * (k == 'customer'), 0, ...L.map(x => +String(x.id).replace(/\D/g, '') || 0)) + 1), ...d }; k == 'customer' ? L.unshift(r) : L.push(r) }
    DIRTY = false; save(); toast(id ? 'Saved changes' : 'Created ' + d.name); go(M.back)
}
document.addEventListener('input', e => { if (e.target.closest && e.target.closest('#fpf')) DIRTY = true; const i = e.target.id; if (i == 'ncn') NC.name = e.target.value; else if (i == 'ncp') NC.phone = e.target.value; else if (i == 'ncc') NC.city = e.target.value });

function supM(id) {
    const s = sup(id), ps = S.products.filter(p => p.sup == id), os = S.pos.filter(o => o.sup == id), op = os.filter(o => ['Ordered', 'Partially received'].includes(o.status)), ov = op.reduce((a, o) => a + o.lines.reduce((z, l) => z + (l.qty - l.rec) * l.cost, 0), 0);
    modal(`<h1>${esc(s.name)}</h1><p>${B(s.active === false ? 'Inactive' : 'Active')}</p><dl class="kv"><dt>Contact</dt><dd>${esc(s.contact)}</dd><dt>Mobile</dt><dd>+91 ${esc(s.phone)}</dd>${s.email ? `<dt>Email</dt><dd>${esc(s.email)}</dd>` : ''}${s.gstin ? `<dt>GSTIN</dt><dd>${esc(s.gstin)}</dd>` : ''}${s.addr ? `<dt>Address</dt><dd>${esc(s.addr)}</dd>` : ''}<dt>Terms</dt><dd>${esc(s.terms)}</dd><dt>Products</dt><dd>${ps.length}</dd><dt>Open orders</dt><dd>${op.length} · ${inr(ov)} outstanding (ex GST)</dd></dl><h2>Recent purchase orders</h2>${os.slice(0, 5).map(o => `<div class="li" style="padding-left:0;cursor:pointer" data-act="po-open" data-id="${o.id}"><div><b>${o.id}</b><small>${fd(o.date)}</small></div>${B(o.status)}</div>`).join('') || '<p class="mu">None yet</p>'}<div class="acts"><button class="btn" data-act="close">Close</button><button class="btn" data-act="sup-edit" data-id="${id}">Edit</button><button class="btn pri" data-act="sup-po" data-id="${id}">New purchase order</button></div>`)
}
function teamM(id) {
    const t = S.team.find(x => x.id == id), js = S.jobs.filter(j => j.tech == t.name), op = js.filter(j => !['Completed', 'Cancelled'].includes(j.status));
    modal(`<h1>${esc(t.name)}</h1><p>${B(t.active === false ? 'Inactive' : 'Active')} <span class="b">${esc(t.role)}</span></p><dl class="kv"><dt>Area</dt><dd>${esc(t.area || '—')}</dd>${t.phone ? `<dt>Mobile</dt><dd>+91 ${esc(t.phone)}</dd>` : ''}${t.email ? `<dt>Email</dt><dd>${esc(t.email)}</dd>` : ''}<dt>Open jobs</dt><dd>${op.length}</dd><dt>Completed</dt><dd>${js.filter(j => j.status == 'Completed').length}</dd></dl><h2>Open jobs</h2>${op.slice(0, 6).map(j => `<div class="li" style="padding-left:0;cursor:pointer" data-job="${j.id}"><div><b>${esc(cust(j.cid).name)}</b><small>${esc(j.type)} · ${fd(j.appt)}</small></div>${B(j.status)}</div>`).join('') || '<p class="mu">No open jobs</p>'}<div class="acts"><button class="btn" data-act="close">Close</button><button class="btn" data-act="team-toggle" data-id="${id}">${t.active === false ? 'Activate' : 'Deactivate'}</button><button class="btn pri" data-act="team-edit" data-id="${id}">Edit</button></div>`)
}
function planM(id) { const p = id ? S.plans.find(x => x.id == id) : { name: '', visits: 2, days: 180, active: true }; modal(`<h1>${id ? 'Plan: ' + esc(p.name) : 'Add service plan'}</h1><div class="fg"><label>Plan name<input id="pln" value="${esc(p.name)}"></label><label>Included visits<input id="plv" type="number" min="1" value="${p.visits}"></label><label>Interval between visits (days)<input id="pld" type="number" min="1" value="${p.days}"></label><label class="row"><input id="pla" type="checkbox" ${p.active ? 'checked' : ''}>Active</label></div>${id ? `<p class="mu">${S.assets.filter(a => a.plan == id).length} AC(s) use this plan. Changes affect their calculated entitlements.</p>` : ''}<div class="acts"><button class="btn" data-act="close">Cancel</button><button class="btn pri" data-act="plan-save" data-id="${id || ''}">Save plan</button></div>`) }
const ACT2 = {
    'sup-new': () => go('suppliers/new'), 'team-new': () => go('team/new'), 'sale-new': () => go('sales'), 'plan-new': () => planM(), 'po-open': d => poM(d.id), 'sup-edit': d => { closeM(); go('suppliers/edit/' + d.id) }, 'team-edit': d => { closeM(); go('team/edit/' + d.id) }, 'cust-edit': d => { closeM(); go('customers/edit/' + d.id) }, 'fsave': d => fsave(d.k, d.id), 'fcancel': d => go(FM[d.k].back),
    'sup-po': d => { poF(); $('[name=s]').value = d.id; cbSync() }, 'team-toggle': d => { const t = S.team.find(x => x.id == d.id); if (t.active !== false && !confirm('Deactivate ' + t.name + '? They will no longer be offered for new jobs.')) return; t.active = t.active === false; save(); toast(t.name + (t.active ? ' activated' : ' deactivated')); closeM(); render(true) },
    'plan-save': d => { const n = $('#pln').value.trim(), v = +$('#plv').value, y = +$('#pld').value; if (!n) return toast('Enter a plan name', 'er'); if (!Number.isInteger(v) || v < 1 || !Number.isInteger(y) || y < 1) return toast('Visits and interval must be whole numbers of 1 or more', 'er'); if (S.plans.some(p => p.id != d.id && p.name.toLowerCase() == n.toLowerCase())) return toast('A plan with this name exists', 'er'); if (d.id) { Object.assign(S.plans.find(p => p.id == d.id), { name: n, visits: v, days: y, active: $('#pla').checked }) } else S.plans.push({ id: 'P' + (Math.max(0, ...S.plans.map(p => +p.id.replace(/\D/g, '') || 0)) + 1), name: n, visits: v, days: y, start: 'Purchase date', active: $('#pla').checked }); save(); toast('Plan saved'); closeM(); render(true) }
};
document.addEventListener('click', e => { const a = e.target.closest && e.target.closest('[data-act]'), f = a && ACT2[a.dataset.act]; f && f(a.dataset) });
Object.assign(P.suppliers, { add: ['Add supplier', 'sup-new'], open: supM, s: 'Vendors, contacts and open purchasing. Click a supplier for details.', cols: [['Supplier', r => `<b>${esc(r.name)}</b>`], ['Contact', r => esc(r.contact)], ['Phone', r => '+91 ' + esc(r.phone)], ['Terms', r => esc(r.terms)], ['Orders', r => r.po], ['Status', r => B(r.active === false ? 'Inactive' : 'Active')]] });
Object.assign(P.team, { add: ['Add team member', 'team-new'], open: teamM, cols: [['Name', r => nmc(r)], ['Role', r => esc(r.role)], ['Area', r => esc(r.area || '—')], ['Open jobs', r => r.load], ['Completed', r => S.jobs.filter(j => j.tech == r.name && j.status == 'Completed').length], ['Status', r => B(r.active === false ? 'Inactive' : 'Active')]] });
Object.assign(P.plans, { add: ['Add plan', 'plan-new'], open: planM });
P.invoices = { t: 'Invoices', s: 'Every sale creates one invoice. Viewing or printing never changes stock.', add: ['New sale', 'sale-new'], chips: ['All', 'Cash', 'UPI', 'Card', 'Bank transfer'], chip: (r, c) => r.pay == c, rows: () => S.invoices.map(i => ({ id: i.id, cn: i.cid ? cust(i.cid).name : 'Walk-in customer', date: i.date, pay: i.pay, items: i.lines.reduce((s, l) => s + l.q, 0), total: i.total })), cols: [['Invoice', r => `<b>${esc(r.id)}</b>`], ['Customer', r => esc(r.cn)], ['Date', r => fd(r.date)], ['Payment', r => esc(r.pay)], ['Items', r => r.items], ['Total', r => inr(r.total)], ['Status', r => B('Paid')]], open: id => go('invoices/' + id) };

let NC = { name: '', phone: '', city: '' };
function cartH() {
    const tot = CART.reduce((s, l) => s + lineT(l), 0), tax = CART.reduce((s, l) => s + lineT(l) * prod(l.p).gst / (100 + prod(l.p).gst), 0), ac = CART.some(l => prod(l.p).cat == 'Air Conditioners'), n = CART.reduce((s, l) => s + l.q, 0);
    return `<div class="hd"><h2>Current sale <span class="b">${n} item${n == 1 ? '' : 's'}</span></h2><button class="btn sm" data-act="cclr" ${CART.length ? '' : 'disabled'}>Clear</button></div><div class="cl2">${CART.map((l, i) => { const p = prod(l.p); return `<div class="cr"><div style="display:flex;gap:10px;align-items:flex-start">${th(p)}<div style="flex:1;min-width:0"><b>${esc(p.name)}</b><small class="mu" style="display:block">${esc(p.sku)} · ${inr(p.price)} each · GST ${p.gst}%</small></div><button class="ib" style="width:30px;height:30px" data-act="cx" data-i="${i}" aria-label="Remove ${esc(p.name)}">×</button></div><div style="display:flex;justify-content:space-between;align-items:center;gap:8px">${p.ser ? `<select data-sn="${i}" aria-label="Serial number" style="flex:1;min-height:34px">${p.units.filter(u => u.st == 'In stock').map(u => `<option ${u.sn == l.sn ? 'selected' : ''}>${esc(u.sn)}</option>`).join('')}</select>` : `<div class="qt"><button data-act="cq" data-i="${i}" data-d="-1" aria-label="Decrease">−</button><b>${l.q}</b><button data-act="cq" data-i="${i}" data-d="1" aria-label="Increase">+</button></div>`}<b>${inr(lineT(l))}</b></div></div>` }).join('') || '<div class="empty">Cart is empty. Select a product.</div>'}</div>
 <div class="pad"><div class="fg" style="margin-top:0"><label>Customer<select id="ccust" name="ccust" aria-label="Customer"><option value="" ${!CUST ? 'selected' : ''}>Walk-in customer (No customer record)</option><option value="__new" ${CUST == '__new' ? 'selected' : ''}>+ Add new customer</option>${S.customers.map(c => `<option value="${c.id}" ${c.id == CUST ? 'selected' : ''} data-sub="${esc(c.phone + (c.city ? ' · ' + c.city : ''))}">${esc(c.name)} · ${esc(c.phone)}</option>`).join('')}</select></label>${CUST == '__new' ? `<div class="nc"><label>Name *<input id="ncn" value="${esc(NC.name)}" autocomplete="off"></label><label>Mobile *<input id="ncp" inputmode="tel" placeholder="98250 12345" value="${esc(NC.phone)}"></label><label>City<input id="ncc" value="${esc(NC.city)}"></label><small class="mu">Saved as a new customer when you complete the sale.</small></div>` : ''}<label>Payment (simulated)<select id="cpay">${['UPI', 'Cash', 'Card', 'Bank transfer'].map(x => `<option ${x == PAY ? 'selected' : ''}>${x}</option>`).join('')}</select></label>${ac && CUST ? `<label class="row"><input type="checkbox" id="cplan" ${PLAN ? 'checked' : ''}>Include Complimentary AC Service plan</label>` : ''}</div><dl class="kv" style="grid-template-columns:1fr auto"><dt>Subtotal (ex GST)</dt><dd>${inr(Math.round(tot - tax))}</dd><dt>GST included</dt><dd>${inr(Math.round(tax))}</dd><dt><b>Total</b></dt><dd><b>${inr(tot)}</b></dd></dl><button class="btn pri" style="width:100%;justify-content:center" data-act="sale" ${CART.length ? '' : 'disabled'}>Complete sale</button></div>`
}
function salesPage() { return `<div class="pg"><div class="ph"><div><h1>Point of Sale</h1><p>Search products, build the cart and complete the sale. Stock is deducted once and an invoice is created. Payments are simulated.</p></div><button class="btn" data-act="nav" data-p="invoices">View invoices</button></div><div class="pos"><div><div class="bar"><div class="sb" style="width:100%">${ic('search')}<input id="pq" placeholder="Search name, SKU, barcode or category" value="${esc(PQ)}" aria-label="Search products"></div></div><div class="pgrid" id="pgrid">${pgrid()}</div></div><div class="panel" id="cart">${cartH()}</div></div></div>` }

let CD = D(0); const cdd = (s, n) => { const x = new Date(s + 'T00:00:00Z'); x.setUTCDate(x.getUTCDate() + n); return x.toISOString().slice(0, 10) };
function calNav(v) { if (v == 'today') CD = D(0); else if (v == 'prev' || v == 'next') { const s = v == 'next' ? 1 : -1; if (CV == 'week') CD = cdd(CD, 7 * s); else if (CV == 'day') CD = cdd(CD, s); else { const x = new Date(CD + 'T00:00:00Z'); x.setUTCDate(1); x.setUTCMonth(x.getUTCMonth() + s); CD = x.toISOString().slice(0, 10) } } else CV = v; render(true) }
function calendar() {
    const act = j => !['Completed', 'Cancelled'].includes(j.status), js = S.jobs.filter(j => j.status != 'Cancelled' && (!CT || j.tech == CT)), un = js.filter(j => !j.appt && act(j)), jf = i => js.filter(j => j.appt == i), pd = x => String(x).padStart(2, '0'), B0 = new Date(CD + 'T00:00:00Z'), y = B0.getUTCFullYear(), mo = B0.getUTCMonth(), L = (d, o) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-IN', { timeZone: 'UTC', ...o }), hdr = t => `<div class='mu' style='min-height:0;font-size:12px;text-align:center'>${t}</div>`, cell = (i, min, w) => `<div class='cd${i == D(0) ? ' today' : ''}' data-date='${i}' style='min-height:${min}px'><span class='dn'>${+i.slice(8)}</span>${w ? `<span class='wl'>${L(i, { weekday: 'long' })}</span>` : ''}${jf(i).map(j => evc(j, act(j))).join('')}</div>`; let body, title;
    if (CV == 'month') { const fw = new Date(Date.UTC(y, mo, 1)).getUTCDay(), dim = new Date(Date.UTC(y, mo + 1, 0)).getUTCDate(); title = L(CD, { month: 'long', year: 'numeric' }); let c = ''; for (let i = 0; i < fw; i++)c += '<div></div>'; for (let d = 1; d <= dim; d++)c += cell(`${y}-${pd(mo + 1)}-${pd(d)}`, 92); body = `<div class='cg'>${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(hdr).join('')}${c}</div>` }
    else if (CV == 'week') { const w0 = cdd(CD, -((B0.getUTCDay() + 6) % 7)), ds = [...Array(7)].map((_, i) => cdd(w0, i)); title = L(ds[0], { day: 'numeric', month: 'short' }) + ' to ' + L(ds[6], { day: 'numeric', month: 'short', year: 'numeric' }); body = `<div class='cg wk'>${ds.map(d => hdr(L(d, { weekday: 'short' }))).join('')}${ds.map(d => cell(d, 200, 1)).join('')}</div>` }
    else if (CV == 'day') { const ts = [...S.team.filter(t => t.role == 'Technician' && t.active !== false).map(t => t.name), 'Unassigned'].filter(n => !CT || n == CT), all = jf(CD); title = L(CD, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); body = `<div style='padding:12px;display:grid;gap:14px'>${ts.map(n => { const a = all.filter(j => (j.tech || 'Unassigned') == n); return `<div><b>${esc(n)}</b> <span class='mu'>${a.length} job${a.length == 1 ? '' : 's'}</span>${a.map(j => `<div class='li' data-job='${j.id}' tabindex='0' style='cursor:pointer;padding-left:0'><div><b>${esc(cust(j.cid).name)}</b><small>${esc(j.type)} · ${esc(asset(j.ac).brand + ' ' + asset(j.ac).model)}</small></div>${B(j.status)}</div>`).join('') || `<div class='mu' style='font-size:13px'>No jobs</div>`}</div>` }).join('')}</div>` }
    else { const ms = `${y}-${pd(mo + 1)}`; title = L(CD, { month: 'long', year: 'numeric' }); body = js.filter(j => j.appt && j.appt.startsWith(ms)).sort((a, b) => a.appt > b.appt ? 1 : -1).map(x => `<div class='li' data-job='${x.id}' tabindex='0' style='cursor:pointer'><span class='mu' style='width:56px'>${fd(x.appt)}</span><div><b>${esc(cust(x.cid).name)}</b><small>${esc(x.type)} · ${esc(x.tech || 'Unassigned')}</small></div>${B(x.status)}</div>`).join('') || '<div class="empty">No appointments this month</div>' }
    return `<div class='pg'><div class='ph'><div><h1>Calendar</h1><p>Drag a job onto a date in Month or Week view to reschedule it, or open it and choose Reschedule.</p></div><button class='btn pri' data-act='add-job'>${ic('plus')}New appointment</button></div><div class='bar'><button class='btn sm' data-act='cal' data-v='prev' aria-label='Previous'>‹</button><button class='btn sm' data-act='cal' data-v='today'>Today</button><button class='btn sm' data-act='cal' data-v='next' aria-label='Next'>›</button><b>${title}</b><div class='chips'>${['month', 'week', 'day', 'agenda'].map(v => `<button class='chip${CV == v ? ' on' : ''}' data-act='cal' data-v='${v}'>${v[0].toUpperCase() + v.slice(1)}</button>`).join('')}</div><select id='ctech' aria-label='Technician' style='height:34px;min-height:34px'><option value=''>All technicians</option>${S.team.filter(t => t.role == 'Technician' && t.active !== false).map(t => `<option ${t.name == CT ? 'selected' : ''}>${esc(t.name)}</option>`).join('')}</select></div><div class='cw'><div class='panel'>${body}</div><div class='panel'><div class='hd'><h2>Unscheduled (${un.length})</h2></div><div class='pad'>${un.map(j => evc(j, 1)).join('') || '<span class="mu">All jobs are scheduled</span>'}</div></div></div></div>`
}

function settings() {
    const s = SS(), seg = (k, o) => `<div class='chips' style='margin-top:6px'>${o.map(([v, l]) => `<button class='chip${s[k] == v ? ' on' : ''}' data-act='set' data-k='${k}' data-v='${v}'>${l}</button>`).join('')}</div>`, inp = (k, l, t = 'text') => `<label>${l}<input data-set='${k}' type='${t}' value='${esc(s[k] ?? '')}'></label>`, card = (h, p, b) => `<div class='panel pad'><h2>${h}</h2><p class='mu' style='margin-top:2px'>${p}</p>${b}</div>`, tabs = ['Appearance', 'Business', 'Invoice & tax', 'Inventory', 'Data']; let kb = 0; try { kb = Math.round((localStorage.getItem(KEY) || '').length / 1024) } catch (x) { }
    const B2 = {
        Appearance: () => card('Theme and colour', 'Applies immediately and persists.', `<div class='fg'><div><b>Theme</b>${seg('theme', [['light', 'Light'], ['dark', 'Dark'], ['system', 'System']])}</div><div><b>Accent colour</b><div class='chips' style='margin-top:6px'>${['#4F46E5', '#0E7490', '#15803D', '#B45309', '#BE185D'].map(c => `<button class='chip' data-act='set' data-k='accent' data-v='${c}' aria-label='Accent ${c}' aria-pressed='${s.accent == c}' style='width:34px;padding:0;background:${c};border:3px solid ${s.accent == c ? 'var(--tx)' : 'transparent'}'></button>`).join('')}</div></div><div><b>Density</b>${seg('dens', [['comfortable', 'Comfortable'], ['compact', 'Compact']])}</div><div><b>Default product view</b>${seg('view', [['list', 'List'], ['grid', 'Grid']])}</div></div>`),
        Business: () => card('Business details', 'Shown on printed invoices.', `<div class='fg'>${inp('store', 'Store name')}${inp('gstin', 'GSTIN (demo value)')}${inp('addr', 'Address')}${inp('phone', 'Phone')}${inp('email', 'Email', 'email')}</div>`) + card('Logo', 'Used on invoices. Stored in this browser only.', `<div style='margin-top:8px;display:flex'>${uploader('logo')}</div>`),
        'Invoice & tax': () => card('Tax and invoice text', 'Used when printing invoices.', `<div class='fg'><label>Tax treatment<select data-set='inter'><option value='0' ${s.inter != '1' ? 'selected' : ''}>Intra-state (CGST + SGST)</option><option value='1' ${s.inter == '1' ? 'selected' : ''}>Inter-state (IGST)</option></select></label><label>Default GST rate for new products<select data-set='gst'>${[18, 28, 12, 5, 0].map(g => `<option ${(+s.gst || 18) == g ? 'selected' : ''}>${g}</option>`).join('')}</select></label><label>Invoice terms<textarea data-set='terms' rows='3'>${esc(s.terms || 'Goods once sold are covered by manufacturer warranty only.')}</textarea></label></div>`),
        Inventory: () => card('Stock defaults', 'Pre-fills the Add Product form. Existing products are unchanged.', `<div class='fg'>${inp('re', 'Default reorder level', 'number')}</div><p class='mu' style='margin-top:8px'>A product is low stock when on-hand is at or below its own reorder level.</p>`),
        Data: () => card('Browser storage', `Data lives in this browser's localStorage. It is not secure storage and is not synced anywhere.`, `<p style='margin-top:8px'>${kb} KB used of roughly 5,000 KB</p><div class='pb'><i style='width:${Math.min(100, kb / 50)}%'></i></div><p class='mu' style='margin-top:8px'>${S.products.length} products · ${S.invoices.length} invoices · ${S.customers.length} customers · ${S.suppliers.length} suppliers · ${S.pos.length} purchase orders · ${S.jobs.length} jobs</p>`) + card('Backup and reset', 'Export a JSON backup before importing or resetting.', `<div class='acts' style='justify-content:flex-start'><button class='btn' data-act='export'>Export JSON</button><label class='btn'>Import JSON<input id='imp' type='file' accept='application/json' hidden></label><button class='btn dg' data-act='reset'>Reset demo data</button></div>`)
    };
    return `<div class='pg'><div class='ph'><div><h1>Settings</h1><p>Appearance, business and inventory preferences. Integrations are simulated.</p></div></div><div class='sg'><div class='sn' role='tablist'>${tabs.map(t => `<button class='${ST == t ? 'on' : ''}' role='tab' aria-selected='${ST == t}' data-act='tab' data-v='${t}'>${t}</button>`).join('')}</div><div class='sc'>${(B2[ST] || B2.Appearance)()}</div></div></div>`
}

const CHEV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 9l4-4 4 4M16 15l-4 4-4-4"/></svg>', CHK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>';

let SXP = null, SXS = null, SXA = -1, SXT = '', SXTM = 0;
function sxSync(s) { const b = s._b; if (!b) return; const o = s.options[s.selectedIndex]; b.innerHTML = `<span>${esc(o ? o.text : '')}</span>` + CHEV; b.disabled = s.disabled; b.classList.toggle('ph', !o || !o.text.trim()); b.setAttribute('aria-invalid', s.getAttribute('aria-invalid') == 'true'); b.title = o ? o.text : '' }
function sxEnh(s) { if (s.dataset.sx) return; s.dataset.sx = 1; s.classList.add('sx-n'); const b = document.createElement('button'); b.type = 'button'; b.className = 'sx' + (s.closest('.rb,.bar,.hd,.top') ? ' sm' : ''); b.setAttribute('role', 'combobox'); b.setAttribute('aria-haspopup', 'listbox'); b.setAttribute('aria-expanded', 'false'); const l = s.getAttribute('aria-label'); if (l) b.setAttribute('aria-label', l); b._s = s; s._b = b; s.after(b); sxSync(s) }
const sxAll = () => document.querySelectorAll('select:not([data-sx])').forEach(sxEnh);
function sxClose(f) { if (SXP) { SXP.remove(); SXP = null } if (SXS && SXS._b) { SXS._b.setAttribute('aria-expanded', 'false'); if (f && document.contains(SXS._b)) SXS._b.focus() } SXS = null }
function sxAct() { if (!SXP) return; SXP.querySelectorAll('.sxi').forEach(x => { const on = +x.dataset.i == SXA; x.classList.toggle('act', on); if (on) x.scrollIntoView({ block: 'nearest' }) }) }
function sxFilter(p, s, q) {
    q = (q || '').toLowerCase().trim();
    const clr = p.querySelector('.sxs-clr');
    if (clr) clr.style.display = q ? 'flex' : 'none';
    let count = 0;
    p.querySelectorAll('.sxi').forEach(x => {
        const o = s.options[+x.dataset.i];
        const str = ((o ? o.text : '') + ' ' + (o && o.dataset.sub ? o.dataset.sub : '')).toLowerCase();
        const show = !q || str.includes(q);
        x.style.display = show ? 'flex' : 'none';
        if (show) count++;
    });
    p.querySelectorAll('.sxg').forEach(g => {
        let n = g.nextElementSibling, has = false;
        while (n && n.classList.contains('sxi')) {
            if (n.style.display !== 'none') has = true;
            n = n.nextElementSibling;
        }
        g.style.display = has ? 'block' : 'none';
    });
    const none = p.querySelector('.sxi-none');
    if (none) none.style.display = count === 0 ? 'block' : 'none';
    const vis = [...p.querySelectorAll('.sxi:not([style*="display: none"]):not([aria-disabled="true"])')];
    if (!vis.some(x => +x.dataset.i === SXA)) SXA = vis.length ? +vis[0].dataset.i : -1;
    sxAct();
}
function sxOpen(s) {
    sxClose(); sxSync(s); const b = s._b, r = b.getBoundingClientRect(), p = document.createElement('div'); p.className = 'sxp'; p.setAttribute('role', 'dialog');
    const tot = s.options.length, hasSearch = tot > 3 || s.dataset.search === '1';
    const it = o => `<div class="sxi" role="option" data-i="${o.index}" aria-selected="${o.selected}" ${o.disabled ? 'aria-disabled="true"' : ''}>${CHK}<div class="sxi-m"><span>${esc(o.text)}</span>${o.dataset.sub ? `<small class="sxi-sub">${esc(o.dataset.sub)}</small>` : ''}</div></div>`;
    const listHtml = [...s.children].map(c => c.tagName == 'OPTGROUP' ? `<div class="sxg">${esc(c.label)}</div>` + [...c.children].map(it).join('') : it(c)).join('');
    p.innerHTML = (hasSearch ? `<div class="sxs"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sxs-ic"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg><input type="text" class="sxi-q" placeholder="Search..." autocomplete="off" spellcheck="false" aria-label="Search options"><button type="button" class="sxs-clr" aria-label="Clear search" style="display:none">×</button></div>` : '') + `<div class="sxl" role="listbox">${listHtml}<div class="sxi-none" style="display:none">No matching options</div></div>`;
    document.body.append(p);
    const triggerW = Math.max(r.width, 220);
    p.style.minWidth = Math.min(triggerW, innerWidth - 16) + 'px';
    p.style.maxWidth = Math.max(triggerW, Math.min(480, innerWidth - 16)) + 'px';
    const spaceBelow = innerHeight - r.bottom - 12, spaceAbove = r.top - 12;
    const flip = spaceBelow < 200 && spaceAbove > spaceBelow;
    const maxAvail = flip ? spaceAbove : spaceBelow;
    const maxListH = Math.max(100, Math.min(260, maxAvail - (hasSearch ? 52 : 12)));
    const sxl = p.querySelector('.sxl');
    if (sxl) sxl.style.maxHeight = maxListH + 'px';
    const pH = p.offsetHeight;
    let left = Math.max(8, Math.min(r.left, innerWidth - p.offsetWidth - 8));
    let top = flip ? (r.top - pH - 4) : (r.bottom + 4);
    p.style.left = left + 'px';
    p.style.top = top + 'px';
    if (flip) p.style.transformOrigin = 'bottom';
    SXP = p; SXS = s; SXA = s.selectedIndex; b.setAttribute('aria-expanded', 'true'); sxAct();
    if (hasSearch) {
        const inp = p.querySelector('.sxi-q'), clr = p.querySelector('.sxs-clr');
        if (inp) {
            inp.focus();
            inp.addEventListener('input', () => sxFilter(p, s, inp.value));
        }
        if (clr) {
            clr.addEventListener('click', e => {
                e.stopPropagation();
                inp.value = '';
                sxFilter(p, s, '');
                inp.focus();
            });
        }
    }
}
function sxPick(i) { const s = SXS; if (!s) return; const o = s.options[i]; if (!o || o.disabled) return; sxClose(1); if (s.selectedIndex != i) { s.selectedIndex = i; s.dispatchEvent(new Event('input', { bubbles: true })); s.dispatchEvent(new Event('change', { bubbles: true })) } sxSync(s) }
document.addEventListener('click', e => { const b = e.target.closest && e.target.closest('.sx'); if (b && !b.disabled) { e.preventDefault(); SXS === b._s ? sxClose() : sxOpen(b._s) } });
document.addEventListener('mousedown', e => { const t = e.target.closest ? e.target : e.target.parentNode; if (t.closest && t.closest('.sxs')) return; const i = t.closest && t.closest('.sxi'); if (i && !i.hasAttribute('aria-disabled')) { e.preventDefault(); sxPick(+i.dataset.i) } else if (SXP && !(t.closest && t.closest('.sxp,.sx'))) sxClose(); if (DP && !(t.closest && t.closest('#drp,[data-drp]'))) drClose() });
document.addEventListener('keydown', e => {
    const t = e.target;
    if (DP && e.key == 'Escape') { e.stopPropagation(); drClose(); return }
    if (SXP) {
        const L = [...SXP.querySelectorAll('.sxi:not([style*="display: none"]):not([aria-disabled="true"])')];
        const ix = L.findIndex(x => +x.dataset.i == SXA), k = e.key;
        const isSearch = t.classList && t.classList.contains('sxi-q');
        const go = n => { e.preventDefault(); e.stopPropagation(); if (L[n]) { SXA = +L[n].dataset.i; sxAct() } };
        if (k == 'ArrowDown') { if (L.length) go(ix === -1 ? 0 : (ix + 1) % L.length) }
        else if (k == 'ArrowUp') { if (L.length) go(ix === -1 ? L.length - 1 : (ix - 1 + L.length) % L.length) }
        else if (k == 'Home' && !isSearch) { if (L.length) go(0) }
        else if (k == 'End' && !isSearch) { if (L.length) go(L.length - 1) }
        else if (k == 'Enter') { e.preventDefault(); e.stopPropagation(); if (SXA >= 0 && L.some(x => +x.dataset.i === SXA)) sxPick(SXA); else if (L.length) sxPick(+L[0].dataset.i) }
        else if (k == 'Escape') { e.preventDefault(); e.stopPropagation(); sxClose(1) }
        else if (k == 'Tab') sxClose();
        else if (!isSearch && k.length == 1) { clearTimeout(SXTM); SXT += k.toLowerCase(); SXTM = setTimeout(() => SXT = '', 600); const m = L.find(x => x.textContent.trim().toLowerCase().startsWith(SXT)); if (m) { SXA = +m.dataset.i; sxAct() } }
        return
    }
    if (t.classList && t.classList.contains('sx') && (e.key == 'ArrowDown' || e.key == 'ArrowUp')) { e.preventDefault(); sxOpen(t._s) }
}, true);
window.addEventListener('resize', () => sxClose()); document.addEventListener('scroll', e => { if (SXP && !(e.target.closest && e.target.closest('.sxp'))) sxClose() }, true);
new MutationObserver(ms => { ms.forEach(m => { if (m.type == 'attributes' && m.target.tagName == 'SELECT') sxSync(m.target) }); sxAll() }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-invalid', 'disabled'] });
function cartFit() { const c = $('#cart'); if (c) c.style.maxHeight = innerWidth > 1000 ? Math.max(320, innerHeight - Math.max(70, c.getBoundingClientRect().top) - 16) + 'px' : '' } addEventListener('scroll', cartFit, { passive: true }); addEventListener('resize', cartFit);
{ const _r = render; render = function (k) { _r(k); cartFit(); sxAll(); document.querySelectorAll('select[data-sx]').forEach(sxSync) } }

const DR = { rg: '30d', from: '', to: '' }, pz = n => String(n).padStart(2, '0'), DRP = [['today', 'Today'], ['yd', 'Yesterday'], ['7d', 'Last 7 days'], ['30d', 'Last 30 days'], ['90d', 'Last 90 days'], ['tm', 'This month'], ['pm', 'Last month'], ['ty', 'This year'], ['all', 'All time']];
const mAdd = (m, n) => new Date(Date.UTC(+m.slice(0, 4), +m.slice(5, 7) - 1 + n, 1)).toISOString().slice(0, 7);
function drCalc(rg, a, b) { const t = D(0), y = +t.slice(0, 4), m = +t.slice(5, 7); let f = t, e = t; switch (rg) { case 'yd': f = e = cdd(t, -1); break; case '7d': f = cdd(t, -6); break; case '30d': f = cdd(t, -29); break; case '90d': f = cdd(t, -89); break; case 'tm': f = `${y}-${pz(m)}-01`; break; case 'pm': f = `${m == 1 ? y - 1 : y}-${pz(m == 1 ? 12 : m - 1)}-01`; e = cdd(`${y}-${pz(m)}-01`, -1); break; case 'ty': f = `${y}-01-01`; break; case 'all': f = '2000-01-01'; break; case 'cu': f = a; e = b || a }if (f > e) [f, e] = [e, f]; return { f, e } }
function drR() { const R = drCalc(DR.rg, DR.from, DR.to); if (DR.rg == 'all') { const ds = [...S.invoices.map(i => i.date), ...S.jobs.map(j => j.appt || j.due)].filter(Boolean).sort(); R.f = ds[0] && ds[0] < D(0) ? ds[0] : cdd(D(0), -29); R.e = ds.length && ds[ds.length - 1] > D(0) ? ds[ds.length - 1] : D(0) } R.n = Math.round((new Date(R.e) - new Date(R.f)) / 864e5) + 1; return R }
const drF = (d, y) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', ...(y ? { year: 'numeric' } : {}), timeZone: 'UTC' }), drLbl = (f, e) => f == e ? drF(f, 1) : f.slice(0, 4) == e.slice(0, 4) ? drF(f) + ' – ' + drF(e, 1) : drF(f, 1) + ' – ' + drF(e, 1);
const drBtn = () => { const R = drR(), n = (DRP.find(x => x[0] == DR.rg) || [0, 'Custom'])[1]; return `<button type="button" class="btn drt" data-drp aria-haspopup="dialog" aria-expanded="false">${ic('cal')}<span>${drLbl(R.f, R.e)}</span><span class="mu drn">${n}</span></button>` };
let DP = null;
function drCalM(m, first, last) {
    const y = +m.slice(0, 4), mo = +m.slice(5, 7) - 1, fw = new Date(Date.UTC(y, mo, 1)).getUTCDay(), dim = new Date(Date.UTC(y, mo + 1, 0)).getUTCDate(), t = D(0), hi = DP.picking ? DP.h || DP.a : DP.b || DP.a; let s = DP.a, e = hi; if (s && e && s > e) [s, e] = [e, s]; let c = '<span></span>'.repeat(fw);
    for (let d = 1; d <= dim; d++) { const k = `${m}-${pz(d)}`, cl = ['drd']; if (k == t) cl.push('td'); if (s && k >= s && k <= e) cl.push('in'); if (k == s) cl.push('s'); if (k == e) cl.push('e'); c += `<button type="button" class="${cl.join(' ')}" data-dd="${k}">${d}</button>` }
    return `<div class="drm"><div class="drh">${first ? '<button type="button" data-drn="-1" aria-label="Previous month">‹</button>' : '<span></span>'}<b>${new Date(Date.UTC(y, mo, 1)).toLocaleDateString('en-IN', { month: 'long', year: 'numeric', timeZone: 'UTC' })}</b>${last ? '<button type="button" data-drn="1" aria-label="Next month">›</button>' : '<span></span>'}</div><div class="drw">${['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(x => `<span>${x}</span>`).join('')}</div><div class="drg">${c}</div></div>`
}
const drCals = () => drCalM(DP.m, 1, 0) + drCalM(mAdd(DP.m, 1), 0, 1), drFt = () => `<span class="mu drs">${DP.a ? drLbl(DP.a, DP.picking ? DP.a : DP.b || DP.a) + (DP.picking ? ' · choose an end date' : '') : 'Choose a start date'}</span><span><button type="button" class="btn sm" data-drx>Cancel</button> <button type="button" class="btn sm pri" data-dra ${DP.a && !DP.picking ? '' : 'disabled'}>Apply</button></span>`;
function drOpen(btn) {
    drClose(); const R = drR(); DP = { btn, a: R.f, b: R.e, m: mAdd(R.e.slice(0, 7), -1), picking: false, h: '' }; const p = document.createElement('div'); p.className = 'drp'; p.id = 'drp'; p.setAttribute('role', 'dialog'); p.setAttribute('aria-label', 'Choose date range');
    p.innerHTML = `<div class="drpre">${DRP.map(([k, l]) => `<button type="button" class="drpb${DR.rg == k ? ' on' : ''}" data-drpre="${k}">${l}</button>`).join('')}</div><div class="drmain"><div class="drcals">${drCals()}</div><div class="drft">${drFt()}</div></div>`; document.body.append(p); btn.setAttribute('aria-expanded', 'true');
    if (innerWidth > 700) { const r = btn.getBoundingClientRect(), w = p.offsetWidth; p.style.top = Math.min(r.bottom + 6, innerHeight - p.offsetHeight - 8) + 'px'; p.style.left = (r.right - w >= 8 ? r.right - w : Math.max(8, Math.min(r.left, innerWidth - w - 8))) + 'px' }
}
function drClose() { const p = $('#drp'); if (p) p.remove(); DP = null; document.querySelectorAll('[data-drp]').forEach(b => b.setAttribute('aria-expanded', 'false')) }
const drUp = () => { const p = $('#drp'); if (!p) return; p.querySelector('.drcals').innerHTML = drCals(); p.querySelector('.drft').innerHTML = drFt() };
document.addEventListener('click', e => {
    const t = e.target, c = s => t.closest && t.closest(s); let x;
    if (x = c('[data-drp]')) { DP ? drClose() : drOpen(x); return } if (!DP || !c('#drp')) return;
    if (x = c('[data-drpre]')) { DR.rg = x.dataset.drpre; DR.from = DR.to = ''; drClose(); render(true); return }
    if (x = c('[data-dd]')) { const d = x.dataset.dd; if (!DP.picking) { DP.a = d; DP.b = ''; DP.picking = true; DP.h = '' } else { DP.b = d < DP.a ? DP.a : d; DP.a = d < DP.a ? d : DP.a; DP.picking = false } drUp(); return }
    if (x = c('[data-drn]')) { DP.m = mAdd(DP.m, +x.dataset.drn); drUp(); return }
    if (c('[data-drx]')) { drClose(); return }
    if (c('[data-dra]') && DP.a && DP.b && !DP.picking) { DR.rg = 'cu'; DR.from = DP.a; DR.to = DP.b; drClose(); render(true) }
});
document.addEventListener('mouseover', e => { const x = DP && DP.picking && e.target.closest && e.target.closest('[data-dd]'); if (x && DP.h != x.dataset.dd) { DP.h = x.dataset.dd; const p = $('#drp'); p.querySelector('.drcals').innerHTML = drCals() } });

const cmpN = v => { const a = Math.abs(v), f = (x, s) => +x.toFixed(1) + s; return a >= 1e7 ? f(v / 1e7, 'Cr') : a >= 1e5 ? f(v / 1e5, 'L') : a >= 1e3 ? f(v / 1e3, 'k') : String(+v.toFixed(1)) };
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
    return `<div class="dc"><div class="dc-p"><div class="dc-g">${[4, 3, 2, 1, 0].map(i => `<span><em>${esc(o.ax ? o.ax(st * i) : cmpN(st * i))}</em></span>`).join('')}</div><div class="dc-b">${items.map(x => `<div class="dc-c" data-tip="${esc(x.t || x.fl || x.l)}|${esc(fmt(x.v))}"><i style="height:${x.v ? Math.max(1.5, x.v / top * 100) : 0}%;background:${x.c || 'var(--ac)'}"></i></div>`).join('')}</div></div>${xHTML}</div>`
}
function drBuckets(R) { const mode = R.n <= 31 ? 'd' : R.n <= 150 ? 'w' : 'm', key = d => mode == 'd' ? d : mode == 'm' ? d.slice(0, 7) : cdd(d, -new Date(d + 'T00:00:00Z').getUTCDay()), keys = []; for (let d = R.f; d <= R.e; d = cdd(d, 1)) { const k = key(d); if (keys[keys.length - 1] !== k) keys.push(k) } return { mode, key, keys } }
function overview() {
    const R = drR(), dI = d => !!d && d.slice(0, 10) >= R.f && d.slice(0, 10) <= R.e, as = S.assets.map(entl), JR = S.jobs.filter(j => dI(j.appt || j.due)), pend = S.jobs.filter(j => !['Completed', 'Cancelled'].includes(j.status)).length, fl = S.msgs.filter(m => m.status == 'Failed'), op = S.fb.filter(f => f.status == 'Open'),
        K = [['Total AC customers', S.customers.length, 'users', 'customers', 'All'], ['Services due this month', as.filter(e => ['Due soon', 'Overdue'].includes(e.s)).length, 'cal', 'customers', 'Due soon'], ['Pending service jobs', pend, 'wrench', 'services', 'All'], ['Completed in range', JR.filter(j => j.status == 'Completed').length, 'zap', 'services', 'Completed'], ['Feedback awaiting review', op.length, 'star', 'feedback', 'Open'], ['Failed messages', fl.length, 'msg', 'messages', 'Failed']],
        up = S.jobs.filter(j => j.appt && !['Completed', 'Cancelled'].includes(j.status)).sort((a, b) => a.appt > b.appt ? 1 : -1).slice(0, 5), h = new Date().getHours(), g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening',
        IR = S.invoices.filter(i => i.status != 'Cancelled' && dI(i.date)), rev = IR.reduce((s, i) => s + i.total, 0); let net = 0, cost = 0; IR.forEach(i => i.lines.forEach(l => { const p = prod(l.p); net += l.q * l.pr * 100 / (100 + p.gst); cost += l.q * (p.cost || 0) }));
    const val = S.products.reduce((s, p) => s + onh(p) * p.cost, 0), low = S.products.filter(p => stk(p) != 'In stock'), opo = S.pos.filter(o => ['Ordered', 'Partially received'].includes(o.status)).length,
        bk = drBuckets(R), sv = {}; IR.forEach(i => { const k = bk.key(i.date); sv[k] = (sv[k] || 0) + i.total });
    const wk = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], sItems = bk.keys.map(k => ({ l: bk.mode == 'm' ? new Date(k + '-01T00:00:00Z').toLocaleDateString('en-IN', { month: 'short', year: '2-digit', timeZone: 'UTC' }) : fd(k), t: bk.mode == 'w' ? 'Week of ' + fd(k) : bk.mode == 'm' ? new Date(k + '-01T00:00:00Z').toLocaleDateString('en-IN', { month: 'long', year: 'numeric', timeZone: 'UTC' }) : wk[new Date(k + 'T00:00:00Z').getUTCDay()] + ', ' + fd(k), v: sv[k] || 0 })),
        SC = { Due: '#F59E0B', Booked: '#4F46E5', Assigned: '#0891B2', 'In Progress': '#9333EA', Completed: '#0E9F6E', 'On Hold': '#94A3B8', Cancelled: '#E11D48' },
        SL = { Due: 'Due', Booked: 'Booked', Assigned: 'Assign', 'In Progress': 'In Prog', Completed: 'Done', 'On Hold': 'Hold', Cancelled: 'Cancel' },
        jItems = Object.keys(SC).map(s => ({ l: s, sl: SL[s] || s, fl: s, v: JR.filter(j => j.status == s).length, c: SC[s], t: s + ' jobs' }));
    return `<div class="pg"><div class="ph"><div><h1>${g}, Rajesh</h1><p>${new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}. ${pend} jobs open, ${fl.length} messages need attention. Demo data.</p></div><div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">${drBtn()}<button class="btn" data-act="add-job">Schedule service</button><button class="btn pri" data-act="add-cust">${ic('plus')}Add customer</button></div></div>
<div class="kp">${K.map((k, i) => `<button class="k${i == 2 ? ' hl' : ''}" data-go="${k[3]}" data-f="${k[4]}">${ic(k[2])}<b data-n="${k[1]}">0</b><span>${k[0]}</span></button>`).join('')}</div>
<div class="kp k4"><button class="k" data-go="invoices">${ic('cart')}<b>${inr(rev)}</b><span>Sales in range (${IR.length} invoice${IR.length == 1 ? '' : 's'})</span></button><button class="k" data-go="reports">${ic('chart')}<b>${net ? Math.round((net - cost) / net * 100) : 0}%</b><span>Gross margin in range, ex GST</span></button><button class="k" data-go="inventory">${ic('box')}<b>${inr(val)}</b><span>Inventory at cost · ${low.length} low or out</span></button><button class="k" data-go="purchases">${ic('truck')}<b>${opo}</b><span>Open purchase orders</span></button></div>
<div class="dgr"><div class="panel"><div class="hd"><h2>Sales ${bk.mode == 'd' ? 'by day' : bk.mode == 'w' ? 'by week' : 'by month'}</h2><span class="mu">${drLbl(R.f, R.e)} · ${inr(rev)}</span></div>${dchart(sItems, { fmt: inr, ax: v => '₹' + cmpN(v) })}</div><div class="panel"><div class="hd"><h2>Service jobs by status</h2><span class="mu">${JR.length} job${JR.length == 1 ? '' : 's'} in range</span></div>${dchart(jItems, { all: 1, wrap: 1, fmt: n => n + (n == 1 ? ' job' : ' jobs'), ax: v => String(v) })}</div></div>
<div class="gr"><div><div class="panel"><div class="hd"><h2>Upcoming appointments</h2><button class="btn sm" data-go="services" data-f="All">View all</button></div>${up.map(j => `<div class="li" tabindex="0" data-job="${j.id}" style="cursor:pointer"><span class="av">${esc(ini(cust(j.cid).name))}</span><div><b>${esc(cust(j.cid).name)}</b><small>${esc(j.type)} · ${esc(asset(j.ac).brand)} · ${esc(j.tech || 'Unassigned')}</small></div><span>${fd(j.appt)}</span>${B(j.status)}</div>`).join('') || '<div class="empty">No upcoming appointments</div>'}</div>
<div class="panel"><div class="hd"><h2>Low-stock alerts</h2><button class="btn sm" data-go="inventory" data-f="Low stock">View</button></div>${low.slice(0, 4).map(p => `<div class="li"><div><b>${esc(p.name)}</b><small>${onh(p)} left, reorder at ${p.re}</small></div><button class="btn sm" data-act="po-new" data-id="${p.id}">Reorder</button></div>`).join('') || '<div class="empty">Stock levels are healthy</div>'}</div></div>
<div><div class="panel"><div class="hd"><h2>Needs attention</h2></div>${fl.map(m => `<div class="li"><div><b>${esc(cust(m.cid).name)}</b><small>${esc(m.ch)}: ${esc(m.err)}</small></div><button class="btn sm" data-act="retry" data-id="${m.id}">Retry</button></div>`).join('')}${op.map(f => `<div class="li"><div><b>${esc(cust(f.cid).name)}</b><small>Complaint, rated ${f.rating}/5</small></div><button class="btn sm" data-fb="${f.id}">Review</button></div>`).join('')}${fl.length + op.length ? '' : '<div class="empty">Nothing needs attention</div>'}</div>
<div class="panel"><div class="hd"><h2>Delivery by channel (simulated)</h2></div><div class="pad">${['WhatsApp', 'SMS', 'Email'].map(c => { const m = S.msgs.filter(x => x.ch == c && dI(x.time)), d = m.filter(x => x.status == 'Delivered').length, p = m.length ? Math.round(d / m.length * 100) : 0; return `<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between"><span>${c}</span><span class="mu">${d} of ${m.length}</span></div><div class="pb"><i style="width:${p}%"></i></div></div>` }).join('')}</div></div></div></div></div>`
}

function donut(items, fmt, ctr) {
    items = items.filter(x => x.v > 0); const T = items.reduce((s, x) => s + x.v, 0); if (!T) return emp(); const r = 68, C = 2 * Math.PI * r, gp = items.length > 1 ? 2.5 : 0, pc = x => (x.v / T * 100).toFixed(1), top = items.reduce((a, x) => x.v > a.v ? x : a, items[0]); let off = 0;
    const seg = items.map((x, i) => { const d = Math.max(0, x.v / T * C - gp), s = `<circle class="ds" data-dsi="${i}" cx="100" cy="100" r="${r}" fill="none" stroke="${x.c || rcol(i)}" stroke-width="26" stroke-dasharray="${d} ${C - d}" stroke-dashoffset="${-off}" transform="rotate(-90 100 100)" data-tip="${esc(x.l + '|' + fmt(x.v) + ' · ' + pc(x) + '%')}" ${x.go ? `data-rgo="${esc(x.go)}" style="cursor:pointer"` : ''}></circle>`; off += x.v / T * C; return s }).join(''),
        cn = [[fmt(T), ctr || 'Total', items.length + (items.length == 1 ? ' category' : ' categories')], ...items.map(x => [fmt(x.v), x.l, pc(x) + '% of total'])], fz = n => n.length > 9 ? 14 : n.length > 7 ? 16 : 18;
    return `<div class="dn3" data-cn="${esc(JSON.stringify(cn))}"><div class="dn3c"><svg viewBox="0 0 200 200" role="img" aria-label="Donut chart: ${esc(ctr || 'Total')}"><circle cx="100" cy="100" r="${r}" fill="none" stroke="var(--bg)" stroke-width="26"/>${seg}<text class="dcv" x="100" y="97" text-anchor="middle" style="font-size:${fz(cn[0][0])}px">${esc(cn[0][0])}</text><text class="dcl" x="100" y="115" text-anchor="middle">${esc(cn[0][1])}</text><text class="dcs" x="100" y="130" text-anchor="middle">${esc(cn[0][2])}</text></svg></div>
<ul>${items.map((x, i) => `<li data-dsi="${i}" ${x.go ? `data-rgo="${esc(x.go)}" style="cursor:pointer"` : ''}><i style="background:${x.c || rcol(i)}"></i><span class="dl" title="${esc(x.l)}">${esc(x.l)}</span><span class="dv">${esc(fmt(x.v))}<small>${pc(x)}%</small></span><div class="db"><b style="width:${pc(x)}%;background:${x.c || rcol(i)}"></b></div></li>`).join('')}</ul>
<div class="dn3f"><div><span>Total</span><b>${esc(fmt(T))}</b></div><div><span>Largest</span><b title="${esc(top.l)}">${esc(top.l)} · ${pc(top)}%</b></div><div><span>Categories</span><b>${items.length}</b></div></div></div>`
}
function dnSet(root, i) { const a = JSON.parse(root.dataset.cn)[i == null ? 0 : i + 1], v = root.querySelector('.dcv'); v.textContent = a[0]; v.style.fontSize = (a[0].length > 9 ? 14 : a[0].length > 7 ? 16 : 18) + 'px'; root.querySelector('.dcl').textContent = a[1].length > 18 ? a[1].slice(0, 17) + '…' : a[1]; root.querySelector('.dcs').textContent = a[2]; root.classList.toggle('hv', i != null); root.querySelectorAll('[data-dsi]').forEach(x => x.classList.toggle('hot', x.dataset.dsi == i)) }
document.addEventListener('mouseover', e => { const r = e.target.closest && e.target.closest('.dn3'); if (!r) return; const t = e.target.closest('[data-dsi]'); dnSet(r, t ? +t.dataset.dsi : null) });
document.addEventListener('mouseout', e => { const r = e.target.closest && e.target.closest('.dn3'); if (r && !(e.relatedTarget && r.contains(e.relatedTarget))) dnSet(r, null) });

function cartH() {
    const tot = CART.reduce((s, l) => s + lineT(l), 0), tax = CART.reduce((s, l) => s + lineT(l) * prod(l.p).gst / (100 + prod(l.p).gst), 0), ac = CART.some(l => prod(l.p).cat == 'Air Conditioners'), n = CART.reduce((s, l) => s + l.q, 0);
    return `<div class="hd"><h2>Current sale <span class="b">${n} item${n == 1 ? '' : 's'}</span></h2><button class="btn sm" data-act="cclr" ${CART.length ? '' : 'disabled'}>Clear</button></div><div class="cbody"><div class="cl2">${CART.map((l, i) => { const p = prod(l.p); return `<div class="cr"><div style="display:flex;gap:10px;align-items:flex-start">${th(p)}<div style="flex:1;min-width:0"><b>${esc(p.name)}</b><small class="mu" style="display:block">${esc(p.sku)} · ${inr(p.price)} each · GST ${p.gst}%</small></div><button class="ib" style="width:30px;height:30px" data-act="cx" data-i="${i}" aria-label="Remove ${esc(p.name)}">×</button></div><div style="display:flex;justify-content:space-between;align-items:center;gap:8px">${p.ser ? `<select data-sn="${i}" aria-label="Serial number" style="flex:1;min-height:34px">${p.units.filter(u => u.st == 'In stock').map(u => `<option ${u.sn == l.sn ? 'selected' : ''}>${esc(u.sn)}</option>`).join('')}</select>` : `<div class="qt"><button data-act="cq" data-i="${i}" data-d="-1" aria-label="Decrease">−</button><b>${l.q}</b><button data-act="cq" data-i="${i}" data-d="1" aria-label="Increase">+</button></div>`}<b>${inr(lineT(l))}</b></div></div>` }).join('') || '<div class="empty">Cart is empty. Select a product.</div>'}</div>
<div class="pad"><div class="fg" style="margin-top:0"><label>Customer<select id="ccust" name="ccust" aria-label="Customer"><option value="" ${!CUST ? 'selected' : ''}>Walk-in customer (No customer record)</option><option value="__new" ${CUST == '__new' ? 'selected' : ''}>+ Add new customer</option>${S.customers.map(c => `<option value="${c.id}" ${c.id == CUST ? 'selected' : ''} data-sub="${esc(c.phone + (c.city ? ' · ' + c.city : ''))}">${esc(c.name)} · ${esc(c.phone)}</option>`).join('')}</select></label>${CUST == '__new' ? `<div class="nc"><label>Name *<input id="ncn" value="${esc(NC.name)}" autocomplete="off"></label><label>Mobile *<input id="ncp" inputmode="tel" placeholder="98250 12345" value="${esc(NC.phone)}"></label><label>City<input id="ncc" value="${esc(NC.city)}"></label><small class="mu">Saved as a new customer when you complete the sale.</small></div>` : ''}<label>Payment (simulated)<select id="cpay">${['UPI', 'Cash', 'Card', 'Bank transfer'].map(x => `<option ${x == PAY ? 'selected' : ''}>${x}</option>`).join('')}</select></label>${ac && CUST ? `<label class="row"><input type="checkbox" id="cplan" ${PLAN ? 'checked' : ''}>Include Complimentary AC Service plan</label>` : ''}</div></div></div>
<div class="cft"><dl class="kv" style="grid-template-columns:1fr auto"><dt>Subtotal (ex GST)</dt><dd>${inr(Math.round(tot - tax))}</dd><dt>GST included</dt><dd>${inr(Math.round(tax))}</dd><dt><b>Total</b></dt><dd><b>${inr(tot)}</b></dd></dl><button class="btn pri" style="width:100%;justify-content:center" data-act="sale" ${CART.length ? '' : 'disabled'}>Complete sale</button></div>`
}

document.addEventListener('click', e => { if (e.target.closest && (e.target.closest('[data-job]') || e.target.closest('.ev'))) return; const x = e.target.closest && e.target.closest('button[data-cday]'); if (x) { CD = x.dataset.cday; CV = 'day'; render(true) } });
function calendar() {
    const act = j => !['Completed', 'Cancelled'].includes(j.status), js = S.jobs.filter(j => j.status != 'Cancelled' && (!CT || j.tech == CT)), un = js.filter(j => !j.appt && act(j)), jf = i => js.filter(j => j.appt == i), B0 = new Date(CD + 'T00:00:00Z'), y = B0.getUTCFullYear(), mo = B0.getUTCMonth(), t0 = D(0), ms = `${y}-${pz(mo + 1)}`,
        L = (d, o) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-IN', { timeZone: 'UTC', ...o }), dow = d => new Date(d + 'T00:00:00Z').getUTCDay(), WK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        pill = j => `<button class="ev ${BK[j.status] || ''}" ${act(j) ? 'draggable="true"' : ''} data-job="${j.id}" title="${esc(cust(j.cid).name)}, ${esc(j.type)}, ${esc(j.tech || 'Unassigned')}, ${j.status}"><i></i><span>${esc(cust(j.cid).name.split(' ')[0])}</span><em>${esc(j.type)}</em></button>`,
        cell = (d, o) => { const a = jf(d), m = o.max || 99; return `<div class="cd${d == t0 ? ' today' : ''}${o.out ? ' out' : ''}${dow(d) % 6 == 0 ? ' we' : ''}" data-date="${d}" style="min-height:${o.min}px"><div class="ch"><button class="dn" data-cday="${d}" aria-label="Open ${L(d, { day: 'numeric', month: 'long' })}">${+d.slice(8)}</button>${o.w ? `<span class="wd">${L(d, { weekday: 'long' })}</span>` : ''}${a.length ? `<span class="cn">${a.length}</span>` : ''}</div><div class="ev-list">${a.slice(0, m).map(pill).join('')}${a.length > m ? `<button class="mr" data-cday="${d}">+${a.length - m} more</button>` : ''}</div>${a.length ? `<div class="ev-dots">${a.slice(0, 3).map(j => `<i class="${BK[j.status] || ''}"></i>`).join('')}${a.length > 3 ? `<small>+${a.length - 3}</small>` : ''}</div>` : ''}</div>` };
    let body, title, cnt;
    if (CV == 'month') { const first = `${ms}-01`, fw = dow(first), dim = new Date(Date.UTC(y, mo + 1, 0)).getUTCDate(), wks = Math.ceil((fw + dim) / 7), s0 = cdd(first, -fw); title = L(CD, { month: 'long', year: 'numeric' }); cnt = js.filter(j => j.appt && j.appt.startsWith(ms)).length; let c = ''; for (let i = 0; i < wks * 7; i++) { const d = cdd(s0, i); c += cell(d, { min: 112, max: 3, out: !d.startsWith(ms) }) } body = `<div class="cal-g">${WK.map(d => `<div class="cal-h">${d}</div>`).join('')}${c}</div>` }
    else if (CV == 'week') { const w0 = cdd(CD, -dow(CD)), ds = [...Array(7)].map((_, i) => cdd(w0, i)); title = L(ds[0], { day: 'numeric', month: 'short' }) + ' – ' + L(ds[6], { day: 'numeric', month: 'short', year: 'numeric' }); cnt = ds.reduce((s, d) => s + jf(d).length, 0); body = `<div class="cal-g wk">${ds.map(d => `<div class="cal-h">${L(d, { weekday: 'short' })}</div>`).join('')}${ds.map(d => cell(d, { min: 230, w: 1 })).join('')}</div>` }
    else if (CV == 'day') { const ts = [...S.team.filter(t => t.role == 'Technician' && t.active !== false).map(t => t.name), 'Unassigned'].filter(n => !CT || n == CT), all = jf(CD); title = L(CD, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }); cnt = all.length; body = ts.map(n => { const a = all.filter(j => (j.tech || 'Unassigned') == n); return `<div class="dv-h"><b>${esc(n)}</b><span class="b">${a.length} job${a.length == 1 ? '' : 's'}</span></div>${a.map(j => `<div class="li" data-job="${j.id}" tabindex="0" style="cursor:pointer"><div><b>${esc(cust(j.cid).name)}</b><small>${esc(j.type)} · ${esc(asset(j.ac).brand + ' ' + asset(j.ac).model)}</small></div>${B(j.status)}</div>`).join('') || '<div class="mu" style="padding:10px 16px;font-size:13px">No jobs</div>'}` }).join('') }
    else { title = L(CD, { month: 'long', year: 'numeric' }); const a = js.filter(j => j.appt && j.appt.startsWith(ms)).sort((p, q) => p.appt > q.appt ? 1 : -1), g = {}; a.forEach(j => (g[j.appt] = g[j.appt] || []).push(j)); cnt = a.length; body = Object.keys(g).map(d => `<div class="ag"><div class="agd${d == t0 ? ' t' : ''}"><b>${+d.slice(8)}</b><span>${L(d, { weekday: 'short', month: 'short' })}</span></div><div class="ag-items">${g[d].map(x => `<div class="li" data-job="${x.id}" tabindex="0" style="cursor:pointer"><div><b>${esc(cust(x.cid).name)}</b><small>${esc(x.type)} · ${esc(x.tech || 'Unassigned')}</small></div>${B(x.status)}</div>`).join('')}</div></div>`).join('') || '<div class="empty">No appointments this month</div>' }
    const today = jf(t0), techs = S.team.filter(t => t.role == 'Technician' && t.active !== false);
    return `<div class="pg cal"><div class="ph"><div><h1>Calendar</h1><p>Drag a job onto a date in Month or Week view to reschedule it, or open it and choose Reschedule.</p></div><button class="btn pri" data-act="add-job">${ic('plus')}New appointment</button></div>
<div class="calbar"><div class="cal-t"><h2 class="cal-title">${title}</h2><span class="mu">${cnt} appointment${cnt == 1 ? '' : 's'}</span></div><div class="cal-ctl"><div class="seg-b"><button data-act="cal" data-v="prev" aria-label="Previous">‹</button><button data-act="cal" data-v="today">Today</button><button data-act="cal" data-v="next" aria-label="Next">›</button></div><div class="tabs" role="tablist">${['month', 'week', 'day', 'agenda'].map(v => `<button role="tab" aria-selected="${CV == v}" class="${CV == v ? 'on' : ''}" data-act="cal" data-v="${v}">${v[0].toUpperCase() + v.slice(1)}</button>`).join('')}</div><select id="ctech" aria-label="Technician"><option value="">All technicians</option>${techs.map(t => `<option ${t.name == CT ? 'selected' : ''}>${esc(t.name)}</option>`).join('')}</select></div></div>
<div class="cw"><div class="panel">${body}<div class="lg"><span><i style="background:var(--ac)"></i>Booked, assigned</span><span><i style="background:var(--wa)"></i>Due, in progress</span><span><i style="background:var(--ok)"></i>Completed</span></div></div>
<div class="cside"><div class="panel"><div class="hd"><h2>Today</h2><span class="mu">${L(t0, { day: 'numeric', month: 'short' })}</span></div><div class="pad">${today.map(pill).join('') || '<span class="mu">No jobs today</span>'}</div></div><div class="panel"><div class="hd"><h2>Unscheduled (${un.length})</h2></div><div class="pad">${un.map(pill).join('') || '<span class="mu">All jobs are scheduled</span>'}</div></div></div></div></div>`
}

V.page = location.hash.slice(1) || 'overview'; if (!NAV.some(n => n[0] == V.page.split('/')[0])) V.page = 'overview'; V.k = ['overview', 'calendar', 'reports', 'settings'].includes(V.page) ? '' : V.page; render();
document.addEventListener('change', e => {
    if (e.target && e.target.classList.contains('perm-mod-toggle')) {
        const mod = e.target.dataset.mod;
        const sub = document.querySelector(`#perm-sub-${mod}`);
        if (sub) {
            sub.style.opacity = e.target.checked ? '' : '.45';
            sub.style.pointerEvents = e.target.checked ? '' : 'none';
            if (e.target.checked) {
                const v = document.querySelector(`[name="mod_${mod}_view"]`);
                if (v) v.checked = true;
            }
        }
    }
});
