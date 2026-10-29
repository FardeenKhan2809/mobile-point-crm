"use strict";

let PAGE = 'overview';
let SUB = null;

const $ = (s, e = document) => e.querySelector(s);
const $$ = (s, e = document) => Array.from(e.querySelectorAll(s));
const $$e = (e, s) => Array.from(e.querySelectorAll(s));
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

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

const IC = {
    logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',
    home: 'M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
    users: 'M16 20v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 20v-1a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
    wind: 'M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7a3 3 0 1 1-3 3',
    wrench: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z',
    zap: 'M13 2L3 14h8l-1 8 10-12h-8z',
    msg: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
    star: 'M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5 7.5-.7z',
    cal: 'M3 5h18v16H3zM3 10h18M8 3v4M16 3v4',
    chart: 'M4 20V10M10 20V4M16 20v-8M22 20H2',
    list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
    file: 'M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8zM14 3v5h5',
    team: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M4 21a8 8 0 0 1 16 0',
    gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M12 2v3M12 19v3M2 12h3M19 12h3',
    plus: 'M12 5v14M5 12h14',
    menu: 'M3 6h18M3 12h18M3 18h18',
    search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16M21 21l-4.3-4.3',
    bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M10 21h4',
    moon: 'M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z',
    more: 'M5 12h.01M12 12h.01M19 12h.01',
    cart: 'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0',
    upl: 'M12 16V4M7 9l5-5 5 5M4 20h16',
    pulse: 'M22 12h-4l-3 9L9 3l-3 9H2',
    trash: 'M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
    eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    check: 'M20 6L9 17l-5-5',
    camera: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    send: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
    edit: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'
};

const ic = n => `<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${IC[n] || IC.more}"/></svg>`;
const D = n => { const x = new Date(); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10) };
const fd = s => s ? new Date(s + 'T00:00:00Z').toLocaleDateString('en-IN', { timeZone: 'UTC', day: 'numeric', month: 'short', year: 'numeric' }) : '—';
const fds = s => s ? new Date(s + 'T00:00:00Z').toLocaleDateString('en-IN', { timeZone: 'UTC', day: 'numeric', month: 'short' }) : '—';
const inr = n => '₹' + Number(n || 0).toLocaleString('en-IN');
const ini = n => String(n || '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'MP';

const BK = {
    Completed: 'ok', Installed: 'ok', Delivered: 'ok', Active: 'ok',
    Sent: 'ac', ReminderSent: 'ac', Booked: 'ac',
    'Due soon': 'wa', Due: 'wa', Pending: 'wa', 'Pending Installation': 'wa', Scheduled: 'wa',
    Overdue: 'er', Failed: 'er', Cancelled: 'er', Inactive: 'er'
};
const B = s => `<span class="b ${BK[s] || ''}">${esc(s)}</span>`;

const KEY = 'mpac-v3';

const MODULE_DEFS = [
    { id: 'customers', title: 'Customers', desc: 'Customer registry with addresses, landmarks, and WhatsApp contacts', icon: 'users', hasEdit: true, hasDelete: true },
    { id: 'products', title: 'AC Products', desc: 'AC catalog with brand, model, serials, and technical specs', icon: 'wind', hasEdit: true, hasDelete: true },
    { id: 'sales', title: 'Sales Management', desc: 'Record sales, installation tracking, photos, and sale records', icon: 'cart', hasEdit: true, hasDelete: true },
    { id: 'invoices', title: 'Invoices', desc: 'Generate and print customer tax invoices and sales memos', icon: 'file', hasEdit: true, hasDelete: true },
    { id: 'calendar', title: 'Service Calendar', desc: 'Track upcoming and past 1st and 2nd AC free service schedules', icon: 'cal', hasEdit: true, hasDelete: false },
    { id: 'engagements', title: 'WhatsApp Automations', desc: 'Automated greeting, welcome, service reminders, and promotions', icon: 'zap', hasEdit: true, hasDelete: true },
    { id: 'reports', title: 'Insights & Reports', desc: 'Brand sales share, service compliance, and area distribution', icon: 'chart', hasExport: true },
    { id: 'admin', title: 'System Administration', desc: 'User permissions, staff accounts, and shop settings', icon: 'gear', hasManage: true }
];

const PRESETS = {
    admin: {
        label: 'Full Administrator',
        desc: 'Unrestricted access to all modules and system controls',
        perms: {
            customers: { enabled: true, view: true, edit: true, delete: true },
            products: { enabled: true, view: true, edit: true, delete: true },
            sales: { enabled: true, view: true, edit: true, delete: true },
            invoices: { enabled: true, view: true, edit: true, delete: true },
            calendar: { enabled: true, view: true, edit: true, delete: true },
            engagements: { enabled: true, view: true, edit: true, delete: true },
            reports: { enabled: true, view: true, export: true },
            admin: { enabled: true, view: true, manage: true }
        }
    },
    manager: {
        label: 'Sales & Service Manager',
        desc: 'Operational management of sales, customers, AC catalog, and WhatsApp service reminders',
        perms: {
            customers: { enabled: true, view: true, edit: true, delete: false },
            products: { enabled: true, view: true, edit: true, delete: false },
            sales: { enabled: true, view: true, edit: true, delete: false },
            invoices: { enabled: true, view: true, edit: true, delete: false },
            calendar: { enabled: true, view: true, edit: true, delete: false },
            engagements: { enabled: true, view: true, edit: true, delete: false },
            reports: { enabled: true, view: true, export: true },
            admin: { enabled: false, view: false, manage: false }
        }
    },
    staff: {
        label: 'Front Desk / Sales Rep',
        desc: 'Record new AC sales, register customers, and check calendar schedules',
        perms: {
            customers: { enabled: true, view: true, edit: true, delete: false },
            products: { enabled: true, view: true, edit: false, delete: false },
            sales: { enabled: true, view: true, edit: true, delete: false },
            invoices: { enabled: true, view: true, edit: false, delete: false },
            calendar: { enabled: true, view: true, edit: false, delete: false },
            engagements: { enabled: true, view: true, edit: false, delete: false },
            reports: { enabled: false, view: false, export: false },
            admin: { enabled: false, view: false, manage: false }
        }
    }
};

const defaultUsers = [
    {
        id: 'U1',
        name: 'Rajesh Amin',
        email: 'rajesh@mobilepoint.in',
        phone: '+91 98250 00000',
        rolePreset: 'admin',
        customized: false,
        lastLogin: 'Today, 09:30 AM',
        status: 'Active',
        permissions: JSON.parse(JSON.stringify(PRESETS.admin.perms))
    },
    {
        id: 'U2',
        name: 'Hetal Modi',
        email: 'hetal@mobilepoint.in',
        phone: '+91 98250 44112',
        rolePreset: 'manager',
        customized: false,
        lastLogin: 'Yesterday, 04:15 PM',
        status: 'Active',
        permissions: JSON.parse(JSON.stringify(PRESETS.manager.perms))
    },
    {
        id: 'U3',
        name: 'Suresh Rathod',
        email: 'suresh@mobilepoint.in',
        phone: '+91 98250 88234',
        rolePreset: 'staff',
        customized: false,
        lastLogin: '28 Oct, 11:20 AM',
        status: 'Active',
        permissions: JSON.parse(JSON.stringify(PRESETS.staff.perms))
    }
];

let currentUser = defaultUsers[0];

function userPermSummary(u) {
    const p = u.permissions || {};
    const activeKeys = MODULE_DEFS.filter(m => p[m.id] && p[m.id].enabled).map(m => m.id);
    if (activeKeys.length === MODULE_DEFS.length) return '<span class="b ok">Full Access</span>';
    if (activeKeys.length === 0) return '<span class="b er">No Access</span>';
    return `<span class="b ac">${activeKeys.length} of ${MODULE_DEFS.length} Modules</span>`;
}

function makeDemoDocSvg(title, subtitle, color = '#0284c7') {
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="300" height="200">
<rect width="300" height="200" rx="8" fill="#f8fafc"/>
<rect x="15" y="15" width="270" height="170" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
<rect x="25" y="25" width="40" height="40" rx="6" fill="${color}"/>
<path d="M35 45h20M35 52h14" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
<text x="75" y="42" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0f172a">${title}</text>
<text x="75" y="58" font-family="sans-serif" font-size="11" fill="#64748b">${subtitle}</text>
<line x1="25" y1="75" x2="275" y2="75" stroke="#e2e8f0" stroke-width="1.5"/>
<rect x="25" y="90" width="120" height="8" rx="4" fill="#e2e8f0"/>
<rect x="25" y="105" width="180" height="8" rx="4" fill="#f1f5f9"/>
<rect x="25" y="120" width="150" height="8" rx="4" fill="#f1f5f9"/>
<rect x="25" y="145" width="70" height="22" rx="4" fill="#e0f2fe"/>
<text x="35" y="160" font-family="sans-serif" font-size="10" font-weight="bold" fill="#0284c7">VERIFIED</text>
</svg>`);
}

function seed() {
    const customers = [
        { id: 'C101', name: 'Aarav Patel', address: 'Flat 402, Shivalik Residency, Opp. Sun Pharma Campus', landmark: 'Near Sun Pharma Road', locality: 'Atladara', pincode: '390012', phone: '+91 98250 11201', altPhone: '+91 94280 11201', active: true, created: D(-160) },
        { id: 'C102', name: 'Diya Shah', address: '12, Nilkanth Villa, BPC Road', landmark: 'Behind Inox Cinema', locality: 'Alkapuri', pincode: '390007', phone: '+91 98250 22302', altPhone: '+91 94280 22302', active: true, created: D(-135) },
        { id: 'C103', name: 'Rohan Mehta', address: 'B-24, Shreeji Krupa Society, Tarsali Bypass', landmark: 'Opp. D-Mart', locality: 'Tarsali', pincode: '390009', phone: '+91 98250 33403', altPhone: '+91 94280 33403', active: true, created: D(-115) },
        { id: 'C104', name: 'Ananya Joshi', address: 'Penthouse 901, Royal Heights, Vasna-Bhayli Road', landmark: 'Near Bright School', locality: 'Vasna', pincode: '390015', phone: '+91 98250 44504', altPhone: '+91 94280 44504', active: true, created: D(-320) },
        { id: 'C105', name: 'Kabir Desai', address: 'Plot 45, Vaikunth Bunglows, Gotri Road', landmark: 'Opp. Yash Complex', locality: 'Gotri', pincode: '390021', phone: '+91 98250 55605', altPhone: '+91 94280 55605', active: true, created: D(-80) },
        { id: 'C106', name: 'Meera Trivedi', address: '8, Shreenath Duplex, Waghodia Road', landmark: 'Near Parul Institute City Office', locality: 'Waghodia', pincode: '390019', phone: '+91 98250 66706', altPhone: '+91 94280 66706', active: true, created: D(-60) },
        { id: 'C107', name: 'Vikram Solanki', address: 'Flat 203, Darshanam Antica, Sayajigunj', landmark: 'Near Railway Station', locality: 'Sayajigunj', pincode: '390005', phone: '+91 98250 77807', altPhone: '+91 94280 77807', active: true, created: D(-40) },
        { id: 'C108', name: 'Isha Parmar', address: '16, Samarpan Society, Manjalpur Main Road', landmark: 'Opp. Shreyas School', locality: 'Manjalpur', pincode: '390011', phone: '+91 98250 88908', altPhone: '+91 94280 88908', active: true, created: D(-25) },
        { id: 'C109', name: 'Nikhil Rana', address: 'A-102, Greenwoods, Fatehgunj', landmark: 'Near MSU Polytechnic', locality: 'Fatehgunj', pincode: '390002', phone: '+91 98250 99009', altPhone: '+91 94280 99009', active: true, created: D(-15) },
        { id: 'C110', name: 'Sneha Kulkarni', address: 'Villa 5, Silver Oak, Sevasi Canal Road', landmark: 'Near Sindhrot Checkpost', locality: 'Sevasi', pincode: '391101', phone: '+91 98250 10110', altPhone: '+91 94280 10110', active: true, created: D(-5) }
    ];

    const products = [
        {
            id: 'P1001',
            brand: 'Daikin',
            model: 'FTKF35',
            name: 'Daikin FTKF35',
            capacity: '1.0 Ton',
            star: '5 Star',
            type: 'Split AC',
            invType: 'Inverter',
            condenser: '100% Copper',
            refrig: 'R32',
            warr: '1 Year Comprehensive + 10 Years Compressor',
            desc: 'PM 2.5 filter, Triple Display, 3D Airflow, Dew Clean technology',
            serials: ['DK-89211', 'DK-89212', 'DK-89213']
        },
        {
            id: 'P1002',
            brand: 'LG',
            model: 'PS-Q19',
            name: 'LG PS-Q19',
            capacity: '1.5 Ton',
            star: '5 Star',
            type: 'Split AC',
            invType: 'Dual Inverter',
            condenser: '100% Copper with Ocean Black Protection',
            refrig: 'R32',
            warr: '1 Year Comprehensive + 10 Years Compressor',
            desc: 'AI Dual Inverter, 6-in-1 convertible cooling, HD Filter with Anti-Virus protection',
            serials: ['LG-77401', 'LG-77402', 'LG-77403', 'LG-77404']
        },
        {
            id: 'P1003',
            brand: 'Voltas',
            model: '185V Vectra',
            name: 'Voltas 185V Vectra',
            capacity: '1.5 Ton',
            star: '3 Star',
            type: 'Split AC',
            invType: 'Inverter',
            condenser: '100% Copper',
            refrig: 'R32',
            warr: '1 Year Comprehensive + 10 Years Compressor',
            desc: 'Adjustable cooling with 4 modes, Anti-dust filter, Turbo cooling at 52°C',
            serials: ['VT-63101', 'VT-63102']
        },
        {
            id: 'P1004',
            brand: 'Hitachi',
            model: 'Kashikoi 5400FX',
            name: 'Hitachi Kashikoi 5400FX',
            capacity: '1.5 Ton',
            star: '5 Star',
            type: 'Split AC',
            invType: 'Inverter',
            condenser: '100% Inner Grooved Copper',
            refrig: 'R410A',
            warr: '1 Year Comprehensive + 10 Years Compressor',
            desc: 'expandable inverter technology, FrostWash auto-cleaning, ambience light',
            serials: ['HT-52011', 'HT-52012']
        },
        {
            id: 'P1005',
            brand: 'Blue Star',
            model: 'IC318',
            name: 'Blue Star IC318',
            capacity: '1.5 Ton',
            star: '3 Star',
            type: 'Split AC',
            invType: 'Inverter',
            condenser: '100% Copper',
            refrig: 'R32',
            warr: '1 Year Comprehensive + 10 Years Compressor',
            desc: '5-in-1 convertible, Turbo Cool, Acoustic jacket compressor',
            serials: ['BS-41801', 'BS-41802', 'BS-41803']
        },
        {
            id: 'P1006',
            brand: 'Lloyd',
            model: 'GLS18I5',
            name: 'Lloyd GLS18I5',
            capacity: '1.5 Ton',
            star: '5 Star',
            type: 'Split AC',
            invType: 'Inverter',
            condenser: '100% Copper Golden Fins',
            refrig: 'R32',
            warr: '1 Year Comprehensive + 10 Years Compressor',
            desc: 'Rapid cooling in 45 seconds, 5-in-1 convertible, Anti-viral filter',
            serials: ['LL-30911', 'LL-30912']
        },
        {
            id: 'P1007',
            brand: 'Panasonic',
            model: 'CS-EU18',
            name: 'Panasonic CS-EU18',
            capacity: '1.5 Ton',
            star: '3 Star',
            type: 'Split AC',
            invType: 'Twin Inverter',
            condenser: '100% Copper Shield Blu',
            refrig: 'R32',
            warr: '1 Year Comprehensive + 10 Years Compressor',
            desc: 'Miraie IoT enabled, PM 0.1 Air Purification, 7-in-1 convertible',
            serials: ['PN-22101', 'PN-22102']
        },
        {
            id: 'P1008',
            brand: 'Carrier',
            model: 'Empack 12K',
            name: 'Carrier Empack 12K',
            capacity: '1.0 Ton',
            star: '3 Star',
            type: 'Split AC',
            invType: 'Inverter',
            condenser: '100% Copper Hydrophilic Blue Fins',
            refrig: 'R32',
            warr: '1 Year Comprehensive + 10 Years Compressor',
            desc: 'Insta Cool mode, PM 2.5 Micron filter, Dual Filtration system',
            serials: ['CR-11001', 'CR-11002']
        }
    ];

    const sales = [
        {
            id: 'SALE-1001',
            cid: 'C101',
            cname: 'Aarav Patel',
            caddress: 'Flat 402, Shivalik Residency, Opp. Sun Pharma Campus',
            clandmark: 'Near Sun Pharma Road',
            clocality: 'Atladara',
            cpincode: '390012',
            cphone: '+91 98250 11201',
            caltPhone: '+91 94280 11201',
            pid: 'P1001',
            brand: 'Daikin',
            model: 'FTKF35',
            capacity: '1.0 Ton',
            star: '5 Star',
            sn: 'DK-89211',
            purDate: D(-160),
            shop: 'Mobile Point AC Care',
            instDate: D(-159),
            status: 'Installed',
            by: 'Rajesh Amin',
            notes: 'Installed on 4th floor balcony. Outdoor bracket supplied.',
            images: [
                makeDemoDocSvg('Tax Invoice #1001', 'Sale of Daikin FTKF35 AC', '#0284c7'),
                makeDemoDocSvg('Warranty Card', 'Daikin 10-Yr Compressor Warranty', '#10b981'),
                makeDemoDocSvg('Installation Photo', 'Balcony Outdoor Mount Verified', '#f59e0b')
            ],
            s1: { date: D(-40), status: 'Completed', sent: D(-45), completedDate: D(-38) },
            s2: { date: D(170), status: 'Scheduled', sent: '', completedDate: '' }
        },
        {
            id: 'SALE-1002',
            cid: 'C102',
            cname: 'Diya Shah',
            caddress: '12, Nilkanth Villa, BPC Road',
            clandmark: 'Behind Inox Cinema',
            clocality: 'Alkapuri',
            cpincode: '390007',
            cphone: '+91 98250 22302',
            caltPhone: '+91 94280 22302',
            pid: 'P1002',
            brand: 'LG',
            model: 'PS-Q19',
            capacity: '1.5 Ton',
            star: '5 Star',
            sn: 'LG-77401',
            purDate: D(-135),
            shop: 'Mobile Point AC Care',
            instDate: D(-134),
            status: 'Installed',
            by: 'Hetal Modi',
            notes: 'Master bedroom installation.',
            images: [
                makeDemoDocSvg('Invoice #1002', 'LG Dual Inverter 1.5T', '#0284c7'),
                makeDemoDocSvg('Installation Photo', 'Outdoor Unit Terrace Mounting', '#10b981')
            ],
            s1: { date: D(-15), status: 'Due', sent: D(-18), completedDate: '' },
            s2: { date: D(195), status: 'Scheduled', sent: '', completedDate: '' }
        },
        {
            id: 'SALE-1003',
            cid: 'C103',
            cname: 'Rohan Mehta',
            caddress: 'B-24, Shreeji Krupa Society, Tarsali Bypass',
            clandmark: 'Opp. D-Mart',
            clocality: 'Tarsali',
            cpincode: '390009',
            cphone: '+91 98250 33403',
            caltPhone: '+91 94280 33403',
            pid: 'P1003',
            brand: 'Voltas',
            model: '185V Vectra',
            capacity: '1.5 Ton',
            star: '3 Star',
            sn: 'VT-63101',
            purDate: D(-115),
            shop: 'Mobile Point AC Care',
            instDate: D(-114),
            status: 'Installed',
            by: 'Suresh Rathod',
            notes: 'Ground floor living hall.',
            images: [
                makeDemoDocSvg('Invoice #1003', 'Voltas Vectra AC', '#0284c7'),
                makeDemoDocSvg('Warranty Certificate', 'Voltas Official Warranty', '#10b981')
            ],
            s1: { date: D(5), status: 'Due', sent: '', completedDate: '' },
            s2: { date: D(215), status: 'Scheduled', sent: '', completedDate: '' }
        },
        {
            id: 'SALE-1004',
            cid: 'C104',
            cname: 'Ananya Joshi',
            caddress: 'Penthouse 901, Royal Heights, Vasna-Bhayli Road',
            clandmark: 'Near Bright School',
            clocality: 'Vasna',
            cpincode: '390015',
            cphone: '+91 98250 44504',
            caltPhone: '+91 94280 44504',
            pid: 'P1004',
            brand: 'Hitachi',
            model: 'Kashikoi 5400FX',
            capacity: '1.5 Ton',
            star: '5 Star',
            sn: 'HT-52011',
            purDate: D(-320),
            shop: 'Mobile Point AC Care',
            instDate: D(-319),
            status: 'Installed',
            by: 'Rajesh Amin',
            notes: 'Top floor suite installation.',
            images: [
                makeDemoDocSvg('Invoice #1004', 'Hitachi Kashikoi 5-Star', '#0284c7')
            ],
            s1: { date: D(-200), status: 'Completed', sent: D(-205), completedDate: D(-198) },
            s2: { date: D(10), status: 'Due', sent: D(-2), completedDate: '' }
        },
        {
            id: 'SALE-1005',
            cid: 'C105',
            cname: 'Kabir Desai',
            caddress: 'Plot 45, Vaikunth Bunglows, Gotri Road',
            clandmark: 'Opp. Yash Complex',
            clocality: 'Gotri',
            cpincode: '390021',
            cphone: '+91 98250 55605',
            caltPhone: '+91 94280 55605',
            pid: 'P1005',
            brand: 'Blue Star',
            model: 'IC318',
            capacity: '1.5 Ton',
            star: '3 Star',
            sn: 'BS-41801',
            purDate: D(-80),
            shop: 'Mobile Point AC Care',
            instDate: D(-79),
            status: 'Installed',
            by: 'Hetal Modi',
            notes: 'Study room installation.',
            images: [
                makeDemoDocSvg('Invoice #1005', 'Blue Star Inverter AC', '#0284c7'),
                makeDemoDocSvg('Installation Signoff', 'Customer Signature', '#10b981')
            ],
            s1: { date: D(40), status: 'Scheduled', sent: '', completedDate: '' },
            s2: { date: D(250), status: 'Scheduled', sent: '', completedDate: '' }
        },
        {
            id: 'SALE-1006',
            cid: 'C106',
            cname: 'Meera Trivedi',
            caddress: '8, Shreenath Duplex, Waghodia Road',
            clandmark: 'Near Parul Institute City Office',
            clocality: 'Waghodia',
            cpincode: '390019',
            cphone: '+91 98250 66706',
            caltPhone: '+91 94280 66706',
            pid: 'P1006',
            brand: 'Lloyd',
            model: 'GLS18I5',
            capacity: '1.5 Ton',
            star: '5 Star',
            sn: 'LL-30911',
            purDate: D(-60),
            shop: 'Mobile Point AC Care',
            instDate: D(-59),
            status: 'Installed',
            by: 'Suresh Rathod',
            notes: 'Dining area installation.',
            images: [
                makeDemoDocSvg('Invoice #1006', 'Lloyd 5-Star Split AC', '#0284c7')
            ],
            s1: { date: D(60), status: 'Scheduled', sent: '', completedDate: '' },
            s2: { date: D(270), status: 'Scheduled', sent: '', completedDate: '' }
        },
        {
            id: 'SALE-1007',
            cid: 'C107',
            cname: 'Vikram Solanki',
            caddress: 'Flat 203, Darshanam Antica, Sayajigunj',
            clandmark: 'Near Railway Station',
            clocality: 'Sayajigunj',
            cpincode: '390005',
            cphone: '+91 98250 77807',
            caltPhone: '+91 94280 77807',
            pid: 'P1007',
            brand: 'Panasonic',
            model: 'CS-EU18',
            capacity: '1.5 Ton',
            star: '3 Star',
            sn: 'PN-22101',
            purDate: D(-40),
            shop: 'Mobile Point AC Care',
            instDate: D(-39),
            status: 'Installed',
            by: 'Rajesh Amin',
            notes: 'Kids bedroom installation.',
            images: [
                makeDemoDocSvg('Invoice #1007', 'Panasonic IoT Smart AC', '#0284c7')
            ],
            s1: { date: D(80), status: 'Scheduled', sent: '', completedDate: '' },
            s2: { date: D(290), status: 'Scheduled', sent: '', completedDate: '' }
        },
        {
            id: 'SALE-1008',
            cid: 'C108',
            cname: 'Isha Parmar',
            caddress: '16, Samarpan Society, Manjalpur Main Road',
            clandmark: 'Opp. Shreyas School',
            clocality: 'Manjalpur',
            cpincode: '390011',
            cphone: '+91 98250 88908',
            caltPhone: '+91 94280 88908',
            pid: 'P1008',
            brand: 'Carrier',
            model: 'Empack 12K',
            capacity: '1.0 Ton',
            star: '3 Star',
            sn: 'CR-11001',
            purDate: D(-25),
            shop: 'Mobile Point AC Care',
            instDate: D(-24),
            status: 'Installed',
            by: 'Hetal Modi',
            notes: 'Guest room.',
            images: [
                makeDemoDocSvg('Invoice #1008', 'Carrier Inverter 1.0T', '#0284c7')
            ],
            s1: { date: D(95), status: 'Scheduled', sent: '', completedDate: '' },
            s2: { date: D(305), status: 'Scheduled', sent: '', completedDate: '' }
        },
        {
            id: 'SALE-1009',
            cid: 'C109',
            cname: 'Nikhil Rana',
            caddress: 'A-102, Greenwoods, Fatehgunj',
            clandmark: 'Near MSU Polytechnic',
            clocality: 'Fatehgunj',
            cpincode: '390002',
            cphone: '+91 98250 99009',
            caltPhone: '+91 94280 99009',
            pid: 'P1002',
            brand: 'LG',
            model: 'PS-Q19',
            capacity: '1.5 Ton',
            star: '5 Star',
            sn: 'LG-77402',
            purDate: D(-15),
            shop: 'Mobile Point AC Care',
            instDate: D(-14),
            status: 'Installed',
            by: 'Suresh Rathod',
            notes: 'Installed with copper piping extension.',
            images: [
                makeDemoDocSvg('Invoice #1009', 'LG Dual Inverter 1.5T', '#0284c7')
            ],
            s1: { date: D(105), status: 'Scheduled', sent: '', completedDate: '' },
            s2: { date: D(315), status: 'Scheduled', sent: '', completedDate: '' }
        },
        {
            id: 'SALE-1010',
            cid: 'C110',
            cname: 'Sneha Kulkarni',
            caddress: 'Villa 5, Silver Oak, Sevasi Canal Road',
            clandmark: 'Near Sindhrot Checkpost',
            clocality: 'Sevasi',
            cpincode: '391101',
            cphone: '+91 98250 10110',
            caltPhone: '+91 94280 10110',
            pid: 'P1001',
            brand: 'Daikin',
            model: 'FTKF35',
            capacity: '1.0 Ton',
            star: '5 Star',
            sn: 'DK-89212',
            purDate: D(-3),
            shop: 'Mobile Point AC Care',
            instDate: D(1),
            status: 'Pending Installation',
            by: 'Rajesh Amin',
            notes: 'Scheduled for technician installation tomorrow afternoon.',
            images: [
                makeDemoDocSvg('Invoice #1010', 'Daikin FTKF35 AC Sale', '#0284c7')
            ],
            s1: { date: D(117), status: 'Scheduled', sent: '', completedDate: '' },
            s2: { date: D(327), status: 'Scheduled', sent: '', completedDate: '' }
        }
    ];

    const flows = [
        {
            id: 'F1',
            key: 'welcome',
            name: 'New Customer Registered - Welcome',
            desc: 'Sends a warm welcome message and introduces shop support channels when a new customer profile is created.',
            trig: 'New customer created',
            ch: 'WhatsApp',
            active: true,
            sentCount: 10,
            templateId: 'TP1'
        },
        {
            id: 'F2',
            key: 'purchase',
            name: 'Purchased AC - Greeting & Confirmation',
            desc: 'Sends purchase acknowledgment with AC brand, model, serial number, and scheduled installation details.',
            trig: 'New AC sale recorded',
            ch: 'WhatsApp',
            active: true,
            sentCount: 10,
            templateId: 'TP2'
        },
        {
            id: 'F3',
            key: 'service1',
            name: '1st Service Reminder (3 to 5 Months)',
            desc: 'Triggers automated reminder when 1st complimentary AC servicing is due within 3 to 5 months of purchase.',
            trig: '120 days post purchase / install',
            ch: 'WhatsApp',
            active: true,
            sentCount: 3,
            templateId: 'TP3'
        },
        {
            id: 'F4',
            key: 'service2',
            name: '2nd Service Reminder (Before 11 Months)',
            desc: 'Triggers critical reminder before 11 months of purchase to ensure warranty maintenance before the 1-year mark.',
            trig: '330 days post purchase / install',
            ch: 'WhatsApp',
            active: true,
            sentCount: 1,
            templateId: 'TP4'
        },
        {
            id: 'F5',
            key: 'promo',
            name: 'Promotional & Seasonal Offers',
            desc: 'Broadcast pre-summer inspections, AMC discounts, and festival exchange offers to customers on WhatsApp.',
            trig: 'Manual / Scheduled Broadcast',
            ch: 'WhatsApp',
            active: true,
            sentCount: 24,
            templateId: 'TP5'
        }
    ];

    const templates = [
        {
            id: 'TP1',
            name: 'New Customer Welcome',
            key: 'welcome',
            cat: 'Onboarding',
            body: 'Hello {{name}}! Welcome to {{shop}}. We are delighted to have you with us. Save this number for all your AC warranty, maintenance, and support queries.',
            active: true
        },
        {
            id: 'TP2',
            name: 'Purchased AC Greeting',
            key: 'purchase',
            cat: 'Sales',
            body: 'Dear {{name}}, thank you for purchasing your {{brand}} {{model}} AC (S/N: {{sn}}) from {{shop}}! Your installation is scheduled for {{instDate}}. You are entitled to 2 complimentary free services in the first year.',
            active: true
        },
        {
            id: 'TP3',
            name: '1st AC Service Reminder',
            key: 'service1',
            cat: 'Service',
            body: 'Hi {{name}}! Your 1st complimentary free AC service for your {{brand}} AC (S/N: {{sn}}) is now due! Please reply to this message to coordinate a convenient time for the company technician visit.',
            active: true
        },
        {
            id: 'TP4',
            name: '2nd AC Service Reminder',
            key: 'service2',
            cat: 'Service',
            body: 'Reminder: Dear {{name}}, your 2nd complimentary AC service for your {{brand}} AC (S/N: {{sn}}) is due before your 1-year warranty milestone. Claim your free servicing today!',
            active: true
        },
        {
            id: 'TP5',
            name: 'Promotional Summer Offer',
            key: 'promo',
            cat: 'Promotion',
            body: 'Summer Special Offer from {{shop}}! Get an exclusive 15% discount on AMC extensions and genuine AC accessories. Reply YES to book your pre-summer cooling tune-up!',
            active: true
        }
    ];

    const msgs = [
        { id: 'M7001', cid: 'C101', cname: 'Aarav Patel', phone: '+91 98250 11201', ch: 'WhatsApp', tpl: '1st AC Service Reminder', status: 'Delivered', time: D(-45), err: '' },
        { id: 'M7002', cid: 'C102', cname: 'Diya Shah', phone: '+91 98250 22302', ch: 'WhatsApp', tpl: '1st AC Service Reminder', status: 'Delivered', time: D(-18), err: '' },
        { id: 'M7003', cid: 'C104', cname: 'Ananya Joshi', phone: '+91 98250 44504', ch: 'WhatsApp', tpl: '2nd AC Service Reminder', status: 'Delivered', time: D(-2), err: '' },
        { id: 'M7004', cid: 'C110', cname: 'Sneha Kulkarni', phone: '+91 98250 10110', ch: 'WhatsApp', tpl: 'Purchased AC Greeting', status: 'Delivered', time: D(-3), err: '' },
        { id: 'M7005', cid: 'C110', cname: 'Sneha Kulkarni', phone: '+91 98250 10110', ch: 'WhatsApp', tpl: 'New Customer Welcome', status: 'Delivered', time: D(-5), err: '' },
        { id: 'M7006', cid: 'C109', cname: 'Nikhil Rana', phone: '+91 98250 99009', ch: 'WhatsApp', tpl: 'Purchased AC Greeting', status: 'Delivered', time: D(-15), err: '' },
        { id: 'M7007', cid: 'C108', cname: 'Isha Parmar', phone: '+91 98250 88908', ch: 'WhatsApp', tpl: 'Promotional Summer Offer', status: 'Delivered', time: D(-20), err: '' },
        { id: 'M7008', cid: 'C107', cname: 'Vikram Solanki', phone: '+91 98250 77807', ch: 'WhatsApp', tpl: 'Purchased AC Greeting', status: 'Delivered', time: D(-40), err: '' },
        { id: 'M7009', cid: 'C106', cname: 'Meera Trivedi', phone: '+91 98250 66706', ch: 'WhatsApp', tpl: 'Purchased AC Greeting', status: 'Delivered', time: D(-60), err: '' },
        { id: 'M7010', cid: 'C105', cname: 'Kabir Desai', phone: '+91 98250 55605', ch: 'WhatsApp', tpl: 'Promotional Summer Offer', status: 'Delivered', time: D(-70), err: '' }
    ];

    const notifs = [
        { id: 'N1', title: '1st Service Due', desc: 'Diya Shah (LG PS-Q19 1.5T) service window is active.', time: D(-1), unread: true, link: 'sales/SALE-1002' },
        { id: 'N2', title: '2nd Service Due', desc: 'Ananya Joshi (Hitachi Kashikoi) 2nd service due before 11 months.', time: D(-2), unread: true, link: 'sales/SALE-1004' },
        { id: 'N3', title: 'Installation Scheduled', desc: 'Sneha Kulkarni (Daikin FTKF35) pending installation tomorrow.', time: D(0), unread: true, link: 'sales/SALE-1010' },
        { id: 'N4', title: 'Upcoming Service', desc: 'Rohan Mehta (Voltas Vectra) 1st service due in 5 days.', time: D(0), unread: false, link: 'sales/SALE-1003' }
    ];

    const activity = [
        { id: 'A1', icon: 'cart', title: 'New Sale SALE-1010 Logged', desc: 'Daikin FTKF35 sold to Sneha Kulkarni.', time: D(-3) + ' 16:40', link: 'sales/SALE-1010' },
        { id: 'A2', icon: 'zap', title: 'WhatsApp Purchase Greeting Sent', desc: 'Greeting message dispatched to Sneha Kulkarni.', time: D(-3) + ' 16:42', link: 'engagements' },
        { id: 'A3', icon: 'zap', title: '2nd Service Reminder Sent', desc: 'Reminder dispatched to Ananya Joshi (+91 98250 44504).', time: D(-2) + ' 10:15', link: 'engagements' },
        { id: 'A4', icon: 'wrench', title: 'Service Completed', desc: '1st free service completed for Aarav Patel (Daikin FTKF35).', time: D(-38) + ' 15:30', link: 'sales/SALE-1001' }
    ];

    const set = {
        store: 'Mobile Point AC Care',
        gstin: '24ABCDE1234F1Z5',
        addr: 'Alkapuri, Vadodara, Gujarat 390007',
        phone: '+91 98250 00000',
        email: 'support@mobilepoint.in',
        theme: 'light',
        accent: '#0284c7',
        dens: 'comfortable',
        view: 'list',
        s1Days: 120,
        s2Days: 330,
        terms: 'All AC units carry official manufacturer warranty. Installation and technical services are provided directly by respective OEM brands.'
    };

    return {
        customers,
        products,
        sales,
        flows,
        templates,
        msgs,
        notifs,
        activity,
        users: JSON.parse(JSON.stringify(defaultUsers)),
        set
    };
}

let S;
try {
    const raw = localStorage.getItem(KEY);
    S = raw ? JSON.parse(raw) : null;
} catch (e) {
    S = null;
}

if (!S || !Array.isArray(S.sales) || !Array.isArray(S.customers)) {
    S = seed();
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
}

if (!S.set) S.set = {};
if (!S.set.store) S.set.store = 'Mobile Point AC Care';
if (!S.set.shopName) S.set.shopName = S.set.store;
if (!S.set.gstin) S.set.gstin = '24ABCDE1234F1Z5';
if (!S.set.addr) S.set.addr = 'Alkapuri, Vadodara, Gujarat 390007';
if (!S.set.address) S.set.address = S.set.addr;
if (!S.set.phone) S.set.phone = '+91 98250 00000';
if (!S.set.waPhone) S.set.waPhone = S.set.phone;
if (!S.set.email) S.set.email = 'support@mobilepoint.in';
if (!S.set.s1Days) S.set.s1Days = 120;
if (!S.set.s2Days) S.set.s2Days = 330;
if (!S.set.theme || S.set.theme === 'system') S.set.theme = 'light';
S.settings = S.set;
S.store = S.set.store;
S.shopName = S.set.shopName;
S.s1Days = S.set.s1Days;
S.s2Days = S.set.s2Days;
S.theme = S.set.theme;
S.accent = S.set.accent;
S.dens = S.set.dens;
S.view = S.set.view || 'list';

if (!S.automations) S.automations = S.flows;
if (!S.flows) S.flows = S.automations;
if (!S.waLogs) S.waLogs = S.msgs;
if (!S.msgs) S.msgs = S.waLogs;
if (!S.notifications) S.notifications = S.notifs;
if (!S.notifs) S.notifs = S.notifications;

(S.customers || []).forEach(c => {
    if (!c.waPhone) c.waPhone = c.phone;
    if (!c.phone) c.phone = c.waPhone;
});

(S.sales || []).forEach(s => {
    if (!s.customerWaPhone && s.phone) s.customerWaPhone = s.phone;
    if (!s.purchaseDate && s.pdate) s.purchaseDate = s.pdate;
    if (!s.installationDate && s.idate) s.installationDate = s.idate;
});

const SS = () => {
    if (!S.settings) S.settings = S.set;
    if (!S.set) S.set = S.settings;
    S.store = S.set.store;
    S.shopName = S.set.shopName;
    S.s1Days = S.set.s1Days;
    S.s2Days = S.set.s2Days;
    S.theme = S.set.theme;
    S.accent = S.set.accent;
    S.dens = S.set.dens;
    S.view = S.set.view || 'list';
    return S;
};
const save = () => {
    try {
        localStorage.setItem(KEY, JSON.stringify(S));
    } catch (e) {
        toast('Storage limit reached. Clear some photos or export backup.', 'er');
    }
};

const cust = id => S.customers.find(x => x.id === id) || { id, name: 'Unknown Customer', phone: '-', locality: '-', address: '' };
const prod = id => S.products.find(x => x.id === id) || { id, brand: 'AC', model: 'Unit', name: 'AC Unit', capacity: '1.5T', star: '3-Star', serials: [] };
const sale = id => S.sales.find(x => x.id === id);

const V = {
    page: 'overview',
    q: '',
    f: 'All',
    authView: 'login'
};

const NAV = [
    ['overview', 'Dashboard', 'home'],
    ['notifications', 'Notifications', 'bell'],
    ['activity', 'Activity Log', 'list'],
    ['products', 'AC Products', 'wind'],
    ['customers', 'Customers', 'users'],
    ['sales', 'Sales', 'cart'],
    ['invoices', 'Invoices', 'file'],
    ['calendar', 'Service Calendar', 'cal'],
    ['engagements', 'Engagements', 'zap'],
    ['reports', 'Reports', 'chart'],
    ['users', 'User Permissions', 'team'],
    ['settings', 'Settings', 'gear']
];

function applySet() {
    const s = SS();
    document.documentElement.setAttribute('data-theme', s.theme || 'light');
    if (s.accent) document.documentElement.style.setProperty('--ac', s.accent);
    document.body.classList.toggle('compact', s.dens === 'compact');
}
applySet();

function toast(m, t = 'ok') {
    const el = $('#ts');
    if (!el) return;
    el.innerHTML = `<div class="toast ${t}">${ic(t === 'er' ? 'more' : 'check')}<span>${esc(m)}</span></div>`;
    el.classList.add('on');
    clearTimeout(toast._tm);
    toast._tm = setTimeout(() => el.classList.remove('on'), 3400);
}

function modal(h) {
    const m = $('#mdl');
    if (!m) return;
    let body = '';
    if (typeof h === 'string') {
        body = h;
    } else {
        body = `
            <div class="md-head" style="display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid var(--border-light)">
                <h3 style="margin:0">${esc(h.title || '')}</h3>
                <button class="ib" data-act="close" aria-label="Close" style="transform:rotate(45deg);font-size:20px;line-height:1;width:32px;height:32px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;border:none;background:transparent;color:var(--text-2)">+</button>
            </div>
            <div class="md-body" style="padding:20px;max-height:calc(85vh - 130px);overflow-y:auto">
                ${h.content || ''}
            </div>
            ${h.actions ? `<div class="md-foot" style="display:flex;justify-content:flex-end;gap:10px;padding:16px 20px;border-top:1px solid var(--border-light);background:var(--bg-app);border-radius:0 0 var(--r-lg) var(--r-lg)">${h.actions}</div>` : ''}
        `;
    }
    m.innerHTML = `<div class="mbd" data-act="close"></div><div class="md" style="max-width:${(h && h.maxWidth) ? h.maxWidth : '640px'}">${body}</div>`;
    m.classList.add('on');
    document.body.style.overflow = 'hidden';
}

function closeM() {
    const m = $('#mdl');
    if (!m) return;
    m.classList.remove('on');
    m.innerHTML = '';
    document.body.style.overflow = '';
}

function bellBadge() {
    const un = (S.notifs || []).filter(n => n.unread).length;
    return un > 0 ? `<span class="badge">${un}</span>` : '';
}

function logActivity(icon, title, desc, link = '') {
    if (!S.activity) S.activity = [];
    S.activity.unshift({
        id: 'A' + (Date.now()),
        icon,
        title,
        desc,
        time: fd(D(0)) + ' ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        link
    });
    if (S.activity.length > 50) S.activity.pop();
    save();
}

function notify(title, desc, link = '') {
    if (!S.notifs) S.notifs = [];
    S.notifs.unshift({
        id: 'N' + (Date.now()),
        title,
        desc,
        time: D(0),
        unread: true,
        link
    });
    if (S.notifs.length > 30) S.notifs.pop();
    save();
    const bl = $('#bl');
    if (bl) bl.innerHTML = ic('bell') + bellBadge();
}

function sendWhatsAppWA(phone, text, customerId = '', saleId = '') {
    const clean = String(phone || '').replace(/\D/g, '');
    const url = `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    if (!S.msgs) S.msgs = [];
    const c = cust(customerId);
    S.msgs.unshift({
        id: 'M' + Date.now().toString().slice(-6),
        cid: customerId,
        cname: c ? c.name : 'Customer',
        phone: phone,
        ch: 'WhatsApp',
        tpl: text.slice(0, 32) + '...',
        status: 'Sent',
        time: D(0),
        err: ''
    });
    logActivity('zap', 'WhatsApp Message Dispatched', `Message opened in WhatsApp for ${c.name} (${phone})`, saleId ? `sales/${saleId}` : 'engagements');
    save();
    toast('WhatsApp Web opened. Message logged.');
}

function calcServices(purDate) {
    const d0 = new Date(purDate + 'T00:00:00Z');
    const s1Days = +SS().s1Days || 120;
    const s2Days = +SS().s2Days || 330;
    const d1 = new Date(d0); d1.setUTCDate(d1.getUTCDate() + s1Days);
    const d2 = new Date(d0); d2.setUTCDate(d2.getUTCDate() + s2Days);
    return {
        s1Date: d1.toISOString().slice(0, 10),
        s2Date: d2.toISOString().slice(0, 10)
    };
}

function renderMessageTemplate(tplKey, vars = {}) {
    const tpl = (S.templates || []).find(t => t.key === tplKey) || { body: '' };
    let text = tpl.body;
    const allVars = {
        shop: SS().store || 'Mobile Point AC Care',
        phone: SS().phone || '+91 98250 00000',
        ...vars
    };
    for (const [k, v] of Object.entries(allVars)) {
        text = text.replace(new RegExp(`\\{\\{\\s*${k}\\s*\\}\\}`, 'g'), v || '');
    }
    return text;
}


function overview() {
    const s1Due = S.sales.filter(s => s.s1 && (s.s1.status === 'Due' || (s.s1.date <= D(7) && s.s1.status !== 'Completed')));
    const s2Due = S.sales.filter(s => s.s2 && (s.s2.status === 'Due' || (s.s2.date <= D(7) && s.s2.status !== 'Completed')));
    const totalDue = s1Due.length + s2Due.length;
    const recentSales = [...S.sales].sort((a, b) => a.purDate < b.purDate ? 1 : -1).slice(0, 6);

    const upcomingServices = [];
    S.sales.forEach(sl => {
        if (sl.s1 && sl.s1.status !== 'Completed') {
            upcomingServices.push({ sale: sl, type: '1st Free Service (3-5 Mo)', info: sl.s1, key: 's1' });
        }
        if (sl.s2 && sl.s2.status !== 'Completed') {
            upcomingServices.push({ sale: sl, type: '2nd Free Service (11 Mo)', info: sl.s2, key: 's2' });
        }
    });
    upcomingServices.sort((a, b) => a.info.date > b.info.date ? 1 : -1);

    const kpis = [
        ['Total Customers', S.customers.length, 'users', 'customers', 'All'],
        ['AC Units Sold', S.sales.length, 'cart', 'sales', 'All'],
        ['1st Services Due', s1Due.length, 'wrench', 'calendar', 'All'],
        ['2nd Services Due', s2Due.length, 'cal', 'calendar', 'All'],
        ['Active Automations', (S.flows || []).filter(f => f.active).length, 'zap', 'engagements', 'All'],
        ['WhatsApp Logs', (S.msgs || []).length, 'msg', 'engagements', 'All']
    ];

    return `<div class="pg"><div class="ph"><div><h1>Dashboard</h1><p>Welcome to ${esc(SS().store || 'Mobile Point AC Care')}. Third-party AC retail sales, customer records, and warranty service schedule automation.</p></div>
<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" data-act="go" data-p="customers/new">${ic('users')}Add Customer</button><button class="btn pri" data-act="go" data-p="sales/new">${ic('plus')}Record Sale</button></div></div>
<div class="kp">${kpis.map((k, i) => `<button class="k${i === 2 || i === 3 ? ' hl' : ''}" data-act="go" data-p="${k[3]}">${ic(k[2])}<b>${k[1]}</b><span>${k[0]}</span></button>`).join('')}</div>
<div class="gr"><div>
<div class="panel"><div class="hd"><h2>Upcoming & Due AC Services (${upcomingServices.length})</h2><button class="btn sm" data-act="go" data-p="calendar">Open Calendar</button></div>
${upcomingServices.slice(0, 5).map(item => {
    const sl = item.sale;
    const isOverdue = item.info.date < D(0);
    const isDue = item.info.date <= D(7);
    const stBadge = isOverdue ? 'Overdue' : isDue ? 'Due' : 'Scheduled';
    return `<div class="li" style="cursor:pointer" data-act="go" data-p="sales/${sl.id}">
<span class="av">${ini(sl.cname)}</span>
<div style="flex:1"><b>Customer: ${esc(sl.cname)}</b><small>${esc(item.type)} · ${esc(sl.brand)} ${esc(sl.model)} (${esc(sl.sn)}) · ${esc(sl.clocality)}</small></div>
<div style="text-align:right"><span class="mu" style="font-size:12px">${fd(item.info.date)}</span><div>${B(stBadge)}</div></div>
<button class="btn sm" style="margin-left:8px" data-act="quick-wa-serv" data-sid="${sl.id}" data-skey="${item.key}" title="Send WhatsApp Service Reminder">${ic('send')} Remind</button>
</div>`;
}).join('') || '<div class="empty">No services currently due</div>'}
</div>
<div class="panel" style="margin-top:16px"><div class="hd"><h2>Recent Sales</h2><button class="btn sm" data-act="go" data-p="sales">View All Sales</button></div>
${recentSales.map(sl => `<div class="li" style="cursor:pointer" data-act="go" data-p="sales/${sl.id}">
<div><b>${esc(sl.id)} · ${esc(sl.cname)}</b><small>${esc(sl.brand)} ${esc(sl.model)} · S/N: ${esc(sl.sn)} · ${fd(sl.purDate)}</small></div>
<div style="text-align:right">${B(sl.status)}<small style="display:block;color:var(--mu);margin-top:2px">${esc(sl.clocality)}</small></div>
</div>`).join('') || '<div class="empty">No sales recorded yet</div>'}
</div>
</div>
<div>
<div class="panel"><div class="hd"><h2>WhatsApp Automations (4 Use Cases)</h2><button class="btn sm" data-act="go" data-p="engagements">Manage</button></div>
<div class="pad" style="display:grid;gap:12px">
${(S.flows || []).map(fl => `<div class="wa-card">
<div style="display:flex;justify-content:space-between;align-items:center">
<b>${esc(fl.name)}</b>
<span class="b ${fl.active ? 'ok' : 'er'}">${fl.active ? 'Active' : 'Paused'}</span>
</div>
<small class="mu">${esc(fl.desc)}</small>
<div class="wa-bubble">${esc(renderMessageTemplate(fl.key, { name: 'Diya Shah', brand: 'LG', model: 'PS-Q19', sn: 'LG-77401', instDate: fd(D(1)) }))}</div>
<div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;margin-top:2px">
<span class="mu">${fl.sentCount || 0} messages dispatched</span>
<button class="btn sm" data-act="test-flow" data-fkey="${fl.key}">Test Template</button>
</div>
</div>`).join('')}
</div>
</div>
</div>
</div></div>`;
}

function customersPage() {
    let list = S.customers || [];
    if (V.q) {
        const q = V.q.toLowerCase();
        list = list.filter(c => (c.name || '').toLowerCase().includes(q) || (c.phone || '').includes(q) || (c.altPhone || '').includes(q) || (c.locality || '').toLowerCase().includes(q) || (c.landmark || '').toLowerCase().includes(q) || (c.pincode || '').includes(q));
    }
    if (V.f === 'Active') list = list.filter(c => c.active !== false);
    if (V.f === 'Inactive') list = list.filter(c => c.active === false);
    if (V.f === 'Service Due') {
        const dueCids = new Set(S.sales.filter(s => (s.s1 && s.s1.status === 'Due') || (s.s2 && s.s2.status === 'Due')).map(s => s.cid));
        list = list.filter(c => dueCids.has(c.id));
    }

    const chips = ['All', 'Service Due', 'Active', 'Inactive'];

    return `<div class="pg"><div class="ph"><div><h1>Customer Registry</h1><p>Customer contact details, area pincodes, landmarks, and connected AC sales.</p></div>
<button class="btn pri" data-act="go" data-p="customers/new">${ic('plus')}Add Customer</button></div>
<div class="bar"><div class="sb">${ic('search')}<input id="cust-q" placeholder="Search name, WhatsApp, locality, landmark, pincode..." value="${esc(V.q)}" aria-label="Search customers"></div>
<div class="chips">${chips.map(c => `<button class="chip${V.f === c ? ' on' : ''}" data-act="chip" data-v="${c}">${c}</button>`).join('')}</div></div>
<div class="panel"><div class="tb-wrap"><table class="tb"><thead><tr>
<th>Customer</th><th>WhatsApp / Alternate</th><th>Complete Address & Locality</th><th>Pincode</th><th>AC Units</th><th>Status</th><th style="text-align:right">Actions</th>
</tr></thead><tbody>
${list.map(c => {
    const custSales = S.sales.filter(s => s.cid === c.id);
    const hasDue = custSales.some(s => (s.s1 && s.s1.status === 'Due') || (s.s2 && s.s2.status === 'Due'));
    const cleanPh = String(c.phone || '').replace(/\D/g, '');
    return `<tr>
<td><div class="nm" style="cursor:pointer" data-act="cust-view" data-id="${c.id}"><span class="av">${ini(c.name)}</span><div><b>${esc(c.name)}</b><small style="color:var(--mu);display:block">${c.id}</small></div></div></td>
<td><a href="https://wa.me/${cleanPh}" target="_blank" class="lnk" title="Chat on WhatsApp" style="color:var(--ok);font-weight:600">${ic('msg')} ${esc(c.phone)}</a>${c.altPhone ? `<small style="display:block;color:var(--mu)">Alt: ${esc(c.altPhone)}</small>` : ''}</td>
<td><div>${esc(c.address)}</div>${c.landmark ? `<small style="color:var(--mu)">Near ${esc(c.landmark)} · <b>${esc(c.locality)}</b></small>` : `<small style="color:var(--mu)"><b>${esc(c.locality)}</b></small>`}</td>
<td><b>${esc(c.pincode)}</b></td>
<td><button class="btn sm" data-act="cust-view" data-id="${c.id}">${custSales.length} AC${custSales.length === 1 ? '' : 's'}</button>${hasDue ? ' <span class="b wa">Service Due</span>' : ''}</td>
<td>${B(c.active !== false ? 'Active' : 'Inactive')}</td>
<td style="text-align:right"><div style="display:inline-flex;gap:4px">
<button class="btn sm" data-act="cust-view" data-id="${c.id}" title="View Details">${ic('eye')}</button>
<button class="btn sm" data-act="go" data-p="customers/edit/${c.id}" title="Edit Customer">${ic('edit')}</button>
<button class="btn sm pri" data-act="sale-for-cust" data-id="${c.id}" title="Record New Sale">${ic('cart')}</button>
</div></td>
</tr>`;
}).join('') || '<tr><td colspan="7"><div class="empty">No customers found matching filters</div></td></tr>'}
</tbody></table></div></div></div>`;
}

function custModal(id) {
    const c = cust(id);
    const cSales = S.sales.filter(s => s.cid === id);
    const cleanPh = String(c.phone || '').replace(/\D/g, '');
    modal(`<h1>${esc(c.name)}</h1><p>${B(c.active !== false ? 'Active Customer' : 'Inactive')} <span class="mu">ID: ${c.id}</span></p>
<dl class="kv">
<dt>WhatsApp</dt><dd><a href="https://wa.me/${cleanPh}" target="_blank" class="lnk" style="color:var(--ok);font-weight:600">${ic('msg')} ${esc(c.phone)}</a></dd>
<dt>Alternate</dt><dd>${esc(c.altPhone || 'None')}</dd>
<dt>Address</dt><dd>${esc(c.address)}</dd>
<dt>Landmark</dt><dd>${esc(c.landmark || '—')}</dd>
<dt>Locality</dt><dd><b>${esc(c.locality)}</b></dd>
<dt>Pincode</dt><dd>${esc(c.pincode)}</dd>
<dt>Registered</dt><dd>${fd(c.created)}</dd>
</dl>
<h2>Purchased AC Units (${cSales.length})</h2>
${cSales.map(sl => `<div class="li" style="padding-left:0;cursor:pointer" data-act="go" data-p="sales/${sl.id}">
<div><b>${esc(sl.brand)} ${esc(sl.model)}</b><small>S/N: ${esc(sl.sn)} · Installed: ${fd(sl.instDate)}</small></div>
<div style="text-align:right">
<div>${B(sl.s1.status === 'Completed' ? '1st Done' : sl.s1.status)} ${B(sl.s2.status === 'Completed' ? '2nd Done' : sl.s2.status)}</div>
<small style="color:var(--mu)">Sale: ${sl.id}</small>
</div>
</div>`).join('') || '<p class="mu">No AC sales recorded for this customer yet.</p>'}
<div class="acts">
<button class="btn" data-act="close">Close</button>
<button class="btn" data-act="go" data-p="customers/edit/${id}">Edit Profile</button>
<button class="btn pri" data-act="sale-for-cust" data-id="${id}">+ New AC Sale</button>
</div>`);
}

function customerFormPage(id) {
    const e = id ? cust(id) : null;
    const v = k => e ? esc(e[k] ?? '') : '';

    return `<div class="pg"><nav class="bc mu"><button class="lnk" data-act="go" data-p="customers">Customers</button> / ${e ? 'Edit ' + esc(e.name) : 'New Customer'}</nav>
<div class="ph"><div><h1>${e ? 'Edit Customer' : 'Add New Customer'}</h1><p>Customer contact details, area pincode, locality, and WhatsApp number.</p></div></div>
<form id="cust-form" novalidate onsubmit="return false">
<div class="fgrid">
<div class="panel pad"><h2>Personal & Contact Information</h2><div class="fg">
<label>Customer Full Name *<input name="name" required value="${v('name')}" placeholder="e.g. Rajesh Shah"></label>
<label>WhatsApp Number (Primary) *<input name="phone" type="tel" required value="${v('phone')}" placeholder="e.g. +91 98250 12345"></label>
<label>Alternate Mobile Number<input name="altPhone" type="tel" value="${v('altPhone')}" placeholder="e.g. +91 94280 67890"></label>
<label class="row"><input type="checkbox" name="active" ${!e || e.active !== false ? 'checked' : ''}>Active Customer Profile</label>
</div></div>
<div class="panel pad"><h2>Complete Address Details</h2><div class="fg">
<label>Complete Address *<textarea name="address" rows="2" required placeholder="Flat / House no, Building name, Street">${v('address')}</textarea></label>
<label>Landmark<input name="landmark" value="${v('landmark')}" placeholder="e.g. Near Sun Pharma Road / Behind Inox"></label>
<label>Locality / Area *<input name="locality" required value="${v('locality')}" placeholder="e.g. Alkapuri, Atladara, Manjalpur"></label>
<label>Area Pincode *<input name="pincode" required maxlength="6" value="${v('pincode')}" placeholder="e.g. 390007"></label>
</div></div>
</div>
<div class="sticky"><button class="btn" data-act="go" data-p="customers">Cancel</button><button class="btn pri" data-act="cust-save" data-id="${id || ''}">${e ? 'Save Changes' : 'Create Customer'}</button></div>
</form></div>`;
}

function custSave(id) {
    const f = $('#cust-form');
    if (!f) return;
    $$e(f, '.er').forEach(x => x.remove());
    const d = {};
    [...f.elements].forEach(x => { if (x.name) d[x.name] = x.type === 'checkbox' ? x.checked : x.value.trim(); });

    let ok = 1;
    const E = (n, m) => {
        ok = 0;
        const el = f.querySelector(`[name="${n}"]`);
        if (el) {
            const err = document.createElement('span');
            err.className = 'er';
            err.textContent = m;
            el.parentElement.appendChild(err);
        }
    };

    if (!d.name) E('name', 'Enter customer full name');
    if (!d.phone) E('phone', 'Enter WhatsApp number');
    if (!d.address) E('address', 'Enter complete address');
    if (!d.locality) E('locality', 'Enter locality or area');
    if (!d.pincode) E('pincode', 'Enter area pincode');

    if (!ok) return;

    if (id) {
        const c = cust(id);
        Object.assign(c, d);
        logActivity('users', 'Customer Profile Updated', `Updated details for ${c.name}`, 'customers');
        toast('Customer details updated');
    } else {
        const newId = 'C' + (Math.max(100, ...S.customers.map(c => +c.id.replace(/\D/g, '') || 0)) + 1);
        const newCust = {
            id: newId,
            ...d,
            created: D(0)
        };
        S.customers.unshift(newCust);
        logActivity('users', 'New Customer Registered', `Added ${newCust.name} (${newCust.locality})`, 'customers');
        notify('New Customer Added', `${newCust.name} added to customer directory.`);
        toast('New customer created successfully');
    }
    save();
    go('customers');
}


function productsPage() {
    let list = S.products || [];
    if (V.q) {
        const q = V.q.toLowerCase();
        list = list.filter(p => (p.brand || '').toLowerCase().includes(q) || (p.model || '').toLowerCase().includes(q) || (p.name || '').toLowerCase().includes(q) || (p.serials || []).some(s => s.toLowerCase().includes(q)));
    }
    if (V.f && V.f !== 'All') {
        list = list.filter(p => p.brand === V.f);
    }

    const brands = ['All', 'Daikin', 'LG', 'Voltas', 'Hitachi', 'Blue Star', 'Lloyd', 'Panasonic', 'Carrier'];
    const isGrid = SS().view === 'grid';

    return `<div class="pg"><div class="ph"><div><h1>AC Products Catalog</h1><p>Minimal AC model specifications and serial number inventory. Focusing strictly on Air Conditioners.</p></div>
<button class="btn pri" data-act="go" data-p="products/new">${ic('plus')}Add AC Model</button></div>
<div class="bar"><div class="sb">${ic('search')}<input id="prod-q" placeholder="Search brand, model number, serial number..." value="${esc(V.q)}" aria-label="Search AC products"></div>
<div class="chips">${brands.map(b => `<button class="chip${(V.f || 'All') === b ? ' on' : ''}" data-act="chip" data-v="${b}">${b}</button>`).join('')}</div>
<div class="chips"><button class="chip${!isGrid ? ' on' : ''}" data-act="pview" data-v="list">List</button><button class="chip${isGrid ? ' on' : ''}" data-act="pview" data-v="grid">Grid</button></div>
</div>
${isGrid ? `<div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:16px">
${list.map(p => {
    const soldSerials = S.sales.filter(s => s.pid === p.id).map(s => s.sn);
    const inStockSerials = (p.serials || []).filter(s => !soldSerials.includes(s));
    return `<div class="panel pad" style="display:flex;flex-direction:column;justify-content:space-between">
<div>
<div style="display:flex;justify-content:space-between;align-items:flex-start">
<span class="b ok">${esc(p.brand)}</span>
<span class="b ac">${esc(p.star || '5 Star')}</span>
</div>
<h2 style="margin:8px 0 4px">${esc(p.name || (p.brand + ' ' + p.model))}</h2>
<p class="mu" style="font-size:12px;margin:0 0 10px">${esc(p.capacity || '1.5 Ton')} · ${esc(p.invType || 'Inverter')} · ${esc(p.type || 'Split AC')}</p>
<dl class="kv" style="grid-template-columns:85px 1fr;font-size:12px">
<dt>Model No</dt><dd><b>${esc(p.model)}</b></dd>
<dt>Condenser</dt><dd>${esc(p.condenser || '100% Copper')}</dd>
<dt>Refrigerant</dt><dd>${esc(p.refrig || 'R32')}</dd>
<dt>In Stock</dt><dd><span class="b ${inStockSerials.length ? 'ok' : 'wa'}">${inStockSerials.length} Unit${inStockSerials.length === 1 ? '' : 's'}</span></dd>
<dt>Sold Units</dt><dd>${soldSerials.length} Units</dd>
</dl>
</div>
<div class="acts" style="margin-top:14px;padding-top:10px;border-top:1px solid var(--bd);justify-content:space-between">
<button class="btn sm" data-act="go" data-p="products/${p.id}">View Details</button>
<div style="display:flex;gap:4px">
<button class="btn sm" data-act="go" data-p="products/edit/${p.id}">${ic('edit')}</button>
<button class="btn sm pri" data-act="sale-with-prod" data-pid="${p.id}">+ Sale</button>
</div>
</div>
</div>`;
}).join('') || '<div class="empty" style="grid-column:1/-1">No AC models match your query</div>'}
</div>` : `<div class="panel"><div class="tb-wrap"><table class="tb"><thead><tr>
<th>Brand & Model</th><th>Tonnage / Star</th><th>Technology</th><th>Condenser & Gas</th><th>Serials Tracked</th><th>Units Sold</th><th style="text-align:right">Actions</th>
</tr></thead><tbody>
${list.map(p => {
    const soldSerials = S.sales.filter(s => s.pid === p.id).map(s => s.sn);
    const inStockSerials = (p.serials || []).filter(s => !soldSerials.includes(s));
    return `<tr>
<td><div class="nm" style="cursor:pointer" data-act="go" data-p="products/${p.id}"><span class="av">${p.brand.slice(0, 2).toUpperCase()}</span><div><b>${esc(p.name || (p.brand + ' ' + p.model))}</b><small style="color:var(--mu);display:block">Model: ${esc(p.model)}</small></div></div></td>
<td><b>${esc(p.capacity || '1.5 Ton')}</b><small style="display:block;color:var(--mu)">${esc(p.star || '3 Star')}</small></td>
<td>${esc(p.invType || 'Inverter')}<small style="display:block;color:var(--mu)">${esc(p.type || 'Split AC')}</small></td>
<td>${esc(p.condenser || '100% Copper')}<small style="display:block;color:var(--mu)">${esc(p.refrig || 'R32')}</small></td>
<td><span class="b ${inStockSerials.length ? 'ok' : 'wa'}">${inStockSerials.length} in stock</span>${p.serials && p.serials.length ? `<small style="display:block;color:var(--mu)">${p.serials.slice(0, 2).join(', ')}${p.serials.length > 2 ? '...' : ''}</small>` : ''}</td>
<td><b>${soldSerials.length}</b></td>
<td style="text-align:right"><div style="display:inline-flex;gap:4px">
<button class="btn sm" data-act="go" data-p="products/${p.id}" title="View Details">${ic('eye')}</button>
<button class="btn sm" data-act="go" data-p="products/edit/${p.id}" title="Edit AC">${ic('edit')}</button>
<button class="btn sm pri" data-act="sale-with-prod" data-pid="${p.id}" title="Record Sale with this AC">${ic('cart')}</button>
</div></td>
</tr>`;
}).join('') || '<tr><td colspan="7"><div class="empty">No AC models match your query</div></td></tr>'}
</tbody></table></div></div>`}
</div>`;
}

function productDetailPage(id) {
    const p = prod(id);
    const soldSales = S.sales.filter(s => s.pid === id);
    const soldSerials = soldSales.map(s => s.sn);
    const inStockSerials = (p.serials || []).filter(s => !soldSerials.includes(s));

    return `<div class="pg"><nav class="bc mu"><button class="lnk" data-act="go" data-p="products">AC Products</button> / ${esc(p.brand)} ${esc(p.model)}</nav>
<div class="ph"><div><h1>${esc(p.brand)} ${esc(p.model)}</h1><p>${esc(p.capacity)} · ${esc(p.star)} · ${esc(p.invType)} ${esc(p.type)}</p></div>
<div style="display:flex;gap:8px"><button class="btn" data-act="go" data-p="products/edit/${id}">Edit Model</button><button class="btn pri" data-act="sale-with-prod" data-pid="${id}">+ Record Sale</button></div></div>
<div class="cw2">
<div class="panel pad"><h2>AC Specifications</h2>
<dl class="kv" style="grid-template-columns:110px 1fr">
<dt>Brand</dt><dd><b>${esc(p.brand)}</b></dd>
<dt>Model Number</dt><dd><b>${esc(p.model)}</b></dd>
<dt>Capacity</dt><dd>${esc(p.capacity || '1.5 Ton')}</dd>
<dt>Energy Rating</dt><dd>${esc(p.star || '5 Star')}</dd>
<dt>Inverter Type</dt><dd>${esc(p.invType || 'Inverter')}</dd>
<dt>AC Format</dt><dd>${esc(p.type || 'Split AC')}</dd>
<dt>Condenser Coil</dt><dd>${esc(p.condenser || '100% Copper')}</dd>
<dt>Refrigerant</dt><dd>${esc(p.refrig || 'R32')}</dd>
<dt>Warranty</dt><dd>${esc(p.warr || '1 Year Comprehensive + 10 Years Compressor')}</dd>
</dl>
${p.desc ? `<div style="margin-top:14px;padding-top:10px;border-top:1px solid var(--bd)"><small class="mu">Special Features:</small><p style="margin:4px 0 0;font-size:13px">${esc(p.desc)}</p></div>` : ''}
</div>
<div style="display:grid;gap:16px">
<div class="panel pad"><h2>Unit Serial Numbers Tracking</h2>
<p class="mu" style="font-size:12px;margin:2px 0 10px">Serial numbers registered in catalog stock.</p>
<div>
<b>In-Stock Units (${inStockSerials.length}):</b>
<div style="display:flex;gap:6px;flex-wrap:wrap;margin:6px 0 12px">
${inStockSerials.map(s => `<span class="tag-pill" style="border-color:var(--ok);background:var(--sf)"><b>${esc(s)}</b></span>`).join('') || '<span class="mu">No units currently in stock</span>'}
</div>
<b>Sold Units (${soldSerials.length}):</b>
<div style="display:flex;gap:6px;flex-wrap:wrap;margin:6px 0">
${soldSerials.map(s => `<span class="tag-pill" style="opacity:0.7"><s>${esc(s)}</s></span>`).join('') || '<span class="mu">No units sold yet</span>'}
</div>
</div>
</div>
<div class="panel"><div class="hd"><h2>Sales History for this AC (${soldSales.length})</h2></div>
${soldSales.map(sl => `<div class="li" style="cursor:pointer" data-act="go" data-p="sales/${sl.id}">
<div><b>${esc(sl.id)} · ${esc(sl.cname)}</b><small>S/N: ${esc(sl.sn)} · Sold: ${fd(sl.purDate)} · Locality: ${esc(sl.clocality)}</small></div>
<div style="text-align:right">${B(sl.status)}<small style="display:block;color:var(--mu);margin-top:2px">Installed: ${fd(sl.instDate)}</small></div>
</div>`).join('') || '<div class="empty">No sales recorded for this model yet</div>'}
</div>
</div>
</div></div>`;
}

function productFormPage(id) {
    const e = id ? prod(id) : null;
    const v = k => e ? esc(e[k] ?? '') : '';
    const brands = ['Daikin', 'LG', 'Voltas', 'Hitachi', 'Blue Star', 'Lloyd', 'Panasonic', 'Carrier', 'Godrej', 'Mitsubishi'];

    return `<div class="pg"><nav class="bc mu"><button class="lnk" data-act="go" data-p="products">AC Products</button> / ${e ? 'Edit ' + esc(e.brand + ' ' + e.model) : 'New AC Model'}</nav>
<div class="ph"><div><h1>${e ? 'Edit AC Model' : 'Add New AC Model'}</h1><p>Minimal AC model specifications. Focuses strictly on cooling units without pricing.</p></div></div>
<form id="prod-form" novalidate onsubmit="return false">
<div class="fgrid">
<div class="panel pad"><h2>Model & Brand Identifiers</h2><div class="fg">
<label>Brand Name *
<select name="brand">
${brands.map(b => `<option ${e && e.brand === b ? 'selected' : ''}>${b}</option>`).join('')}
</select>
</label>
<label>Product Model Number *<input name="model" required value="${v('model')}" placeholder="e.g. FTKF35, PS-Q19, 185V Vectra"></label>
<label>Capacity / Tonnage
<select name="capacity">
${['1.0 Ton', '1.5 Ton', '2.0 Ton', '0.8 Ton', '2.5 Ton'].map(c => `<option ${e && e.capacity === c ? 'selected' : ''}>${c}</option>`).join('')}
</select>
</label>
<label>Energy Star Rating
<select name="star">
${['5 Star', '3 Star', '4 Star', '2 Star', '1 Star'].map(s => `<option ${e && e.star === s ? 'selected' : ''}>${s}</option>`).join('')}
</select>
</label>
<label>Inverter Technology
<select name="invType">
${['Inverter', 'Dual Inverter', 'Triple Inverter', 'Fixed Speed / Non-Inverter'].map(t => `<option ${e && e.invType === t ? 'selected' : ''}>${t}</option>`).join('')}
</select>
</label>
</div></div>
<div class="panel pad"><h2>Technical Details & Serial Tracking</h2><div class="fg">
<label>AC Format
<select name="type">
${['Split AC', 'Window AC', 'Inverter Split AC'].map(t => `<option ${e && e.type === t ? 'selected' : ''}>${t}</option>`).join('')}
</select>
</label>
<label>Condenser Coil Type<input name="condenser" value="${v('condenser') || '100% Copper'}" placeholder="e.g. 100% Copper with Golden Fins"></label>
<label>Refrigerant Gas<input name="refrig" value="${v('refrig') || 'R32'}" placeholder="e.g. R32 or R410A"></label>
<label>Warranty Terms<input name="warr" value="${v('warr') || '1 Year Comprehensive + 10 Years Compressor'}" placeholder="e.g. 1 Year Comprehensive + 10 Years Compressor"></label>
<label>Serial Numbers in Inventory (Comma-separated)<input name="serials" value="${e && e.serials ? e.serials.join(', ') : ''}" placeholder="e.g. DK-89211, DK-89212"></label>
<label>Key Features / Notes<textarea name="desc" rows="2" placeholder="e.g. PM 2.5 filter, Triple Display, Dew Clean">${v('desc')}</textarea></label>
</div></div>
</div>
<div class="sticky"><button class="btn" data-act="go" data-p="products">Cancel</button><button class="btn pri" data-act="prod-save" data-id="${id || ''}">${e ? 'Save Changes' : 'Create AC Model'}</button></div>
</form></div>`;
}

function prodSave(id) {
    const f = $('#prod-form');
    if (!f) return;
    $$e(f, '.er').forEach(x => x.remove());
    const d = {};
    [...f.elements].forEach(x => { if (x.name) d[x.name] = x.value.trim(); });

    let ok = 1;
    const E = (n, m) => {
        ok = 0;
        const el = f.querySelector(`[name="${n}"]`);
        if (el) {
            const err = document.createElement('span');
            err.className = 'er';
            err.textContent = m;
            el.parentElement.appendChild(err);
        }
    };

    if (!d.brand) E('brand', 'Select or enter brand name');
    if (!d.model) E('model', 'Enter model number');

    if (!ok) return;

    const parsedSerials = (d.serials || '').split(',').map(s => s.trim()).filter(Boolean);

    if (id) {
        const p = prod(id);
        Object.assign(p, {
            brand: d.brand,
            model: d.model,
            name: `${d.brand} ${d.model}`,
            capacity: d.capacity,
            star: d.star,
            invType: d.invType,
            type: d.type,
            condenser: d.condenser,
            refrig: d.refrig,
            warr: d.warr,
            desc: d.desc,
            serials: parsedSerials
        });
        logActivity('wind', 'AC Product Updated', `Updated specs for ${p.brand} ${p.model}`, 'products');
        toast('AC Product updated');
        save();
        go('products/' + id);
    } else {
        const newId = 'P' + (Math.max(1000, ...S.products.map(p => +p.id.replace(/\D/g, '') || 0)) + 1);
        const newProd = {
            id: newId,
            brand: d.brand,
            model: d.model,
            name: `${d.brand} ${d.model}`,
            capacity: d.capacity,
            star: d.star,
            invType: d.invType,
            type: d.type,
            condenser: d.condenser,
            refrig: d.refrig,
            warr: d.warr,
            desc: d.desc,
            serials: parsedSerials
        };
        S.products.push(newProd);
        logActivity('wind', 'New AC Model Added', `Added ${newProd.brand} ${newProd.model} to catalog`, 'products');
        toast('New AC model added to catalog');
        save();
        go('products/' + newId);
    }
}


let SALE_IMAGES = [];
let SALE_CUST_MODE = 'existing';
let SALE_PROD_MODE = 'existing';

function salesPage() {
    let list = S.sales || [];
    if (V.q) {
        const q = V.q.toLowerCase();
        list = list.filter(s => (s.id || '').toLowerCase().includes(q) || (s.cname || '').toLowerCase().includes(q) || (s.cphone || '').includes(q) || (s.caltPhone || '').includes(q) || (s.clocality || '').toLowerCase().includes(q) || (s.brand || '').toLowerCase().includes(q) || (s.model || '').toLowerCase().includes(q) || (s.sn || '').toLowerCase().includes(q) || (s.shop || '').toLowerCase().includes(q));
    }

    if (V.f === 'Installed') list = list.filter(s => s.status === 'Installed');
    if (V.f === 'Pending Install') list = list.filter(s => s.status === 'Pending Installation');
    if (V.f === '1st Service Due') list = list.filter(s => s.s1 && s.s1.status === 'Due');
    if (V.f === '2nd Service Due') list = list.filter(s => s.s2 && s.s2.status === 'Due');

    const chips = ['All', 'Installed', 'Pending Install', '1st Service Due', '2nd Service Due'];

    return `<div class="pg"><div class="ph"><div><h1>Sales Management</h1><p>Record, view and manage AC sales, installations, warranty documents, and automated servicing milestones.</p></div>
<button class="btn pri" data-act="go" data-p="sales/new">${ic('plus')}Record New Sale</button></div>
<div class="bar"><div class="sb">${ic('search')}<input id="sales-q" placeholder="Search sale ID, customer, phone, brand, model, serial..." value="${esc(V.q)}" aria-label="Search sales"></div>
<div class="chips">${chips.map(c => `<button class="chip${V.f === c ? ' on' : ''}" data-act="chip" data-v="${c}">${c}</button>`).join('')}</div></div>
<div class="panel"><div class="tb-wrap"><table class="tb"><thead><tr>
<th>Sale ID & Date</th><th>Customer</th><th>Locality</th><th>AC Unit & Serial</th><th>Installation</th><th>1st Service</th><th>2nd Service</th><th style="text-align:right">Actions</th>
</tr></thead><tbody>
${list.map(sl => {
    const cleanPh = String(sl.cphone || '').replace(/\D/g, '');
    return `<tr>
<td><div style="cursor:pointer" data-act="go" data-p="sales/${sl.id}"><b>${esc(sl.id)}</b><small style="display:block;color:var(--mu)">${fd(sl.purDate)}</small></div></td>
<td><div><a href="https://wa.me/${cleanPh}" target="_blank" class="lnk" style="color:var(--ok);font-weight:600">${ic('msg')} ${esc(sl.cname)}</a><small style="display:block;color:var(--mu)">${esc(sl.cphone)}</small></div></td>
<td><b>${esc(sl.clocality)}</b><small style="display:block;color:var(--mu)">${esc(sl.cpincode)}</small></td>
<td><div><b>${esc(sl.brand)} ${esc(sl.model)}</b><small style="display:block;color:var(--mu)">S/N: <code>${esc(sl.sn)}</code></small></div></td>
<td>${B(sl.status)}<small style="display:block;color:var(--mu)">${fd(sl.instDate)}</small></td>
<td>${B(sl.s1.status === 'Completed' ? 'Completed' : sl.s1.status)}<small style="display:block;color:var(--mu)">${fds(sl.s1.date)}</small></td>
<td>${B(sl.s2.status === 'Completed' ? 'Completed' : sl.s2.status)}<small style="display:block;color:var(--mu)">${fds(sl.s2.date)}</small></td>
<td style="text-align:right"><div style="display:inline-flex;gap:4px">
<button class="btn sm" data-act="go" data-p="sales/${sl.id}" title="View Sale Details">${ic('eye')}</button>
<button class="btn sm" data-act="go" data-p="invoices/${sl.id}" title="View & Print Invoice">${ic('file')}</button>
<button class="btn sm" data-act="go" data-p="sales/edit/${sl.id}" title="Edit Sale">${ic('edit')}</button>
<button class="btn sm pri" data-act="quick-wa-serv" data-sid="${sl.id}" data-skey="s1" title="Trigger Service Reminder">${ic('send')}</button>
</div></td>
</tr>`;
}).join('') || '<tr><td colspan="8"><div class="empty">No sales records match your filters</div></td></tr>'}
</tbody></table></div></div></div>`;
}

function saleFormPage(editId) {
    const e = editId ? sale(editId) : null;
    if (e) {
        SALE_IMAGES = e.images ? [...e.images] : [];
        SALE_CUST_MODE = 'existing';
        SALE_PROD_MODE = 'existing';
    } else if (SALE_IMAGES.length === 0) {
        SALE_IMAGES = [];
    }

    const defaultShop = SS().store || 'Mobile Point AC Care';
    const selectedCid = e ? e.cid : (S.customers[0] ? S.customers[0].id : '');
    const selectedPid = e ? e.pid : (S.products[0] ? S.products[0].id : '');
    const curCust = cust(selectedCid);
    const curProd = prod(selectedPid);

    return `<div class="pg"><nav class="bc mu"><button class="lnk" data-act="go" data-p="sales">Sales</button> / ${e ? 'Edit ' + esc(e.id) : 'Record New Sale'}</nav>
<div class="ph"><div><h1>${e ? 'Edit Sale ' + esc(e.id) : 'Record New AC Sale'}</h1><p>Record customer, AC details, serial numbers, multiple image documents, and schedule warranty services.</p></div></div>
<form id="sale-form" novalidate onsubmit="return false">
<div class="fgrid">

<div class="panel pad">
<h2>1. Customer Information</h2>
<div class="cust-toggle-row">
<button type="button" class="cust-toggle-btn${SALE_CUST_MODE === 'existing' ? ' active' : ''}" data-act="sale-cust-mode" data-v="existing">Select Existing Customer</button>
<button type="button" class="cust-toggle-btn${SALE_CUST_MODE === 'new' ? ' active' : ''}" data-act="sale-cust-mode" data-v="new">+ Create New Customer Inline</button>
</div>

<div id="sale-cust-existing-box" style="display:${SALE_CUST_MODE === 'existing' ? 'block' : 'none'}">
<div class="fg">
<label>Choose Existing Customer
<select name="selected_cid" id="sale-cust-select">
${S.customers.map(c => `<option value="${c.id}" ${c.id === selectedCid ? 'selected' : ''}>${esc(c.name)} · ${esc(c.phone)} (${esc(c.locality)})</option>`).join('')}
</select>
</label>
<div id="sale-cust-preview" class="pad" style="background:var(--bg);border-radius:8px;border:1px solid var(--bd);margin-top:6px">
<b>${esc(curCust.name)}</b>
<div style="font-size:12px;color:var(--mu);margin-top:4px">WhatsApp: <b>${esc(curCust.phone)}</b>${curCust.altPhone ? ` · Alt: ${esc(curCust.altPhone)}` : ''}</div>
<div style="font-size:12px;color:var(--mu);margin-top:2px">${esc(curCust.address)} · Near ${esc(curCust.landmark || '—')}</div>
<div style="font-size:12px;color:var(--mu);margin-top:2px">Locality: <b>${esc(curCust.locality)}</b> · Pincode: <b>${esc(curCust.pincode)}</b></div>
</div>
</div>
</div>

<div id="sale-cust-new-box" style="display:${SALE_CUST_MODE === 'new' ? 'block' : 'none'}">
<div class="fg">
<label>Customer Full Name *<input name="new_cname" placeholder="e.g. Diya Shah"></label>
<label>Customer WhatsApp Number *<input name="new_cphone" type="tel" placeholder="e.g. +91 98250 22302"></label>
<label>Alternate Mobile Number<input name="new_caltPhone" type="tel" placeholder="e.g. +91 94280 22302"></label>
<label>Complete Address *<textarea name="new_caddress" rows="2" placeholder="House/Flat No, Building, Road"></textarea></label>
<label>Landmark<input name="new_clandmark" placeholder="e.g. Behind Inox Cinema"></label>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
<label>Area / Locality *<input name="new_clocality" placeholder="e.g. Alkapuri"></label>
<label>Area Pincode *<input name="new_cpincode" maxlength="6" placeholder="e.g. 390007"></label>
</div>
</div>
</div>
</div>

<div class="panel pad">
<h2>2. AC Product Details</h2>
<div class="cust-toggle-row">
<button type="button" class="cust-toggle-btn${SALE_PROD_MODE === 'existing' ? ' active' : ''}" data-act="sale-prod-mode" data-v="existing">Select Existing AC Model</button>
<button type="button" class="cust-toggle-btn${SALE_PROD_MODE === 'new' ? ' active' : ''}" data-act="sale-prod-mode" data-v="new">+ Enter New AC Model</button>
</div>

<div id="sale-prod-existing-box" style="display:${SALE_PROD_MODE === 'existing' ? 'block' : 'none'}">
<div class="fg">
<label>Choose AC Model from Catalog
<select name="selected_pid" id="sale-prod-select">
${S.products.map(p => `<option value="${p.id}" ${p.id === selectedPid ? 'selected' : ''}>${esc(p.brand)} ${esc(p.model)} · ${esc(p.capacity)} (${esc(p.star)})</option>`).join('')}
</select>
</label>
<div id="sale-prod-preview" class="pad" style="background:var(--bg);border-radius:8px;border:1px solid var(--bd);margin-top:6px">
<b>${esc(curProd.brand)} ${esc(curProd.model)}</b>
<div style="font-size:12px;color:var(--mu);margin-top:4px">${esc(curProd.capacity)} · ${esc(curProd.star)} · ${esc(curProd.invType)} · ${esc(curProd.condenser)}</div>
</div>
</div>
</div>

<div id="sale-prod-new-box" style="display:${SALE_PROD_MODE === 'new' ? 'block' : 'none'}">
<div class="fg">
<label>Brand Name *
<select name="new_pbrand">
${['Daikin', 'LG', 'Voltas', 'Hitachi', 'Blue Star', 'Lloyd', 'Panasonic', 'Carrier', 'Godrej', 'Mitsubishi'].map(b => `<option>${b}</option>`).join('')}
</select>
</label>
<label>Product Model Number *<input name="new_pmodel" placeholder="e.g. FTKF50, 183V Vectra, PS-Q24"></label>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
<label>Capacity / Tonnage
<select name="new_pcapacity">
${['1.0 Ton', '1.5 Ton', '2.0 Ton', '0.8 Ton', '2.5 Ton'].map(c => `<option ${c === '1.5 Ton' ? 'selected' : ''}>${c}</option>`).join('')}
</select>
</label>
<label>Star Rating
<select name="new_pstar">
${['5 Star', '3 Star', '4 Star', '2 Star', '1 Star'].map(s => `<option ${s === '5 Star' ? 'selected' : ''}>${s}</option>`).join('')}
</select>
</label>
</div>
<label class="ps" style="color:var(--ac);font-weight:500">Notice: If this model is not in your product list, it will be automatically added to your catalog with this sale.</label>
</div>
</div>

<div class="fg" style="margin-top:12px">
<label>Product Serial Number *<input name="sn" required value="${e ? esc(e.sn) : ''}" placeholder="e.g. DK-89211 or LG-77405"></label>
</div>
</div>

<div class="panel pad">
<h2>3. Sale & Installation Information</h2>
<div class="fg">
<label>Date of Purchase *<input name="purDate" type="date" required value="${e ? e.purDate : D(0)}"></label>
<label>Your Shop Name *<input name="shop" required value="${e ? esc(e.shop) : esc(defaultShop)}"></label>
<label>Installation Date *<input name="instDate" type="date" required value="${e ? e.instDate : D(1)}"></label>
<label>Installation Status
<select name="status">
<option ${!e || e.status === 'Installed' ? 'selected' : ''}>Installed</option>
<option ${e && e.status === 'Pending Installation' ? 'selected' : ''}>Pending Installation</option>
</select>
</label>
<label>Notes / Remarks<textarea name="notes" rows="2" placeholder="Balcony mount, extra copper pipe, etc.">${e ? esc(e.notes || '') : ''}</textarea></label>
</div>
</div>

<div class="panel pad">
<h2>4. Image & Document Uploads (Multi-Upload)</h2>
<p class="ps">Upload customer invoice photos, warranty cards, installation photos, or AC unit nameplates.</p>
<div style="margin-top:10px">
<label class="img-upload-zone" for="sale-multi-files">
${ic('camera')}
<span style="font-weight:600;font-size:13px">Click or drag images here to upload</span>
<span class="mu" style="font-size:11.5px">Supports multiple images (Invoices, Warranty cards, Installation pictures)</span>
<input type="file" id="sale-multi-files" multiple accept="image/*" style="display:none">
</label>
<div class="multi-img-grid" id="sale-images-preview">
${renderSaleImagesThumbnails()}
</div>
</div>
</div>

</div>
<div class="sticky">
<button class="btn" data-act="go" data-p="sales">Cancel</button>
<button class="btn pri" data-act="sale-save" data-id="${editId || ''}">${e ? 'Save Sale Changes' : 'Complete Sale & Schedule Services'}</button>
</div>
</form></div>`;
}

function renderSaleImagesThumbnails() {
    if (!SALE_IMAGES || !SALE_IMAGES.length) {
        return '<p class="mu" style="grid-column:1/-1;text-align:center;padding:12px;font-size:12px">No images uploaded yet</p>';
    }
    return SALE_IMAGES.map((src, idx) => `<div class="img-thumb-wrap">
<img src="${src}" alt="Document ${idx + 1}" style="cursor:pointer" data-act="lightbox" data-src="${src}">
<button type="button" class="img-thumb-del" data-act="del-sale-img" data-idx="${idx}" title="Remove image">×</button>
</div>`).join('');
}

function saleSave(id) {
    const f = $('#sale-form');
    if (!f) return;
    $$e(f, '.er').forEach(x => x.remove());

    const d = {};
    [...f.elements].forEach(x => { if (x.name) d[x.name] = x.value.trim(); });

    let ok = 1;
    const E = (n, m) => {
        ok = 0;
        const el = f.querySelector(`[name="${n}"]`);
        if (el) {
            const err = document.createElement('span');
            err.className = 'er';
            err.textContent = m;
            el.parentElement.appendChild(err);
        }
    };

    let targetCust = null;
    if (SALE_CUST_MODE === 'existing') {
        targetCust = cust(d.selected_cid);
        if (!targetCust || !targetCust.name) E('selected_cid', 'Select a valid customer');
    } else {
        if (!d.new_cname) E('new_cname', 'Enter customer name');
        if (!d.new_cphone) E('new_cphone', 'Enter WhatsApp number');
        if (!d.new_caddress) E('new_caddress', 'Enter complete address');
        if (!d.new_clocality) E('new_clocality', 'Enter locality / area');
        if (!d.new_cpincode) E('new_cpincode', 'Enter area pincode');

        if (ok) {
            const newCid = 'C' + (Math.max(100, ...S.customers.map(c => +c.id.replace(/\D/g, '') || 0)) + 1);
            targetCust = {
                id: newCid,
                name: d.new_cname,
                phone: d.new_cphone,
                altPhone: d.new_caltPhone || '',
                address: d.new_caddress,
                landmark: d.new_clandmark || '',
                locality: d.new_clocality,
                pincode: d.new_cpincode,
                active: true,
                created: D(0)
            };
            S.customers.unshift(targetCust);
            logActivity('users', 'New Customer Created (From Sale)', `Registered ${targetCust.name}`, 'customers');
        }
    }

    let targetProd = null;
    if (SALE_PROD_MODE === 'existing') {
        targetProd = prod(d.selected_pid);
        if (!targetProd || !targetProd.model) E('selected_pid', 'Select an AC model');
    } else {
        if (!d.new_pbrand) E('new_pbrand', 'Select brand name');
        if (!d.new_pmodel) E('new_pmodel', 'Enter model number');

        if (ok) {
            const existingMatch = S.products.find(p => p.brand.toLowerCase() === d.new_pbrand.toLowerCase() && p.model.toLowerCase() === d.new_pmodel.toLowerCase());
            if (existingMatch) {
                targetProd = existingMatch;
            } else {
                const newPid = 'P' + (Math.max(1000, ...S.products.map(p => +p.id.replace(/\D/g, '') || 0)) + 1);
                targetProd = {
                    id: newPid,
                    brand: d.new_pbrand,
                    model: d.new_pmodel,
                    name: `${d.new_pbrand} ${d.new_pmodel}`,
                    capacity: d.new_pcapacity || '1.5 Ton',
                    star: d.new_pstar || '5 Star',
                    invType: 'Inverter',
                    type: 'Split AC',
                    condenser: '100% Copper',
                    refrig: 'R32',
                    warr: '1 Year Comprehensive + 10 Years Compressor',
                    desc: 'Auto-created from sales registration',
                    serials: d.sn ? [d.sn] : []
                };
                S.products.push(targetProd);
                logActivity('wind', 'New AC Catalog Model Auto-Created', `Added ${targetProd.name}`, 'products');
            }
        }
    }

    if (!d.sn) E('sn', 'Enter product serial number');
    if (!d.purDate) E('purDate', 'Enter purchase date');
    if (!d.shop) E('shop', 'Enter shop name');
    if (!d.instDate) E('instDate', 'Enter installation date');

    if (!ok) return;

    if (targetProd && d.sn && !targetProd.serials.includes(d.sn)) {
        targetProd.serials.push(d.sn);
    }

    const { s1Date, s2Date } = calcServices(d.purDate);

    if (id) {
        const sl = sale(id);
        Object.assign(sl, {
            cid: targetCust.id,
            cname: targetCust.name,
            caddress: targetCust.address,
            clandmark: targetCust.landmark,
            clocality: targetCust.locality,
            cpincode: targetCust.pincode,
            cphone: targetCust.phone,
            caltPhone: targetCust.altPhone,
            pid: targetProd.id,
            brand: targetProd.brand,
            model: targetProd.model,
            capacity: targetProd.capacity,
            star: targetProd.star,
            sn: d.sn,
            purDate: d.purDate,
            shop: d.shop,
            instDate: d.instDate,
            status: d.status || 'Installed',
            notes: d.notes || '',
            images: [...SALE_IMAGES]
        });
        logActivity('cart', 'Sale Record Updated', `Updated sale ${sl.id} for ${sl.cname}`, 'sales/' + sl.id);
        toast('Sale record updated');
        save();
        go('sales/' + id);
    } else {
        const newSaleId = 'SALE-' + (Math.max(1000, ...S.sales.map(s => +s.id.replace(/\D/g, '') || 0)) + 1);
        const newSale = {
            id: newSaleId,
            cid: targetCust.id,
            cname: targetCust.name,
            caddress: targetCust.address,
            clandmark: targetCust.landmark,
            clocality: targetCust.locality,
            cpincode: targetCust.pincode,
            cphone: targetCust.phone,
            caltPhone: targetCust.altPhone,
            pid: targetProd.id,
            brand: targetProd.brand,
            model: targetProd.model,
            capacity: targetProd.capacity,
            star: targetProd.star,
            sn: d.sn,
            purDate: d.purDate,
            shop: d.shop,
            instDate: d.instDate,
            status: d.status || 'Installed',
            by: currentUser ? currentUser.name : 'Sales Desk',
            notes: d.notes || '',
            images: SALE_IMAGES.length ? [...SALE_IMAGES] : [makeDemoDocSvg(`Tax Invoice ${newSaleId}`, `${targetProd.brand} ${targetProd.model}`)],
            s1: { date: s1Date, status: 'Scheduled', sent: '', completedDate: '' },
            s2: { date: s2Date, status: 'Scheduled', sent: '', completedDate: '' }
        };
        S.sales.unshift(newSale);
        logActivity('cart', 'New AC Sale Recorded', `Sale ${newSale.id} created for ${newSale.cname} (${newSale.brand} ${newSale.model})`, 'sales/' + newSale.id);
        notify('New Sale Recorded', `${newSale.id}: ${newSale.cname} purchased ${newSale.brand} ${newSale.model}.`);
        toast('Sale recorded successfully. Services scheduled.');
        save();
        go('sales/' + newSaleId);
    }
    SALE_IMAGES = [];
}

function saleDetailPage(id) {
    const sl = sale(id);
    if (!sl) {
        return `<div class="pg"><div class="empty"><h1>Sale Record Not Found</h1><button class="btn pri" data-act="go" data-p="sales">Back to Sales</button></div></div>`;
    }

    const cleanPh = String(sl.cphone || '').replace(/\D/g, '');
    const s1Due = sl.s1 && sl.s1.status !== 'Completed' && sl.s1.date <= D(7);
    const s2Due = sl.s2 && sl.s2.status !== 'Completed' && sl.s2.date <= D(7);

    return `<div class="pg"><nav class="bc mu"><button class="lnk" data-act="go" data-p="sales">Sales</button> / ${esc(sl.id)}</nav>
<div class="ph"><div><h1>${esc(sl.id)} · ${esc(sl.brand)} ${esc(sl.model)}</h1><p>Sold to <b>${esc(sl.cname)}</b> on ${fd(sl.purDate)} · Shop: ${esc(sl.shop)}</p></div>
<div style="display:flex;gap:8px;flex-wrap:wrap">
<button class="btn" data-act="go" data-p="invoices/${sl.id}">${ic('file')}Print Invoice</button>
<button class="btn" data-act="go" data-p="sales/edit/${sl.id}">${ic('edit')}Edit Sale</button>
<button class="btn dg" data-act="sale-delete" data-id="${sl.id}">${ic('trash')}</button>
</div></div>

<div class="cw2">
<div style="display:grid;gap:16px">
<div class="panel pad"><h2>Customer Record</h2>
<dl class="kv" style="grid-template-columns:110px 1fr;margin-top:8px">
<dt>Customer</dt><dd><b>${esc(sl.cname)}</b></dd>
<dt>WhatsApp</dt><dd><a href="https://wa.me/${cleanPh}" target="_blank" class="lnk" style="color:var(--ok);font-weight:600">${ic('msg')} ${esc(sl.cphone)}</a></dd>
<dt>Alternate</dt><dd>${esc(sl.caltPhone || 'None')}</dd>
<dt>Address</dt><dd>${esc(sl.caddress)}</dd>
<dt>Landmark</dt><dd>${esc(sl.clandmark || '—')}</dd>
<dt>Locality</dt><dd><b>${esc(sl.clocality)}</b></dd>
<dt>Pincode</dt><dd>${esc(sl.cpincode)}</dd>
</dl>
<div style="margin-top:12px;display:flex;gap:8px">
<a href="https://wa.me/${cleanPh}" target="_blank" class="btn sm" style="background:#25D366;color:#fff;border-color:#25D366">${ic('msg')} WhatsApp Customer</a>
<button class="btn sm" data-act="cust-view" data-id="${sl.cid}">Customer History</button>
</div>
</div>

<div class="panel pad"><h2>AC Specifications</h2>
<dl class="kv" style="grid-template-columns:110px 1fr;margin-top:8px">
<dt>Brand Name</dt><dd><b>${esc(sl.brand)}</b></dd>
<dt>Model Number</dt><dd><b>${esc(sl.model)}</b></dd>
<dt>Serial Number</dt><dd><code style="font-weight:700;font-size:13px">${esc(sl.sn)}</code></dd>
<dt>Tonnage</dt><dd>${esc(sl.capacity || '1.5 Ton')}</dd>
<dt>Star Rating</dt><dd>${esc(sl.star || '5 Star')}</dd>
<dt>Purchase Date</dt><dd>${fd(sl.purDate)}</dd>
<dt>Shop Name</dt><dd>${esc(sl.shop)}</dd>
<dt>Installation Date</dt><dd>${fd(sl.instDate)} (${B(sl.status)})</dd>
</dl>
${sl.notes ? `<div style="margin-top:10px;font-size:12px;color:var(--mu)"><b>Notes:</b> ${esc(sl.notes)}</div>` : ''}
</div>
</div>

<div style="display:grid;gap:16px">
<div class="panel pad">
<h2>AC Service Schedule & WhatsApp Automation</h2>
<p class="ps">Manufacturer warranty requires 2 free services in the first year. Reminders are triggered to customer's WhatsApp.</p>
<div class="serv-timeline">

<div class="serv-card ${sl.s1.status === 'Completed' ? 'completed' : s1Due ? 'due' : 'sent'}">
<div>
<b>1st Free AC Service (After 3-5 Months)</b>
<div style="font-size:12px;color:var(--mu);margin-top:2px">Due Date: <b>${fd(sl.s1.date)}</b> · Status: ${B(sl.s1.status)}</div>
${sl.s1.sent ? `<small class="mu" style="display:block">Reminder sent on ${fd(sl.s1.sent)}</small>` : ''}
${sl.s1.completedDate ? `<small class="mu" style="display:block;color:var(--ok)">Completed on ${fd(sl.s1.completedDate)}</small>` : ''}
</div>
<div style="display:flex;gap:6px">
${sl.s1.status !== 'Completed' ? `<button class="btn sm" data-act="mark-serv-done" data-sid="${sl.id}" data-skey="s1">${ic('check')} Mark Done</button>` : ''}
<button class="btn sm pri" data-act="quick-wa-serv" data-sid="${sl.id}" data-skey="s1">${ic('send')} WhatsApp Reminder</button>
</div>
</div>

<div class="serv-card ${sl.s2.status === 'Completed' ? 'completed' : s2Due ? 'due' : 'sent'}">
<div>
<b>2nd Free AC Service (Before 11 Months)</b>
<div style="font-size:12px;color:var(--mu);margin-top:2px">Due Date: <b>${fd(sl.s2.date)}</b> · Status: ${B(sl.s2.status)}</div>
${sl.s2.sent ? `<small class="mu" style="display:block">Reminder sent on ${fd(sl.s2.sent)}</small>` : ''}
${sl.s2.completedDate ? `<small class="mu" style="display:block;color:var(--ok)">Completed on ${fd(sl.s2.completedDate)}</small>` : ''}
</div>
<div style="display:flex;gap:6px">
${sl.s2.status !== 'Completed' ? `<button class="btn sm" data-act="mark-serv-done" data-sid="${sl.id}" data-skey="s2">${ic('check')} Mark Done</button>` : ''}
<button class="btn sm pri" data-act="quick-wa-serv" data-sid="${sl.id}" data-skey="s2">${ic('send')} WhatsApp Reminder</button>
</div>
</div>

</div>
</div>

<div class="panel pad">
<h2>Uploaded Photos & Document Receipts (${(sl.images || []).length})</h2>
<p class="ps">Click any document to view full-resolution lightbox.</p>
<div class="sale-gallery">
${(sl.images || []).map((img, i) => `<div class="sale-gallery-item" data-act="lightbox" data-src="${img}">
<img src="${img}" alt="Sale Photo ${i + 1}">
</div>`).join('') || '<div class="empty" style="grid-column:1/-1">No photos or documents attached</div>'}
</div>
</div>

</div>
</div></div>`;
}

function lightboxModal(src) {
    modal(`<div class="img-lightbox-modal">
<img src="${src}" alt="Full Size Preview">
<div style="margin-top:14px">
<button class="btn pri" data-act="close">Close Preview</button>
</div>
</div>`);
}


let CAL_DATE = D(0);
let CAL_VIEW = 'month';

function cdd(s, n) {
    const x = new Date(s + 'T00:00:00Z');
    x.setUTCDate(x.getUTCDate() + n);
    return x.toISOString().slice(0, 10);
}

function getAllServiceEvents() {
    const events = [];
    (S.sales || []).forEach(sl => {
        if (sl.s1 && sl.s1.date) {
            events.push({
                saleId: sl.id,
                sale: sl,
                cname: sl.cname,
                cphone: sl.cphone,
                clocality: sl.clocality,
                brand: sl.brand,
                model: sl.model,
                sn: sl.sn,
                milestone: '1st Free Service (3-5 Mo)',
                date: sl.s1.date,
                status: sl.s1.status,
                key: 's1',
                sent: sl.s1.sent,
                completedDate: sl.s1.completedDate
            });
        }
        if (sl.s2 && sl.s2.date) {
            events.push({
                saleId: sl.id,
                sale: sl,
                cname: sl.cname,
                cphone: sl.cphone,
                clocality: sl.clocality,
                brand: sl.brand,
                model: sl.model,
                sn: sl.sn,
                milestone: '2nd Free Service (11 Mo)',
                date: sl.s2.date,
                status: sl.s2.status,
                key: 's2',
                sent: sl.s2.sent,
                completedDate: sl.s2.completedDate
            });
        }
    });
    return events;
}

function calNav(v) {
    if (v === 'today') {
        CAL_DATE = D(0);
    } else if (v === 'prev' || v === 'next') {
        const step = v === 'next' ? 1 : -1;
        if (CAL_VIEW === 'week') {
            CAL_DATE = cdd(CAL_DATE, 7 * step);
        } else if (CAL_VIEW === 'day') {
            CAL_DATE = cdd(CAL_DATE, step);
        } else {
            const x = new Date(CAL_DATE + 'T00:00:00Z');
            x.setUTCDate(1);
            x.setUTCMonth(x.getUTCMonth() + step);
            CAL_DATE = x.toISOString().slice(0, 10);
        }
    } else {
        CAL_VIEW = v;
    }
    render(true);
}

function calendar() {
    const events = getAllServiceEvents();
    const t0 = D(0);
    const B0 = new Date(CAL_DATE + 'T00:00:00Z');
    const y = B0.getUTCFullYear();
    const mo = B0.getUTCMonth();
    const ms = `${y}-${String(mo + 1).padStart(2, '0')}`;

    const L = (d, o) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-IN', { timeZone: 'UTC', ...o });
    const evFor = d => events.filter(e => e.date === d);

    let body, title;

    if (CAL_VIEW === 'month') {
        title = L(CAL_DATE, { month: 'long', year: 'numeric' });
        const firstDayDow = new Date(Date.UTC(y, mo, 1)).getUTCDay();
        const daysInMonth = new Date(Date.UTC(y, mo + 1, 0)).getUTCDate();

        let cells = '';
        for (let i = 0; i < firstDayDow; i++) {
            cells += '<div style="background:var(--bg);opacity:0.35;min-height:96px"></div>';
        }
        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = `${y}-${String(mo + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const dayEvs = evFor(dateStr);
            const isToday = dateStr === t0;
            cells += `<div class="cd${isToday ? ' today' : ''}" data-date="${dateStr}" style="min-height:96px;cursor:pointer" data-act="cal-day-select" data-d="${dateStr}">
<span class="dn">${d}</span>
${dayEvs.slice(0, 3).map(ev => {
    const isDone = ev.status === 'Completed';
    const bg = isDone ? 'var(--ok)' : ev.key === 's1' ? 'var(--ac)' : 'var(--wa)';
    return `<div style="font-size:10.5px;padding:2px 5px;border-radius:4px;margin-bottom:2px;background:${bg};color:#fff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="Customer: ${esc(ev.cname)} (${esc(ev.milestone)})">
${esc(ev.cname)} · ${esc(ev.brand)}
</div>`;
}).join('')}
${dayEvs.length > 3 ? `<small class="mu" style="font-size:10px">+${dayEvs.length - 3} more</small>` : ''}
</div>`;
        }
        body = `<div class="cg">${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => `<div class="mu" style="text-align:center;font-size:12px;font-weight:600;padding:6px 0">${d}</div>`).join('')}${cells}</div>`;
    } else if (CAL_VIEW === 'week') {
        const dow = B0.getUTCDay();
        const startOfWeek = cdd(CAL_DATE, -dow);
        const weekDates = Array.from({ length: 7 }, (_, i) => cdd(startOfWeek, i));
        title = L(weekDates[0], { day: 'numeric', month: 'short' }) + ' – ' + L(weekDates[6], { day: 'numeric', month: 'short', year: 'numeric' });

        body = `<div class="cg wk">
${weekDates.map(d => `<div class="mu" style="text-align:center;font-size:12px;font-weight:600;padding:6px 0">${L(d, { weekday: 'short', day: 'numeric' })}</div>`).join('')}
${weekDates.map(d => {
    const dayEvs = evFor(d);
    const isToday = d === t0;
    return `<div class="cd${isToday ? ' today' : ''}" style="min-height:220px">
<span class="dn">${+d.slice(8)}</span>
${dayEvs.map(ev => `<div class="li" style="padding:6px 0;border-bottom:1px solid var(--bd);cursor:pointer" data-act="go" data-p="sales/${ev.saleId}">
<div><b>Customer: ${esc(ev.cname)}</b><small>${esc(ev.brand)} ${esc(ev.model)}</small><small style="color:var(--mu);display:block">${esc(ev.milestone)}</small></div>
${B(ev.status)}
</div>`).join('') || '<small class="mu" style="display:block;margin-top:10px;text-align:center">No services</small>'}
</div>`;
}).join('')}
</div>`;
    } else if (CAL_VIEW === 'day') {
        title = L(CAL_DATE, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        const dayEvs = evFor(CAL_DATE);

        body = `<div class="pad" style="display:grid;gap:12px">
<div style="display:flex;justify-content:space-between;align-items:center">
<h2>Services Scheduled for this Day (${dayEvs.length})</h2>
<span class="mu">${CAL_DATE === t0 ? 'Today' : ''}</span>
</div>
${dayEvs.map(ev => `<div class="li" style="padding:12px 14px;border:1px solid var(--bd);border-radius:8px;background:var(--bg);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
<div>
<div style="font-size:15px;font-weight:700">Customer: ${esc(ev.cname)}</div>
<div style="font-size:12.5px;color:var(--mu);margin-top:2px">WhatsApp: <b>${esc(ev.cphone)}</b> · Locality: <b>${esc(ev.clocality)}</b></div>
<div style="font-size:12.5px;margin-top:4px">Unit: <b>${esc(ev.brand)} ${esc(ev.model)}</b> (S/N: <code>${esc(ev.sn)}</code>)</div>
<div style="font-size:12px;margin-top:2px"><span class="b ac">${esc(ev.milestone)}</span> ${B(ev.status)}</div>
</div>
<div style="display:flex;gap:6px">
${ev.status !== 'Completed' ? `<button class="btn sm" data-act="mark-serv-done" data-sid="${ev.saleId}" data-skey="${ev.key}">${ic('check')} Mark Done</button>` : ''}
<button class="btn sm pri" data-act="quick-wa-serv" data-sid="${ev.saleId}" data-skey="${ev.key}">${ic('send')} Send WhatsApp Reminder</button>
<button class="btn sm" data-act="go" data-p="sales/${ev.saleId}">View Sale</button>
</div>
</div>`).join('') || '<div class="empty">No AC service milestones scheduled for this date</div>'}
</div>`;
    } else {
        title = L(CAL_DATE, { month: 'long', year: 'numeric' });
        const monthEvs = events.filter(e => e.date.startsWith(ms)).sort((a, b) => a.date > b.date ? 1 : -1);
        const grouped = {};
        monthEvs.forEach(e => {
            grouped[e.date] = grouped[e.date] || [];
            grouped[e.date].push(e);
        });

        body = `<div style="display:grid;gap:14px;padding:12px">
${Object.keys(grouped).map(d => `<div class="ag">
<div class="agd${d === t0 ? ' t' : ''}"><b>${+d.slice(8)}</b><span>${L(d, { weekday: 'short', month: 'short' })}</span></div>
<div class="ag-items" style="display:grid;gap:8px">
${grouped[d].map(ev => `<div class="li" style="padding:10px 12px;border:1px solid var(--bd);border-radius:8px;background:var(--bg)">
<div style="flex:1">
<div><b>Customer: ${esc(ev.cname)}</b> <span class="mu">(${esc(ev.cphone)})</span></div>
<small>${esc(ev.milestone)} · ${esc(ev.brand)} ${esc(ev.model)} (S/N: ${esc(ev.sn)}) · ${esc(ev.clocality)}</small>
</div>
<div style="display:flex;gap:6px;align-items:center">
${B(ev.status)}
<button class="btn sm pri" data-act="quick-wa-serv" data-sid="${ev.saleId}" data-skey="${ev.key}">${ic('send')}</button>
<button class="btn sm" data-act="go" data-p="sales/${ev.saleId}">View</button>
</div>
</div>`).join('')}
</div>
</div>`).join('') || '<div class="empty">No service milestones this month</div>'}
</div>`;
    }

    const todayEvs = evFor(t0);
    const overdueEvs = events.filter(e => e.date < t0 && e.status !== 'Completed');

    return `<div class="pg"><div class="ph"><div><h1>AC Service Calendar</h1><p>Customer 1st and 2nd complimentary AC service schedules. Third-party dealer model (OEM brand company dispatches technicians).</p></div>
<button class="btn pri" data-act="go" data-p="sales/new">${ic('plus')}New Sale</button></div>

<div class="calbar">
<div class="cal-t"><h2 class="cal-title">${title}</h2><span class="mu">${events.length} total annual service milestones</span></div>
<div class="cal-ctl">
<div class="seg-b">
<button data-act="cal" data-v="prev" aria-label="Previous">◀</button>
<button data-act="cal" data-v="today">Today</button>
<button data-act="cal" data-v="next" aria-label="Next">▶</button>
</div>
<div class="tabs" role="tablist">
${['month', 'week', 'day', 'agenda'].map(v => `<button role="tab" aria-selected="${CAL_VIEW === v}" class="${CAL_VIEW === v ? 'on' : ''}" data-act="cal" data-v="${v}">${v[0].toUpperCase() + v.slice(1)}</button>`).join('')}
</div>
</div>
</div>

<div class="cw">
<div class="panel">${body}
<div class="lg" style="padding:10px 14px;border-top:1px solid var(--bd);display:flex;gap:14px;font-size:12px;flex-wrap:wrap">
<span><i style="background:var(--ac);width:10px;height:10px;border-radius:2px;display:inline-block;margin-right:4px"></i>1st Service (3-5 Months)</span>
<span><i style="background:var(--wa);width:10px;height:10px;border-radius:2px;display:inline-block;margin-right:4px"></i>2nd Service (Before 11 Months)</span>
<span><i style="background:var(--ok);width:10px;height:10px;border-radius:2px;display:inline-block;margin-right:4px"></i>Completed Service</span>
</div>
</div>

<div class="cside">
<div class="panel">
<div class="hd"><h2>Due Today (${todayEvs.length})</h2><span class="mu">${fd(t0)}</span></div>
<div class="pad">
${todayEvs.map(ev => `<div class="li" style="padding:6px 0;cursor:pointer" data-act="go" data-p="sales/${ev.saleId}">
<div><b>Customer: ${esc(ev.cname)}</b><small>${esc(ev.brand)} · ${esc(ev.milestone)}</small></div>
<button class="btn sm pri" data-act="quick-wa-serv" data-sid="${ev.saleId}" data-skey="${ev.key}">${ic('send')}</button>
</div>`).join('') || '<span class="mu" style="font-size:12px">No services due today</span>'}
</div>
</div>

<div class="panel" style="margin-top:14px">
<div class="hd"><h2>Overdue Milestones (${overdueEvs.length})</h2></div>
<div class="pad">
${overdueEvs.map(ev => `<div class="li" style="padding:6px 0;cursor:pointer" data-act="go" data-p="sales/${ev.saleId}">
<div><b>Customer: ${esc(ev.cname)}</b><small style="color:var(--er)">Due: ${fd(ev.date)} · ${esc(ev.brand)}</small></div>
<button class="btn sm pri" data-act="quick-wa-serv" data-sid="${ev.saleId}" data-skey="${ev.key}">${ic('send')}</button>
</div>`).join('') || '<span class="mu" style="font-size:12px">All past services up to date!</span>'}
</div>
</div>
</div>

</div></div>`;
}

function serviceActionModal(saleId, serviceKey) {
    const sl = sale(saleId);
    if (!sl) return;
    const serv = sl[serviceKey];
    const isS1 = serviceKey === 's1';
    const milestoneName = isS1 ? '1st Free AC Service (3 to 5 Months)' : '2nd Free AC Service (Before 11 Months)';
    const cleanPh = String(sl.cphone || '').replace(/\D/g, '');

    const tplKey = isS1 ? 'service1' : 'service2';
    const waText = renderMessageTemplate(tplKey, {
        name: sl.cname,
        brand: sl.brand,
        model: sl.model,
        sn: sl.sn,
        date: fd(serv.date),
        instDate: fd(sl.instDate)
    });

    modal(`<h1>${esc(milestoneName)}</h1>
<p>Sale: <b>${sl.id}</b> · Customer: <b>${esc(sl.cname)}</b> (${esc(sl.cphone)})</p>
<dl class="kv">
<dt>AC Unit</dt><dd><b>${esc(sl.brand)} ${esc(sl.model)}</b> (S/N: ${esc(sl.sn)})</dd>
<dt>Locality</dt><dd>${esc(sl.clocality)} · Pincode: ${esc(sl.cpincode)}</dd>
<dt>Address</dt><dd>${esc(sl.caddress)}</dd>
<dt>Scheduled Date</dt><dd><b>${fd(serv.date)}</b></dd>
<dt>Current Status</dt><dd>${B(serv.status)}</dd>
</dl>

<h2>WhatsApp Service Reminder Message</h2>
<div class="wa-bubble" id="wa-preview-box">${esc(waText)}</div>

<div class="acts" style="margin-top:16px">
<button class="btn" data-act="close">Cancel</button>
${serv.status !== 'Completed' ? `<button class="btn ok" data-act="mark-serv-done" data-sid="${sl.id}" data-skey="${serviceKey}">${ic('check')} Mark Completed</button>` : ''}
<button class="btn pri" data-act="send-wa-trigger" data-phone="${cleanPh}" data-cid="${sl.cid}" data-sid="${sl.id}" data-skey="${serviceKey}">${ic('send')} Send WhatsApp Reminder</button>
</div>`);
}


let ENG_TAB = 'auto';
let ENG_FILTER = 'all';
let ENG_SEARCH = '';

function engagementsPage() {
  const S = SS();
  const autos = S.automations || [];
  const logs = S.waLogs || [];
  const tmpls = S.templates || [];
  const totalSent = logs.length;
  const activeAutos = autos.filter(a => a.active).length;

  return `
    <div class="ph">
      <div class="ph-left">
        <h2>Customer Engagements & WhatsApp Automation</h2>
        <p class="sub">Automated AC lifecycle messaging, service reminders, greetings & promotional broadcasts</p>
      </div>
      <div class="ph-right">
        <button class="btn btn-sec" data-act="test-wa-modal">${ic('send')} Test WhatsApp Message</button>
        <button class="btn btn-primary" data-act="eng-tab" data-tab="promo">${ic('speaker')} New Broadcast</button>
      </div>
    </div>

    <div class="kpi-grid">
      <div class="kpi-c">
        <div class="kpi-t">Active Automations</div>
        <div class="kpi-v" style="color:var(--pri)">${activeAutos} <span style="font-size:14px;color:var(--text-3);font-weight:400">/ ${autos.length}</span></div>
        <div class="kpi-s">Triggering on sales & services</div>
      </div>
      <div class="kpi-c">
        <div class="kpi-t">Total Messages Dispatched</div>
        <div class="kpi-v" style="color:var(--suc)">${totalSent}</div>
        <div class="kpi-s">Across WhatsApp channels</div>
      </div>
      <div class="kpi-c">
        <div class="kpi-t">Service Reminders Sent</div>
        <div class="kpi-v" style="color:var(--inf)">${logs.filter(l => l.type && l.type.includes('service')).length}</div>
        <div class="kpi-s">1st & 2nd AC Service alerts</div>
      </div>
      <div class="kpi-c">
        <div class="kpi-t">Customer Reach</div>
        <div class="kpi-v" style="color:var(--warn)">${(S.customers || []).length}</div>
        <div class="kpi-s">Registered customer WhatsApps</div>
      </div>
    </div>

    <div class="chips" style="margin-bottom:18px">
      <div class="chip ${ENG_TAB === 'auto' ? 'active' : ''}" data-act="eng-tab" data-tab="auto">${ic('zap')} Automations (${autos.length})</div>
      <div class="chip ${ENG_TAB === 'logs' ? 'active' : ''}" data-act="eng-tab" data-tab="logs">${ic('list')} Message Logs (${logs.length})</div>
      <div class="chip ${ENG_TAB === 'templates' ? 'active' : ''}" data-act="eng-tab" data-tab="templates">${ic('file')} Message Templates (${tmpls.length})</div>
      <div class="chip ${ENG_TAB === 'promo' ? 'active' : ''}" data-act="eng-tab" data-tab="promo">${ic('speaker')} Promotional Broadcast</div>
    </div>

    ${ENG_TAB === 'auto' ? renderEngAutomations(autos, tmpls) : ''}
    ${ENG_TAB === 'logs' ? renderEngLogs(logs) : ''}
    ${ENG_TAB === 'templates' ? renderEngTemplates(tmpls) : ''}
    ${ENG_TAB === 'promo' ? renderEngPromo(S) : ''}
  `;
}

function renderEngAutomations(autos, tmpls) {
  const S = SS();
  const sampleCust = (S.customers && S.customers[0]) || { name: 'Rajesh Verma', waPhone: '9876543210' };
  const sampleProd = (S.products && S.products[0]) || { brand: 'Daikin', model: 'FTKF50TV' };
  const sampleSale = (S.sales && S.sales[0]) || { serialNumber: 'DAIK-98214', purchaseDate: '2026-06-15', installationDate: '2026-06-16' };

  return `
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(340px, 1fr));gap:20px;">
      ${autos.map(a => {
        const tmpl = tmpls.find(t => t.id === a.templateId) || {};
        const rendered = renderMessageTemplate(tmpl.text || '', {
          name: sampleCust.name,
          phone: sampleCust.waPhone,
          brand: sampleProd.brand,
          model: sampleProd.model,
          sn: sampleSale.serialNumber,
          shop: S.settings.shopName || 'Mobile Point AC Care',
          instDate: fd(sampleSale.installationDate),
          servDate: fd(sampleSale.s1Due || '2026-10-15'),
          servType: a.id === 'service_reminder_2' ? '2nd' : '1st',
          daysLeft: '5'
        });

        return `
          <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:4px solid ${a.active ? 'var(--pri)' : 'var(--border)'}">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
                <div>
                  <div style="font-weight:700;font-size:16px;color:var(--text-1);display:flex;align-items:center;gap:8px">
                    ${ic(a.id.includes('service') ? 'tool' : a.id.includes('welcome') ? 'user' : a.id.includes('promo') ? 'speaker' : 'check')}
                    ${esc(a.name)}
                  </div>
                  <div style="font-size:12px;color:var(--text-3);margin-top:2px">${esc(a.triggerDesc || a.trigger)}</div>
                </div>
                <label style="display:flex;align-items:center;cursor:pointer;gap:6px">
                  <input type="checkbox" ${a.active ? 'checked' : ''} data-act="toggle-auto" data-id="${a.id}" style="accent-color:var(--pri);width:16px;height:16px">
                  <span style="font-size:12px;font-weight:600;color:${a.active ? 'var(--suc)' : 'var(--text-3)'}">${a.active ? 'Active' : 'Paused'}</span>
                </label>
              </div>

              <p style="font-size:13px;color:var(--text-2);margin-bottom:14px;line-height:1.4">${esc(a.desc || '')}</p>

              <div style="margin-bottom:12px">
                <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-3);margin-bottom:6px">Sample Preview</div>
                <div class="wa-bubble">
                  ${esc(rendered)}
                  <div class="wa-bubble-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} ✓✓</div>
                </div>
              </div>
            </div>

            <div style="display:flex;justify-content:space-between;align-items:center;padding-top:14px;border-top:1px solid var(--border-light)">
              <div style="font-size:12px;color:var(--text-3)">Sent: <strong>${a.sentCount || 0}</strong> messages</div>
              <div style="display:flex;gap:6px">
                <button class="btn btn-sm btn-sec" data-act="test-auto" data-id="${a.id}">${ic('send')} Test</button>
                <button class="btn btn-sm btn-sec" data-act="edit-tmpl" data-id="${a.templateId}">${ic('edit')} Edit Template</button>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderEngLogs(logs) {
  let filtered = logs.slice();
  if (ENG_FILTER && ENG_FILTER !== 'all') {
    filtered = filtered.filter(l => l.type === ENG_FILTER);
  }
  if (ENG_SEARCH) {
    const q = ENG_SEARCH.toLowerCase();
    filtered = filtered.filter(l => 
      (l.customerName && l.customerName.toLowerCase().includes(q)) ||
      (l.phone && l.phone.includes(q)) ||
      (l.message && l.message.toLowerCase().includes(q))
    );
  }

  return `
    <div class="card" style="padding:0">
      <div style="padding:16px 20px;display:flex;gap:12px;align-items:center;border-bottom:1px solid var(--border-light);flex-wrap:wrap">
        <div class="search-box" style="max-width:320px;flex:1">
          ${ic('search')}
          <input type="text" placeholder="Search customer, phone or message..." value="${esc(ENG_SEARCH)}" data-act="eng-log-search">
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <label style="font-size:13px;color:var(--text-2);font-weight:600">Type:</label>
          <select class="form-ctrl" style="width:180px" data-act="eng-log-filter">
            <option value="all" ${ENG_FILTER === 'all' ? 'selected' : ''}>All Types</option>
            <option value="welcome" ${ENG_FILTER === 'welcome' ? 'selected' : ''}>Welcome Messages</option>
            <option value="purchase_greeting" ${ENG_FILTER === 'purchase_greeting' ? 'selected' : ''}>Purchase Greetings</option>
            <option value="service_reminder_1" ${ENG_FILTER === 'service_reminder_1' ? 'selected' : ''}>1st Service Reminders</option>
            <option value="service_reminder_2" ${ENG_FILTER === 'service_reminder_2' ? 'selected' : ''}>2nd Service Reminders</option>
            <option value="promo" ${ENG_FILTER === 'promo' ? 'selected' : ''}>Promotions</option>
          </select>
        </div>
      </div>

      <div class="table-wrap">
        <table class="tbl">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Customer</th>
              <th>WhatsApp Number</th>
              <th>Campaign / Type</th>
              <th>Message Excerpt</th>
              <th>Status</th>
              <th style="text-align:right">Action</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.length === 0 ? `
              <tr><td colspan="7" style="text-align:center;padding:32px;color:var(--text-3)">No message logs found</td></tr>
            ` : filtered.map(l => `
              <tr>
                <td style="white-space:nowrap;font-size:12px;color:var(--text-3)">${fds(l.timestamp)}</td>
                <td><strong>${esc(l.customerName || 'Customer')}</strong></td>
                <td><span style="font-family:monospace;font-size:13px">${esc(l.phone || '—')}</span></td>
                <td><span class="badge ${l.type && l.type.includes('service') ? 'badge-warn' : l.type === 'promo' ? 'badge-inf' : 'badge-pri'}">${esc(l.type || 'WhatsApp')}</span></td>
                <td style="max-width:280px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:12px;color:var(--text-2)">${esc(l.message || '')}</td>
                <td><span class="badge ${l.status === 'delivered' ? 'badge-suc' : l.status === 'sent' ? 'badge-inf' : 'badge-warn'}">${esc(l.status || 'sent')}</span></td>
                <td style="text-align:right;white-space:nowrap">
                  <button class="btn btn-sm btn-sec" data-act="view-log" data-id="${l.id}">${ic('eye')}</button>
                  <a class="btn btn-sm btn-pri" href="https://wa.me/91${esc(l.phone || '').replace(/\D/g,'')}?text=${encodeURIComponent(l.message || '')}" target="_blank">${ic('send')} Open WA</a>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderEngTemplates(tmpls) {
  return `
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(360px, 1fr));gap:20px">
      ${tmpls.map(t => `
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">
            <div>
              <div style="font-weight:700;font-size:15px;color:var(--text-1)">${esc(t.name)}</div>
              <div style="font-size:12px;color:var(--text-3)">Template ID: <code>${esc(t.id)}</code></div>
            </div>
            <button class="btn btn-sm btn-sec" data-act="edit-tmpl" data-id="${t.id}">${ic('edit')} Edit</button>
          </div>

          <div class="wa-bubble" style="margin-top:12px;white-space:pre-wrap;font-size:13px">${esc(t.text)}</div>

          <div style="margin-top:14px;padding-top:10px;border-top:1px solid var(--border-light)">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--text-3);margin-bottom:6px">Supported Variables</div>
            <div style="display:flex;flex-wrap:wrap;gap:4px">
              ${(t.vars || ['name', 'shop']).map(v => `<span class="badge" style="background:var(--bg-app);font-family:monospace;font-size:11px">{{${v}}}</span>`).join('')}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderEngPromo(S) {
  const localities = Array.from(new Set((S.customers || []).map(c => c.locality).filter(Boolean)));
  const totalCust = (S.customers || []).length;

  return `
    <div class="card" style="max-width:760px;margin:0 auto">
      <div style="border-bottom:1px solid var(--border-light);padding-bottom:14px;margin-bottom:18px">
        <h3 style="margin-bottom:4px">Send Promotional WhatsApp Broadcast</h3>
        <p class="sub">Reach your customer base with seasonal AC checkup discounts, festive offers, and maintenance tips.</p>
      </div>

      <div class="form-grid" style="grid-template-columns:1fr 1fr;margin-bottom:16px">
        <div class="form-group">
          <label class="form-lbl">Target Audience *</label>
          <select class="form-ctrl" id="promo-audience" data-act="promo-audience-change">
            <option value="all">All Registered Customers (${totalCust})</option>
            ${localities.map(loc => {
              const count = (S.customers || []).filter(c => c.locality === loc).length;
              return `<option value="loc:${esc(loc)}">Locality: ${esc(loc)} (${count} customers)</option>`;
            }).join('')}
          </select>
        </div>

        <div class="form-group">
          <label class="form-lbl">Campaign Name</label>
          <input type="text" class="form-ctrl" id="promo-camp-name" value="Pre-Summer AC Maintenance Drive 2026">
        </div>
      </div>

      <div class="form-group" style="margin-bottom:16px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
          <label class="form-lbl" style="margin-bottom:0">Message Body *</label>
          <span style="font-size:12px;color:var(--text-3)">Use <code>{{name}}</code> for customer name, <code>{{shop}}</code> for shop name</span>
        </div>
        <textarea class="form-ctrl" id="promo-body" rows="6" style="resize:vertical;font-family:inherit">Dear {{name}},
Beat the summer heat! Get your Air Conditioners thoroughly serviced and checked by authorized brand experts before the peak season.

Special offer from {{shop}}:
- Deep Jet Cleaning
- Gas Pressure & Leakage Check
- Coil & Filter Sanitization

Book your slot today! Reply to this message or call us at 9876543210.</textarea>
      </div>

      <div style="background:var(--bg-app);border-radius:var(--r-md);padding:14px;margin-bottom:20px;border:1px solid var(--border)">
        <div style="font-size:12px;font-weight:700;color:var(--text-3);text-transform:uppercase;margin-bottom:6px">Quick Variable Insertion</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button type="button" class="btn btn-sm btn-sec" data-act="insert-promo-var" data-var="{{name}}">{{name}}</button>
          <button type="button" class="btn btn-sm btn-sec" data-act="insert-promo-var" data-var="{{shop}}">{{shop}}</button>
          <button type="button" class="btn btn-sm btn-sec" data-act="insert-promo-var" data-var="{{brand}}">{{brand}}</button>
        </div>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="font-size:13px;color:var(--text-3)">
          Estimated recipients: <strong id="promo-recip-count" style="color:var(--pri)">${totalCust}</strong> customers
        </div>
        <button class="btn btn-primary" data-act="dispatch-promo">${ic('send')} Dispatch Broadcast to Customers</button>
      </div>
    </div>
  `;
}

function testWaModal(autoId) {
  const S = SS();
  const auto = (S.automations || []).find(a => a.id === autoId) || (S.automations || [])[0];
  const tmpl = (S.templates || []).find(t => t.id === (auto ? auto.templateId : 'welcome')) || (S.templates || [])[0];

  const content = `
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="form-group">
        <label class="form-lbl">Select Customer for Sample Data</label>
        <select class="form-ctrl" id="test-cust-sel" data-act="test-cust-change">
          ${(S.customers || []).map(c => `<option value="${c.id}">${esc(c.name)} (${esc(c.waPhone)}) - ${esc(c.locality || '')}</option>`).join('')}
        </select>
      </div>

      <div class="form-group">
        <label class="form-lbl">Test WhatsApp Number (e.g. 9876543210)</label>
        <input type="tel" class="form-ctrl" id="test-phone-input" value="${(S.customers && S.customers[0]) ? S.customers[0].waPhone : '9876543210'}">
      </div>

      <div class="form-group">
        <label class="form-lbl">Rendered Message Preview</label>
        <div class="wa-bubble" id="test-wa-preview" style="min-height:90px;white-space:pre-wrap"></div>
      </div>
    </div>
  `;

  modal({
    title: 'Test WhatsApp Message Trigger',
    content: content,
    actions: `
      <button class="btn btn-sec" data-act="close-modal">Cancel</button>
      <button class="btn btn-primary" data-act="send-test-wa" data-auto="${auto ? auto.id : ''}">${ic('send')} Launch in WhatsApp Web / App</button>
    `
  });

  updateTestWaPreview(auto ? auto.id : 'welcome');
}

function updateTestWaPreview(autoId) {
  const S = SS();
  const cSel = $('#test-cust-sel');
  const custId = cSel ? cSel.value : ((S.customers && S.customers[0]) ? S.customers[0].id : null);
  const cust = (S.customers || []).find(c => c.id === custId) || (S.customers && S.customers[0]) || {};
  const auto = (S.automations || []).find(a => a.id === autoId) || (S.automations || [])[0];
  const tmpl = (S.templates || []).find(t => t.id === (auto ? auto.templateId : 'welcome')) || (S.templates || [])[0];

  const relatedSale = (S.sales || []).find(s => s.customerId === cust.id) || (S.sales && S.sales[0]) || {};
  const relatedProd = (S.products || []).find(p => p.id === relatedSale.productId) || (S.products && S.products[0]) || {};

  const rendered = renderMessageTemplate(tmpl.text || '', {
    name: cust.name || 'Customer',
    phone: cust.waPhone || '',
    brand: relatedSale.brand || relatedProd.brand || 'Daikin',
    model: relatedSale.model || relatedProd.model || 'FTKF50TV',
    sn: relatedSale.serialNumber || 'DAIK-98214',
    shop: S.settings.shopName || 'Mobile Point AC Care',
    instDate: fd(relatedSale.installationDate || '2026-06-16'),
    servDate: fd(relatedSale.s1Due || '2026-10-15'),
    servType: (auto && auto.id === 'service_reminder_2') ? '2nd' : '1st',
    daysLeft: '5'
  });

  const preview = $('#test-wa-preview');
  if (preview) {
    preview.textContent = rendered;
  }
}

function templateEditModal(tmplId) {
  const S = SS();
  const tmpl = (S.templates || []).find(t => t.id === tmplId);
  if (!tmpl) return;

  const content = `
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="form-group">
        <label class="form-lbl">Template Name</label>
        <input type="text" class="form-ctrl" id="edit-tmpl-name" value="${esc(tmpl.name)}">
      </div>

      <div class="form-group">
        <label class="form-lbl">Template Text</label>
        <textarea class="form-ctrl" id="edit-tmpl-text" rows="8" style="resize:vertical;font-family:inherit">${esc(tmpl.text)}</textarea>
      </div>

      <div style="background:var(--bg-app);border-radius:var(--r-md);padding:10px 14px;border:1px solid var(--border)">
        <div style="font-size:11px;font-weight:700;color:var(--text-3);text-transform:uppercase;margin-bottom:6px">Insert Variables</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          ${(tmpl.vars || ['name', 'shop', 'brand', 'model']).map(v => `
            <button type="button" class="btn btn-sm btn-sec" data-act="insert-tmpl-var" data-var="{{${v}}}">{{${v}}}</button>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  modal({
    title: `Edit Template: ${esc(tmpl.name)}`,
    content: content,
    actions: `
      <button class="btn btn-sec" data-act="close-modal">Cancel</button>
      <button class="btn btn-primary" data-act="save-tmpl" data-id="${tmpl.id}">${ic('check')} Save Template</button>
    `
  });
}

function logViewModal(logId) {
  const S = SS();
  const log = (S.waLogs || []).find(l => l.id === logId);
  if (!log) return;

  const content = `
    <div style="display:flex;flex-direction:column;gap:14px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;background:var(--bg-app);padding:12px;border-radius:var(--r-md);border:1px solid var(--border)">
        <div>
          <div style="font-size:11px;color:var(--text-3);text-transform:uppercase;font-weight:700">Customer</div>
          <div style="font-weight:600;font-size:14px;color:var(--text-1)">${esc(log.customerName || 'Customer')}</div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--text-3);text-transform:uppercase;font-weight:700">WhatsApp Number</div>
          <div style="font-family:monospace;font-size:14px;color:var(--text-1)">${esc(log.phone || '—')}</div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--text-3);text-transform:uppercase;font-weight:700">Campaign / Type</div>
          <div><span class="badge badge-pri">${esc(log.type || 'WhatsApp')}</span></div>
        </div>
        <div>
          <div style="font-size:11px;color:var(--text-3);text-transform:uppercase;font-weight:700">Dispatched Time</div>
          <div style="font-size:13px;color:var(--text-2)">${fds(log.timestamp)}</div>
        </div>
      </div>

      <div>
        <label class="form-lbl">Complete Message Dispatched</label>
        <div class="wa-bubble" style="white-space:pre-wrap;font-size:13px;min-height:80px">
          ${esc(log.message)}
          <div class="wa-bubble-time">${fds(log.timestamp)} ✓✓</div>
        </div>
      </div>
    </div>
  `;

  modal({
    title: 'WhatsApp Message Dispatch Details',
    content: content,
    actions: `
      <button class="btn btn-sec" data-act="close-modal">Close</button>
      <a class="btn btn-primary" href="https://wa.me/91${esc(log.phone || '').replace(/\D/g,'')}?text=${encodeURIComponent(log.message || '')}" target="_blank">${ic('send')} Resend via WhatsApp</a>
    `
  });
}


let INV_SEARCH = '';
let INV_FILTER = 'all';

function invoicesPage() {
  const S = SS();
  const sales = S.sales || [];

  let filtered = sales.slice();
  if (INV_FILTER && INV_FILTER !== 'all') {
    filtered = filtered.filter(s => s.status === INV_FILTER);
  }
  if (INV_SEARCH) {
    const q = INV_SEARCH.toLowerCase();
    filtered = filtered.filter(s => 
      (s.invoiceNo && s.invoiceNo.toLowerCase().includes(q)) ||
      (s.customerName && s.customerName.toLowerCase().includes(q)) ||
      (s.brand && s.brand.toLowerCase().includes(q)) ||
      (s.model && s.model.toLowerCase().includes(q)) ||
      (s.serialNumber && s.serialNumber.toLowerCase().includes(q))
    );
  }

  return `
    <div class="ph">
      <div class="ph-left">
        <h2>AC Invoices & Delivery Memos</h2>
        <p class="sub">View, print and share sales invoices with complimentary AC service schedules</p>
      </div>
      <div class="ph-right">
        <button class="btn btn-primary" data-act="go-sub" data-page="sale-new">${ic('plus')} Record New Sale</button>
      </div>
    </div>

    <div class="card" style="padding:0">
      <div style="padding:16px 20px;display:flex;gap:12px;align-items:center;border-bottom:1px solid var(--border-light);flex-wrap:wrap">
        <div class="search-box" style="max-width:320px;flex:1">
          ${ic('search')}
          <input type="text" placeholder="Search invoice #, customer, model, serial..." value="${esc(INV_SEARCH)}" data-act="inv-search">
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <label style="font-size:13px;color:var(--text-2);font-weight:600">Status:</label>
          <select class="form-ctrl" style="width:160px" data-act="inv-filter">
            <option value="all" ${INV_FILTER === 'all' ? 'selected' : ''}>All Status</option>
            <option value="installed" ${INV_FILTER === 'installed' ? 'selected' : ''}>Installed</option>
            <option value="delivered" ${INV_FILTER === 'delivered' ? 'selected' : ''}>Delivered</option>
            <option value="booked" ${INV_FILTER === 'booked' ? 'selected' : ''}>Booked</option>
          </select>
        </div>
      </div>

      <div class="table-wrap">
        <table class="tbl">
          <thead>
            <tr>
              <th style="text-align:left">Invoice #</th>
              <th style="text-align:left">Date</th>
              <th style="text-align:left">Customer Name</th>
              <th style="text-align:left">AC Brand & Model</th>
              <th style="text-align:left">Serial Number</th>
              <th style="text-align:left">1st Service Due</th>
              <th style="text-align:left">Status</th>
              <th style="text-align:right">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.length === 0 ? `
              <tr><td colspan="8" style="text-align:center;padding:36px;color:var(--text-3)">No invoices found</td></tr>
            ` : filtered.map(s => `
              <tr>
                <td style="text-align:left"><strong style="font-family:monospace;color:var(--pri)">${esc(s.invoiceNo || 'INV-' + s.id)}</strong></td>
                <td style="text-align:left;font-size:13px;white-space:nowrap">${fd(s.purchaseDate)}</td>
                <td style="text-align:left">
                  <div style="font-weight:600">${esc(s.customerName)}</div>
                  <div style="font-size:12px;color:var(--text-3)">${esc(s.customerWaPhone || '')}</div>
                </td>
                <td style="text-align:left">
                  <span class="badge badge-sec">${esc(s.brand)}</span> <strong>${esc(s.model)}</strong>
                </td>
                <td style="text-align:left"><span style="font-family:monospace;font-size:12px">${esc(s.serialNumber || '—')}</span></td>
                <td style="text-align:left;font-size:13px;white-space:nowrap">${fd(s.s1Due)}</td>
                <td style="text-align:left"><span class="badge ${s.status === 'installed' ? 'badge-suc' : s.status === 'delivered' ? 'badge-inf' : 'badge-warn'}">${esc(s.status || 'delivered')}</span></td>
                <td style="text-align:right;white-space:nowrap">
                  <button class="btn btn-sm btn-sec" data-act="go-sub" data-page="inv-detail" data-id="${s.id}">${ic('printer')} View Invoice</button>
                  <button class="btn btn-sm btn-sec" data-act="send-inv-wa" data-id="${s.id}" title="Share via WhatsApp">${ic('send')}</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function invoiceDetailPage(saleId) {
  const S = SS();
  const s = (S.sales || []).find(item => item.id === saleId);
  if (!s) {
    return `<div class="card"><p>Sale invoice not found.</p><button class="btn btn-sec" data-act="go-nav" data-page="invoices">Back to Invoices</button></div>`;
  }

  const c = (S.customers || []).find(item => item.id === s.customerId) || {};
  const p = (S.products || []).find(item => item.id === s.productId) || {};
  const shop = S.settings || {};

  return `
    <div style="max-width:850px;margin:0 auto">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px" class="no-print">
        <button class="btn btn-sec" data-act="go-nav" data-page="invoices">${ic('back')} Back to Invoices</button>
        <div style="display:flex;gap:8px">
          <button class="btn btn-sec" data-act="send-inv-wa" data-id="${s.id}">${ic('send')} Share on WhatsApp</button>
          <button class="btn btn-primary" onclick="window.print()">${ic('printer')} Print Invoice</button>
        </div>
      </div>

      <div class="card inv-sheet" style="padding:36px;border-top:6px solid var(--pri);background:#fff;color:#111">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #eee;padding-bottom:20px;margin-bottom:24px">
          <div>
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
              <span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:6px;background:var(--pri);color:#fff">${ic('zap')}</span>
              <h1 style="font-size:24px;font-weight:800;color:var(--pri);margin:0;letter-spacing:-0.5px">${esc(shop.shopName || 'Mobile Point AC Care')}</h1>
            </div>
            <div style="font-size:13px;color:#555;line-height:1.5">
              ${esc(shop.address || 'Shop No. 12, Main Market, City Center')}<br>
              Phone: ${esc(shop.phone || '9876543210')} | WhatsApp: ${esc(shop.waPhone || '9876543210')}<br>
              GSTIN: ${esc(shop.gstin || '07AAAAA0000A1Z5')} | Authorized AC Sales & Care
            </div>
          </div>
          <div style="text-align:right">
            <span class="badge badge-pri" style="font-size:13px;padding:4px 10px;text-transform:uppercase">Tax Invoice & Delivery Memo</span>
            <div style="font-size:18px;font-weight:700;margin-top:8px;font-family:monospace">${esc(s.invoiceNo || 'INV-' + s.id)}</div>
            <div style="font-size:12px;color:#666;margin-top:3px">Date: <strong>${fd(s.purchaseDate)}</strong></div>
            <div style="font-size:12px;color:#666">Status: <strong style="text-transform:uppercase">${esc(s.status || 'Delivered')}</strong></div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:24px;background:#f9fafb;padding:16px;border-radius:6px;border:1px solid #e5e7eb">
          <div>
            <div style="font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;margin-bottom:6px">Customer Details</div>
            <div style="font-weight:700;font-size:15px;color:#111827">${esc(s.customerName || c.name || 'Customer')}</div>
            <div style="font-size:13px;color:#374151;margin-top:4px;line-height:1.4">
              ${esc(s.customerAddress || c.address || '—')}<br>
              ${(s.customerLandmark || c.landmark) ? `Landmark: ${esc(s.customerLandmark || c.landmark)}<br>` : ''}
              ${(s.customerLocality || c.locality) ? `Locality: ${esc(s.customerLocality || c.locality)}, ` : ''}
              Pin: ${esc(s.customerPincode || c.pincode || '—')}
            </div>
            <div style="font-size:13px;color:#1f2937;margin-top:6px">
              WhatsApp: <strong>${esc(s.customerWaPhone || c.waPhone || '—')}</strong>
              ${(s.customerAltPhone || c.altPhone) ? ` | Alt: ${esc(s.customerAltPhone || c.altPhone)}` : ''}
            </div>
          </div>

          <div>
            <div style="font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;margin-bottom:6px">Supply & Installation Information</div>
            <table style="width:100%;font-size:13px;color:#374151;border-collapse:collapse">
              <tr>
                <td style="padding:3px 0;color:#6b7280;width:130px">Shop / Branch:</td>
                <td style="padding:3px 0;font-weight:600">${esc(s.shopName || shop.shopName || 'Mobile Point AC Care')}</td>
              </tr>
              <tr>
                <td style="padding:3px 0;color:#6b7280">Date of Purchase:</td>
                <td style="padding:3px 0;font-weight:600">${fd(s.purchaseDate)}</td>
              </tr>
              <tr>
                <td style="padding:3px 0;color:#6b7280">Installation Date:</td>
                <td style="padding:3px 0;font-weight:600">${fd(s.installationDate)}</td>
              </tr>
              <tr>
                <td style="padding:3px 0;color:#6b7280">Brand OEM Support:</td>
                <td style="padding:3px 0;font-weight:600">Company Authorized Technicians</td>
              </tr>
            </table>
          </div>
        </div>

        <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
          <thead>
            <tr style="background:#f3f4f6;border-top:1px solid #d1d5db;border-bottom:1px solid #d1d5db">
              <th style="padding:10px 12px;text-align:left;font-size:12px;font-weight:700;color:#374151">#</th>
              <th style="padding:10px 12px;text-align:left;font-size:12px;font-weight:700;color:#374151">Item Description / AC Specification</th>
              <th style="padding:10px 12px;text-align:left;font-size:12px;font-weight:700;color:#374151">Brand</th>
              <th style="padding:10px 12px;text-align:left;font-size:12px;font-weight:700;color:#374151">Model Number</th>
              <th style="padding:10px 12px;text-align:left;font-size:12px;font-weight:700;color:#374151">Serial Number</th>
              <th style="padding:10px 12px;text-align:center;font-size:12px;font-weight:700;color:#374151">Qty</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid #e5e7eb">
              <td style="padding:12px;text-align:left;font-size:13px;vertical-align:top">1</td>
              <td style="padding:12px;text-align:left;font-size:13px;vertical-align:top">
                <div style="font-weight:700;color:#111827">${esc(s.brand)} ${esc(s.model)} Air Conditioner</div>
                <div style="font-size:12px;color:#6b7280;margin-top:2px">
                  ${p.capacity ? esc(p.capacity) + ' • ' : ''}
                  ${p.starRating ? esc(p.starRating) + ' • ' : ''}
                  ${p.inverterType ? esc(p.inverterType) + ' Inverter • ' : ''}
                  ${p.condenser ? esc(p.condenser) + ' Condenser' : ''}
                </div>
                ${s.notes ? `<div style="font-size:11px;color:#9ca3af;margin-top:4px">Note: ${esc(s.notes)}</div>` : ''}
              </td>
              <td style="padding:12px;text-align:left;font-size:13px;vertical-align:top;font-weight:600">${esc(s.brand)}</td>
              <td style="padding:12px;text-align:left;font-size:13px;vertical-align:top;font-family:monospace">${esc(s.model)}</td>
              <td style="padding:12px;text-align:left;font-size:13px;vertical-align:top;font-family:monospace;font-weight:700;color:var(--pri)">${esc(s.serialNumber || '—')}</td>
              <td style="padding:12px;text-align:center;font-size:13px;vertical-align:top;font-weight:600">1 Unit</td>
            </tr>
          </tbody>
        </table>

        <div style="border:2px dashed #93c5fd;border-radius:8px;padding:16px;background:#eff6ff;margin-bottom:24px">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
            <span style="color:#2563eb">${ic('shield')}</span>
            <h4 style="margin:0;color:#1e40af;font-size:15px;font-weight:700">Complimentary Service Schedule Certificate</h4>
          </div>
          <p style="font-size:12px;color:#1e3a8a;margin-bottom:12px;line-height:1.4">
            As part of Mobile Point AC Care customer assurance, you are entitled to two free routine services within your first year. Technicians are dispatched directly by the OEM brand.
          </p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
            <div style="background:#fff;padding:12px;border-radius:6px;border:1px solid #bfdbfe">
              <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#2563eb">1st Complimentary Service</div>
              <div style="font-size:14px;font-weight:700;color:#111;margin-top:3px">Due Date: ${fd(s.s1Due)}</div>
              <div style="font-size:12px;color:${s.s1Done ? '#059669' : '#d97706'};margin-top:2px;font-weight:600">
                ${s.s1Done ? '✓ Completed on ' + fd(s.s1DoneDate) : '• Scheduled / Pending'}
              </div>
            </div>
            <div style="background:#fff;padding:12px;border-radius:6px;border:1px solid #bfdbfe">
              <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#2563eb">2nd Complimentary Service</div>
              <div style="font-size:14px;font-weight:700;color:#111;margin-top:3px">Due Date: ${fd(s.s2Due)}</div>
              <div style="font-size:12px;color:${s.s2Done ? '#059669' : '#d97706'};margin-top:2px;font-weight:600">
                ${s.s2Done ? '✓ Completed on ' + fd(s.s2DoneDate) : '• Scheduled / Pending'}
              </div>
            </div>
          </div>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:36px;padding-top:20px;border-top:1px solid #e5e7eb">
          <div style="font-size:12px;color:#6b7280;max-width:440px;line-height:1.4">
            <strong>Terms & Notes:</strong><br>
            • AC installation and on-site servicing are performed exclusively by authorized OEM brand engineers.<br>
            • WhatsApp service reminder notifications will be automatically triggered prior to due dates.<br>
            • Please retain this receipt and delivery memo for any warranty claims with the manufacturer.
          </div>
          <div style="text-align:center">
            <div style="width:160px;border-bottom:1px solid #111;margin-bottom:6px"></div>
            <div style="font-size:12px;font-weight:700;color:#111">Authorized Signatory</div>
            <div style="font-size:11px;color:#6b7280">${esc(shop.shopName || 'Mobile Point AC Care')}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function reportsPage() {
  const S = SS();
  const sales = S.sales || [];
  const custs = S.customers || [];
  const prods = S.products || [];

  const brandCounts = {};
  const capacityCounts = {};
  sales.forEach(s => {
    brandCounts[s.brand] = (brandCounts[s.brand] || 0) + 1;
    const p = prods.find(item => item.id === s.productId);
    const cap = (p && p.capacity) ? p.capacity : '1.5 Ton';
    capacityCounts[cap] = (capacityCounts[cap] || 0) + 1;
  });

  const localityCounts = {};
  custs.forEach(c => {
    const loc = c.locality || 'Other';
    localityCounts[loc] = (localityCounts[loc] || 0) + 1;
  });

  let s1Completed = 0;
  let s1Pending = 0;
  let s2Completed = 0;
  let s2Pending = 0;

  sales.forEach(s => {
    if (s.s1Done) s1Completed++; else s1Pending++;
    if (s.s2Done) s2Completed++; else s2Pending++;
  });

  return `
    <div class="ph">
      <div class="ph-left">
        <h2>Reports & Sales Analytics</h2>
        <p class="sub">AC brand performance, service schedule tracking and customer distribution</p>
      </div>
    </div>

    <div class="kpi-grid">
      <div class="kpi-c">
        <div class="kpi-t">Total Units Sold</div>
        <div class="kpi-v" style="color:var(--pri)">${sales.length}</div>
        <div class="kpi-s">AC installations recorded</div>
      </div>
      <div class="kpi-c">
        <div class="kpi-t">Customer Base</div>
        <div class="kpi-v" style="color:var(--suc)">${custs.length}</div>
        <div class="kpi-s">Active AC buyers</div>
      </div>
      <div class="kpi-c">
        <div class="kpi-t">1st Service Completion</div>
        <div class="kpi-v" style="color:var(--inf)">${sales.length ? Math.round((s1Completed / sales.length) * 100) : 0}%</div>
        <div class="kpi-s">${s1Completed} done / ${s1Pending} pending</div>
      </div>
      <div class="kpi-c">
        <div class="kpi-t">2nd Service Completion</div>
        <div class="kpi-v" style="color:var(--warn)">${sales.length ? Math.round((s2Completed / sales.length) * 100) : 0}%</div>
        <div class="kpi-s">${s2Completed} done / ${s2Pending} pending</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(360px, 1fr));gap:20px;margin-bottom:24px">
      <div class="card">
        <h3 style="margin-bottom:14px;display:flex;align-items:center;gap:8px">${ic('tag')} AC Sales by Brand</h3>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${Object.keys(brandCounts).sort((a,b) => brandCounts[b] - brandCounts[a]).map(b => {
            const count = brandCounts[b];
            const pct = Math.round((count / (sales.length || 1)) * 100);
            return `
              <div>
                <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px">
                  <span style="font-weight:600">${esc(b)}</span>
                  <span>${count} units (${pct}%)</span>
                </div>
                <div style="height:8px;background:var(--bg-app);border-radius:4px;overflow:hidden">
                  <div style="height:100%;width:${pct}%;background:var(--pri);border-radius:4px"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="card">
        <h3 style="margin-bottom:14px;display:flex;align-items:center;gap:8px">${ic('zap')} AC Sales by Capacity / Tonnage</h3>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${Object.keys(capacityCounts).map(cap => {
            const count = capacityCounts[cap];
            const pct = Math.round((count / (sales.length || 1)) * 100);
            return `
              <div>
                <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px">
                  <span style="font-weight:600">${esc(cap)}</span>
                  <span>${count} units (${pct}%)</span>
                </div>
                <div style="height:8px;background:var(--bg-app);border-radius:4px;overflow:hidden">
                  <div style="height:100%;width:${pct}%;background:var(--suc);border-radius:4px"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="card">
        <h3 style="margin-bottom:14px;display:flex;align-items:center;gap:8px">${ic('map')} Customers by Locality</h3>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${Object.keys(localityCounts).sort((a,b) => localityCounts[b] - localityCounts[a]).map(loc => {
            const count = localityCounts[loc];
            const pct = Math.round((count / (custs.length || 1)) * 100);
            return `
              <div>
                <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px">
                  <span style="font-weight:600">${esc(loc)}</span>
                  <span>${count} customers (${pct}%)</span>
                </div>
                <div style="height:8px;background:var(--bg-app);border-radius:4px;overflow:hidden">
                  <div style="height:100%;width:${pct}%;background:var(--inf);border-radius:4px"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="card">
        <h3 style="margin-bottom:14px;display:flex;align-items:center;gap:8px">${ic('shield')} Service Compliance Status</h3>
        <div style="display:flex;flex-direction:column;gap:14px">
          <div style="background:var(--bg-app);padding:12px;border-radius:var(--r-md);border:1px solid var(--border)">
            <div style="font-weight:700;font-size:13px;margin-bottom:4px;color:var(--text-1)">1st Free Service (3-5 Months)</div>
            <div style="font-size:12px;color:var(--text-2);margin-bottom:8px">Target: within 120 days of AC installation</div>
            <div style="display:flex;gap:12px">
              <span class="badge badge-suc">Completed: ${s1Completed}</span>
              <span class="badge badge-warn">Upcoming / Due: ${s1Pending}</span>
            </div>
          </div>
          <div style="background:var(--bg-app);padding:12px;border-radius:var(--r-md);border:1px solid var(--border)">
            <div style="font-weight:700;font-size:13px;margin-bottom:4px;color:var(--text-1)">2nd Free Service (Before 11 Months)</div>
            <div style="font-size:12px;color:var(--text-2);margin-bottom:8px">Target: within 330 days of AC installation</div>
            <div style="display:flex;gap:12px">
              <span class="badge badge-suc">Completed: ${s2Completed}</span>
              <span class="badge badge-warn">Upcoming / Due: ${s2Pending}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function usersPage() {
  const S = SS();
  const users = S.users || [
    { id: 'u1', name: 'Admin Store Manager', email: 'admin@mobilepoint.com', role: 'Administrator', status: 'active', perms: ['all'] },
    { id: 'u2', name: 'Sales Executive', email: 'sales@mobilepoint.com', role: 'Sales Officer', status: 'active', perms: ['sales', 'customers', 'products', 'calendar'] },
    { id: 'u3', name: 'Service Coordinator', email: 'support@mobilepoint.com', role: 'Service Desk', status: 'active', perms: ['calendar', 'engagements', 'customers'] }
  ];

  return `
    <div class="ph">
      <div class="ph-left">
        <h2>User Management & Permissions</h2>
        <p class="sub">Configure staff logins, CRM roles and system access controls</p>
      </div>
      <div class="ph-right">
        <button class="btn btn-primary" data-act="add-user-modal">${ic('plus')} Add User Account</button>
      </div>
    </div>

    <div class="card" style="padding:0">
      <div class="table-wrap">
        <table class="tbl">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Access Permissions</th>
              <th>Status</th>
              <th style="text-align:right">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${users.map(u => `
              <tr>
                <td><strong>${esc(u.name)}</strong></td>
                <td><span style="font-family:monospace;font-size:13px">${esc(u.email)}</span></td>
                <td><span class="badge badge-pri">${esc(u.role)}</span></td>
                <td>
                  <div style="display:flex;flex-wrap:wrap;gap:4px">
                    ${(u.perms || ['all']).map(p => `<span class="badge badge-sec" style="font-size:11px">${esc(p)}</span>`).join('')}
                  </div>
                </td>
                <td><span class="badge ${u.status === 'active' ? 'badge-suc' : 'badge-warn'}">${esc(u.status)}</span></td>
                <td style="text-align:right">
                  <button class="btn btn-sm btn-sec" data-act="edit-user" data-id="${u.id}">${ic('edit')} Edit</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function settingsPage() {
  const S = SS();
  const set = S.settings || {};

  return `
    <div class="ph">
      <div class="ph-left">
        <h2>System Settings & Shop Configuration</h2>
        <p class="sub">Customize store credentials, service interval rules and WhatsApp branding</p>
      </div>
      <div class="ph-right">
        <button class="btn btn-primary" data-act="save-settings">${ic('check')} Save Changes</button>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:1000px">
      <div class="card">
        <h3 style="margin-bottom:14px;display:flex;align-items:center;gap:8px">${ic('settings')} Shop & Store Profile</h3>
        <div class="form-group" style="margin-bottom:14px">
          <label class="form-lbl">Shop Business Name *</label>
          <input type="text" class="form-ctrl" id="set-shop-name" value="${esc(set.shopName || 'Mobile Point AC Care')}">
        </div>
        <div class="form-group" style="margin-bottom:14px">
          <label class="form-lbl">Complete Shop Address *</label>
          <textarea class="form-ctrl" id="set-shop-address" rows="3">${esc(set.address || 'Shop No. 12, Main Market, City Center')}</textarea>
        </div>
        <div class="form-grid" style="grid-template-columns:1fr 1fr;margin-bottom:14px">
          <div class="form-group">
            <label class="form-lbl">Official Phone</label>
            <input type="tel" class="form-ctrl" id="set-phone" value="${esc(set.phone || '9876543210')}">
          </div>
          <div class="form-group">
            <label class="form-lbl">WhatsApp Business Number *</label>
            <input type="tel" class="form-ctrl" id="set-wa-phone" value="${esc(set.waPhone || '9876543210')}">
          </div>
        </div>
        <div class="form-grid" style="grid-template-columns:1fr 1fr">
          <div class="form-group">
            <label class="form-lbl">GSTIN</label>
            <input type="text" class="form-ctrl" id="set-gstin" value="${esc(set.gstin || '07AAAAA0000A1Z5')}">
          </div>
          <div class="form-group">
            <label class="form-lbl">Support Email</label>
            <input type="email" class="form-ctrl" id="set-email" value="${esc(set.email || 'support@mobilepoint.com')}">
          </div>
        </div>
      </div>

      <div class="card">
        <h3 style="margin-bottom:14px;display:flex;align-items:center;gap:8px">${ic('tool')} AC Service Schedule Calculation Rules</h3>
        <p class="sub" style="margin-bottom:16px">Define days from purchase date to auto-schedule routine brand free services</p>

        <div class="form-group" style="margin-bottom:16px">
          <label class="form-lbl">1st Free Service Due (Days from Purchase)</label>
          <div style="display:flex;gap:10px;align-items:center">
            <input type="number" class="form-ctrl" id="set-s1-days" value="${set.s1Days || 120}" min="30" max="180" style="width:120px">
            <span style="font-size:13px;color:var(--text-2)">days (Default: 120 days / 4 months)</span>
          </div>
        </div>

        <div class="form-group" style="margin-bottom:20px">
          <label class="form-lbl">2nd Free Service Due (Days from Purchase)</label>
          <div style="display:flex;gap:10px;align-items:center">
            <input type="number" class="form-ctrl" id="set-s2-days" value="${set.s2Days || 330}" min="180" max="365" style="width:120px">
            <span style="font-size:13px;color:var(--text-2)">days (Default: 330 days / 11 months)</span>
          </div>
        </div>

        <div style="border-top:1px solid var(--border-light);padding-top:16px;margin-top:16px">
          <h4 style="margin-bottom:8px;font-size:14px">Data Backup & Reset</h4>
          <p class="sub" style="margin-bottom:12px">Export full CRM database or reset to fresh seed demo data</p>
          <div style="display:flex;gap:10px">
            <button class="btn btn-sec" data-act="export-data">${ic('download')} Export JSON Backup</button>
            <button class="btn btn-sec" data-act="reset-data" style="color:var(--err)">${ic('trash')} Reset Demo Data</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function notificationsPage() {
  const S = SS();
  const notifs = S.notifications || [];

  return `
    <div class="ph">
      <div class="ph-left">
        <h2>System Notifications</h2>
        <p class="sub">Service due alerts, WhatsApp delivery updates and sales activity</p>
      </div>
      <div class="ph-right">
        <button class="btn btn-sec" data-act="mark-all-read">${ic('check')} Mark All as Read</button>
      </div>
    </div>

    <div class="card" style="max-width:800px;margin:0 auto">
      ${notifs.length === 0 ? `
        <div style="text-align:center;padding:36px;color:var(--text-3)">No notifications right now</div>
      ` : `
        <div style="display:flex;flex-direction:column;gap:12px">
          ${notifs.map(n => `
            <div style="display:flex;gap:12px;padding:12px;border-radius:var(--r-md);background:${n.read ? 'var(--bg-app)' : 'var(--pri-light)'};border:1px solid var(--border)">
              <div style="color:var(--pri);padding-top:2px">${ic(n.icon || 'bell')}</div>
              <div style="flex:1">
                <div style="display:flex;justify-content:space-between;align-items:flex-start">
                  <div style="font-weight:700;font-size:14px;color:var(--text-1)">${esc(n.title)}</div>
                  <div style="font-size:11px;color:var(--text-3)">${fds(n.time)}</div>
                </div>
                <div style="font-size:13px;color:var(--text-2);margin-top:3px">${esc(n.desc)}</div>
                ${n.link ? `<button class="btn btn-sm btn-sec" style="margin-top:8px" data-act="go-sub" data-page="${n.link.page}" data-id="${n.link.id || ''}">${esc(n.link.text || 'View Details')}</button>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

function activityPage() {
  const S = SS();
  const acts = S.activity || [];

  return `
    <div class="ph">
      <div class="ph-left">
        <h2>Activity Audit Trail</h2>
        <p class="sub">Chronological event log of sales, customers and service reminders</p>
      </div>
    </div>

    <div class="card" style="max-width:800px;margin:0 auto;padding:0">
      <div class="table-wrap">
        <table class="tbl">
          <thead>
            <tr>
              <th>Time</th>
              <th>Action</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            ${acts.length === 0 ? `
              <tr><td colspan="3" style="text-align:center;padding:32px;color:var(--text-3)">No activity logged yet</td></tr>
            ` : acts.map(a => `
              <tr>
                <td style="white-space:nowrap;font-size:12px;color:var(--text-3)">${fds(a.time)}</td>
                <td><span class="badge badge-sec">${esc(a.action)}</span></td>
                <td style="font-size:13px;color:var(--text-1)">${esc(a.details)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function quickNewModal() {
  const content = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
      <div class="card" style="cursor:pointer;border:2px solid var(--border);transition:border-color .2s;text-align:center;padding:20px" data-act="quick-go" data-page="sale-new">
        <div style="color:var(--pri);margin-bottom:8px">${ic('plus')}</div>
        <div style="font-weight:700;font-size:15px;color:var(--text-1)">Record AC Sale</div>
        <div style="font-size:12px;color:var(--text-3);margin-top:4px">New sale with auto customer/product creation</div>
      </div>

      <div class="card" style="cursor:pointer;border:2px solid var(--border);transition:border-color .2s;text-align:center;padding:20px" data-act="quick-go" data-page="cust-new">
        <div style="color:var(--suc);margin-bottom:8px">${ic('user')}</div>
        <div style="font-weight:700;font-size:15px;color:var(--text-1)">Add Customer</div>
        <div style="font-size:12px;color:var(--text-3);margin-top:4px">Save address, landmark, locality & WhatsApp</div>
      </div>

      <div class="card" style="cursor:pointer;border:2px solid var(--border);transition:border-color .2s;text-align:center;padding:20px" data-act="quick-go" data-page="prod-new">
        <div style="color:var(--inf);margin-bottom:8px">${ic('box')}</div>
        <div style="font-weight:700;font-size:15px;color:var(--text-1)">Add AC Model</div>
        <div style="font-size:12px;color:var(--text-3);margin-top:4px">Brand, model & specifications catalog</div>
      </div>

      <div class="card" style="cursor:pointer;border:2px solid var(--border);transition:border-color .2s;text-align:center;padding:20px" data-act="quick-go" data-page="engagements">
        <div style="color:var(--warn);margin-bottom:8px">${ic('send')}</div>
        <div style="font-weight:700;font-size:15px;color:var(--text-1)">Send WhatsApp</div>
        <div style="font-size:12px;color:var(--text-3);margin-top:4px">Broadcast offer or service reminder trigger</div>
      </div>
    </div>
  `;

  modal({
    title: 'Quick Create / Action',
    content: content,
    actions: `<button class="btn btn-sec" data-act="close-modal">Cancel</button>`
  });
}

function globalSearchModal(query) {
  const S = SS();
  const q = (query || '').toLowerCase().trim();
  if (!q) return;

  const mCusts = (S.customers || []).filter(c => 
    c.name.toLowerCase().includes(q) ||
    c.waPhone.includes(q) ||
    (c.locality && c.locality.toLowerCase().includes(q))
  );

  const mProds = (S.products || []).filter(p =>
    p.brand.toLowerCase().includes(q) ||
    p.model.toLowerCase().includes(q)
  );

  const mSales = (S.sales || []).filter(s =>
    (s.invoiceNo && s.invoiceNo.toLowerCase().includes(q)) ||
    (s.serialNumber && s.serialNumber.toLowerCase().includes(q)) ||
    s.customerName.toLowerCase().includes(q)
  );

  const content = `
    <div style="display:flex;flex-direction:column;gap:16px">
      <div>
        <div style="font-size:12px;font-weight:700;color:var(--text-3);text-transform:uppercase;margin-bottom:6px">Customers (${mCusts.length})</div>
        ${mCusts.length === 0 ? '<div style="font-size:13px;color:var(--text-3)">No customers match</div>' : `
          <div style="display:flex;flex-direction:column;gap:6px">
            ${mCusts.slice(0, 5).map(c => `
              <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:var(--bg-app);border-radius:var(--r-md);cursor:pointer" data-act="go-cust-modal" data-id="${c.id}">
                <div>
                  <strong>${esc(c.name)}</strong> - <span style="font-size:12px;color:var(--text-3)">${esc(c.waPhone)} (${esc(c.locality || '')})</span>
                </div>
                <button class="btn btn-sm btn-sec">View</button>
              </div>
            `).join('')}
          </div>
        `}
      </div>

      <div>
        <div style="font-size:12px;font-weight:700;color:var(--text-3);text-transform:uppercase;margin-bottom:6px">AC Products (${mProds.length})</div>
        ${mProds.length === 0 ? '<div style="font-size:13px;color:var(--text-3)">No AC products match</div>' : `
          <div style="display:flex;flex-direction:column;gap:6px">
            ${mProds.slice(0, 5).map(p => `
              <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:var(--bg-app);border-radius:var(--r-md);cursor:pointer" data-act="go-sub" data-page="prod-detail" data-id="${p.id}">
                <div>
                  <span class="badge badge-sec">${esc(p.brand)}</span> <strong>${esc(p.model)}</strong>
                </div>
                <button class="btn btn-sm btn-sec">Details</button>
              </div>
            `).join('')}
          </div>
        `}
      </div>

      <div>
        <div style="font-size:12px;font-weight:700;color:var(--text-3);text-transform:uppercase;margin-bottom:6px">Sales & Invoices (${mSales.length})</div>
        ${mSales.length === 0 ? '<div style="font-size:13px;color:var(--text-3)">No sales match</div>' : `
          <div style="display:flex;flex-direction:column;gap:6px">
            ${mSales.slice(0, 5).map(s => `
              <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:var(--bg-app);border-radius:var(--r-md);cursor:pointer" data-act="go-sub" data-page="sale-detail" data-id="${s.id}">
                <div>
                  <strong>${esc(s.invoiceNo || 'INV-' + s.id)}</strong> - ${esc(s.customerName)} (${esc(s.brand)} ${esc(s.model)})
                </div>
                <button class="btn btn-sm btn-sec">Open</button>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    </div>
  `;

  modal({
    title: `Search Results for "${esc(query)}"`,
    content: content,
    actions: `<button class="btn btn-sec" data-act="close-modal">Close</button>`
  });
}

function subPage(p) {
  SUB = p;
  render();
}

function go(p) {
  PAGE = p;
  SUB = null;
  if (window.history && window.history.pushState) {
    window.history.pushState(null, '', '#' + p);
  }
  render();
}

function render(keepScroll) {
  const scr = keepScroll ? window.scrollY : 0;
  
  const nv = $('#nv');
  if (nv) {
    nv.innerHTML = NAV.map(p => `
      <button class="ni ${PAGE === p[0] && !SUB ? 'on' : ''}" data-act="go-nav" data-page="${p[0]}">
        ${ic(p[2])}<span>${p[1]}</span>
      </button>
    `).join('');
  }

  const bn = $('#bn');
  if (bn) {
    const mobileNav = [
      ['overview', 'Overview', 'home'],
      ['sales', 'Sales', 'cart'],
      ['customers', 'Customers', 'users'],
      ['calendar', 'Calendar', 'cal'],
      ['engagements', 'WhatsApp', 'zap']
    ];
    bn.innerHTML = mobileNav.map(p => `
      <button class="${PAGE === p[0] && !SUB ? 'on' : ''}" data-act="go-nav" data-page="${p[0]}">
        ${ic(p[2])}<span>${p[1]}</span>
      </button>
    `).join('');
  }

  const mb = $('#mb');
  if (mb && !mb.innerHTML) mb.innerHTML = ic('menu');
  const gsb = $('#gsb');
  if (gsb && !gsb.querySelector('input')) {
    gsb.innerHTML = `<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg><input type="search" placeholder="Search customers, products, sales... (/)" id="gq" data-act="gsearch">`;
  }
  const nb = $('#nb');
  if (nb && !nb.innerHTML) nb.innerHTML = ic('plus') + '<span>+ New</span>';
  const ab = $('#ab');
  if (ab && !ab.innerHTML) ab.innerHTML = ic('list');
  const bl = $('#bl');
  if (bl) {
    const un = (SS().notifications || []).filter(n => !n.read).length;
    bl.innerHTML = ic('bell') + (un > 0 ? `<span class="badge" style="position:absolute;top:4px;right:4px;background:var(--err);color:#fff;border-radius:10px;padding:1px 5px;font-size:10px">${un}</span>` : '');
    bl.style.position = 'relative';
  }
  const th = $('#th');
  if (th) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    th.innerHTML = ic(isDark ? 'moon' : 'moon');
  }

  const app = $('#main') || $('#app');
  if (!app) return;

  let html = '';
  if (SUB) {
    if (SUB.page === 'sale-new') html = saleFormPage(null);
    else if (SUB.page === 'sale-edit') html = saleFormPage(SUB.id);
    else if (SUB.page === 'sale-detail') html = saleDetailPage(SUB.id);
    else if (SUB.page === 'cust-new') html = customerFormPage(null);
    else if (SUB.page === 'cust-edit') html = customerFormPage(SUB.id);
    else if (SUB.page === 'prod-new') html = productFormPage(null);
    else if (SUB.page === 'prod-edit') html = productFormPage(SUB.id);
    else if (SUB.page === 'prod-detail') html = productDetailPage(SUB.id);
    else if (SUB.page === 'inv-detail') html = invoiceDetailPage(SUB.id);
    else if (SUB.page === 'notifications') html = notificationsPage();
    else if (SUB.page === 'activity') html = activityPage();
    else html = overview();
  } else {
    switch (PAGE) {
      case 'overview': html = overview(); break;
      case 'sales': html = salesPage(); break;
      case 'customers': html = customersPage(); break;
      case 'products': html = productsPage(); break;
      case 'calendar': html = calendar(); break;
      case 'engagements': html = engagementsPage(); break;
      case 'invoices': html = invoicesPage(); break;
      case 'reports': html = reportsPage(); break;
      case 'users': html = usersPage(); break;
      case 'settings': html = settingsPage(); break;
      case 'notifications': html = notificationsPage(); break;
      case 'activity': html = activityPage(); break;
      default: html = overview(); break;
    }
  }

  app.innerHTML = html;
  if (keepScroll) window.scrollTo(0, scr);
}

document.addEventListener('click', e => {
  const t = e.target.closest('[data-act]');
  if (!t) return;
  const act = t.getAttribute('data-act');

  if (act === 'go-nav') {
    const sd = $('#sd');
    if (sd) sd.classList.remove('open');
    const page = t.getAttribute('data-page');
    go(page);
  } else if (act === 'menu') {
    const sd = $('#sd');
    if (sd) sd.classList.toggle('open');
  } else if (act === 'drawer') {
    const sd = $('#sd');
    if (sd) sd.classList.remove('open');
  } else if (act === 'actd') {
    go('activity');
  } else if (act === 'bell') {
    go('notifications');
  } else if (act === 'theme') {
    const cur = document.documentElement.getAttribute('data-theme') || 'light';
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('mp-theme', next);
    render(true);
  } else if (act === 'new') {
    quickNewModal();
  } else if (act === 'logout') {
    toast('Demo mode: User session persistent');
  } else if (act === 'go-sub') {
    const page = t.getAttribute('data-page');
    const id = t.getAttribute('data-id');
    subPage({ page: page, id: id });
  } else if (act === 'close' || act === 'close-modal') {
    closeM();
  } else if (act === 'cust-chip') {
    CUST_FILTER = t.getAttribute('data-val');
    render(true);
  } else if (act === 'cust-modal') {
    const id = t.getAttribute('data-id');
    custModal(id);
  } else if (act === 'prod-brand-chip') {
    PROD_BRAND = t.getAttribute('data-val');
    render(true);
  } else if (act === 'prod-view-toggle') {
    PROD_VIEW = t.getAttribute('data-val');
    render(true);
  } else if (act === 'sale-filter-chip') {
    SALE_FILTER = t.getAttribute('data-val');
    render(true);
  } else if (act === 'cal-view') {
    CAL_VIEW = t.getAttribute('data-view');
    render(true);
  } else if (act === 'cal-nav') {
    const dir = parseInt(t.getAttribute('data-dir') || '0', 10);
    const d = new Date(CAL_DATE);
    if (CAL_VIEW === 'month') d.setMonth(d.getMonth() + dir);
    else if (CAL_VIEW === 'week') d.setDate(d.getDate() + (dir * 7));
    else d.setDate(d.getDate() + dir);
    CAL_DATE = d.toISOString().slice(0, 10);
    render(true);
  } else if (act === 'cal-today') {
    CAL_DATE = new Date().toISOString().slice(0, 10);
    render(true);
  } else if (act === 'cal-filter-chip') {
    CAL_FILTER = t.getAttribute('data-val');
    render(true);
  } else if (act === 'service-action') {
    const sId = t.getAttribute('data-sale');
    const sKey = t.getAttribute('data-key');
    serviceActionModal(sId, sKey);
  } else if (act === 'eng-tab') {
    ENG_TAB = t.getAttribute('data-tab');
    render(true);
  } else if (act === 'toggle-auto') {
    const aId = t.getAttribute('data-id');
    const S = SS();
    const auto = (S.automations || []).find(a => a.id === aId);
    if (auto) {
      auto.active = t.checked;
      save(S);
      toast(`Automation ${auto.name} ${auto.active ? 'activated' : 'paused'}`, 'suc');
    }
  } else if (act === 'test-auto' || act === 'test-wa-modal') {
    const aId = t.getAttribute('data-id') || 'welcome';
    testWaModal(aId);
  } else if (act === 'edit-tmpl') {
    const tId = t.getAttribute('data-id');
    templateEditModal(tId);
  } else if (act === 'view-log') {
    const lId = t.getAttribute('data-id');
    logViewModal(lId);
  } else if (act === 'save-tmpl') {
    const tId = t.getAttribute('data-id');
    const S = SS();
    const tmpl = (S.templates || []).find(item => item.id === tId);
    if (tmpl) {
      tmpl.name = $('#edit-tmpl-name').value.trim();
      tmpl.text = $('#edit-tmpl-text').value.trim();
      save(S);
      closeM();
      toast('Message template updated', 'suc');
      render(true);
    }
  } else if (act === 'send-test-wa') {
    const autoId = t.getAttribute('data-auto') || 'welcome';
    const cSel = $('#test-cust-sel');
    const phoneInput = $('#test-phone-input');
    const phone = phoneInput ? phoneInput.value.trim() : '9876543210';
    const custId = cSel ? cSel.value : null;

    const S = SS();
    const cust = (S.customers || []).find(c => c.id === custId) || { name: 'Customer' };
    const auto = (S.automations || []).find(a => a.id === autoId) || {};
    const tmpl = (S.templates || []).find(tmplItem => tmplItem.id === (auto.templateId || 'welcome')) || {};
    
    const rendered = renderMessageTemplate(tmpl.text || '', {
      name: cust.name || 'Customer',
      phone: phone,
      brand: 'Daikin',
      model: 'FTKF50TV',
      sn: 'DAIK-98214',
      shop: S.settings.shopName || 'Mobile Point AC Care',
      instDate: '16 Jun 2026',
      servDate: '15 Oct 2026',
      servType: '1st',
      daysLeft: '5'
    });

    sendWhatsAppWA(phone, rendered, autoId, cust.name);
    closeM();
  } else if (act === 'insert-promo-var') {
    const v = t.getAttribute('data-var');
    const ta = $('#promo-body');
    if (ta) {
      ta.value += ' ' + v;
      ta.focus();
    }
  } else if (act === 'insert-tmpl-var') {
    const v = t.getAttribute('data-var');
    const ta = $('#edit-tmpl-text');
    if (ta) {
      ta.value += ' ' + v;
      ta.focus();
    }
  } else if (act === 'dispatch-promo') {
    const aud = $('#promo-audience').value;
    const body = $('#promo-body').value.trim();
    if (!body) {
      toast('Please enter promotional message text', 'warn');
      return;
    }
    const S = SS();
    let targets = S.customers || [];
    if (aud.startsWith('loc:')) {
      const loc = aud.slice(4);
      targets = targets.filter(c => c.locality === loc);
    }
    targets.forEach(c => {
      const rendered = renderMessageTemplate(body, {
        name: c.name,
        phone: c.waPhone,
        shop: S.settings.shopName || 'Mobile Point AC Care'
      });
      S.waLogs.unshift({
        id: 'log-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        type: 'promo',
        customerName: c.name,
        phone: c.waPhone,
        message: rendered,
        timestamp: new Date().toISOString(),
        status: 'delivered'
      });
    });
    save(S);
    toast(`Broadcast queued to ${targets.length} customers!`, 'suc');
    ENG_TAB = 'logs';
    render(true);
  } else if (act === 'send-inv-wa') {
    const sId = t.getAttribute('data-id');
    const S = SS();
    const s = (S.sales || []).find(item => item.id === sId);
    if (!s) return;
    const msg = `Dear ${s.customerName},\nHere is your purchase confirmation & complimentary service certificate from ${S.settings.shopName || 'Mobile Point AC Care'}.\n\nInvoice: ${s.invoiceNo}\nAC: ${s.brand} ${s.model}\nSerial No: ${s.serialNumber}\nPurchase Date: ${fd(s.purchaseDate)}\n\n1st Service Due: ${fd(s.s1Due)}\n2nd Service Due: ${fd(s.s2Due)}\n\nThank you for choosing us!`;
    sendWhatsAppWA(s.customerWaPhone, msg, 'invoice_share', s.customerName);
  } else if (act === 'send-service-rem') {
    const sId = t.getAttribute('data-id');
    const key = t.getAttribute('data-key');
    const S = SS();
    const s = (S.sales || []).find(item => item.id === sId);
    if (!s) return;
    const isS2 = key === 's2';
    const tmplId = isS2 ? 'service_reminder_2' : 'service_reminder_1';
    const tmpl = (S.templates || []).find(tmplItem => tmplItem.id === tmplId) || {};
    const rendered = renderMessageTemplate(tmpl.text || '', {
      name: s.customerName,
      phone: s.customerWaPhone,
      brand: s.brand,
      model: s.model,
      sn: s.serialNumber,
      shop: S.settings.shopName || 'Mobile Point AC Care',
      instDate: fd(s.installationDate),
      servDate: fd(isS2 ? s.s2Due : s.s1Due),
      servType: isS2 ? '2nd' : '1st',
      daysLeft: '5'
    });
    s[key + 'RemSent'] = true;
    save(S);
    closeM();
    sendWhatsAppWA(s.customerWaPhone, rendered, tmplId, s.customerName);
    render(true);
  } else if (act === 'mark-service-completed') {
    const sId = t.getAttribute('data-id');
    const key = t.getAttribute('data-key');
    const S = SS();
    const s = (S.sales || []).find(item => item.id === sId);
    if (!s) return;
    s[key + 'Done'] = true;
    s[key + 'DoneDate'] = new Date().toISOString().slice(0, 10);
    logActivity('Service Completed', `${key === 's2' ? '2nd' : '1st'} AC service marked completed for ${s.customerName} (${s.brand} ${s.model})`);
    save(S);
    closeM();
    toast(`${key === 's2' ? '2nd' : '1st'} Service marked completed`, 'suc');
    render(true);
  } else if (act === 'save-settings') {
    const S = SS();
    S.settings = S.settings || {};
    S.settings.shopName = $('#set-shop-name').value.trim() || 'Mobile Point AC Care';
    S.settings.address = $('#set-shop-address').value.trim();
    S.settings.phone = $('#set-phone').value.trim();
    S.settings.waPhone = $('#set-wa-phone').value.trim();
    S.settings.gstin = $('#set-gstin').value.trim();
    S.settings.email = $('#set-email').value.trim();
    S.settings.s1Days = parseInt($('#set-s1-days').value || '120', 10);
    S.settings.s2Days = parseInt($('#set-s2-days').value || '330', 10);
    save(S);
    toast('Settings successfully saved', 'suc');
    render(true);
  } else if (act === 'export-data') {
    const S = SS();
    const blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mobile-point-ac-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    toast('Database exported successfully', 'suc');
  } else if (act === 'reset-data') {
    if (confirm('Reset database to default sample AC CRM data? All custom entries will be restored to seed state.')) {
      localStorage.removeItem(KEY);
      window.location.reload();
    }
  } else if (act === 'mark-all-read') {
    const S = SS();
    (S.notifications || []).forEach(n => n.read = true);
    save(S);
    toast('All notifications marked as read', 'suc');
    render(true);
  } else if (act === 'quick-new') {
    quickNewModal();
  } else if (act === 'quick-go') {
    const page = t.getAttribute('data-page');
    closeM();
    if (['sale-new', 'cust-new', 'prod-new'].includes(page)) {
      subPage({ page: page });
    } else {
      go(page);
    }
  } else if (act === 'view-lightbox') {
    const src = t.getAttribute('data-src');
    lightboxModal(src);
  } else if (act === 'go-cust-modal') {
    const cId = t.getAttribute('data-id');
    closeM();
    custModal(cId);
  }
});

document.addEventListener('input', e => {
  const t = e.target;
  const act = t.getAttribute('data-act');
  if (act === 'cust-search') {
    CUST_SEARCH = t.value;
    render(true);
  } else if (act === 'prod-search') {
    PROD_SEARCH = t.value;
    render(true);
  } else if (act === 'sale-search') {
    SALE_SEARCH = t.value;
    render(true);
  } else if (act === 'inv-search') {
    INV_SEARCH = t.value;
    render(true);
  } else if (act === 'eng-log-search') {
    ENG_SEARCH = t.value;
    render(true);
  }
});

document.addEventListener('change', e => {
  const t = e.target;
  const act = t.getAttribute('data-act');
  if (act === 'inv-filter') {
    INV_FILTER = t.value;
    render(true);
  } else if (act === 'eng-log-filter') {
    ENG_FILTER = t.value;
    render(true);
  } else if (act === 'test-cust-change') {
    updateTestWaPreview();
  } else if (act === 'promo-audience-change') {
    const S = SS();
    const v = t.value;
    const cEl = $('#promo-recip-count');
    if (cEl) {
      if (v === 'all') {
        cEl.textContent = (S.customers || []).length;
      } else if (v.startsWith('loc:')) {
        const loc = v.slice(4);
        cEl.textContent = (S.customers || []).filter(c => c.locality === loc).length;
      }
    }
  }
});

window.addEventListener('popstate', () => {
  const hash = (window.location && window.location.hash) ? window.location.hash.replace('#', '') : 'overview';
  PAGE = hash || 'overview';
  SUB = null;
  render();
});

const topSearch = $('#gq');
if (topSearch) {
  topSearch.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = topSearch.value.trim();
      if (q) {
        globalSearchModal(q);
        topSearch.value = '';
      }
    }
  });
}

document.addEventListener('keydown', e => {
  if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    e.preventDefault();
    if (topSearch) topSearch.focus();
  }
});

const nb = $('#nb');
if (nb) {
  nb.addEventListener('click', () => quickNewModal());
}

const themeToggle = $('#tb');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') || 'light';
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('mp-theme', next);
  });
}

const initHash = (window.location && window.location.hash) ? window.location.hash.replace('#', '') : '';
if (['overview', 'sales', 'customers', 'products', 'calendar', 'engagements', 'invoices', 'reports', 'users', 'settings'].includes(initHash)) {
  PAGE = initHash;
} else {
  PAGE = 'overview';
}
render();


