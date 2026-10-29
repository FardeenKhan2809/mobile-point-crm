"use strict";

const $ = (s, e = document) => e.querySelector(s);
const $$e = (e, s) => [...(e || document).querySelectorAll(s)];
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
    box: 'M21 8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v8',
    cart: 'M3 4h2l2.5 11h11L21 7H6M9 20h.01M18 20h.01',
    pulse: 'M3 12h4l3 8 4-16 3 8h4',
    check: 'M20 6L9 17l-5-5',
    camera: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    send: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z',
    phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
    globe: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 0a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10zm-9 10h18',
    reply: 'M3 10h10a5 5 0 0 1 5 5v2M3 10l6-6M3 10l6 6',
    refresh: 'M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15',
    trash: 'M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
    copy: 'M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M16 4h2a2 2 0 0 1 2 2v4M21 14H11a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2z'
};

const ic = n => `<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${IC[n] || IC.home}"/></svg>`;
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

const KEY = 'mpac-v6-data';

const MODULE_DEFS = [
    { id: 'overview', title: 'Dashboard', desc: 'Performance KPIs, active services, and operational overview', icon: 'home', hasEdit: true },
    { id: 'products', title: 'AC Products', desc: 'Minimal AC specifications catalog (brand, model, serials, specs)', icon: 'wind', hasEdit: true, hasDelete: true },
    { id: 'customers', title: 'Customers', desc: 'Customer registry with WhatsApp numbers, complete address, and locality', icon: 'users', hasEdit: true, hasDelete: true },
    { id: 'sales', title: 'Sales Management', desc: 'Record sales, multi-image upload, and automatic service calculation', icon: 'cart', hasEdit: true, hasDelete: true },
    { id: 'invoices', title: 'Invoices', desc: 'Invoice records with store header, address, phone, and GSTIN', icon: 'file', hasExport: true },
    { id: 'calendar', title: 'Service Calendar', desc: '1st and 2nd AC service milestones (upcoming, past, and present all)', icon: 'cal', hasManage: true },
    { id: 'automations', title: 'WhatsApp Automations', desc: 'Welcome messages, purchase greetings, service reminders, broadcasts', icon: 'zap', hasManage: true },
    { id: 'reports', title: 'Reports', desc: 'Sales volumes, brand breakdown, and service compliance analytics', icon: 'chart', hasExport: true },
    { id: 'users', title: 'User Permissions', desc: 'Staff user accounts, role presets, and module-level access control', icon: 'team', hasManage: true },
    { id: 'settings', title: 'Settings', desc: 'Shop details, branch branches, reminder intervals, and configuration', icon: 'gear', hasManage: true }
];

const PRESETS = {
    admin: {
        label: 'Full Administrator',
        desc: 'Unrestricted access to all modules and system controls',
        perms: {
            overview: { enabled: true, view: true, edit: true, delete: true },
            products: { enabled: true, view: true, edit: true, delete: true },
            customers: { enabled: true, view: true, edit: true, delete: true },
            sales: { enabled: true, view: true, edit: true, delete: true },
            invoices: { enabled: true, view: true, edit: true, delete: true },
            calendar: { enabled: true, view: true, edit: true, delete: true },
            automations: { enabled: true, view: true, edit: true, delete: true },
            reports: { enabled: true, view: true, export: true },
            users: { enabled: true, view: true, manage: true },
            settings: { enabled: true, view: true, manage: true }
        }
    },
    manager: {
        label: 'Sales & Service Manager',
        desc: 'Manages sales, customer records, calendar, and automations',
        perms: {
            overview: { enabled: true, view: true, edit: true, delete: false },
            products: { enabled: true, view: true, edit: true, delete: false },
            customers: { enabled: true, view: true, edit: true, delete: false },
            sales: { enabled: true, view: true, edit: true, delete: false },
            invoices: { enabled: true, view: true, edit: true, delete: false },
            calendar: { enabled: true, view: true, edit: true, delete: false },
            automations: { enabled: true, view: true, edit: true, delete: false },
            reports: { enabled: true, view: true, export: true },
            users: { enabled: false, view: false, manage: false },
            settings: { enabled: false, view: false, manage: false }
        }
    },
    cashier: {
        label: 'Billing & Front Desk Staff',
        desc: 'Enters customer records, sales, invoices, and image uploads',
        perms: {
            overview: { enabled: true, view: true, edit: false, delete: false },
            products: { enabled: true, view: true, edit: true, delete: false },
            customers: { enabled: true, view: true, edit: true, delete: false },
            sales: { enabled: true, view: true, edit: true, delete: false },
            invoices: { enabled: true, view: true, edit: true, delete: false },
            calendar: { enabled: true, view: true, edit: false, delete: false },
            automations: { enabled: false, view: false, edit: false, delete: false },
            reports: { enabled: false, view: false, export: false },
            users: { enabled: false, view: false, manage: false },
            settings: { enabled: false, view: false, manage: false }
        }
    },
    support: {
        label: 'Customer Support / Engagement',
        desc: 'Customer relations, service calendar tracking, and WhatsApp messages',
        perms: {
            overview: { enabled: true, view: true, edit: false, delete: false },
            products: { enabled: true, view: true, edit: false, delete: false },
            customers: { enabled: true, view: true, edit: true, delete: false },
            sales: { enabled: true, view: true, edit: false, delete: false },
            invoices: { enabled: true, view: true, edit: false, delete: false },
            calendar: { enabled: true, view: true, edit: true, delete: false },
            automations: { enabled: true, view: true, edit: true, delete: false },
            reports: { enabled: false, view: false, export: false },
            users: { enabled: false, view: false, manage: false },
            settings: { enabled: false, view: false, manage: false }
        }
    }
};

const defaultUsers = [
    { id: 'U1', name: 'Rajesh Amin', email: 'rajesh@mobilepoint.in', phone: '+91 98250 11001', status: 'Active', lastLogin: 'Just now', preset: 'admin', permissions: JSON.parse(JSON.stringify(PRESETS.admin.perms)) },
    { id: 'U2', name: 'Hetal Modi', email: 'hetal@mobilepoint.in', phone: '+91 98250 11002', status: 'Active', lastLogin: '2 hours ago', preset: 'manager', permissions: JSON.parse(JSON.stringify(PRESETS.manager.perms)) },
    { id: 'U3', name: 'Suresh Rathod', email: 'suresh@mobilepoint.in', phone: '+91 98250 11003', status: 'Active', lastLogin: 'Yesterday', preset: 'cashier', permissions: JSON.parse(JSON.stringify(PRESETS.cashier.perms)) },
    { id: 'U4', name: 'Pooja Vyas', email: 'pooja@mobilepoint.in', phone: '+91 98250 11004', status: 'Active', lastLogin: '3 days ago', preset: 'support', permissions: JSON.parse(JSON.stringify(PRESETS.support.perms)) }
];

function seed() {
    const customers = [
        { id: 'C101', name: 'Amit Sharma', phone: '+91 98250 12345', altPhone: '+91 98250 54321', address: 'B-402, Samruddhi Residency, Opp. Reliance Mall', landmark: 'Opp. Reliance Mall', locality: 'Alkapuri', pincode: '390007', active: true },
        { id: 'C102', name: 'Priya Patel', phone: '+91 98250 23456', altPhone: '+91 98250 65432', address: 'Plot 18, Shanti Niketan Society, Near Water Tank', landmark: 'Near Water Tank', locality: 'Manjalpur', pincode: '390011', active: true },
        { id: 'C103', name: 'Sunil Mehta', phone: '+91 98250 34567', altPhone: '+91 98250 76543', address: 'C-104, Gokul Heights, Behind Inox Cinema', landmark: 'Behind Inox Cinema', locality: 'Gorwa', pincode: '390016', active: true },
        { id: 'C104', name: 'Anjali Desai', phone: '+91 98250 45678', altPhone: '', address: 'Row House 5, Green Meadows, Near Kalali Bridge', landmark: 'Near Kalali Bridge', locality: 'Kalali', pincode: '390012', active: true },
        { id: 'C105', name: 'Vikram Joshi', phone: '+91 98250 56789', altPhone: '+91 98250 98765', address: 'A-21, Suryoday Bungalows, Beside Navrachana School', landmark: 'Beside Navrachana School', locality: 'Sama', pincode: '390008', active: true },
        { id: 'C106', name: 'Bhavna Shah', phone: '+91 98250 67890', altPhone: '', address: 'Shop 8, Crystal Plaza, Opp. Circuit House', landmark: 'Opp. Circuit House', locality: 'Sayajigunj', pincode: '390005', active: true }
    ];

    const products = [
        { id: 'P1001', brand: 'Daikin', model: 'FTKF35TV16U', name: 'Daikin FTKF35 1.0T Inverter', capacity: '1.0 Ton', star: '3 Star', invType: 'Inverter', condenser: '100% Copper', gas: 'R32', warranty: '1 Year Comprehensive + 10 Years Compressor', units: [{ sn: 'DK-71001', st: 'Sold' }, { sn: 'DK-71002', st: 'In stock' }, { sn: 'DK-71003', st: 'In stock' }] },
        { id: 'P1002', brand: 'LG', model: 'PS-Q19YNZE', name: 'LG PS-Q19 1.5T Dual Inverter', capacity: '1.5 Ton', star: '5 Star', invType: 'Dual Inverter', condenser: '100% Copper Ocean Black', gas: 'R32', warranty: '1 Year Comprehensive + 10 Years Compressor', units: [{ sn: 'LG-72001', st: 'Sold' }, { sn: 'LG-72002', st: 'In stock' }] },
        { id: 'P1003', brand: 'Voltas', model: '185V Vectra Elegant', name: 'Voltas 185V Vectra 1.5T', capacity: '1.5 Ton', star: '5 Star', invType: 'Inverter', condenser: '100% Copper', gas: 'R32', warranty: '1 Year Comprehensive + 10 Years Compressor', units: [{ sn: 'VO-73001', st: 'Sold' }, { sn: 'VO-73002', st: 'In stock' }] },
        { id: 'P1004', brand: 'Hitachi', model: 'RSOG518HDEA', name: 'Hitachi Kashikoi 1.5T 5-Star', capacity: '1.5 Ton', star: '5 Star', invType: 'Inverter', condenser: '100% Copper', gas: 'R32', warranty: '1 Year Comprehensive + 10 Years Compressor', units: [{ sn: 'HI-74001', st: 'Sold' }, { sn: 'HI-74002', st: 'In stock' }] },
        { id: 'P1005', brand: 'Blue Star', model: 'IC318RBTU', name: 'Blue Star IC318 1.5T Inverter', capacity: '1.5 Ton', star: '3 Star', invType: 'Inverter', condenser: '100% Copper', gas: 'R32', warranty: '1 Year Comprehensive + 10 Years Compressor', units: [{ sn: 'BS-75001', st: 'Sold' }, { sn: 'BS-75002', st: 'In stock' }] },
        { id: 'P1006', brand: 'Lloyd', model: 'GLS18I5FWRBP', name: 'Lloyd 1.5T Heavy Duty Inverter', capacity: '1.5 Ton', star: '5 Star', invType: 'Inverter', condenser: '100% Copper', gas: 'R32', warranty: '1 Year Comprehensive + 10 Years Compressor', units: [{ sn: 'LL-76001', st: 'In stock' }, { sn: 'LL-76002', st: 'In stock' }] }
    ];

    const sales = [
        {
            id: 'SALE-2026-001',
            invId: 'INV-5001',
            cid: 'C101',
            custName: 'Amit Sharma',
            custPhone: '+91 98250 12345',
            custAltPhone: '+91 98250 54321',
            custAddress: 'B-402, Samruddhi Residency, Opp. Reliance Mall',
            custLandmark: 'Opp. Reliance Mall',
            custLocality: 'Alkapuri',
            custPincode: '390007',
            pid: 'P1001',
            brand: 'Daikin',
            model: 'FTKF35TV16U',
            sn: 'DK-71001',
            date: D(-110),
            shopName: 'Mobile Point AC Care - Alkapuri Branch',
            installDate: D(-109),
            srv1Date: cdd(D(-110), 120),
            srv1Status: 'Upcoming',
            srv1DoneDate: '',
            srv2Date: cdd(D(-110), 330),
            srv2Status: 'Upcoming',
            srv2DoneDate: '',
            images: [],
            notes: 'Customer requested installation on top floor terrace balcony.'
        },
        {
            id: 'SALE-2026-002',
            invId: 'INV-5002',
            cid: 'C102',
            custName: 'Priya Patel',
            custPhone: '+91 98250 23456',
            custAltPhone: '+91 98250 65432',
            custAddress: 'Plot 18, Shanti Niketan Society, Near Water Tank',
            custLandmark: 'Near Water Tank',
            custLocality: 'Manjalpur',
            custPincode: '390011',
            pid: 'P1002',
            brand: 'LG',
            model: 'PS-Q19YNZE',
            sn: 'LG-72001',
            date: D(-85),
            shopName: 'Mobile Point AC Care - Manjalpur Branch',
            installDate: D(-84),
            srv1Date: cdd(D(-85), 120),
            srv1Status: 'Upcoming',
            srv1DoneDate: '',
            srv2Date: cdd(D(-85), 330),
            srv2Status: 'Upcoming',
            srv2DoneDate: '',
            images: [],
            notes: 'Extra copper piping arranged through LG authorized team.'
        },
        {
            id: 'SALE-2026-003',
            invId: 'INV-5003',
            cid: 'C103',
            custName: 'Sunil Mehta',
            custPhone: '+91 98250 34567',
            custAltPhone: '+91 98250 76543',
            custAddress: 'C-104, Gokul Heights, Behind Inox Cinema',
            custLandmark: 'Behind Inox Cinema',
            custLocality: 'Gorwa',
            custPincode: '390016',
            pid: 'P1003',
            brand: 'Voltas',
            model: '185V Vectra Elegant',
            sn: 'VO-73001',
            date: D(-35),
            shopName: 'Mobile Point AC Care - Alkapuri Branch',
            installDate: D(-34),
            srv1Date: cdd(D(-35), 120),
            srv1Status: 'Upcoming',
            srv1DoneDate: '',
            srv2Date: cdd(D(-35), 330),
            srv2Status: 'Upcoming',
            srv2DoneDate: '',
            images: [],
            notes: 'Standard installation completed by Voltas service branch.'
        },
        {
            id: 'SALE-2026-004',
            invId: 'INV-5004',
            cid: 'C104',
            custName: 'Anjali Desai',
            custPhone: '+91 98250 45678',
            custAltPhone: '',
            custAddress: 'Row House 5, Green Meadows, Near Kalali Bridge',
            custLandmark: 'Near Kalali Bridge',
            custLocality: 'Kalali',
            custPincode: '390012',
            pid: 'P1004',
            brand: 'Hitachi',
            model: 'RSOG518HDEA',
            sn: 'HI-74001',
            date: D(-10),
            shopName: 'Mobile Point AC Care - Alkapuri Branch',
            installDate: D(-9),
            srv1Date: cdd(D(-10), 120),
            srv1Status: 'Upcoming',
            srv1DoneDate: '',
            srv2Date: cdd(D(-10), 330),
            srv2Status: 'Upcoming',
            srv2DoneDate: '',
            images: [],
            notes: 'Warranty card and unit serial plate scanned.'
        },
        {
            id: 'SALE-2026-005',
            invId: 'INV-5005',
            cid: 'C105',
            custName: 'Vikram Joshi',
            custPhone: '+91 98250 56789',
            custAltPhone: '+91 98250 98765',
            custAddress: 'A-21, Suryoday Bungalows, Beside Navrachana School',
            custLandmark: 'Beside Navrachana School',
            custLocality: 'Sama',
            custPincode: '390008',
            pid: 'P1005',
            brand: 'Blue Star',
            model: 'IC318RBTU',
            sn: 'BS-75001',
            date: D(-2),
            shopName: 'Mobile Point AC Care - Sayajigunj Branch',
            installDate: D(1),
            srv1Date: cdd(D(-2), 120),
            srv1Status: 'Upcoming',
            srv1DoneDate: '',
            srv2Date: cdd(D(-2), 330),
            srv2Status: 'Upcoming',
            srv2DoneDate: '',
            images: [],
            notes: 'Installation pending for tomorrow afternoon.'
        }
    ];

    const invoices = sales.map(s => ({
        id: s.invId,
        saleId: s.id,
        cid: s.cid,
        date: s.date,
        shopName: s.shopName,
        brand: s.brand,
        model: s.model,
        sn: s.sn,
        pay: 'UPI',
        srv1Date: s.srv1Date,
        srv2Date: s.srv2Date
    }));

    const automations = [
        {
            id: 'W1',
            name: 'New Customer Welcome Message',
            trig: 'New customer registered',
            ch: 'WhatsApp',
            lead: 0,
            on: true,
            sentCount: 38,
            body: 'Hello {{name}}, welcome to {{store}}! Thank you for registering with us. We are your trusted third-party AC sales & authorized service support partner. We have saved your contact for warranty & assistance. Helpline: {{phone}}.'
        },
        {
            id: 'W2',
            name: 'AC Purchase Greeting & Warranty Confirmation',
            trig: 'Purchased AC recorded',
            ch: 'WhatsApp',
            lead: 0,
            on: true,
            sentCount: 52,
            body: 'Dear {{name}}, congratulations on purchasing your {{brand}} AC (Model: {{model}}, S/N: {{sn}}) from {{shop}}! Your AC includes 2 complimentary services in the 1st year (1st after 3-5 months, 2nd before 11 months). Installation date: {{installDate}}. For any queries, WhatsApp us on {{phone}}.'
        },
        {
            id: 'W3',
            name: '1st AC Service Reminder (3 to 5 Months)',
            trig: '1st service due in 14 days',
            ch: 'WhatsApp',
            lead: 14,
            on: true,
            sentCount: 41,
            body: 'Hi {{name}}, gentle reminder from {{store}}: your 1st complimentary AC service for {{brand}} AC (S/N: {{sn}}) is due on {{date}}. Company authorized technicians are dispatched for service. Please confirm your preferred date and time so we can schedule the OEM technician visit!'
        },
        {
            id: 'W4',
            name: '2nd AC Service Reminder (Before 11 Months)',
            trig: '2nd service due in 14 days',
            ch: 'WhatsApp',
            lead: 14,
            on: true,
            sentCount: 29,
            body: 'Dear {{name}}, this is {{store}} reminding you that your 2nd complimentary AC service for {{brand}} AC (S/N: {{sn}}) is due on {{date}}, before your 1-year warranty cycle completes. Reply to this message to schedule your OEM technician inspection!'
        },
        {
            id: 'W5',
            name: 'Seasonal Promotional Offers Broadcast',
            trig: 'Promotional campaign broadcast',
            ch: 'WhatsApp',
            lead: 0,
            on: true,
            sentCount: 220,
            body: '🌟 Special Season Offer from {{store}}! Upgrade to 5-Star Inverter ACs with heavy exchange bonus & free standard installation. Reply YES or call {{phone}} to claim your voucher!'
        }
    ];

    const msgs = [
        { id: 'M701', cid: 'C101', saleId: 'SALE-2026-001', ch: 'WhatsApp', tpl: 'AC Purchase Greeting & Warranty Confirmation', time: D(-110), status: 'Delivered', text: 'Dear Amit Sharma, congratulations on purchasing your Daikin AC from Mobile Point AC Care!' },
        { id: 'M702', cid: 'C102', saleId: 'SALE-2026-002', ch: 'WhatsApp', tpl: 'AC Purchase Greeting & Warranty Confirmation', time: D(-85), status: 'Delivered', text: 'Dear Priya Patel, congratulations on purchasing your LG AC from Mobile Point AC Care!' },
        { id: 'M703', cid: 'C101', saleId: 'SALE-2026-001', ch: 'WhatsApp', tpl: '1st AC Service Reminder (3 to 5 Months)', time: D(-3), status: 'Delivered', text: 'Hi Amit Sharma, reminder from Mobile Point AC Care: 1st complimentary service for Daikin AC is due soon.' },
        { id: 'M704', cid: 'C105', saleId: 'SALE-2026-005', ch: 'WhatsApp', tpl: 'New Customer Welcome Message', time: D(-2), status: 'Delivered', text: 'Hello Vikram Joshi, welcome to Mobile Point AC Care!' }
    ];

    const feed = [
        { id: 'EV1', t: 'Sale recorded: Daikin FTKF35 for Vikram Joshi', time: 'Just now', k: 'sales', p: 'sales/SALE-2026-005' },
        { id: 'EV2', t: 'WhatsApp Welcome sent to Vikram Joshi', time: '2 hours ago', k: 'messages', p: 'automations' },
        { id: 'EV3', t: '1st Service reminder scheduled for Amit Sharma', time: 'Yesterday', k: 'calendar', p: 'calendar' },
        { id: 'EV4', t: 'Sale recorded: Hitachi Kashikoi for Anjali Desai', time: '8 days ago', k: 'sales', p: 'sales/SALE-2026-004' },
        { id: 'EV5', t: 'LG AC installed for Priya Patel', time: '12 days ago', k: 'sales', p: 'sales/SALE-2026-002' }
    ];

    return {
        customers,
        products,
        sales,
        invoices,
        automations,
        whatsapp: {
            connected: true,
            endpoint: 'https://graph.facebook.com/v19.0',
            apiKey: 'wa_cloud_sec_9942a7b8e10d48f6820c7e2b144fae93',
            wabaId: 'WABA-919825012345',
            phone: '+91 98250 12345',
            displayName: 'Mobile Point AC Care',
            verified: true,
            qualityRating: 'HIGH',
            dailyLimit: '10,000 / day (Tier 2)',
            status: 'Active',
            lastSync: 'Just now'
        },
        templates: [
        {
            id: 'tpl_welcome',
            name: 'ac_welcome_greeting',
            cat: 'MARKETING',
            status: 'APPROVED',
            lang: 'en_US',
            header: 'Welcome to Mobile Point AC Care ❄️',
            body: 'Hello {{customer_name}},\n\nWelcome to {{store_name}}! We are delighted to register you as our valued customer. Our team is committed to delivering premier cooling comfort, genuine AC spares, and OEM authorized service support.\n\n📞 Customer Care: {{shop_phone}}\n📍 Location: {{store_address}}',
            footer: 'Mobile Point AC Care • Authorized Sales & Support',
            buttons: [
                { type: 'PHONE_NUMBER', text: 'Call Helpline', val: '+91 98250 00000' },
                { type: 'URL', text: 'Store Location', val: 'https://maps.google.com' }
            ]
        },
        {
            id: 'tpl_purchase',
            name: 'ac_purchase_warranty',
            cat: 'UTILITY',
            status: 'APPROVED',
            lang: 'en_US',
            header: 'AC Purchase & Warranty Confirmation 📜',
            body: 'Dear {{customer_name}},\n\nCongratulations on your purchase of *{{brand}} {{model}}* (S/N: {{serial_number}}) from {{store_name}}!\n\n🗓 Purchase Date: {{purchase_date}}\n🛠 Installation Date: {{install_date}}\n🛡 Complimentary Services (1st Year):\n• 1st Service: Due around {{srv1_date}} (3-5 Months)\n• 2nd Service: Due around {{srv2_date}} (Before 11 Months)\n\nPlease keep your invoice handy for authorized warranty claims.',
            footer: 'Mobile Point AC Care • Official Warranty Record',
            buttons: [
                { type: 'QUICK_REPLY', text: 'View E-Invoice' },
                { type: 'PHONE_NUMBER', text: 'Need Assistance', val: '+91 98250 00000' }
            ]
        },
        {
            id: 'tpl_srv1',
            name: 'ac_service_reminder_1',
            cat: 'UTILITY',
            status: 'APPROVED',
            lang: 'en_US',
            header: '1st Free AC Service Reminder 🔔',
            body: 'Hi {{customer_name}},\n\nGentle reminder from {{store_name}}: Your *1st Free AC Service* for your {{brand}} AC (S/N: {{serial_number}}) is scheduled around *{{due_date}}*.\n\nTimely servicing maximizes cooling efficiency, cleans air filters, and prevents peak summer breakdown. Authorized OEM company technicians are dispatched for service.\n\nPlease reply *CONFIRM* to schedule technician visit or call {{shop_phone}}.',
            footer: 'Complimentary Service • OEM Certified',
            buttons: [
                { type: 'QUICK_REPLY', text: 'Confirm Service Slot' },
                { type: 'QUICK_REPLY', text: 'Request Reschedule' }
            ]
        },
        {
            id: 'tpl_srv2',
            name: 'ac_service_reminder_2',
            cat: 'UTILITY',
            status: 'APPROVED',
            lang: 'en_US',
            header: '2nd Free AC Service (Warranty Due) ⚠️',
            body: 'Dear {{customer_name}},\n\nUrgent notification from {{store_name}}: Your *2nd Complimentary AC Service* for {{brand}} AC (S/N: {{serial_number}}) is due on *{{due_date}}*, before your 1-year complimentary warranty expires.\n\nDon\'t let your free service lapse! Reply *BOOK NOW* or reach our support team on {{shop_phone}} to schedule your authorized technician visit.',
            footer: 'Expires before 11 months • Free under warranty',
            buttons: [
                { type: 'QUICK_REPLY', text: 'Book Free Service' },
                { type: 'PHONE_NUMBER', text: 'Call Store Helpdesk', val: '+91 98250 00000' }
            ]
        },
        {
            id: 'tpl_summer',
            name: 'summer_cooling_offer',
            cat: 'MARKETING',
            status: 'APPROVED',
            lang: 'en_US',
            header: 'Summer AC Mega Exchange Blitz 🌞',
            body: 'Beat the heat with {{store_name}}! Upgrade your existing air conditioner with up to *₹8,000 Exchange Bonus* on 5-Star Inverter Split ACs (Daikin, Voltas, Hitachi, O General).\n\n✨ 0% Interest EMI Options\n✨ Free Standard Installation\n✨ Comprehensive 10-Yr Compressor Warranty\n\nVisit our Alkapuri showroom or WhatsApp OFFER to claim your voucher!',
            footer: 'Limited Period Festive Offer • T&C Apply',
            buttons: [
                { type: 'QUICK_REPLY', text: 'Claim Voucher' },
                { type: 'QUICK_REPLY', text: 'Browse AC Models' }
            ]
        },
        {
            id: 'tpl_monsoon',
            name: 'monsoon_ac_care_tips',
            cat: 'MARKETING',
            status: 'PENDING',
            lang: 'en_US',
            header: 'Monsoon AC Maintenance Guide 🌧️',
            body: 'Hello {{customer_name}}, high humidity in monsoon affects AC cooling coils and promotes mold growth. Keep your filters clean and run Dry Mode during rains. For deep coil chemical wash, book our monsoon care package at special discounted rates.',
            footer: 'Seasonal Health Tips • Mobile Point',
            buttons: [
                { type: 'QUICK_REPLY', text: 'Book Coil Wash' },
                { type: 'QUICK_REPLY', text: 'Read Tips' }
            ]
        }
    ],
        campaigns: [
        {
            id: 'CAMP-101',
            name: 'Pre-Summer Free AC Service Reminder',
            tplId: 'tpl_srv1',
            tplName: 'ac_service_reminder_1',
            audience: '1st Service Due (<30 Days)',
            sentCount: 48,
            deliveredCount: 47,
            readCount: 45,
            replyCount: 31,
            createdAt: '2026-10-24 10:30 AM',
            status: 'Completed'
        },
        {
            id: 'CAMP-102',
            name: 'Diwali AC Exchange & Inverter Fest',
            tplId: 'tpl_summer',
            tplName: 'summer_cooling_offer',
            audience: 'All Customers (Vadodara)',
            sentCount: 185,
            deliveredCount: 178,
            readCount: 164,
            replyCount: 42,
            createdAt: '2026-10-20 11:15 AM',
            status: 'Completed'
        },
        {
            id: 'CAMP-103',
            name: 'Warranty Expiry 2nd Service Alert',
            tplId: 'tpl_srv2',
            tplName: 'ac_service_reminder_2',
            audience: '2nd Service Due (<30 Days)',
            sentCount: 26,
            deliveredCount: 26,
            readCount: 24,
            replyCount: 19,
            createdAt: '2026-10-27 02:45 PM',
            status: 'Completed'
        }
    ],
        msgs,
        feed,
        read: [],
        users: JSON.parse(JSON.stringify(defaultUsers)),
        set: {
            theme: 'light',
            store: 'Mobile Point AC Care',
            branches: 'Alkapuri (Main Branch), Manjalpur Branch, Sayajigunj Branch',
            addr: 'Shop 12-14, Alkapuri Arcade, RC Dutt Road, Alkapuri, Vadodara, Gujarat 390007',
            phone: '+91 98250 00000',
            email: 'care@mobilepoint.in',
            gstin: '24ABCDE1234F1Z5',
            srv1Days: 120,
            srv2Days: 330,
            leadDays: 14
        }
    };
}

let S;
try { S = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { }
if (!S || !S.sales || !S.customers || !S.products) {
    S = seed();
}
if (!S.set) S.set = {};
if (!S.set.store) S.set.store = 'Mobile Point AC Care';
if (!S.set.addr) S.set.addr = 'Shop 12-14, Alkapuri Arcade, RC Dutt Road, Alkapuri, Vadodara, Gujarat 390007';
if (!S.set.phone) S.set.phone = '+91 98250 00000';
if (!S.set.gstin) S.set.gstin = '24ABCDE1234F1Z5';
if (S.set.theme === 'system' || !S.set.theme) S.set.theme = 'light';
if (!S.users || !S.users.length) S.users = JSON.parse(JSON.stringify(defaultUsers));
if (!S.read) S.read = [];
if (!S.whatsapp) S.whatsapp = {
    connected: true,
    endpoint: 'https://graph.facebook.com/v19.0',
    apiKey: 'wa_cloud_sec_9942a7b8e10d48f6820c7e2b144fae93',
    wabaId: 'WABA-919825012345',
    phone: '+91 98250 12345',
    displayName: 'Mobile Point AC Care',
    verified: true,
    qualityRating: 'HIGH',
    dailyLimit: '10,000 / day (Tier 2)',
    status: 'Active',
    lastSync: 'Just now'
};

if (!S.templates || !S.templates.length) S.templates = [
        {
            id: 'tpl_welcome',
            name: 'ac_welcome_greeting',
            cat: 'MARKETING',
            status: 'APPROVED',
            lang: 'en_US',
            header: 'Welcome to Mobile Point AC Care ❄️',
            body: 'Hello {{customer_name}},\n\nWelcome to {{store_name}}! We are delighted to register you as our valued customer. Our team is committed to delivering premier cooling comfort, genuine AC spares, and OEM authorized service support.\n\n📞 Customer Care: {{shop_phone}}\n📍 Location: {{store_address}}',
            footer: 'Mobile Point AC Care • Authorized Sales & Support',
            buttons: [
                { type: 'PHONE_NUMBER', text: 'Call Helpline', val: '+91 98250 00000' },
                { type: 'URL', text: 'Store Location', val: 'https://maps.google.com' }
            ]
        },
        {
            id: 'tpl_purchase',
            name: 'ac_purchase_warranty',
            cat: 'UTILITY',
            status: 'APPROVED',
            lang: 'en_US',
            header: 'AC Purchase & Warranty Confirmation 📜',
            body: 'Dear {{customer_name}},\n\nCongratulations on your purchase of *{{brand}} {{model}}* (S/N: {{serial_number}}) from {{store_name}}!\n\n🗓 Purchase Date: {{purchase_date}}\n🛠 Installation Date: {{install_date}}\n🛡 Complimentary Services (1st Year):\n• 1st Service: Due around {{srv1_date}} (3-5 Months)\n• 2nd Service: Due around {{srv2_date}} (Before 11 Months)\n\nPlease keep your invoice handy for authorized warranty claims.',
            footer: 'Mobile Point AC Care • Official Warranty Record',
            buttons: [
                { type: 'QUICK_REPLY', text: 'View E-Invoice' },
                { type: 'PHONE_NUMBER', text: 'Need Assistance', val: '+91 98250 00000' }
            ]
        },
        {
            id: 'tpl_srv1',
            name: 'ac_service_reminder_1',
            cat: 'UTILITY',
            status: 'APPROVED',
            lang: 'en_US',
            header: '1st Free AC Service Reminder 🔔',
            body: 'Hi {{customer_name}},\n\nGentle reminder from {{store_name}}: Your *1st Free AC Service* for your {{brand}} AC (S/N: {{serial_number}}) is scheduled around *{{due_date}}*.\n\nTimely servicing maximizes cooling efficiency, cleans air filters, and prevents peak summer breakdown. Authorized OEM company technicians are dispatched for service.\n\nPlease reply *CONFIRM* to schedule technician visit or call {{shop_phone}}.',
            footer: 'Complimentary Service • OEM Certified',
            buttons: [
                { type: 'QUICK_REPLY', text: 'Confirm Service Slot' },
                { type: 'QUICK_REPLY', text: 'Request Reschedule' }
            ]
        },
        {
            id: 'tpl_srv2',
            name: 'ac_service_reminder_2',
            cat: 'UTILITY',
            status: 'APPROVED',
            lang: 'en_US',
            header: '2nd Free AC Service (Warranty Due) ⚠️',
            body: 'Dear {{customer_name}},\n\nUrgent notification from {{store_name}}: Your *2nd Complimentary AC Service* for {{brand}} AC (S/N: {{serial_number}}) is due on *{{due_date}}*, before your 1-year complimentary warranty expires.\n\nDon\'t let your free service lapse! Reply *BOOK NOW* or reach our support team on {{shop_phone}} to schedule your authorized technician visit.',
            footer: 'Expires before 11 months • Free under warranty',
            buttons: [
                { type: 'QUICK_REPLY', text: 'Book Free Service' },
                { type: 'PHONE_NUMBER', text: 'Call Store Helpdesk', val: '+91 98250 00000' }
            ]
        },
        {
            id: 'tpl_summer',
            name: 'summer_cooling_offer',
            cat: 'MARKETING',
            status: 'APPROVED',
            lang: 'en_US',
            header: 'Summer AC Mega Exchange Blitz 🌞',
            body: 'Beat the heat with {{store_name}}! Upgrade your existing air conditioner with up to *₹8,000 Exchange Bonus* on 5-Star Inverter Split ACs (Daikin, Voltas, Hitachi, O General).\n\n✨ 0% Interest EMI Options\n✨ Free Standard Installation\n✨ Comprehensive 10-Yr Compressor Warranty\n\nVisit our Alkapuri showroom or WhatsApp OFFER to claim your voucher!',
            footer: 'Limited Period Festive Offer • T&C Apply',
            buttons: [
                { type: 'QUICK_REPLY', text: 'Claim Voucher' },
                { type: 'QUICK_REPLY', text: 'Browse AC Models' }
            ]
        },
        {
            id: 'tpl_monsoon',
            name: 'monsoon_ac_care_tips',
            cat: 'MARKETING',
            status: 'PENDING',
            lang: 'en_US',
            header: 'Monsoon AC Maintenance Guide 🌧️',
            body: 'Hello {{customer_name}}, high humidity in monsoon affects AC cooling coils and promotes mold growth. Keep your filters clean and run Dry Mode during rains. For deep coil chemical wash, book our monsoon care package at special discounted rates.',
            footer: 'Seasonal Health Tips • Mobile Point',
            buttons: [
                { type: 'QUICK_REPLY', text: 'Book Coil Wash' },
                { type: 'QUICK_REPLY', text: 'Read Tips' }
            ]
        }
    ];
if (!S.campaigns || !S.campaigns.length) S.campaigns = [
        {
            id: 'CAMP-101',
            name: 'Pre-Summer Free AC Service Reminder',
            tplId: 'tpl_srv1',
            tplName: 'ac_service_reminder_1',
            audience: '1st Service Due (<30 Days)',
            sentCount: 48,
            deliveredCount: 47,
            readCount: 45,
            replyCount: 31,
            createdAt: '2026-10-24 10:30 AM',
            status: 'Completed'
        },
        {
            id: 'CAMP-102',
            name: 'Diwali AC Exchange & Inverter Fest',
            tplId: 'tpl_summer',
            tplName: 'summer_cooling_offer',
            audience: 'All Customers (Vadodara)',
            sentCount: 185,
            deliveredCount: 178,
            readCount: 164,
            replyCount: 42,
            createdAt: '2026-10-20 11:15 AM',
            status: 'Completed'
        },
        {
            id: 'CAMP-103',
            name: 'Warranty Expiry 2nd Service Alert',
            tplId: 'tpl_srv2',
            tplName: 'ac_service_reminder_2',
            audience: '2nd Service Due (<30 Days)',
            sentCount: 26,
            deliveredCount: 26,
            readCount: 24,
            replyCount: 19,
            createdAt: '2026-10-27 02:45 PM',
            status: 'Completed'
        }
    ];

const AUTH_KEY = 'mp_auth_user';
let currentUser = null;
try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) currentUser = JSON.parse(raw);
    else if (localStorage.getItem('mp_logged_out') !== '1') {
        currentUser = S.users[0] || defaultUsers[0];
        localStorage.setItem(AUTH_KEY, JSON.stringify(currentUser));
    }
} catch (e) {
    currentUser = S.users[0] || defaultUsers[0];
}

const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } };
const SS = () => S.set;
const cust = id => S.customers.find(c => c.id === id) || { name: 'Unknown Customer', phone: '', altPhone: '', address: '', landmark: '', locality: '', pincode: '' };
const prod = id => S.products.find(p => p.id === id) || { brand: 'AC', model: 'Model', name: 'AC Model', capacity: '', star: '', invType: '', condenser: '', gas: '', warranty: '', units: [] };
const sale = id => S.sales.find(s => s.id === id);

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

const rr = () => { if (V.k !== '' && !/\/(new|edit)/.test(V.page)) render(true); };

const NAV = [
    ['overview', 'Dashboard', 'home', 'Overview'],
    ['notifications', 'Notifications', 'bell', 'Overview'],
    ['activity', 'Activity', 'pulse', 'Overview'],
    ['products', 'AC Products', 'wind', 'Sales & Catalog'],
    ['customers', 'Customers', 'users', 'Sales & Catalog'],
    ['sales', 'Sales', 'cart', 'Sales & Catalog'],
    ['invoices', 'Invoices', 'file', 'Sales & Catalog'],
    ['calendar', 'Service Calendar', 'cal', 'Services & Care'],
    ['automations', 'Engagements', 'zap', 'Services & Care'],
    ['reports', 'Reports', 'chart', 'Admin'],
    ['users', 'User Permissions', 'team', 'Admin'],
    ['settings', 'Settings', 'gear', 'Admin']
];

const nmc = c => `<div class="nm"><span class="av">${esc(ini(c.name))}</span><span class="nmt">${esc(c.name)}</span></div>`;

const V = { k: '', q: '', f: 'All', p: 0, page: 'overview' };
let DIRTY = false;
let SALE_IMAGES = [];

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

const P = {
    users: {
        t: 'User Permissions',
        s: 'Manage staff user accounts, operational roles, and module privileges.',
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
            ['Permissions', r => userPermSummary(r.user)],
            ['Mobile', r => esc(r.phone)],
            ['Last login', r => `<span class="mu">${esc(r.lastLogin)}</span>`],
            ['Status', r => B(r.status)]
        ],
        open: id => go('users/' + id)
    },
    customers: {
        t: 'Customers',
        s: 'Minimal customer registry with complete address, WhatsApp, and alternate numbers.',
        add: ['Add customer', 'cust-new'],
        chips: ['All', 'Active', 'Inactive'],
        chip: (r, c) => (c === 'All' ? true : c === 'Active' ? r.active : !r.active),
        rows: () => S.customers.map(c => {
            const ss = S.sales.filter(s => s.cid === c.id);
            return { ...c, salesCount: ss.length };
        }),
        cols: [
            ['Customer', nmc],
            ['WhatsApp Number', r => `<span style="font-weight:600">${esc(r.phone)}</span>`],
            ['Alternate Number', r => esc(r.altPhone || '—')],
            ['Locality & Landmark', r => `<b>${esc(r.locality || '—')}</b><small class="mu" style="display:block">${esc(r.landmark ? 'Near ' + r.landmark : '—')}</small>`],
            ['Complete Address & PIN', r => `<small>${esc(r.address + (r.pincode ? ' - ' + r.pincode : ''))}</small>`],
            ['AC Units', r => `${r.salesCount} unit${r.salesCount === 1 ? '' : 's'}`],
            ['Status', r => B(r.active ? 'Active' : 'Inactive')]
        ],
        open: id => go('customers/' + id)
    },
    products: {
        t: 'AC Products',
        s: 'Minimal AC specifications catalog (brand, model, serials, specs). Strictly no price.',
        add: ['Add AC Model', 'prod-new'],
        chips: ['All', 'Daikin', 'LG', 'Voltas', 'Hitachi', 'Blue Star', 'Lloyd'],
        chip: (r, c) => (c === 'All' ? true : r.brand.toLowerCase() === c.toLowerCase()),
        rows: () => S.products.map(p => {
            const inStock = (p.units || []).filter(u => u.st !== 'Sold').length;
            const sold = (p.units || []).filter(u => u.st === 'Sold').length;
            return { ...p, inStock, sold };
        }),
        cols: [
            ['AC Brand & Model', r => `<div class="nm"><span class="av" style="background:var(--acs);color:var(--ac)">${esc(r.brand.slice(0, 2))}</span><span><b>${esc(r.brand)} ${esc(r.model)}</b><small class="mu" style="display:block">${esc(r.name)}</small></span></div>`],
            ['Capacity', r => `<span class="b">${esc(r.capacity || '1.5 Ton')}</span>`],
            ['Star Rating', r => `<b>${esc(r.star || '5 Star')}</b>`],
            ['Inverter Type', r => esc(r.invType || 'Inverter')],
            ['Condenser & Gas', r => `${esc(r.condenser || 'Copper')} · ${esc(r.gas || 'R32')}`],
            ['Available Stock', r => `<b style="color:var(--ok)">${r.inStock}</b> in stock <small class="mu">(${r.sold} sold)</small>`]
        ],
        open: id => go('products/' + id)
    },
    invoices: {
        t: 'Invoices',
        s: 'Official store tax invoices and 2-service complimentary warranty certificates.',
        chips: ['All', 'This Month', 'Last Month'],
        chip: (r, c) => {
            if (c === 'This Month') return r.date.startsWith(D(0).slice(0, 7));
            if (c === 'Last Month') {
                const prevMonth = cdd(D(0).slice(0, 7) + '-01', -1).slice(0, 7);
                return r.date.startsWith(prevMonth);
            }
            return true;
        },
        rows: () => S.invoices.map(i => {
            const s = S.sales.find(x => x.id === i.saleId) || {};
            const c = cust(i.cid);
            return { ...i, custName: c.name, custPhone: c.phone, modelStr: `${i.brand} ${i.model}`, srv1: s.srv1Date, srv2: s.srv2Date };
        }),
        cols: [
            ['Invoice #', r => `<b>${esc(r.id)}</b><small class="mu" style="display:block">${fd(r.date)}</small>`],
            ['Customer', r => `<b>${esc(r.custName)}</b><small class="mu" style="display:block">${esc(r.custPhone)}</small>`],
            ['AC Unit & Serial', r => `${esc(r.modelStr)}<small class="mu" style="display:block">S/N: ${esc(r.sn)}</small>`],
            ['Shop Branch', r => esc(r.shopName || S.set.store)],
            ['1st Service Due', r => fd(r.srv1)],
            ['2nd Service Due', r => fd(r.srv2)],
            ['Status', () => B('Delivered')]
        ],
        open: id => go('invoices/' + id)
    },
    automations: {
        t: 'WhatsApp Automations',
        s: 'Pre-configured WhatsApp workflow use cases with automatic triggers and instant delivery simulation.',
        chips: ['All', 'Active', 'Paused'],
        chip: (r, c) => (c === 'All' ? true : c === 'Active' ? r.on : !r.on),
        rows: () => S.automations.map(a => ({ ...a, status: a.on ? 'Active' : 'Paused' })),
        cols: [
            ['Workflow Use Case', r => `<div style="max-width:320px"><b>${esc(r.name)}</b><small class="mu" style="display:block;white-space:normal;margin-top:2px">${esc(r.body)}</small></div>`],
            ['Trigger Condition', r => `<span class="tag-pill">${esc(r.trig)}</span>`],
            ['Channel', () => '<span style="font-weight:600;color:#10b981;display:flex;align-items:center;gap:4px"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>WhatsApp</span>'],
            ['Lead Time', r => r.lead ? `${r.lead} days prior` : 'Instant on event'],
            ['Sent Count', r => `<b>${r.sentCount || 0}</b> delivered`],
            ['Active', r => `<button class="sw" role="switch" aria-checked="${r.on}" aria-label="Toggle ${esc(r.name)}" data-act="auto-toggle" data-id="${r.id}"></button>`]
        ],
        open: id => autoEditM(id)
    }
};

P.products.open = id => go('products/' + id);
P.customers.open = id => go('customers/' + id);
P.invoices.open = id => go('invoices/' + id);
P.users.open = id => go('users/' + id);

function subPage(p) {
    if (p === 'notifications') return notifPage();
    if (p === 'activity') return actPage();
    const a = p.split('/');
    if (a[0] === 'automations') {
        if (a[1] === 'templates' && a[2] === 'new') return newTemplatePage();
        if (a[1] === 'broadcasts' && a[2] === 'new') return newBroadcastPage(a[3]);
        if (a[1] === 'account') return waAccountPage();
    }
    if (a[0] === 'users' && a[1]) return userPermissionsPage(a[1]);
    if (a[0] === 'customers') {
        if (a[1] === 'new') return custFormPage();
        if (a[1] === 'edit') return custFormPage(a[2]);
        if (a[1]) return custPage(a[1]);
    }
    if (a[0] === 'products') {
        if (a[1] === 'new') return prodFormPage();
        if (a[1] === 'edit') return prodFormPage(a[2]);
        if (a[1]) return prodPage(a[1]);
    }
    if (a[0] === 'sales') {
        if (a[1] === 'new') return saleFormPage();
        if (a[1] === 'edit') return saleFormPage(a[2]);
        if (a[1]) return saleDetailPage(a[1]);
    }
    if (a[0] === 'invoices' && a[1]) return invPage(a[1]);
    return null;
}


function overview() {
    const totalSales = S.sales.length;
    const totalCust = S.customers.length;
    const pendingInstall = S.sales.filter(s => !s.installDate || s.installDate >= D(0)).length;
    const srv1Due = S.sales.filter(s => {
        if (s.srv1Status === 'Completed') return false;
        const diff = Math.round((new Date(s.srv1Date + 'T00:00:00Z') - new Date(D(0) + 'T00:00:00Z')) / 864e5);
        return diff <= 30;
    }).length;
    const srv2Due = S.sales.filter(s => {
        if (s.srv2Status === 'Completed') return false;
        const diff = Math.round((new Date(s.srv2Date + 'T00:00:00Z') - new Date(D(0) + 'T00:00:00Z')) / 864e5);
        return diff <= 30;
    }).length;

    const upcomingServices = [];
    S.sales.forEach(s => {
        const c = cust(s.cid);
        if (s.srv1Status !== 'Completed') {
            upcomingServices.push({ sale: s, cust: c, type: '1st Free Service (3-5 Mo)', date: s.srv1Date, status: s.srv1Status });
        }
        if (s.srv2Status !== 'Completed') {
            upcomingServices.push({ sale: s, cust: c, type: '2nd Free Service (<11 Mo)', date: s.srv2Date, status: s.srv2Status });
        }
    });
    upcomingServices.sort((a, b) => a.date > b.date ? 1 : -1);

    return `<div class="pg">
    <div class="ph">
        <div>
            <h1>Dashboard</h1>
            <p>${esc(S.set.store)} · Third-Party AC Sales & Automated Service Care System</p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn" data-act="nav" data-p="calendar">${ic('cal')} Service Calendar</button>
            <button class="btn pri" data-act="nav" data-p="sales/new">${ic('plus')} Record AC Sale</button>
        </div>
    </div>

    <div class="kp k4" style="margin-bottom:20px">
        <div class="k"><span>Total AC Sales</span><b>${totalSales}</b><small>Recorded in system</small></div>
        <div class="k"><span>Pending Installations</span><b>${pendingInstall}</b><small>Units being dispatched</small></div>
        <div class="k"><span>1st Service Due Soon</span><b style="color:var(--wa)">${srv1Due}</b><small>3 to 5 months window</small></div>
        <div class="k"><span>2nd Service Due Soon</span><b style="color:var(--wa)">${srv2Due}</b><small>Before 11 months window</small></div>
    </div>

    <div class="cw2">
        <div class="panel">
            <div class="hd" style="display:flex;justify-content:space-between;align-items:center">
                <h2>Upcoming AC Services (Free Warranty Milestones)</h2>
                <button class="btn sm" data-act="nav" data-p="calendar">Open Calendar</button>
            </div>
            ${upcomingServices.slice(0, 6).map(u => `
                <div class="li" style="padding:12px 16px;cursor:pointer" data-act="nav" data-p="sales/${u.sale.id}">
                    <div>
                        <b><span class="mu" style="font-weight:500">Customer: </span>${esc(u.cust.name)}</b>
                        <small style="display:block">${esc(u.sale.brand)} ${esc(u.sale.model)} · S/N: ${esc(u.sale.sn)}</small>
                        <small class="mu">${esc(u.type)} · Due: <b>${fd(u.date)}</b></small>
                    </div>
                    <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">
                        ${srvBadge(u.status, u.date)}
                        <button class="btn sm" style="font-size:11px;padding:3px 8px" data-act="wa-remind" data-id="${u.sale.id}" data-type="${u.type.startsWith('1st') ? '1' : '2'}">WhatsApp Reminder</button>
                    </div>
                </div>
            `).join('') || '<div class="empty">No services due at this moment</div>'}
        </div>

        <div style="display:flex;flex-direction:column;gap:20px">
            <div class="panel">
                <div class="hd" style="display:flex;justify-content:space-between;align-items:center">
                    <h2>Recent AC Sales</h2>
                    <button class="btn sm" data-act="nav" data-p="sales">View All Sales</button>
                </div>
                ${S.sales.slice(0, 5).map(s => `
                    <div class="li" style="padding:12px 16px;cursor:pointer" data-act="nav" data-p="sales/${s.id}">
                        <div>
                            <b>${esc(s.custName)}</b>
                            <small style="display:block">${esc(s.brand)} ${esc(s.model)} · ${fd(s.date)}</small>
                            <small class="mu">${esc(s.custLocality || s.shopName)}</small>
                        </div>
                        <div style="text-align:right">
                            <span class="b ok">Recorded</span>
                            <small class="mu" style="display:block;margin-top:4px">${(s.images || []).length} photos</small>
                        </div>
                    </div>
                `).join('') || '<div class="empty">No sales recorded yet</div>'}
            </div>

            <div class="panel pad">
                <h2>Quick Actions</h2>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-top:10px">
                    <button class="btn" style="justify-content:center;padding:12px" data-act="nav" data-p="sales/new">${ic('plus')} Record Sale</button>
                    <button class="btn" style="justify-content:center;padding:12px" data-act="nav" data-p="customers/new">${ic('users')} New Customer</button>
                    <button class="btn" style="justify-content:center;padding:12px" data-act="nav" data-p="products/new">${ic('wind')} Add AC Model</button>
                    <button class="btn" style="justify-content:center;padding:12px" data-act="nav" data-p="automations">${ic('zap')} Broadcast Offer</button>
                </div>
            </div>
        </div>
    </div>
</div>`;
}

let SQ = '';
let SF = 'All';

function salesPage() {
    let list = S.sales;
    if (SF === 'Installed') list = list.filter(s => s.installDate && s.installDate <= D(0));
    else if (SF === 'Pending Install') list = list.filter(s => !s.installDate || s.installDate > D(0));
    else if (SF === '1st Service Due') {
        list = list.filter(s => {
            if (s.srv1Status === 'Completed') return false;
            const diff = Math.round((new Date(s.srv1Date + 'T00:00:00Z') - new Date(D(0) + 'T00:00:00Z')) / 864e5);
            return diff <= 30;
        });
    } else if (SF === '2nd Service Due') {
        list = list.filter(s => {
            if (s.srv2Status === 'Completed') return false;
            const diff = Math.round((new Date(s.srv2Date + 'T00:00:00Z') - new Date(D(0) + 'T00:00:00Z')) / 864e5);
            return diff <= 30;
        });
    }

    if (SQ.trim()) {
        const q = SQ.toLowerCase().trim();
        list = list.filter(s =>
            s.id.toLowerCase().includes(q) ||
            s.custName.toLowerCase().includes(q) ||
            s.custPhone.includes(q) ||
            s.brand.toLowerCase().includes(q) ||
            s.model.toLowerCase().includes(q) ||
            s.sn.toLowerCase().includes(q) ||
            (s.custLocality || '').toLowerCase().includes(q)
        );
    }

    return `<div class="pg">
    <div class="ph">
        <div>
            <h1>Sales Management</h1>
            <p>Record, view, and manage customer AC sales, documents, and 1st & 2nd service schedules.</p>
        </div>
        <button class="btn pri" data-act="nav" data-p="sales/new">${ic('plus')} Record New Sale</button>
    </div>

    <div class="kp k4" style="margin-bottom:16px">
        <div class="k"><span>Total Sales</span><b>${S.sales.length}</b></div>
        <div class="k"><span>Installed Units</span><b>${S.sales.filter(s => s.installDate && s.installDate <= D(0)).length}</b></div>
        <div class="k"><span>1st Service Due</span><b style="color:var(--wa)">${S.sales.filter(s => s.srv1Status !== 'Completed').length}</b></div>
        <div class="k"><span>2nd Service Due</span><b style="color:var(--wa)">${S.sales.filter(s => s.srv2Status !== 'Completed').length}</b></div>
    </div>

    <div class="bar">
        <div class="sb">${ic('search')}<input id="sq" placeholder="Search sales by customer, phone, model, serial #..." value="${esc(SQ)}" aria-label="Search sales"></div>
        <div class="chips">
            ${['All', 'Installed', 'Pending Install', '1st Service Due', '2nd Service Due'].map(c => `
                <button class="chip${SF === c ? ' on' : ''}" data-act="sales-chip" data-v="${c}">${c}</button>
            `).join('')}
        </div>
    </div>

    <div class="panel">
        <div class="tw">
            <table class="tbl">
                <thead>
                    <tr>
                        <th>Sale # / Date</th>
                        <th>Customer</th>
                        <th>AC Unit & Serial #</th>
                        <th>Shop Name</th>
                        <th>Installation</th>
                        <th>1st Service Due (3-5 Mo)</th>
                        <th>2nd Service Due (&lt;11 Mo)</th>
                        <th>Docs</th>
                        <th style="text-align:right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${list.map(s => `
                        <tr style="cursor:pointer" data-act="nav" data-p="sales/${s.id}">
                            <td data-label="Sale # / Date">
                                <b>${esc(s.id)}</b>
                                <small class="mu" style="display:block">${fd(s.date)}</small>
                            </td>
                            <td data-label="Customer">
                                <b>${esc(s.custName)}</b>
                                <small class="mu" style="display:block">${esc(s.custPhone)} · ${esc(s.custLocality || '')}</small>
                            </td>
                            <td data-label="AC Unit & Serial #">
                                <b>${esc(s.brand)} ${esc(s.model)}</b>
                                <small class="mu" style="display:block">S/N: ${esc(s.sn)}</small>
                            </td>
                            <td data-label="Shop Name"><small>${esc(s.shopName || S.set.store)}</small></td>
                            <td data-label="Installation">
                                ${s.installDate ? `<b>${fd(s.installDate)}</b>` : '<span class="b wa">Pending</span>'}
                            </td>
                            <td data-label="1st Service Due">
                                <div><b>${fd(s.srv1Date)}</b></div>
                                ${srvBadge(s.srv1Status, s.srv1Date)}
                            </td>
                            <td data-label="2nd Service Due">
                                <div><b>${fd(s.srv2Date)}</b></div>
                                ${srvBadge(s.srv2Status, s.srv2Date)}
                            </td>
                            <td data-label="Docs">
                                ${(s.images || []).length > 0 ? `<span class="tag-pill">${s.images.length} photos</span>` : '<span class="mu">None</span>'}
                            </td>
                            <td data-label="Actions" onclick="event.stopPropagation()">
                                <div style="display:flex;gap:4px">
                                    <button class="btn sm" data-act="nav" data-p="sales/${s.id}">View</button>
                                    <button class="btn sm" data-act="nav" data-p="sales/edit/${s.id}">Edit</button>
                                </div>
                            </td>
                        </tr>
                    `).join('') || '<tr><td colspan="9" class="empty">No sales records found matching filter</td></tr>'}
                </tbody>
            </table>
        </div>
    </div>
</div>`;
}


let SALE_CUST_MODE = 'existing';
let SALE_PROD_MODE = 'existing';

function saleFormPage(id) {
    const s = id ? S.sales.find(x => x.id === id) : null;
    if (id && !s) return nf('sales', 'Sale Record');
    DIRTY = false;

    if (s) {
        SALE_IMAGES = [...(s.images || [])];
        SALE_CUST_MODE = 'existing';
        SALE_PROD_MODE = 'existing';
    } else {
        SALE_IMAGES = [];
    }

    const c = s ? cust(s.cid) : (S.customers[0] || {});
    const p = s ? (S.products.find(x => x.id === s.pid) || S.products[0]) : (S.products[0] || {});

    const purchaseDate = s ? s.date : D(0);
    const installDate = s ? (s.installDate || '') : D(1);
    const shopName = s ? s.shopName : (S.set.store || 'Mobile Point AC Care - Alkapuri Branch');
    const srv1 = s ? s.srv1Date : cdd(purchaseDate, 120);
    const srv2 = s ? s.srv2Date : cdd(purchaseDate, 330);

    return `<div class="pg">
    <nav class="bc mu">
        <button class="lnk" data-act="nav" data-p="sales">Sales</button> / ${s ? esc(s.id) + ' / Edit' : 'Record New Sale'}
    </nav>
    <div class="ph">
        <div>
            <h1>${s ? 'Edit AC Sale' : 'Record New AC Sale'}</h1>
            <p>Customer details, AC model & serial, installation, documentation, and service scheduling.</p>
        </div>
    </div>

    <form id="sale-form" novalidate onsubmit="return false">
        <input type="hidden" name="sale_id" value="${s ? esc(s.id) : ''}">
        <div class="fgrid">

            <div class="panel pad">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
                    <h2>Customer Details *</h2>
                    <div class="seg-b">
                        <button type="button" class="${SALE_CUST_MODE === 'existing' ? 'on' : ''}" data-act="sale-cmode" data-v="existing">Select Existing</button>
                        <button type="button" class="${SALE_CUST_MODE === 'new' ? 'on' : ''}" data-act="sale-cmode" data-v="new">+ New Customer</button>
                    </div>
                </div>

                <div id="sale-cust-existing-box" style="display:${SALE_CUST_MODE === 'existing' ? 'block' : 'none'};margin-bottom:12px">
                    <label>Choose Existing Customer
                        <select name="existing_cid" id="sale-cust-select">
                            ${S.customers.map(cx => `
                                <option value="${cx.id}" ${(s ? s.cid === cx.id : cx.id === c.id) ? 'selected' : ''}>
                                    ${esc(cx.name)} · ${esc(cx.phone)} (${esc(cx.locality || cx.address)})` +
                                `</option>
                            `).join('')}
                        </select>
                    </label>
                </div>

                <div class="fg">
                    <label>Customer Name *
                        <input name="cust_name" id="sc_name" value="${esc(s ? s.custName : c.name || '')}" placeholder="Full Name" required>
                    </label>
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
                        <label>WhatsApp Number *
                            <input name="cust_phone" id="sc_phone" value="${esc(s ? s.custPhone : c.phone || '')}" placeholder="+91 98250 XXXXX" required>
                        </label>
                        <label>Alternate Number
                            <input name="cust_alt_phone" id="sc_alt" value="${esc(s ? (s.custAltPhone || '') : c.altPhone || '')}" placeholder="Optional second number">
                        </label>
                    </div>
                    <label>Complete Address (including Flat/House/Street) *
                        <textarea name="cust_address" id="sc_addr" rows="2" placeholder="Full residential or commercial address" required>${esc(s ? s.custAddress : c.address || '')}</textarea>
                    </label>
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px">
                        <label>Locality / Area *
                            <input name="cust_locality" id="sc_loc" value="${esc(s ? (s.custLocality || '') : c.locality || '')}" placeholder="e.g. Alkapuri" required>
                        </label>
                        <label>Landmark
                            <input name="cust_landmark" id="sc_land" value="${esc(s ? (s.custLandmark || '') : c.landmark || '')}" placeholder="e.g. Opp. Reliance Mall">
                        </label>
                        <label>Area PIN Code *
                            <input name="cust_pincode" id="sc_pin" value="${esc(s ? (s.custPincode || '') : c.pincode || '')}" placeholder="e.g. 390007" required>
                        </label>
                    </div>
                </div>
            </div>

            <div class="panel pad">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
                    <h2>AC Product Details *</h2>
                    <div class="seg-b">
                        <button type="button" class="${SALE_PROD_MODE === 'existing' ? 'on' : ''}" data-act="sale-pmode" data-v="existing">From Catalog</button>
                        <button type="button" class="${SALE_PROD_MODE === 'new' ? 'on' : ''}" data-act="sale-pmode" data-v="new">+ Enter New Model</button>
                    </div>
                </div>

                <div id="sale-prod-existing-box" style="display:${SALE_PROD_MODE === 'existing' ? 'block' : 'none'};margin-bottom:12px">
                    <label>Select AC from Catalog
                        <select name="existing_pid" id="sale-prod-select">
                            ${S.products.map(px => `
                                <option value="${px.id}" data-brand="${esc(px.brand)}" data-model="${esc(px.model)}" ${(s ? s.pid === px.id : px.id === p.id) ? 'selected' : ''}>
                                    ${esc(px.brand)} ${esc(px.model)} · ${esc(px.capacity)} ${esc(px.star)} (${esc(px.invType)})` +
                                `</option>
                            `).join('')}
                        </select>
                    </label>
                </div>

                <div class="fg">
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
                        <label>Brand Name *
                            <input name="prod_brand" id="sp_brand" value="${esc(s ? s.brand : p.brand || 'Daikin')}" placeholder="e.g. Daikin, LG, Voltas" required>
                        </label>
                        <label>Product Model Number *
                            <input name="prod_model" id="sp_model" value="${esc(s ? s.model : p.model || '')}" placeholder="e.g. FTKF35TV16U" required>
                        </label>
                    </div>
                    <label>Product Serial Number *
                        <input name="prod_sn" id="sp_sn" value="${esc(s ? s.sn : '')}" placeholder="e.g. DK-71001 or scan serial plate" required>
                    </label>
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
                        <label>Capacity / Tonnage
                            <input name="prod_cap" id="sp_cap" value="${esc(p.capacity || '1.5 Ton')}" placeholder="e.g. 1.5 Ton">
                        </label>
                        <label>Star Rating
                            <select name="prod_star" id="sp_star">
                                <option ${p.star === '5 Star' ? 'selected' : ''}>5 Star</option>
                                <option ${p.star === '3 Star' ? 'selected' : ''}>3 Star</option>
                                <option ${p.star === '4 Star' ? 'selected' : ''}>4 Star</option>
                                <option ${p.star === '2 Star' ? 'selected' : ''}>2 Star</option>
                            </select>
                        </label>
                    </div>
                    <small class="mu">If a new model number is entered, it will be automatically added to the AC product catalog.</small>
                </div>
            </div>

            <div class="panel pad">
                <h2>Purchase & Shop Information</h2>
                <div class="fg">
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
                        <label>Date of Purchase *
                            <input name="sale_date" id="sale-date-input" type="date" value="${purchaseDate}" required>
                        </label>
                        <label>Installation Date
                            <input name="install_date" type="date" value="${installDate}">
                        </label>
                    </div>
                    <label>Your Shop Name *
                        <input name="shop_name" value="${esc(shopName)}" placeholder="e.g. Mobile Point AC Care - Alkapuri Branch" required>
                    </label>
                    <label>Internal Notes / Remarks
                        <textarea name="sale_notes" rows="2" placeholder="e.g. Terrace installation, customer phone number verified">${esc(s ? s.notes : '')}</textarea>
                    </label>
                </div>
            </div>

            <div class="panel pad">
                <h2>Multiple Image Uploads</h2>
                <p class="mu" style="margin-bottom:10px">Upload invoice bills, warranty cards, installation photos, and serial number plates.</p>

                <div class="upz" id="sale-upz" style="margin-bottom:12px">
                    ${ic('camera')}
                    <b>Click or drag &amp; drop images here</b>
                    <small>Multiple images supported (JPG, PNG, WebP)</small>
                    <input type="file" id="sale-file-input" multiple accept="image/*" style="display:none">
                </div>

                <div id="sale-img-preview-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(90px,1fr));gap:10px">
                    ${renderImageThumbnails()}
                </div>
            </div>

            <div class="panel pad" style="grid-column:1/-1;background:color-mix(in srgb,var(--acs) 25%,var(--sf))">
                <h2>Automated Free Service Milestones (2 per Year)</h2>
                <p class="mu">Calculated automatically based on the purchase date. Reminders will trigger via WhatsApp.</p>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-top:12px">
                    <div class="panel pad" style="background:var(--sf)">
                        <div style="display:flex;justify-content:space-between;align-items:center">
                            <b>1st Free Service Milestone</b>
                            <span class="b wa">3 to 5 Months</span>
                        </div>
                        <p style="margin:8px 0 4px">Scheduled Due Date: <b id="srv1-preview-date">${fd(srv1)}</b></p>
                        <small class="mu">Target: 120 days post purchase. WhatsApp reminder triggers 14 days prior.</small>
                    </div>

                    <div class="panel pad" style="background:var(--sf)">
                        <div style="display:flex;justify-content:space-between;align-items:center">
                            <b>2nd Free Service Milestone</b>
                            <span class="b wa">Before 11 Months</span>
                        </div>
                        <p style="margin:8px 0 4px">Scheduled Due Date: <b id="srv2-preview-date">${fd(srv2)}</b></p>
                        <small class="mu">Target: 330 days post purchase. WhatsApp reminder triggers 14 days prior.</small>
                    </div>
                </div>
            </div>

        </div>

        <div class="sticky" style="margin-top:20px">
            <button type="button" class="btn" data-act="nav" data-p="sales">Cancel</button>
            <button type="button" class="btn pri" data-act="sale-save">${s ? 'Save Changes' : 'Record Sale & Schedule Services'}</button>
        </div>
    </form>
</div>`;
}

function renderImageThumbnails() {
    if (!SALE_IMAGES || SALE_IMAGES.length === 0) {
        return '<p class="mu" style="grid-column:1/-1;padding:8px 0;font-size:13px">No images uploaded yet</p>';
    }
    return SALE_IMAGES.map((src, idx) => `
        <div style="position:relative;aspect-ratio:1;border-radius:8px;overflow:hidden;border:1px solid var(--bd);background:var(--bg)">
            <img src="${src}" alt="Upload ${idx + 1}" style="width:100%;height:100%;object-fit:cover;display:block;cursor:pointer" data-act="img-lightbox" data-idx="${idx}">
            <button type="button" style="position:absolute;top:4px;right:4px;width:22px;height:22px;border-radius:50%;background:rgba(0,0,0,0.65);color:#fff;border:0;display:flex;align-items:center;justify-content:center;font-size:13px;line-height:1;cursor:pointer" data-act="img-del" data-idx="${idx}" title="Delete image">×</button>
        </div>
    `).join('');
}


function saleDetailPage(id) {
    const s = sale(id);
    if (!s) return nf('sales', 'Sale Record');
    const c = cust(s.cid);
    const p = S.products.find(x => x.id === s.pid) || { brand: s.brand, model: s.model, capacity: '1.5 Ton', star: '5 Star' };
    const cleanPhone = (s.custPhone || c.phone || '').replace(/\D/g, '');

    return `<div class="pg">
    <nav class="bc mu">
        <button class="lnk" data-act="nav" data-p="sales">Sales</button> / ${esc(s.id)}
    </nav>

    <div class="ph">
        <div>
            <h1>Sale ${esc(s.id)}</h1>
            <p>Sold on ${fd(s.date)} · Shop: ${esc(s.shopName || S.set.store)}</p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
            <a class="btn" href="https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hello ' + s.custName + ', message from ' + S.set.store)}" target="_blank" rel="noopener">${ic('msg')} WhatsApp Customer</a>
            <button class="btn" data-act="nav" data-p="invoices/${s.invId}">${ic('file')} View Invoice</button>
            <button class="btn pri" data-act="nav" data-p="sales/edit/${s.id}">Edit Sale</button>
        </div>
    </div>

    <div class="cw2">

        <div style="display:flex;flex-direction:column;gap:20px">
            <div class="panel pad">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
                    <h2>Customer Information</h2>
                    <button class="btn sm" data-act="nav" data-p="customers/${s.cid}">Profile</button>
                </div>
                <dl class="kv">
                    <dt>Customer Name</dt>
                    <dd><b>${esc(s.custName)}</b></dd>
                    <dt>WhatsApp No.</dt>
                    <dd><b>${esc(s.custPhone)}</b></dd>
                    <dt>Alternate No.</dt>
                    <dd>${esc(s.custAltPhone || '—')}</dd>
                    <dt>Locality</dt>
                    <dd>${esc(s.custLocality || '—')}</dd>
                    <dt>Landmark</dt>
                    <dd>${esc(s.custLandmark || '—')}</dd>
                    <dt>Complete Address</dt>
                    <dd>${esc(s.custAddress)}</dd>
                    <dt>PIN Code</dt>
                    <dd>${esc(s.custPincode || '—')}</dd>
                </dl>
            </div>

            <div class="panel pad">
                <h2>AC Product Details (Zero Price Record)</h2>
                <dl class="kv">
                    <dt>Brand Name</dt>
                    <dd><b>${esc(s.brand)}</b></dd>
                    <dt>Model Number</dt>
                    <dd><b>${esc(s.model)}</b></dd>
                    <dt>Serial Number</dt>
                    <dd><span class="tag-pill" style="font-weight:700">${esc(s.sn)}</span></dd>
                    <dt>Capacity</dt>
                    <dd>${esc(p.capacity || '1.5 Ton')}</dd>
                    <dt>Star Rating</dt>
                    <dd>${esc(p.star || '5 Star')}</dd>
                    <dt>Installation Date</dt>
                    <dd>${s.installDate ? fd(s.installDate) : '<span class="b wa">Pending</span>'}</dd>
                    <dt>Shop Name</dt>
                    <dd>${esc(s.shopName || S.set.store)}</dd>
                </dl>
            </div>

            ${s.notes ? `<div class="panel pad"><h2>Internal Notes</h2><p class="mu">${esc(s.notes)}</p></div>` : ''}
        </div>

        <div style="display:flex;flex-direction:column;gap:20px">
            <div class="panel pad">
                <h2>2 Free AC Services Schedule</h2>
                <p class="mu" style="margin-bottom:14px">Company OEM technicians are dispatched for service visits.</p>

                <div class="panel pad" style="margin-bottom:12px;background:color-mix(in srgb,var(--acs) 15%,var(--sf))">
                    <div style="display:flex;justify-content:space-between;align-items:center">
                        <b>1st Free Service (3 to 5 Months)</b>
                        ${srvBadge(s.srv1Status, s.srv1Date)}
                    </div>
                    <p style="margin:8px 0 4px">Due Date: <b>${fdt(s.srv1Date)}</b></p>
                    <p class="mu" style="font-size:12px">${s.srv1DoneDate ? 'Completed on ' + fd(s.srv1DoneDate) : 'Recommended between 90 to 150 days of purchase'}</p>
                    <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
                        <button class="btn sm" data-act="wa-remind" data-id="${s.id}" data-type="1">${ic('zap')} Send WhatsApp Reminder</button>
                        <button class="btn sm" data-act="mark-srv" data-id="${s.id}" data-type="1">${s.srv1Status === 'Completed' ? 'Mark Incomplete' : 'Mark Completed'}</button>
                    </div>
                </div>

                <div class="panel pad" style="background:color-mix(in srgb,var(--acs) 15%,var(--sf))">
                    <div style="display:flex;justify-content:space-between;align-items:center">
                        <b>2nd Free Service (Before 11 Months)</b>
                        ${srvBadge(s.srv2Status, s.srv2Date)}
                    </div>
                    <p style="margin:8px 0 4px">Due Date: <b>${fdt(s.srv2Date)}</b></p>
                    <p class="mu" style="font-size:12px">${s.srv2DoneDate ? 'Completed on ' + fd(s.srv2DoneDate) : 'Must be performed before 330 days of purchase'}</p>
                    <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
                        <button class="btn sm" data-act="wa-remind" data-id="${s.id}" data-type="2">${ic('zap')} Send WhatsApp Reminder</button>
                        <button class="btn sm" data-act="mark-srv" data-id="${s.id}" data-type="2">${s.srv2Status === 'Completed' ? 'Mark Incomplete' : 'Mark Completed'}</button>
                    </div>
                </div>
            </div>

            <div class="panel pad">
                <h2>Uploaded Documents &amp; Photos</h2>
                <p class="mu" style="margin-bottom:10px">Invoices, warranty cards, installation photos, and serial number plates.</p>
                <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:10px">
                    ${(s.images && s.images.length > 0) ? s.images.map((img, idx) => `
                        <div style="position:relative;aspect-ratio:1;border-radius:8px;overflow:hidden;border:1px solid var(--bd);background:var(--bg);cursor:pointer" data-act="img-lightbox-view" data-src="${encodeURIComponent(img)}">
                            <img src="${img}" alt="Doc ${idx + 1}" style="width:100%;height:100%;object-fit:cover;display:block">
                        </div>
                    `).join('') : '<p class="mu" style="grid-column:1/-1">No documents uploaded for this sale.</p>'}
                </div>
            </div>
        </div>

    </div>
</div>`;
}

function prodPage(id) {
    const p = S.products.find(x => x.id === id);
    if (!p) return nf('products', 'AC Product');
    const ss = S.sales.filter(s => s.pid === id || (s.brand === p.brand && s.model === p.model));
    const inStock = (p.units || []).filter(u => u.st !== 'Sold');
    const soldUnits = (p.units || []).filter(u => u.st === 'Sold');

    return `<div class="pg">
    <nav class="bc mu">
        <button class="lnk" data-act="nav" data-p="products">AC Products</button> / ${esc(p.brand)} ${esc(p.model)}
    </nav>
    <div class="ph">
        <div>
            <h1>${esc(p.brand)} ${esc(p.model)}</h1>
            <p>${esc(p.name)} · ${esc(p.capacity)} · ${esc(p.star)} · Minimal AC Specs (No Price)</p>
        </div>
        <div style="display:flex;gap:8px">
            <button class="btn" data-act="nav" data-p="sales/new">${ic('plus')} Record Sale of this AC</button>
            <button class="btn pri" data-act="nav" data-p="products/edit/${id}">Edit Model</button>
        </div>
    </div>

    <div class="cw2">
        <div class="panel pad">
            <h2>AC Specifications (Minimal)</h2>
            <dl class="kv" style="margin-top:12px">
                <dt>Brand Name</dt>
                <dd><b>${esc(p.brand)}</b></dd>
                <dt>Model Number</dt>
                <dd><b>${esc(p.model)}</b></dd>
                <dt>Capacity / Tonnage</dt>
                <dd>${esc(p.capacity || '1.5 Ton')}</dd>
                <dt>Energy Star Rating</dt>
                <dd><b>${esc(p.star || '5 Star')}</b></dd>
                <dt>Inverter Type</dt>
                <dd>${esc(p.invType || 'Inverter')}</dd>
                <dt>Condenser Coil</dt>
                <dd>${esc(p.condenser || '100% Copper')}</dd>
                <dt>Refrigerant Gas</dt>
                <dd>${esc(p.gas || 'R32')}</dd>
                <dt>Manufacturer Warranty</dt>
                <dd>${esc(p.warranty || '1 Year Comp + 10 Years Compressor')}</dd>
            </dl>
        </div>

        <div style="display:flex;flex-direction:column;gap:20px">
            <div class="panel pad">
                <h2>Product Serial Numbers</h2>
                <div style="margin-top:10px">
                    <b>In-Stock Units (${inStock.length}):</b>
                    <div style="display:flex;gap:6px;flex-wrap:wrap;margin:6px 0 12px">
                        ${inStock.map(u => `<span class="tag-pill" style="font-weight:600">${esc(u.sn)}</span>`).join('') || '<span class="mu">No units currently in stock</span>'}
                    </div>

                    <b>Sold Units (${soldUnits.length}):</b>
                    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px">
                        ${soldUnits.map(u => `<span class="tag-pill mu">${esc(u.sn)} (Sold)</span>`).join('') || '<span class="mu">No units sold yet</span>'}
                    </div>
                </div>
            </div>

            <div class="panel">
                <div class="hd">
                    <h2>Recorded Sales of this AC (${ss.length})</h2>
                </div>
                ${ss.map(s => `
                    <div class="li" style="cursor:pointer" data-act="nav" data-p="sales/${s.id}">
                        <div>
                            <b>${esc(s.custName)}</b>
                            <small class="mu">${fd(s.date)} · S/N: ${esc(s.sn)}</small>
                        </div>
                        <span class="b ok">Sold</span>
                    </div>
                `).join('') || '<div class="empty">No sales recorded yet for this model</div>'}
            </div>
        </div>
    </div>
</div>`;
}

function prodFormPage(id) {
    const e = id ? S.products.find(x => x.id === id) : null;
    if (id && !e) return nf('products', 'AC Product');
    DIRTY = false;

    return `<div class="pg">
    <nav class="bc mu">
        <button class="lnk" data-act="nav" data-p="products">AC Products</button> / ${e ? esc(e.brand) + ' ' + esc(e.model) + ' / Edit' : 'Add AC Model'}
    </nav>
    <div class="ph">
        <div>
            <h1>${e ? 'Edit AC Model' : 'Add Minimal AC Model'}</h1>
            <p>Brand, model number, specifications and serial numbers. Strictly no pricing fields.</p>
        </div>
    </div>

    <form id="prod-form" novalidate onsubmit="return false">
        <input type="hidden" name="prod_id" value="${e ? esc(e.id) : ''}">
        <div class="fgrid">
            <div class="panel pad">
                <h2>AC Identification *</h2>
                <div class="fg">
                    <label>Brand Name *
                        <input name="brand" value="${esc(e ? e.brand : '')}" placeholder="e.g. Daikin, LG, Voltas, Hitachi" required>
                    </label>
                    <label>Product Model Number *
                        <input name="model" value="${esc(e ? e.model : '')}" placeholder="e.g. FTKF35TV16U" required>
                    </label>
                    <label>Display / Commercial Name
                        <input name="name" value="${esc(e ? e.name : '')}" placeholder="e.g. Daikin FTKF35 1.0T Inverter">
                    </label>
                </div>
            </div>

            <div class="panel pad">
                <h2>Technical Specifications</h2>
                <div class="fg">
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
                        <label>Capacity / Tonnage
                            <select name="capacity">
                                ${['1.0 Ton', '1.5 Ton', '2.0 Ton', '0.8 Ton', '2.5 Ton'].map(c => `<option ${(e && e.capacity === c) ? 'selected' : ''}>${c}</option>`).join('')}
                            </select>
                        </label>
                        <label>Star Rating
                            <select name="star">
                                ${['5 Star', '3 Star', '4 Star', '2 Star', '1 Star'].map(c => `<option ${(e && e.star === c) ? 'selected' : ''}>${c}</option>`).join('')}
                            </select>
                        </label>
                    </div>
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
                        <label>Inverter Type
                            <select name="invType">
                                ${['Inverter', 'Dual Inverter', 'Fixed Speed', 'Triple Inverter'].map(c => `<option ${(e && e.invType === c) ? 'selected' : ''}>${c}</option>`).join('')}
                            </select>
                        </label>
                        <label>Condenser Coil
                            <input name="condenser" value="${esc(e ? e.condenser : '100% Copper')}" placeholder="e.g. 100% Copper">
                        </label>
                    </div>
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
                        <label>Refrigerant Gas
                            <input name="gas" value="${esc(e ? e.gas : 'R32')}" placeholder="e.g. R32, R410A">
                        </label>
                        <label>Warranty Terms
                            <input name="warranty" value="${esc(e ? e.warranty : '1 Year Comp + 10 Years Compressor')}" placeholder="e.g. 1 Yr Comp + 10 Yr Compressor">
                        </label>
                    </div>
                </div>
            </div>

            <div class="panel pad" style="grid-column:1/-1">
                <h2>Serial Numbers (comma separated)</h2>
                <label>Opening Serial Numbers
                    <input name="serials" value="${esc(e ? (e.units || []).map(u => u.sn).join(', ') : '')}" placeholder="e.g. DK-71001, DK-71002, DK-71003">
                </label>
            </div>
        </div>

        <div class="sticky" style="margin-top:20px">
            <button type="button" class="btn" data-act="nav" data-p="products">Cancel</button>
            <button type="button" class="btn pri" data-act="prod-save">${e ? 'Save Model' : 'Create AC Model'}</button>
        </div>
    </form>
</div>`;
}

function custPage(id) {
    const c = cust(id);
    if (!c.id) return nf('customers', 'Customer');
    const ss = S.sales.filter(s => s.cid === id);
    const ms = S.msgs.filter(m => m.cid === id);
    const cleanPhone = (c.phone || '').replace(/\D/g, '');

    return `<div class="pg">
    <nav class="bc mu">
        <button class="lnk" data-act="nav" data-p="customers">Customers</button> / ${esc(c.name)}
    </nav>
    <div class="ph">
        <div>
            <h1>${esc(c.name)}</h1>
            <p>${esc(c.locality || '')} · WhatsApp: ${esc(c.phone)} · Customer Record</p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
            <a class="btn" href="https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hello ' + c.name + ', greeting from ' + S.set.store)}" target="_blank" rel="noopener">${ic('msg')} WhatsApp</a>
            <button class="btn" data-act="nav" data-p="sales/new">${ic('plus')} New Sale</button>
            <button class="btn pri" data-act="nav" data-p="customers/edit/${id}">Edit Customer</button>
        </div>
    </div>

    <div class="cw2">
        <div class="panel pad">
            <h2>Customer Details</h2>
            <dl class="kv" style="margin-top:12px">
                <dt>Full Name</dt>
                <dd><b>${esc(c.name)}</b></dd>
                <dt>WhatsApp No.</dt>
                <dd><b>${esc(c.phone)}</b></dd>
                <dt>Alternate No.</dt>
                <dd>${esc(c.altPhone || '—')}</dd>
                <dt>Locality / Area</dt>
                <dd><b>${esc(c.locality || '—')}</b></dd>
                <dt>Landmark</dt>
                <dd>${esc(c.landmark || '—')}</dd>
                <dt>Complete Address</dt>
                <dd>${esc(c.address)}</dd>
                <dt>Area PIN Code</dt>
                <dd>${esc(c.pincode || '—')}</dd>
                <dt>Account Status</dt>
                <dd>${B(c.active ? 'Active' : 'Inactive')}</dd>
            </dl>
        </div>

        <div style="display:flex;flex-direction:column;gap:20px">
            <div class="panel">
                <div class="hd">
                    <h2>Purchased AC Units (${ss.length})</h2>
                </div>
                ${ss.map(s => `
                    <div class="li" style="cursor:pointer" data-act="nav" data-p="sales/${s.id}">
                        <div>
                            <b>${esc(s.brand)} ${esc(s.model)}</b>
                            <small class="mu">S/N: ${esc(s.sn)} · Sold: ${fd(s.date)}</small>
                            <small style="display:block">1st Service: ${fd(s.srv1Date)} | 2nd Service: ${fd(s.srv2Date)}</small>
                        </div>
                        ${srvBadge(s.srv1Status, s.srv1Date)}
                    </div>
                `).join('') || '<div class="empty">No AC purchases recorded yet</div>'}
            </div>

            <div class="panel">
                <div class="hd">
                    <h2>WhatsApp Messages History (${ms.length})</h2>
                </div>
                ${ms.map(m => `
                    <div class="li">
                        <div>
                            <b>${esc(m.tpl)}</b>
                            <small class="mu">${fd(m.time)}</small>
                            ${m.text ? `<small style="display:block;margin-top:2px">${esc(m.text)}</small>` : ''}
                        </div>
                        ${B(m.status)}
                    </div>
                `).join('') || '<div class="empty">No automated messages recorded</div>'}
            </div>
        </div>
    </div>
</div>`;
}

function custFormPage(id) {
    const c = id ? S.customers.find(x => x.id === id) : null;
    if (id && !c) return nf('customers', 'Customer');
    DIRTY = false;

    return `<div class="pg">
    <nav class="bc mu">
        <button class="lnk" data-act="nav" data-p="customers">Customers</button> / ${c ? esc(c.name) + ' / Edit' : 'Add Customer'}
    </nav>
    <div class="ph">
        <div>
            <h1>${c ? 'Edit Customer' : 'Add Minimal Customer Record'}</h1>
            <p>Customer name, complete address with landmark and area PIN code (including locality), WhatsApp &amp; alternate number.</p>
        </div>
    </div>

    <form id="cust-form" novalidate onsubmit="return false">
        <input type="hidden" name="cust_id" value="${c ? esc(c.id) : ''}">
        <div class="fgrid">
            <div class="panel pad">
                <h2>Contact Information *</h2>
                <div class="fg">
                    <label>Customer Full Name *
                        <input name="name" value="${esc(c ? c.name : '')}" placeholder="Full Name" required>
                    </label>
                    <label>WhatsApp Number (Primary) *
                        <input name="phone" value="${esc(c ? c.phone : '')}" placeholder="+91 98250 XXXXX" required>
                    </label>
                    <label>Alternate Number
                        <input name="altPhone" value="${esc(c ? (c.altPhone || '') : '')}" placeholder="Optional secondary contact number">
                    </label>
                    <label class="row">
                        <input type="checkbox" name="active" ${(c ? c.active : true) ? 'checked' : ''}>
                        Active Customer Record
                    </label>
                </div>
            </div>

            <div class="panel pad">
                <h2>Complete Address Details *</h2>
                <div class="fg">
                    <label>Complete Address (House/Flat, Building, Street) *
                        <textarea name="address" rows="3" placeholder="Complete physical address" required>${esc(c ? c.address : '')}</textarea>
                    </label>
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
                        <label>Locality / Area (e.g. Alkapuri, Manjalpur) *
                            <input name="locality" value="${esc(c ? (c.locality || '') : '')}" placeholder="Locality or Area" required>
                        </label>
                        <label>Landmark
                            <input name="landmark" value="${esc(c ? (c.landmark || '') : '')}" placeholder="e.g. Near Water Tank, Opp. Mall">
                        </label>
                    </div>
                    <label>Area PIN Code *
                        <input name="pincode" value="${esc(c ? (c.pincode || '') : '')}" placeholder="e.g. 390007" required>
                    </label>
                </div>
            </div>
        </div>

        <div class="sticky" style="margin-top:20px">
            <button type="button" class="btn" data-act="nav" data-p="customers">Cancel</button>
            <button type="button" class="btn pri" data-act="cust-save">${c ? 'Save Changes' : 'Create Customer'}</button>
        </div>
    </form>
</div>`;
}

function invPage(id) {
    const inv = S.invoices.find(x => x.id === id);
    if (!inv) return nf('invoices', 'Invoice');
    const s = S.sales.find(x => x.id === inv.saleId) || {};
    const c = cust(inv.cid);

    return `<div class="pg">
    <nav class="bc mu">
        <button class="lnk" data-act="nav" data-p="invoices">Invoices</button> / ${esc(inv.id)}
    </nav>
    <div class="ph">
        <div>
            <h1>Invoice ${esc(inv.id)}</h1>
            <p>Date: ${fd(inv.date)} · Linked Sale: ${esc(inv.saleId || '—')}</p>
        </div>
        <div style="display:flex;gap:8px">
            <button class="btn" onclick="window.print()">Print / PDF</button>
            ${inv.saleId ? `<button class="btn pri" data-act="nav" data-p="sales/${inv.saleId}">View Sale Record</button>` : ''}
        </div>
    </div>

    <div class="doc panel pad" style="max-width:850px;margin:0 auto;background:#fff;color:#111">
        <div style="display:flex;justify-content:space-between;border-bottom:2px solid #e5e7eb;padding-bottom:18px;margin-bottom:18px">
            <div>
                <h2 style="font-size:24px;font-weight:700;color:#0284c7;margin:0 0 4px">${esc(S.set.store)}</h2>
                <div style="font-size:13px;color:#4b5563;line-height:1.5">
                    <div>${esc(S.set.addr)}</div>
                    <div>Phone: ${esc(S.set.phone)} | Email: ${esc(S.set.email)}</div>
                    <div><b>GSTIN: ${esc(S.set.gstin)}</b></div>
                </div>
            </div>
            <div style="text-align:right">
                <span class="b ok" style="font-size:13px">OFFICIAL TAX INVOICE</span>
                <div style="font-size:14px;margin-top:6px"><b>Invoice No:</b> ${esc(inv.id)}</div>
                <div style="font-size:13px;color:#4b5563"><b>Date:</b> ${fdt(inv.date)}</div>
                <div style="font-size:13px;color:#4b5563"><b>Payment Mode:</b> ${esc(inv.pay || 'UPI')}</div>
            </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin-bottom:20px;font-size:13px">
            <div style="background:#f9fafb;padding:12px;border-radius:6px;border:1px solid #e5e7eb">
                <b style="color:#374151;text-transform:uppercase;font-size:11px;letter-spacing:0.5px">Billed To (Customer Details)</b>
                <div style="font-size:15px;font-weight:700;margin:4px 0">${esc(c.name)}</div>
                <div>WhatsApp: ${esc(c.phone)} ${c.altPhone ? '· Alt: ' + esc(c.altPhone) : ''}</div>
                <div>${esc(c.address)}</div>
                <div>${esc(c.locality || '')} ${c.landmark ? '(Near ' + esc(c.landmark) + ')' : ''} - ${esc(c.pincode || '')}</div>
            </div>
            <div style="background:#f9fafb;padding:12px;border-radius:6px;border:1px solid #e5e7eb">
                <b style="color:#374151;text-transform:uppercase;font-size:11px;letter-spacing:0.5px">Sale &amp; Branch Information</b>
                <div style="margin-top:4px"><b>Branch:</b> ${esc(inv.shopName || S.set.store)}</div>
                <div><b>Linked Sale Ref:</b> ${esc(inv.saleId || '—')}</div>
                <div><b>Installation Date:</b> ${s.installDate ? fdt(s.installDate) : 'Pending Schedule'}</div>
                <div><b>Technician:</b> Dispatched by OEM / Manufacturer Brand</div>
            </div>
        </div>

        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;font-size:13px">
            <thead>
                <tr style="background:#f3f4f6;text-align:left">
                    <th style="padding:10px;border:1px solid #e5e7eb">#</th>
                    <th style="padding:10px;border:1px solid #e5e7eb">Description of Goods (Air Conditioner)</th>
                    <th style="padding:10px;border:1px solid #e5e7eb">Product Serial Number</th>
                    <th style="padding:10px;border:1px solid #e5e7eb;text-align:center">Qty</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding:10px;border:1px solid #e5e7eb">1</td>
                    <td style="padding:10px;border:1px solid #e5e7eb">
                        <b>${esc(inv.brand)} ${esc(inv.model)}</b>
                        <div style="color:#6b7280;font-size:12px">Split Inverter Air Conditioner Unit with Remote &amp; Accessories</div>
                    </td>
                    <td style="padding:10px;border:1px solid #e5e7eb">
                        <span style="font-family:monospace;font-weight:700">${esc(inv.sn)}</span>
                    </td>
                    <td style="padding:10px;border:1px solid #e5e7eb;text-align:center">1 Unit</td>
                </tr>
            </tbody>
        </table>

        <div style="border:2px dashed #0284c7;background:#f0f9ff;border-radius:8px;padding:16px;margin-bottom:20px">
            <h3 style="margin:0 0 8px;color:#0369a1;font-size:15px;display:flex;align-items:center;gap:6px">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5 7.5-.7z"/></svg>
                Complimentary 2-Free-Service Warranty Certificate
            </h3>
            <p style="font-size:12px;color:#0369a1;margin:0 0 10px;line-height:1.4">This invoice entitles the registered customer to 2 complimentary free services within the 1st year of purchase. Company OEM authorized service personnel will be arranged upon reminder confirmation.</p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:12px">
                <div style="background:#fff;padding:8px 12px;border-radius:6px;border:1px solid #bae6fd">
                    <b>1st Free Service Milestone:</b>
                    <div>Scheduled Due: <b>${fdt(inv.srv1Date)}</b> (3 to 5 Months)</div>
                </div>
                <div style="background:#fff;padding:8px 12px;border-radius:6px;border:1px solid #bae6fd">
                    <b>2nd Free Service Milestone:</b>
                    <div>Scheduled Due: <b>${fdt(inv.srv2Date)}</b> (Before 11 Months)</div>
                </div>
            </div>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:30px;font-size:12px;color:#6b7280">
            <div>
                <div>Goods once sold are covered under respective brand manufacturer warranty.</div>
                <div>Authorized service &amp; installation handled directly by OEM brand centers.</div>
            </div>
            <div style="text-align:center">
                <div style="margin-bottom:40px;font-weight:600;color:#111">For ${esc(S.set.store)}</div>
                <div style="border-top:1px solid #d1d5db;padding-top:4px;width:160px">Authorized Signatory</div>
            </div>
        </div>
    </div>
</div>`;
}


let CV = 'month';
let CD = D(0);

let CAL_FILTER = 'all';

function calendar() {
    const t0 = D(0);
    const B0 = new Date(CD + 'T00:00:00Z');
    const y = B0.getUTCFullYear();
    const mo = B0.getUTCMonth();
    const ms = `${y}-${String(mo + 1).padStart(2, '0')}`;
    const L = (d, o) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-IN', { timeZone: 'UTC', ...o });

    const allEvents = [];
    S.sales.forEach(s => {
        const c = cust(s.cid);
        if (s.installDate) {
            allEvents.push({
                id: s.id + '-inst',
                saleId: s.id,
                cid: s.cid,
                custName: c.name,
                title: 'AC Installation · ' + s.brand + ' ' + s.model,
                brand: s.brand,
                model: s.model,
                sn: s.sn,
                date: s.installDate,
                type: 'Installation',
                cat: 'install',
                status: s.installDate <= t0 ? 'Completed' : 'Upcoming'
            });
        }
        allEvents.push({
            id: s.id + '-srv1',
            saleId: s.id,
            cid: s.cid,
            custName: c.name,
            title: '1st Free Service · ' + s.brand + ' ' + s.model,
            brand: s.brand,
            model: s.model,
            sn: s.sn,
            date: s.srv1Date,
            type: '1st Free Service (3-5 Mo)',
            cat: 'srv1',
            status: s.srv1Status
        });
        allEvents.push({
            id: s.id + '-srv2',
            saleId: s.id,
            cid: s.cid,
            custName: c.name,
            title: '2nd Free Service · ' + s.brand + ' ' + s.model,
            brand: s.brand,
            model: s.model,
            sn: s.sn,
            date: s.srv2Date,
            type: '2nd Free Service (<11 Mo)',
            cat: 'srv2',
            status: s.srv2Status
        });
    });

    let filteredEvents = allEvents;
    if (CAL_FILTER === 'srv1') filteredEvents = allEvents.filter(e => e.cat === 'srv1');
    else if (CAL_FILTER === 'srv2') filteredEvents = allEvents.filter(e => e.cat === 'srv2');
    else if (CAL_FILTER === 'install') filteredEvents = allEvents.filter(e => e.cat === 'install');
    else if (CAL_FILTER === 'pending') filteredEvents = allEvents.filter(e => e.status !== 'Completed');
    else if (CAL_FILTER === 'completed') filteredEvents = allEvents.filter(e => e.status === 'Completed');

    const evf = d => filteredEvents.filter(e => e.date === d);

    const evPill = e => {
        const isDone = e.status === 'Completed';
        const isOd = !isDone && e.date < t0;
        const isDueSoon = !isDone && !isOd && e.date <= cdd(t0, 30);
        const cls = isDone ? 'ok' : isOd ? 'er' : isDueSoon ? 'wa' : 'ac';
        const label = e.cat === 'install' ? 'Install' : e.cat === 'srv1' ? '1st Srv' : '2nd Srv';
        return `<div class="ev ${cls}" data-act="nav" data-p="sales/${e.saleId}" tabindex="0" title="${esc(e.custName)} · ${esc(e.title)} (${fd(e.date)}) · OEM technician dispatched directly by brand">
            <i></i>
            <span>${esc(e.custName)}</span>
            <em>${esc(label)} · ${esc(e.brand)}</em>
        </div>`;
    };

    const cell = (d, o = {}) => {
        const evs = evf(d);
        const isWe = dow(d) >= 5;
        const isToday = d === t0;
        const isOut = o.out;
        const max = o.max || 99;

        return `<div class="cd${isToday ? ' today' : ''}${isOut ? ' out' : ''}${isWe && !isOut ? ' we' : ''}" data-date="${d}" data-cday="${d}" style="min-height:${o.min || 110}px">
            <div class="ch">
                <button type="button" class="dn" data-act="cal-day" data-d="${d}" aria-label="Open ${L(d, { day: 'numeric', month: 'long' })}">${+d.slice(8)}</button>
                ${o.w ? `<span class="wd">${L(d, { weekday: 'long' })}</span>` : ''}
                ${evs.length ? `<span class="cn" title="${evs.length} milestone${evs.length === 1 ? '' : 's'}">${evs.length}</span>` : ''}
            </div>
            <div class="ev-list">
                ${evs.slice(0, max).map(evPill).join('')}
                ${evs.length > max ? `<button type="button" class="mr" data-act="cal-day" data-d="${d}">+${evs.length - max} more</button>` : ''}
            </div>
            ${evs.length ? `<div class="ev-dots">
                ${evs.slice(0, 3).map(e => {
                    const isDone = e.status === 'Completed';
                    const isOd = !isDone && e.date < t0;
                    const isDueSoon = !isDone && !isOd && e.date <= cdd(t0, 30);
                    const dotCls = isDone ? 'ok' : isOd ? 'er' : isDueSoon ? 'wa' : '';
                    return `<i class="${dotCls}"></i>`;
                }).join('')}
                ${evs.length > 3 ? `<small>+${evs.length - 3}</small>` : ''}
            </div>` : ''}
        </div>`;
    };

    let title, cnt, body;
    const WK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const monthEvs = allEvents.filter(e => e.date.startsWith(ms));
    const firstDay = `${y}-${String(mo + 1).padStart(2, '0')}-01`;

    if (CV === 'month') {
        const s0 = cdd(firstDay, -dow(firstDay));
        const dim = new Date(Date.UTC(y, mo + 1, 0)).getUTCDate();
        const wks = Math.ceil((dow(firstDay) + dim) / 7);
        title = L(firstDay, { month: 'long', year: 'numeric' });
        cnt = filteredEvents.filter(e => e.date.startsWith(ms)).length;

        let gridCells = '';
        for (let i = 0; i < wks * 7; i++) {
            const d = cdd(s0, i);
            gridCells += cell(d, { min: 115, max: 3, out: !d.startsWith(ms) });
        }
        body = `<div class="cal-g">${WK.map(d => `<div class="cal-h">${d}</div>`).join('')}${gridCells}</div>`;
    } else if (CV === 'week') {
        const w0 = cdd(CD, -dow(CD));
        const ds = [...Array(7)].map((_, i) => cdd(w0, i));
        title = L(ds[0], { day: 'numeric', month: 'short' }) + ' – ' + L(ds[6], { day: 'numeric', month: 'short', year: 'numeric' });
        cnt = ds.reduce((s, d) => s + evf(d).length, 0);
        body = `<div class="cal-g wk">${ds.map(d => `<div class="cal-h">${L(d, { weekday: 'short' })}</div>`).join('')}${ds.map(d => cell(d, { min: 240, w: 1 })).join('')}</div>`;
    } else if (CV === 'day') {
        const dayEvs = evf(CD);
        title = L(CD, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        cnt = dayEvs.length;
        body = `<div style="padding:16px">
            <div class="dv-h">
                <b>All AC Service Milestones for this Day</b>
                <span class="b">${cnt} event${cnt === 1 ? '' : 's'}</span>
            </div>
            ${dayEvs.map(e => `
                <div class="li" data-act="nav" data-p="sales/${e.saleId}" tabindex="0" style="cursor:pointer;padding:12px 14px">
                    <div>
                        <b><span class="mu" style="font-weight:500">Customer: </span>${esc(e.custName)}</b>
                        <small style="display:block;margin-top:2px">${esc(e.title)} · S/N: ${esc(e.sn)}</small>
                        <small class="mu">Service Date: ${fd(e.date)} · OEM technician dispatched directly by brand</small>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px">
                        ${srvBadge(e.status, e.date)}
                        <button class="btn sm" data-act="wa-remind" data-id="${e.saleId}" data-type="${e.cat === 'srv2' ? '2' : '1'}">WhatsApp</button>
                    </div>
                </div>
            `).join('') || '<div class="empty">No AC service milestones scheduled on this date</div>'}
        </div>`;
    } else {
        title = L(CD, { month: 'long', year: 'numeric' });
        const agEvs = filteredEvents.filter(e => e.date.startsWith(ms)).sort((p, q) => p.date > q.date ? 1 : -1);
        cnt = agEvs.length;
        const g = {};
        agEvs.forEach(e => (g[e.date] = g[e.date] || []).push(e));

        body = Object.keys(g).map(d => `
            <div class="ag">
                <div class="agd${d === t0 ? ' t' : ''}">
                    <b>${+d.slice(8)}</b>
                    <span>${L(d, { weekday: 'short', month: 'short' })}</span>
                </div>
                <div class="ag-items">
                    ${g[d].map(e => `
                        <div class="li" data-act="nav" data-p="sales/${e.saleId}" tabindex="0" style="cursor:pointer">
                            <div>
                                <b><span class="mu" style="font-weight:500">Customer: </span>${esc(e.custName)}</b>
                                <small style="display:block">${esc(e.title)}</small>
                                <small class="mu">${esc(e.type)}</small>
                            </div>
                            <div style="display:flex;align-items:center;gap:8px">
                                ${srvBadge(e.status, e.date)}
                                <button class="btn sm" data-act="wa-remind" data-id="${e.saleId}" data-type="${e.cat === 'srv2' ? '2' : '1'}">WhatsApp</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('') || '<div class="empty">No service milestones this month matching filter</div>';
    }

    const todayEvs = allEvents.filter(e => e.date === t0);

    return `<div class="pg cal">
    <div class="ph">
        <div>
            <h1>Service Calendar</h1>
            <p>1st and 2nd AC complimentary service milestones (upcoming, past, and present all). Third-party OEM technician tracking.</p>
        </div>
        <button class="btn pri" data-act="nav" data-p="sales/new">${ic('plus')} Record New Sale</button>
    </div>

    <div class="calbar">
        <div class="cal-t">
            <h2 class="cal-title">${title}</h2>
            <span class="mu">${cnt} service milestone${cnt === 1 ? '' : 's'}${CAL_FILTER !== 'all' ? ' (filtered)' : ''}</span>
        </div>
        <div class="cal-ctl">
            <div class="seg-b">
                <button type="button" data-act="cal" data-v="prev" aria-label="Previous">‹</button>
                <button type="button" data-act="cal" data-v="today">Today</button>
                <button type="button" data-act="cal" data-v="next" aria-label="Next">›</button>
            </div>
            <div class="tabs" role="tablist">
                ${['month', 'week', 'day', 'agenda'].map(v => `
                    <button role="tab" type="button" aria-selected="${CV === v}" class="${CV === v ? 'on' : ''}" data-act="cal" data-v="${v}">${v[0].toUpperCase() + v.slice(1)}</button>
                `).join('')}
            </div>
        </div>
    </div>

    <div class="bar" style="margin-top:-6px;margin-bottom:14px">
        <div class="chips">
            ${[
                ['all', 'All Milestones (' + monthEvs.length + ')'],
                ['srv1', '1st Service (3-5 Mo)'],
                ['srv2', '2nd Service (<11 Mo)'],
                ['install', 'Installations'],
                ['pending', 'Pending / Due'],
                ['completed', 'Completed']
            ].map(([k, label]) => `
                <button class="chip${CAL_FILTER === k ? ' on' : ''}" data-act="cal-filter" data-v="${k}">${label}</button>
            `).join('')}
        </div>
    </div>

    <div class="cw">
        <div class="panel">
            ${body}
            <div class="lg">
                <span><i style="background:var(--ok)"></i>Completed</span>
                <span><i style="background:var(--ac)"></i>Upcoming</span>
                <span><i style="background:var(--wa)"></i>Due Soon (&le;30d)</span>
                <span><i style="background:var(--er)"></i>Overdue</span>
            </div>
        </div>
        <div class="cside">
            <div class="panel pad">
                <h2>${title} Overview</h2>
                <div style="display:flex;flex-direction:column;gap:8px;margin-top:10px;font-size:13px">
                    <div style="display:flex;justify-content:space-between">
                        <span class="mu">Month Milestones</span>
                        <b>${monthEvs.length}</b>
                    </div>
                    <div style="display:flex;justify-content:space-between">
                        <span class="mu">1st Services (3-5 Mo)</span>
                        <b style="color:var(--wa)">${monthEvs.filter(e => e.cat === 'srv1').length}</b>
                    </div>
                    <div style="display:flex;justify-content:space-between">
                        <span class="mu">2nd Services (&lt;11 Mo)</span>
                        <b style="color:var(--ac)">${monthEvs.filter(e => e.cat === 'srv2').length}</b>
                    </div>
                    <div style="display:flex;justify-content:space-between">
                        <span class="mu">Pending Installations</span>
                        <b>${monthEvs.filter(e => e.cat === 'install' && e.status !== 'Completed').length}</b>
                    </div>
                    <div style="display:flex;justify-content:space-between">
                        <span class="mu">Completed</span>
                        <b style="color:var(--ok)">${monthEvs.filter(e => e.status === 'Completed').length}</b>
                    </div>
                </div>
            </div>

            <div class="panel">
                <div class="hd">
                    <h2>Today's Milestones</h2>
                    <span class="mu">${L(t0, { day: 'numeric', month: 'short' })}</span>
                </div>
                <div class="pad">
                    ${todayEvs.map(e => `
                        <div class="li" style="padding-left:0;cursor:pointer" data-act="nav" data-p="sales/${e.saleId}">
                            <div>
                                <b>${esc(e.custName)}</b>
                                <small style="display:block">${esc(e.type)}</small>
                                <small class="mu">${esc(e.brand)} ${esc(e.model)}</small>
                            </div>
                            ${srvBadge(e.status, e.date)}
                        </div>
                    `).join('') || '<span class="mu">No services scheduled today</span>'}
                </div>
            </div>

            <div class="panel pad">
                <h2>Third-Party Seller Note</h2>
                <p class="mu" style="font-size:12px;line-height:1.5">Mobile Point AC Care arranges technician visits directly through company brands (Daikin, LG, Voltas, Hitachi, etc.). Milestones alert customers to claim their complimentary service before warranty deadlines.</p>
            </div>
        </div>
    </div>
</div>`;
}

function notifs() {
    const list = [];
    S.sales.forEach(s => {
        const c = cust(s.cid);
        if (s.srv1Status !== 'Completed') {
            const diff1 = Math.round((new Date(s.srv1Date + 'T00:00:00Z') - new Date(D(0) + 'T00:00:00Z')) / 864e5);
            if (diff1 <= 30) {
                list.push({
                    id: 'N-S1-' + s.id,
                    cat: 'Services',
                    t: '1st AC Service Due for ' + c.name,
                    sub: s.brand + ' ' + s.model + ' (S/N: ' + s.sn + ') due ' + fd(s.srv1Date),
                    time: fd(s.srv1Date),
                    go: ['sales/' + s.id]
                });
            }
        }
        if (s.srv2Status !== 'Completed') {
            const diff2 = Math.round((new Date(s.srv2Date + 'T00:00:00Z') - new Date(D(0) + 'T00:00:00Z')) / 864e5);
            if (diff2 <= 30) {
                list.push({
                    id: 'N-S2-' + s.id,
                    cat: 'Services',
                    t: '2nd AC Service Due for ' + c.name,
                    sub: s.brand + ' ' + s.model + ' (S/N: ' + s.sn + ') due ' + fd(s.srv2Date),
                    time: fd(s.srv2Date),
                    go: ['sales/' + s.id]
                });
            }
        }
        if (!s.installDate || s.installDate >= D(0)) {
            list.push({
                id: 'N-INS-' + s.id,
                cat: 'Sales',
                t: 'Pending Installation for ' + c.name,
                sub: s.brand + ' ' + s.model + ' · Scheduled: ' + (s.installDate ? fd(s.installDate) : 'Pending'),
                time: fd(s.date),
                go: ['sales/' + s.id]
            });
        }
    });
    return list;
}

const nrd = () => (S.read = S.read || []);
const isRd = id => nrd().includes(id);

let NT = 'All';

function npPos() {
    const p = $('#np'), b = $('#bl');
    if (!p || !b) return;
    const r = b.getBoundingClientRect(), w = p.offsetWidth;
    p.style.top = (r.bottom + 6) + 'px';
    p.style.left = Math.max(8, Math.min(r.right - w, innerWidth - w - 8)) + 'px';
}

function npClose() {
    const p = $('#np');
    if (!p) return;
    p.classList.add('out');
    setTimeout(() => p.remove(), 140);
}

function npToggle() {
    const o = $('#np');
    if (o) {
        if (!o.classList.contains('out')) npClose();
        return;
    }
    const b = $('#bl');
    if (!b) return;
    const allN = notifs();
    const unreadCount = allN.filter(n => !isRd(n.id)).length;
    const p = document.createElement('div');
    p.id = 'np';
    p.className = 'np';
    p.setAttribute('role', 'dialog');
    p.setAttribute('aria-label', 'Notifications');
    p.innerHTML = `<div class="np-h">
        <b>Notifications</b>
        <div style="display:flex;gap:6px">
            <button class="btn sm" data-act="nall">Mark all read</button>
            <button class="ib" data-act="close-np" aria-label="Close">×</button>
        </div>
    </div>
    <div class="tabs" style="padding:6px 12px 0">
        ${['All', 'Services', 'Sales'].map(t => `<button type="button" class="${NT === t ? 'on' : ''}" data-act="ntab" data-v="${t}">${t}</button>`).join('')}
    </div>
    <div class="np-l">
        ${allN.filter(n => NT === 'All' || n.cat === NT).map(n => `
            <div class="li${isRd(n.id) ? '' : ' unread'}" data-act="nread" data-id="${n.id}" data-p="${n.go[0]}" style="cursor:pointer;padding:10px 14px">
                <div>
                    <b>${esc(n.t)}</b>
                    <small style="display:block;margin-top:2px">${esc(n.sub)}</small>
                </div>
                <small class="mu">${esc(n.time)}</small>
            </div>
        `).join('') || '<div class="empty">No notifications</div>'}
    </div>
    <div class="np-f">
        <button class="btn sm" data-act="nav" data-p="notifications">View full notifications page</button>
    </div>`;
    document.body.append(p);
    npPos();
}

const bellBdg = () => {
    const unread = notifs().filter(n => !isRd(n.id)).length;
    return unread > 0 ? `<i class="bdg">${unread > 9 ? '9+' : unread}</i>` : '';
};

function npRef() {
    const b = $('#bl');
    if (b) b.innerHTML = ic('bell') + bellBdg();
}

function notifPage() {
    const allN = notifs();
    return `<div class="pg">
    <div class="ph">
        <div>
            <h1>Notifications</h1>
            <p>Service milestones, upcoming free services, and pending installation alerts.</p>
        </div>
        <button class="btn" data-act="nall">Mark All as Read</button>
    </div>
    <div class="panel">
        <div class="tw">
            <table class="tbl">
                <thead>
                    <tr>
                        <th>Notification</th>
                        <th>Category</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th style="text-align:right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${allN.map(n => `
                        <tr class="${isRd(n.id) ? '' : 'unread'}">
                            <td data-label="Notification">
                                <b>${esc(n.t)}</b>
                                <small class="mu" style="display:block">${esc(n.sub)}</small>
                            </td>
                            <td data-label="Category"><span class="tag-pill">${esc(n.cat)}</span></td>
                            <td data-label="Due Date">${esc(n.time)}</td>
                            <td data-label="Status" data-status="1">${isRd(n.id) ? '<span class="mu">Read</span>' : '<span class="b ok">New</span>'}</td>
                            <td data-label="Action" style="text-align:right">
                                <button class="btn sm" data-act="nav" data-p="${n.go[0]}">Open Sale</button>
                            </td>
                        </tr>
                    `).join('') || '<tr><td colspan="5" class="empty">All clear, no notifications.</td></tr>'}
                </tbody>
            </table>
        </div>
    </div>
</div>`;
}

function feed() {
    return S.feed || [];
}

const adHTML = () => `
<div class="ad-h">
    <b>Recent Activity</b>
    <button class="ib" data-act="adx" aria-label="Close activity" title="Close">×</button>
</div>
<div class="ad-l">
    ${feed().map(f => `
        <div class="li" style="cursor:pointer;padding:10px 14px" data-act="nav" data-p="${f.p || 'sales'}">
            <div>
                <b>${esc(f.t)}</b>
                <small class="mu" style="display:block">${esc(f.time)}</small>
            </div>
            <span class="tag-pill">${esc(f.k || 'system')}</span>
        </div>
    `).join('') || '<div class="empty">No recent activity</div>'}
</div>
<div class="np-f">
    <button class="btn sm" data-act="nav" data-p="activity">Open full activity page</button>
</div>`;

function adClose() {
    const a = $('#ad');
    if (a) {
        a.classList.remove('open');
        const b = $('#adb');
        b && b.classList.remove('open');
    }
}

function adToggle() {
    let a = $('#ad');
    if (!a) {
        a = document.createElement('aside');
        a.id = 'ad';
        a.className = 'ad';
        a.setAttribute('aria-label', 'Activity');
        const b = document.createElement('div');
        b.id = 'adb';
        b.className = 'adb';
        b.dataset.act = 'adx';
        document.body.append(b, a);
    }
    if (a.classList.contains('open')) {
        adClose();
        return;
    }
    const n = $('#np');
    if (n) n.remove();
    a.innerHTML = adHTML();
    void a.offsetWidth;
    a.classList.add('open');
    const b = $('#adb');
    if (b) b.classList.add('open');
}

function actPage() {
    return `<div class="pg">
    <div class="ph">
        <div>
            <h1>Activity</h1>
            <p>Chronological feed of recorded AC sales, customer additions, and WhatsApp automations.</p>
        </div>
    </div>
    <div class="panel">
        ${feed().map(f => `
            <div class="li" style="padding:14px 18px;cursor:pointer" data-act="nav" data-p="${f.p || 'sales'}">
                <div>
                    <b>${esc(f.t)}</b>
                    <small class="mu" style="display:block;margin-top:2px">${esc(f.time)}</small>
                </div>
                <span class="tag-pill">${esc(f.k || 'system')}</span>
            </div>
        `).join('') || '<div class="empty">No activity records yet</div>'}
    </div>
</div>`;
}

const PAL = ['#0284c7', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#64748b', '#f97316'];
const rcol = i => PAL[i % PAL.length];

const cmpN = v => {
    const a = Math.abs(v);
    const f = (x, s) => +x.toFixed(1) + s;
    return a >= 1e7 ? f(v / 1e7, 'Cr') : a >= 1e5 ? f(v / 1e5, 'L') : a >= 1e3 ? f(v / 1e3, 'k') : String(+v.toFixed(1));
};

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

function reports() {
    const t = D(0);
    let sales = S.sales;
    if (REP_RANGE === '7d') sales = sales.filter(s => s.date >= cdd(t, -7));
    else if (REP_RANGE === '30d') sales = sales.filter(s => s.date >= cdd(t, -30));
    else if (REP_RANGE === 'tm') sales = sales.filter(s => s.date.startsWith(t.slice(0, 7)));
    else if (REP_RANGE === 'ty') sales = sales.filter(s => s.date.startsWith(t.slice(0, 4)));

    const totalSold = sales.length;
    const srv1Done = sales.filter(s => s.srv1Status === 'Completed').length;
    const srv1Due = sales.filter(s => s.srv1Status !== 'Completed').length;
    const srv2Done = sales.filter(s => s.srv2Status === 'Completed').length;
    const srv2Due = sales.filter(s => s.srv2Status !== 'Completed').length;
    const totalSrvDone = srv1Done + srv2Done;
    const totalSrvScheduled = sales.length * 2;
    const complianceRate = totalSrvScheduled > 0 ? Math.round((totalSrvDone / totalSrvScheduled) * 100) : 100;

    const brandCounts = {};
    sales.forEach(s => {
        brandCounts[s.brand] = (brandCounts[s.brand] || 0) + 1;
    });

    const donutItems = Object.entries(brandCounts).map(([brand, count], idx) => ({
        l: brand,
        v: count,
        c: rcol(idx)
    })).sort((a, b) => b.v - a.v);

    const monthBuckets = {};
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        const ym = d.toISOString().slice(0, 7);
        const label = d.toLocaleDateString('en-IN', { month: 'short' });
        last6Months.push({ ym, label });
        monthBuckets[ym] = 0;
    }
    sales.forEach(s => {
        const ym = (s.date || '').slice(0, 7);
        if (monthBuckets[ym] !== undefined) monthBuckets[ym]++;
    });

    const trendItems = last6Months.map(m => ({
        l: m.label,
        fl: m.ym,
        v: monthBuckets[m.ym] || 0,
        t: m.label + ' Sales'
    }));

    const localityMap = {};
    sales.forEach(s => {
        const loc = s.custLocality || 'Other Locality';
        if (!localityMap[loc]) localityMap[loc] = { units: 0, customers: new Set() };
        localityMap[loc].units++;
        localityMap[loc].customers.add(s.cid);
    });

    const localityList = Object.entries(localityMap).map(([loc, data]) => ({
        loc,
        units: data.units,
        customers: data.customers.size
    })).sort((a, b) => b.units - a.units);

    return `<div class="pg">
    <div class="ph">
        <div>
            <h1>Detailed Reports &amp; Analytics</h1>
            <p>Sales volume trends, brand distribution, locality breakdown, and 1st &amp; 2nd service milestones.</p>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn" data-act="export">${ic('file')} Export All Data (JSON)</button>
        </div>
    </div>

    <div class="bar">
        <div class="chips">
            ${[
                ['all', 'All Time'],
                ['ty', 'This Year'],
                ['tm', 'This Month'],
                ['30d', 'Last 30 Days'],
                ['7d', 'Last 7 Days']
            ].map(([k, label]) => `
                <button class="chip${REP_RANGE === k ? ' on' : ''}" data-act="rep-range" data-v="${k}">${label}</button>
            `).join('')}
        </div>
    </div>

    <div class="kp k4" style="margin-bottom:20px">
        <div class="k"><span>ACs Sold in Period</span><b>${totalSold}</b><small>Recorded units</small></div>
        <div class="k"><span>Active Customers</span><b>${S.customers.length}</b><small>Verified registry</small></div>
        <div class="k"><span>Complimentary Services Done</span><b style="color:var(--ok)">${totalSrvDone}</b><small>${srv1Done} 1st + ${srv2Done} 2nd</small></div>
        <div class="k"><span>Service Compliance</span><b style="color:var(--ac)">${complianceRate}%</b><small>${totalSrvDone} of ${totalSrvScheduled} visits</small></div>
    </div>

    <div class="dgr">
        <div class="panel">
            <div class="hd">
                <h2>Monthly AC Sales Trend</h2>
                <span class="mu">${totalSold} total units</span>
            </div>
            ${dchart(trendItems, { fmt: n => n + ' units', ax: v => String(v) })}
        </div>

        <div class="panel">
            <div class="hd">
                <h2>Brand Market Share</h2>
                <span class="mu">${donutItems.length} brands</span>
            </div>
            ${donut(donutItems, n => n + ' units', 'Total ACs')}
        </div>
    </div>

    <div class="cw2" style="margin-bottom:20px">
        <div class="panel pad">
            <h2>Complimentary Service Milestones Status</h2>
            <p class="mu" style="margin-bottom:14px">2 free services per unit (1st after 3-5 months, 2nd before 11 months).</p>

            <div style="margin-bottom:16px">
                <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                    <b>1st Free Service (3-5 Months)</b>
                    <span>${srv1Done} Done · ${srv1Due} Due / Pending</span>
                </div>
                <div style="height:10px;border-radius:5px;background:var(--bd);overflow:hidden">
                    <div style="width:${totalSold > 0 ? Math.round(srv1Done / totalSold * 100) : 0}%;height:100%;background:var(--ok)"></div>
                </div>
                <small class="mu" style="display:block;margin-top:4px">${totalSold > 0 ? Math.round(srv1Done / totalSold * 100) : 0}% compliance</small>
            </div>

            <div>
                <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                    <b>2nd Free Service (Before 11 Months)</b>
                    <span>${srv2Done} Done · ${srv2Due} Due / Pending</span>
                </div>
                <div style="height:10px;border-radius:5px;background:var(--bd);overflow:hidden">
                    <div style="width:${totalSold > 0 ? Math.round(srv2Done / totalSold * 100) : 0}%;height:100%;background:var(--ok)"></div>
                </div>
                <small class="mu" style="display:block;margin-top:4px">${totalSold > 0 ? Math.round(srv2Done / totalSold * 100) : 0}% compliance</small>
            </div>
        </div>

        <div class="panel pad">
            <h2>Locality &amp; Neighborhood Distribution</h2>
            <p class="mu" style="margin-bottom:12px">Installations by locality in Vadodara area.</p>
            <div style="display:flex;flex-direction:column;gap:10px">
                ${localityList.map(item => {
                    const pct = totalSold > 0 ? Math.round(item.units / totalSold * 100) : 0;
                    return `<div>
                        <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                            <b>${esc(item.loc)}</b>
                            <span>${item.units} unit${item.units === 1 ? '' : 's'} (${item.customers} cust)</span>
                        </div>
                        <div style="height:6px;border-radius:3px;background:var(--bd);overflow:hidden">
                            <div style="width:${pct}%;height:100%;background:var(--ac)"></div>
                        </div>
                    </div>`;
                }).join('') || '<div class="empty">No locality records</div>'}
            </div>
        </div>
    </div>

    <div class="panel">
        <div class="hd">
            <h2>Detailed Sales &amp; Service Audit Log</h2>
            <span class="mu">${sales.length} sales records · Swipe horizontally on mobile</span>
        </div>
        <div class="tw">
            <table class="tbl rt" style="min-width:760px">
                <thead>
                    <tr>
                        <th>Sale ID</th>
                        <th>Customer</th>
                        <th>Locality</th>
                        <th>AC Unit</th>
                        <th>Serial Number</th>
                        <th>Purchase Date</th>
                        <th>Installation</th>
                        <th>1st Service</th>
                        <th>2nd Service</th>
                    </tr>
                </thead>
                <tbody>
                    ${sales.map(s => `
                        <tr style="cursor:pointer" data-act="nav" data-p="sales/${s.id}">
                            <td data-label="Sale ID"><b>${esc(s.id)}</b></td>
                            <td data-label="Customer"><b>${esc(s.custName)}</b><small class="mu" style="display:block">${esc(s.custPhone)}</small></td>
                            <td data-label="Locality">${esc(s.custLocality || '—')}</td>
                            <td data-label="AC Unit">${esc(s.brand)} ${esc(s.model)}</td>
                            <td data-label="Serial Number"><span class="tag-pill">${esc(s.sn)}</span></td>
                            <td data-label="Purchase Date">${fd(s.date)}</td>
                            <td data-label="Installation">${s.installDate ? fd(s.installDate) : '<span class="b wa">Pending</span>'}</td>
                            <td data-label="1st Service"><div>${fd(s.srv1Date)}</div>${srvBadge(s.srv1Status, s.srv1Date)}</td>
                            <td data-label="2nd Service"><div>${fd(s.srv2Date)}</div>${srvBadge(s.srv2Status, s.srv2Date)}</td>
                        </tr>
                    `).join('') || '<tr><td colspan="9" class="empty">No sales records in selected date range</td></tr>'}
                </tbody>
            </table>
        </div>
    </div>
</div>`;
}

function settings() {
    return `<div class="pg">
    <div class="ph">
        <div>
            <h1>Settings</h1>
            <p>Third-Party AC Seller details, branch stores, and WhatsApp automation lead times.</p>
        </div>
    </div>

    <form id="settings-form" novalidate onsubmit="return false">
        <div class="fgrid">
            <div class="panel pad">
                <h2>Store Profile</h2>
                <div class="fg">
                    <label>Store Name *
                        <input name="store" value="${esc(S.set.store)}" required>
                    </label>
                    <label>Branch Locations (comma separated)
                        <input name="branches" value="${esc(S.set.branches || '')}">
                    </label>
                    <label>Store Complete Address
                        <textarea name="addr" rows="2">${esc(S.set.addr)}</textarea>
                    </label>
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
                        <label>Phone / Helpline
                            <input name="phone" value="${esc(S.set.phone)}">
                        </label>
                        <label>Email
                            <input name="email" value="${esc(S.set.email)}">
                        </label>
                    </div>
                    <label>GSTIN
                        <input name="gstin" value="${esc(S.set.gstin)}">
                    </label>
                </div>
            </div>

            <div class="panel pad">
                <h2>Service Reminder Defaults</h2>
                <div class="fg">
                    <label>1st Service Target (Days post-purchase)
                        <input name="srv1Days" type="number" value="${S.set.srv1Days || 120}">
                    </label>
                    <label>2nd Service Target (Days post-purchase)
                        <input name="srv2Days" type="number" value="${S.set.srv2Days || 330}">
                    </label>
                    <label>Reminder Lead Time (Days before due date)
                        <input name="leadDays" type="number" value="${S.set.leadDays || 14}">
                    </label>
                </div>
            </div>
        </div>

        <div class="sticky" style="margin-top:20px">
            <button type="button" class="btn pri" data-act="settings-save">Save Settings</button>
        </div>
    </form>
</div>`;
}

function userPermissionsPage(id) {
    const u = S.users.find(x => x.id === id);
    if (!u) return nf('users', 'User');
    const p = u.permissions || {};

    return `<div class="pg">
    <nav class="bc mu">
        <button class="lnk" data-act="nav" data-p="users">User Permissions</button> / ${esc(u.name)}
    </nav>
    <div class="ph">
        <div>
            <h1>${esc(u.name)}</h1>
            <p>${esc(u.email)} · Role: ${esc(u.preset || 'custom')} · System Access</p>
        </div>
    </div>

    <form id="user-perm-form" novalidate onsubmit="return false">
        <input type="hidden" name="user_id" value="${esc(u.id)}">
        <div class="panel pad" style="margin-bottom:20px">
            <h2>Quick Preset Assignment</h2>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
                ${Object.entries(PRESETS).map(([k, def]) => `
                    <button type="button" class="btn sm" data-act="apply-preset" data-preset="${k}">${esc(def.label)}</button>
                `).join('')}
            </div>
        </div>

        <div class="panel">
            <div class="tw">
                <table class="tbl rt">
                    <thead>
                        <tr>
                            <th>Module</th>
                            <th>Enabled</th>
                            <th>View</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${MODULE_DEFS.map(m => {
                            const mp = p[m.id] || { enabled: false, view: false, edit: false, delete: false };
                            return `<tr>
                                <td>
                                    <b>${esc(m.title)}</b>
                                    <small class="mu" style="display:block">${esc(m.desc)}</small>
                                </td>
                                <td><input type="checkbox" name="mod_${m.id}_enabled" ${mp.enabled ? 'checked' : ''}></td>
                                <td><input type="checkbox" name="mod_${m.id}_view" ${mp.view ? 'checked' : ''}></td>
                                <td>${m.hasEdit ? `<input type="checkbox" name="mod_${m.id}_edit" ${mp.edit ? 'checked' : ''}>` : '—'}</td>
                                <td>${m.hasDelete ? `<input type="checkbox" name="mod_${m.id}_delete" ${mp.delete ? 'checked' : ''}>` : '—'}</td>
                            </tr>`;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>

        <div class="sticky" style="margin-top:20px">
            <button type="button" class="btn" data-act="nav" data-p="users">Back</button>
            <button type="button" class="btn pri" data-act="user-perm-save">Save Permissions</button>
        </div>
    </form>
</div>`;
}

function newM() {
    modal(`<h1>+ New Action</h1>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:16px 0">
        <button class="btn" style="padding:14px;justify-content:center" data-act="nav-close" data-p="sales/new">${ic('cart')} Record AC Sale</button>
        <button class="btn" style="padding:14px;justify-content:center" data-act="nav-close" data-p="customers/new">${ic('users')} Add Customer</button>
        <button class="btn" style="padding:14px;justify-content:center" data-act="nav-close" data-p="products/new">${ic('wind')} Add AC Model</button>
        <button class="btn" style="padding:14px;justify-content:center" data-act="nav-close" data-p="calendar">${ic('cal')} Service Calendar</button>
    </div>
    <div class="acts">
        <button class="btn" data-act="close">Close</button>
    </div>`);
}

function nf(back, type) {
    return `<div class="pg">
        <nav class="bc mu"><button class="lnk" data-act="nav" data-p="${back}">${back}</button> / Not found</nav>
        <div class="ph"><div><h1>${type || 'Page'} not found</h1><p>The requested record does not exist or was deleted.</p></div></div>
        <div class="panel pad"><button class="btn pri" data-act="nav" data-p="${back}">Back to ${back}</button></div>
    </div>`;
}


function listPage(k) {
    const def = P[k];
    if (!def) return nf('overview', 'Page');
    let rows = def.rows();

    if (V.f && V.f !== 'All' && def.chip) {
        rows = rows.filter(r => def.chip(r, V.f));
    }
    if (V.q.trim()) {
        const q = V.q.toLowerCase().trim();
        rows = rows.filter(r => JSON.stringify(r).toLowerCase().includes(q));
    }

    const total = rows.length;
    const pageRows = rows.slice(V.p * 25, (V.p + 1) * 25);

    return `<div class="pg">
    <div class="ph">
        <div>
            <h1>${esc(def.t)}</h1>
            <p>${esc(def.s)}</p>
        </div>
        ${def.add ? `<button class="btn pri" data-act="${def.add[1]}">${ic('plus')}${esc(def.add[0])}</button>` : ''}
    </div>

    <div class="bar">
        <div class="sb">${ic('search')}<input id="lq" placeholder="Search ${esc(def.t).toLowerCase()}..." value="${esc(V.q)}" aria-label="Search"></div>
        ${def.chips ? `<div class="chips">
            ${def.chips.map(c => `<button class="chip${V.f === c ? ' on' : ''}" data-act="chip" data-v="${c}">${c}</button>`).join('')}
        </div>` : ''}
    </div>

    <div class="panel">
        <div class="tw">
            <table class="tbl">
                <thead>
                    <tr>
                        ${def.cols.map(c => `<th>${c[0]}</th>`).join('')}
                    </tr>
                </thead>
                <tbody id="tb">
                    ${pageRows.map(r => `
                        <tr style="cursor:pointer" data-act="open-row" data-k="${k}" data-id="${r.id}">
                            ${def.cols.map(c => `<td data-label="${esc(c[0])}"${['Status', 'Permissions', 'Available Stock'].includes(c[0]) ? ' data-status="1"' : ''}>${c[1](r)}</td>`).join('')}
                        </tr>
                    `).join('') || `<tr><td colspan="${def.cols.length}" class="empty">No records found matching filter</td></tr>`}
                </tbody>
            </table>
        </div>
    </div>
</div>`;
}


function renderWABubble(tpl, customVars, inPhone) {
    if (!customVars) customVars = {};
    const store = S.set.store || 'Mobile Point AC Care';
    const phone = S.set.phone || '+91 98250 00000';
    const addr = S.set.addr || 'Shop 12-14, Alkapuri Arcade, Vadodara';
    const cName = customVars.customer_name || 'Amit Sharma';
    const brand = customVars.brand || 'Daikin';
    const model = customVars.model || 'FTKF35TV16U';
    const sn = customVars.serial_number || 'DK-71001-B';
    const pDate = customVars.purchase_date || fd(D(-90));
    const iDate = customVars.install_date || fd(D(-88));
    const s1Date = customVars.srv1_date || fd(D(30));
    const s2Date = customVars.srv2_date || fd(D(240));
    const dDate = customVars.due_date || fd(D(14));

    let body = (tpl.body || '')
        .replace(/\{\{customer_name\}\}/g, cName)
        .replace(/\{\{name\}\}/g, cName)
        .replace(/\{\{store_name\}\}/g, store)
        .replace(/\{\{store\}\}/g, store)
        .replace(/\{\{shop_phone\}\}/g, phone)
        .replace(/\{\{phone\}\}/g, phone)
        .replace(/\{\{store_address\}\}/g, addr)
        .replace(/\{\{brand\}\}/g, brand)
        .replace(/\{\{model\}\}/g, model)
        .replace(/\{\{serial_number\}\}/g, sn)
        .replace(/\{\{sn\}\}/g, sn)
        .replace(/\{\{purchase_date\}\}/g, pDate)
        .replace(/\{\{install_date\}\}/g, iDate)
        .replace(/\{\{installDate\}\}/g, iDate)
        .replace(/\{\{srv1_date\}\}/g, s1Date)
        .replace(/\{\{srv2_date\}\}/g, s2Date)
        .replace(/\{\{due_date\}\}/g, dDate)
        .replace(/\{\{date\}\}/g, dDate);

    let htmlBody = esc(body)
        .replace(/\*(.*?)\*/g, '<b>$1</b>')
        .replace(/\n/g, '<br>');

    const btns = (tpl.buttons || []).map(b => {
        const iconSvg = b.type === 'PHONE_NUMBER'
            ? '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'
            : b.type === 'URL'
            ? '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>'
            : '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 10h10a5 5 0 0 1 5 5v2M3 10l6-6M3 10l6 6"/></svg>';
        return `<div class="wa-btn-pill">${iconSvg}<span>${esc(b.text)}</span></div>`;
    }).join('');

    const bubbleInner = `<div class="wa-bubble">
        ${tpl.header ? `<div class="wa-bubble-h">${esc(tpl.header)}</div>` : ''}
        <div>${htmlBody}</div>
        ${tpl.footer ? `<div style="font-size:11px;color:rgba(0,0,0,.5);margin-top:6px">${esc(tpl.footer)}</div>` : ''}
        <div class="wa-bubble-meta">
            <span>10:42 AM</span>
            <svg width="15" height="10" viewBox="0 0 16 11" fill="none"><path d="M11.05 1L5.5 6.55L4.45 5.5" stroke="#53bdeb" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 1L9.45 6.55L8.4 5.5" stroke="#53bdeb" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 5.5L4.45 9L9.5 3.95" stroke="#53bdeb" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
    </div>
    ${btns}`;

    if (inPhone) {
        return `<div class="wa-phone-mockup">
            <div class="wa-phone-h">
                <div style="display:flex;align-items:center;gap:10px">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                    <div style="width:34px;height:34px;border-radius:50%;background:#25d366;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px">MP</div>
                    <div>
                        <div style="font-weight:700;font-size:13.5px;display:flex;align-items:center;gap:4px">
                            ${esc(store)}
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#10b981"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                        </div>
                        <div style="font-size:11px;opacity:.85">Official Business Account · Online</div>
                    </div>
                </div>
                <div style="display:flex;gap:12px;opacity:.9">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                </div>
            </div>
            <div class="wa-chat-wrap" style="border-radius:0;border:none;max-width:100%;min-height:360px">
                <div style="text-align:center;margin-bottom:8px">
                    <span style="background:rgba(0,0,0,.08);padding:3px 10px;border-radius:6px;font-size:10.5px;font-weight:600;color:var(--mu)">TODAY</span>
                </div>
                ${bubbleInner}
            </div>
        </div>`;
    }

    return `<div class="wa-chat-wrap">${bubbleInner}</div>`;
}

function newTemplatePage() {
    const dummy = {
        header: 'Special AC Care Alert ❄️',
        body: 'Hello {{customer_name}}, gentle reminder from {{store_name}}: Ensure your {{brand}} AC (S/N: {{serial_number}}) is ready for optimal cooling. Call {{shop_phone}} to book your OEM technician visit!',
        footer: 'Mobile Point AC Care • Authorized Sales & Support',
        buttons: [
            { type: 'QUICK_REPLY', text: 'Confirm Service' },
            { type: 'PHONE_NUMBER', text: 'Call Support' }
        ]
    };

    return `<div class="pg">
        <div class="ph">
            <div>
                <button class="btn sm" data-act="nav" data-p="automations" style="margin-bottom:8px">${ic('home')} Back to Automations</button>
                <h1>Create Message Template</h1>
                <p class="mu">Design an official WhatsApp Business template for automated service alerts, purchase greetings, or customer care.</p>
            </div>
        </div>
        <div class="wa-creator-grid">
            <div class="panel pad">
                <div class="fg">
                    <label>Template Identifier (Unique name in lowercase and underscores)
                        <input id="tpl-name" placeholder="e.g. ac_service_reminder_drive" value="ac_service_special_offer">
                    </label>
                    <div class="g g2">
                        <label>Category
                            <select id="tpl-cat" class="shadcn-select">
                                <option value="UTILITY" selected>Service Reminders &amp; Care (UTILITY)</option>
                                <option value="MARKETING">Promotions &amp; Offers (MARKETING)</option>
                                <option value="AUTHENTICATION">Security &amp; OTP (AUTHENTICATION)</option>
                            </select>
                        </label>
                        <label>Language
                            <select id="tpl-lang" class="shadcn-select">
                                <option value="en_US" selected>English (en_US)</option>
                                <option value="hi_IN">Hindi (hi_IN)</option>
                                <option value="gu_IN">Gujarati (gu_IN)</option>
                            </select>
                        </label>
                    </div>
                    <label>Header Text (Optional)
                        <input id="tpl-hdr" placeholder="e.g. AC Maintenance Alert ❄️" value="Special AC Care Alert ❄️">
                    </label>
                    <label>Message Body Text
                        <textarea id="tpl-body" rows="6">Hello {{customer_name}}, gentle reminder from {{store_name}}: Ensure your {{brand}} AC (S/N: {{serial_number}}) is ready for optimal cooling. Call {{shop_phone}} to book your OEM technician visit!</textarea>
                    </label>
                    <div>
                        <span class="mu" style="font-size:12px;display:block;margin-bottom:6px;font-weight:600">Quick-Insert Variable Placeholders:</span>
                        <div style="display:flex;flex-wrap:wrap;gap:6px">
                            <button type="button" class="wa-var-pill" data-act="wa-var-pill" data-tag="{{customer_name}}">+ Customer Name</button>
                            <button type="button" class="wa-var-pill" data-act="wa-var-pill" data-tag="{{brand}}">+ AC Brand</button>
                            <button type="button" class="wa-var-pill" data-act="wa-var-pill" data-tag="{{model}}">+ Model</button>
                            <button type="button" class="wa-var-pill" data-act="wa-var-pill" data-tag="{{serial_number}}">+ Serial Number</button>
                            <button type="button" class="wa-var-pill" data-act="wa-var-pill" data-tag="{{due_date}}">+ Due Date</button>
                            <button type="button" class="wa-var-pill" data-act="wa-var-pill" data-tag="{{store_name}}">+ Store Name</button>
                            <button type="button" class="wa-var-pill" data-act="wa-var-pill" data-tag="{{shop_phone}}">+ Store Phone</button>
                        </div>
                    </div>
                    <label>Footer Note (Optional)
                        <input id="tpl-ftr" placeholder="e.g. Mobile Point AC Care • Authorized Partner" value="Mobile Point AC Care • Authorized Sales &amp; Support">
                    </label>
                    <div class="g g2">
                        <label>Action Button 1 (Text)
                            <input id="tpl-btn1" placeholder="e.g. Confirm Service" value="Confirm Service">
                        </label>
                        <label>Action Button 2 (Text)
                            <input id="tpl-btn2" placeholder="e.g. Call Support" value="Call Support">
                        </label>
                    </div>
                </div>
                <div class="sticky-form-acts">
                    <button class="btn" data-act="nav" data-p="automations">Cancel</button>
                    <button class="btn pri" data-act="wa-submit-tpl">${ic('check')} Save &amp; Submit Template</button>
                </div>
            </div>
            <div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                    <span class="mu" style="font-size:12px;font-weight:600">Live Phone Simulation</span>
                    <span class="tag-pill" style="color:#10b981;font-weight:600">Real-time Reactive Preview</span>
                </div>
                <div id="tpl-live-phone-preview">${renderWABubble(dummy, {}, true)}</div>
            </div>
        </div>
    </div>`;
}

function newBroadcastPage(preselectedTplId) {
    const tpls = (S.templates || []).filter(t => t.status === 'APPROVED');
    const selectedTplId = preselectedTplId || (tpls[0] ? tpls[0].id : '');
    const currentTpl = tpls.find(t => t.id === selectedTplId) || tpls[0] || { header: 'AC Service Alert', body: 'Service reminder' };

    return `<div class="pg">
        <div class="ph">
            <div>
                <button class="btn sm" data-act="nav" data-p="automations" style="margin-bottom:8px">${ic('home')} Back to Automations</button>
                <h1>Launch Broadcast Campaign</h1>
                <p class="mu">Dispatch approved WhatsApp templates to targeted AC customer segments.</p>
            </div>
        </div>
        <div class="wa-creator-grid">
            <div class="panel pad">
                <div class="fg">
                    <label>Campaign Name
                        <input id="camp-name" placeholder="e.g. Summer Free Service Drive 2026" value="AC Service Drive ${fd(D(0))}">
                    </label>
                    <label>Select Approved Template
                        <select id="camp-tpl" class="shadcn-select">
                            ${tpls.map(t => `<option value="${t.id}" ${t.id === selectedTplId ? 'selected' : ''}>${esc(t.name)} (${esc(t.cat)})</option>`).join('')}
                        </select>
                    </label>
                    <label>Target Audience Segment
                        <select id="camp-aud" class="shadcn-select">
                            <option value="all">All Registered Customers (${S.customers.length} total)</option>
                            <option value="srv1_due">1st AC Service Due in Next 30 Days</option>
                            <option value="srv2_due">2nd AC Service Due in Next 30 Days</option>
                            <option value="brand_daikin">Daikin AC Owners Only</option>
                            <option value="brand_voltas">Voltas AC Owners Only</option>
                            <option value="brand_hitachi">Hitachi AC Owners Only</option>
                            <option value="alkapuri">Alkapuri Locality Customers</option>
                        </select>
                    </label>
                    <div id="camp-matched-info" class="panel pad" style="background:var(--bg)">
                        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
                            <b>Matched Recipients: ${S.customers.length} Customers</b>
                            <span class="tag-pill" style="color:#10b981;font-weight:600">✓ Official WhatsApp API Compliant</span>
                        </div>
                        <div style="display:flex;flex-wrap:wrap;gap:4px">
                            ${S.customers.map(c => `<span class="tag-pill" style="font-size:11px">${esc(c.name)}</span>`).join('')}
                        </div>
                    </div>
                    <div class="g g2">
                        <label>Dispatch Timing
                            <select id="camp-sched" class="shadcn-select">
                                <option value="now" selected>Send Immediately</option>
                                <option value="sched">Schedule for Tomorrow 10:00 AM</option>
                            </select>
                        </label>
                        <label>Throttle Rate
                            <select id="camp-throttle" class="shadcn-select">
                                <option value="fast">Maximum Speed (100 msgs / min)</option>
                                <option value="safe" selected>Safe Standard (30 msgs / min)</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div class="sticky-form-acts">
                    <button class="btn" data-act="nav" data-p="automations">Cancel</button>
                    <button class="btn pri" data-act="wa-launch-camp-page">${ic('send')} Launch Broadcast Campaign</button>
                </div>
            </div>
            <div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                    <span class="mu" style="font-size:12px;font-weight:600">Message Broadcast Preview</span>
                    <span class="tag-pill" style="color:#0284c7;font-weight:600">Recipient Phone View</span>
                </div>
                <div id="camp-live-phone-preview">${renderWABubble(currentTpl, {}, true)}</div>
            </div>
        </div>
    </div>`;
}

function waAccountPage() {
    const wa = S.whatsapp || { connected: true, phone: '+91 98250 12345', displayName: S.set.store, qualityRating: 'HIGH', dailyLimit: '10,000 / day (Tier 2)', lastSync: 'Just now' };

    return `<div class="pg">
        <div class="ph">
            <div>
                <button class="btn sm" data-act="nav" data-p="automations" style="margin-bottom:8px">${ic('home')} Back to Automations</button>
                <h1>WhatsApp Business Connection</h1>
                <p class="mu">Simple and direct connection for your shop's official WhatsApp Business number.</p>
            </div>
        </div>
        <div class="g g2" style="max-width:960px">
            <div class="panel pad">
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
                    <div style="width:44px;height:44px;border-radius:12px;background:#25d366;color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(37,211,102,.25);flex:none">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <div>
                        <b>Connect Your WhatsApp Business Number</b>
                        <div class="mu" style="font-size:12px">Enter your shop's WhatsApp number to send automatic service alerts &amp; greetings</div>
                    </div>
                </div>
                <div class="fg">
                    <label>Business Display Name
                        <input id="wa-acc-name" value="${esc(wa.displayName || S.set.store)}" placeholder="Mobile Point AC Care">
                    </label>
                    <label>WhatsApp Business Mobile Number
                        <input id="wa-acc-phone" value="${esc(wa.phone)}" placeholder="+91 98250 12345">
                    </label>
                    <label>Shop Location / Locality
                        <input id="wa-acc-loc" value="Alkapuri Arcade, Vadodara" placeholder="Locality, City">
                    </label>
                </div>
                <div class="acts" style="margin-top:20px">
                    <button class="btn" data-act="wa-acc-ping">${ic('refresh')} Ping Test</button>
                    <button class="btn pri" data-act="wa-acc-save">${ic('check')} Save &amp; Connect Number</button>
                </div>
            </div>

            <div class="panel pad">
                <b>Connection Status &amp; Limits</b>
                <div class="mu" style="font-size:12px;margin-bottom:14px">Official WhatsApp Business Account Health</div>
                <div class="panel pad" style="background:var(--bg);margin-bottom:16px">
                    <div style="display:flex;justify-content:space-between;margin-bottom:10px">
                        <span class="mu" style="font-size:12px">Connection Status:</span>
                        <span style="color:#10b981;font-weight:600;display:inline-flex;align-items:center;gap:6px">
                            <span class="wa-pulse"></span> Active &amp; Verified
                        </span>
                    </div>
                    <div style="display:flex;justify-content:space-between;margin-bottom:10px">
                        <span class="mu" style="font-size:12px">Meta Quality Rating:</span>
                        <b style="color:#10b981">${esc(wa.qualityRating)} (GREEN)</b>
                    </div>
                    <div style="display:flex;justify-content:space-between;margin-bottom:10px">
                        <span class="mu" style="font-size:12px">Daily Sending Limit:</span>
                        <b>${esc(wa.dailyLimit)}</b>
                    </div>
                    <div style="display:flex;justify-content:space-between">
                        <span class="mu" style="font-size:12px">Last Verified Sync:</span>
                        <b>${esc(wa.lastSync)}</b>
                    </div>
                </div>
                <div style="margin-top:14px">
                    <button class="btn sm" data-act="wa-acc-disc" style="color:#ef4444">${ic('logout')} Disconnect WhatsApp Number</button>
                </div>
            </div>
        </div>
    </div>`;
}

function updateTplPageLivePreview() {
    const prevWrap = $('#tpl-live-phone-preview');
    if (!prevWrap) return;
    const hdr = ($('#tpl-hdr') ? $('#tpl-hdr').value : '').trim();
    const body = ($('#tpl-body') ? $('#tpl-body').value : '').trim();
    const ftr = ($('#tpl-ftr') ? $('#tpl-ftr').value : '').trim();
    const btn1 = ($('#tpl-btn1') ? $('#tpl-btn1').value : '').trim();
    const btn2 = ($('#tpl-btn2') ? $('#tpl-btn2').value : '').trim();

    const btns = [];
    if (btn1) btns.push({ type: 'QUICK_REPLY', text: btn1 });
    if (btn2) btns.push({ type: 'PHONE_NUMBER', text: btn2 });

    const dummy = {
        header: hdr,
        body: body || 'Hello {{customer_name}}, this is a preview template.',
        footer: ftr,
        buttons: btns
    };
    prevWrap.innerHTML = renderWABubble(dummy, {}, true);
}

function updateCampPageAudience() {
    const sel = $('#camp-aud');
    const info = $('#camp-matched-info');
    if (!sel || !info) return;
    const v = sel.value;

    let matched = [];
    if (v === 'all') {
        matched = S.customers.map(c => c.name);
    } else if (v === 'srv1_due') {
        const sales = S.sales.filter(s => s.srv1Status !== 'Completed');
        matched = sales.map(s => s.custName);
    } else if (v === 'srv2_due') {
        const sales = S.sales.filter(s => s.srv2Status !== 'Completed');
        matched = sales.map(s => s.custName);
    } else if (v === 'brand_daikin') {
        matched = S.sales.filter(s => s.brand === 'Daikin').map(s => s.custName);
    } else if (v === 'brand_voltas') {
        matched = S.sales.filter(s => s.brand === 'Voltas').map(s => s.custName);
    } else if (v === 'brand_hitachi') {
        matched = S.sales.filter(s => s.brand === 'Hitachi').map(s => s.custName);
    } else if (v === 'alkapuri') {
        matched = S.customers.filter(c => (c.locality || '').toLowerCase().includes('alkapuri') || (c.address || '').toLowerCase().includes('alkapuri')).map(c => c.name);
    }

    const unique = [...new Set(matched.filter(Boolean))];
    info.innerHTML = `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
        <b>Matched Recipients: ${unique.length} Customers</b>
        <span class="tag-pill" style="color:#10b981;font-weight:600">✓ Official WhatsApp API Compliant</span>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:4px">
        ${unique.map(n => `<span class="tag-pill" style="font-size:11px">${esc(n)}</span>`).join('') || '<span class="mu" style="font-size:12px">No customer records currently match this filter.</span>'}
    </div>`;
}

function updateCampPagePreview() {
    const sel = $('#camp-tpl');
    const prevWrap = $('#camp-live-phone-preview');
    if (!sel || !prevWrap) return;
    const tpl = (S.templates || []).find(t => t.id === sel.value);
    if (tpl) {
        prevWrap.innerHTML = renderWABubble(tpl, {}, true);
    }
}

function automationsPage() {
    if (!V.waTab) V.waTab = 'campaigns';
    if (!V.tplFilter) V.tplFilter = 'All';

    const totalCamps = (S.campaigns || []).length;
    const totalMsgsSent = (S.campaigns || []).reduce((acc, c) => acc + (c.sentCount || 0), 0);
    const totalDelivered = (S.campaigns || []).reduce((acc, c) => acc + (c.deliveredCount || 0), 0);
    const totalRead = (S.campaigns || []).reduce((acc, c) => acc + (c.readCount || 0), 0);
    const delPct = totalMsgsSent ? Math.round((totalDelivered / totalMsgsSent) * 100) : 98;
    const readPct = totalDelivered ? Math.round((totalRead / totalDelivered) * 100) : 94;

    const wa = S.whatsapp || { connected: true, phone: '+91 98250 12345', wabaId: 'WABA-919825012345', qualityRating: 'HIGH', dailyLimit: '10,000 / day (Tier 2)', lastSync: 'Just now' };

    const topBanner = `<div class="panel pad" style="margin-bottom:20px;border-left:4px solid #10b981;background:var(--sf)">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px">
            <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
                <div style="width:46px;height:46px;border-radius:12px;background:#25d366;color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(37,211,102,.25);flex:none">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <div>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                        <b style="font-size:16px">${esc(wa.displayName || S.set.store)}</b>
                        <span class="wa-badge-verified"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg> WhatsApp Verified</span>
                        <span style="display:inline-flex;align-items:center;gap:5px;font-size:12px;color:${wa.connected ? '#10b981' : '#ef4444'};font-weight:600">
                            <span class="${wa.connected ? 'wa-pulse' : ''}" style="${wa.connected ? '' : 'width:8px;height:8px;border-radius:50%;background:#ef4444;display:inline-block'}"></span>
                            ${wa.connected ? 'Connected' : 'Offline'}
                        </span>
                    </div>
                    <div class="mu" style="font-size:12px;display:flex;gap:14px;flex-wrap:wrap;margin-top:4px">
                        <span><b>Phone:</b> ${esc(wa.phone)}</span>
                        <span><b>Tier:</b> ${esc(wa.dailyLimit)}</span>
                        <span><b>Quality:</b> <span style="color:#10b981;font-weight:600">${esc(wa.qualityRating)}</span></span>
                    </div>
                </div>
            </div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
                <button class="btn sm" data-act="wa-sync" title="Sync templates and status">${ic('refresh')} Sync</button>
                <button class="btn sm" data-act="nav" data-p="automations/account">${ic('gear')} WhatsApp Setup</button>
            </div>
        </div>
    </div>`;

    const tabsBar = `<div class="chips" style="margin-bottom:20px;padding-bottom:4px">
        <button class="chip ${V.waTab === 'campaigns' ? 'on' : ''}" data-act="wa-tab" data-tab="campaigns">📢 Broadcast Campaigns <span class="tag-pill" style="margin-left:4px">${totalCamps}</span></button>
        <button class="chip ${V.waTab === 'templates' ? 'on' : ''}" data-act="wa-tab" data-tab="templates">📑 Templates Library <span class="tag-pill" style="margin-left:4px">${(S.templates || []).length}</span></button>
        <button class="chip ${V.waTab === 'workflows' ? 'on' : ''}" data-act="wa-tab" data-tab="workflows">⚡ Automated Triggers <span class="tag-pill" style="margin-left:4px">${(S.automations || []).length}</span></button>
        <button class="chip ${V.waTab === 'gateway' ? 'on' : ''}" data-act="wa-tab" data-tab="gateway">🔌 WhatsApp Setup</button>
    </div>`;

    let content = '';

    if (V.waTab === 'campaigns') {
        const kpis = `<div class="g g4" style="margin-bottom:20px">
            <div class="wa-stat-card">
                <span class="mu" style="font-size:12px">Total Broadcasts</span>
                <b>${totalCamps}</b>
                <span style="font-size:11px;color:#10b981">Official WhatsApp Broadcasts</span>
            </div>
            <div class="wa-stat-card">
                <span class="mu" style="font-size:12px">Messages Dispatched</span>
                <b>${totalMsgsSent.toLocaleString('en-IN')}</b>
                <span style="font-size:11px;color:#0284c7">${totalDelivered} Delivered successfully</span>
            </div>
            <div class="wa-stat-card">
                <span class="mu" style="font-size:12px">Delivery Success Rate</span>
                <b>${delPct}%</b>
                <span style="font-size:11px;color:#10b981">Optimal Delivery SLA</span>
            </div>
            <div class="wa-stat-card">
                <span class="mu" style="font-size:12px">Read / Open Rate</span>
                <b>${readPct}%</b>
                <span style="font-size:11px;color:#53bdeb;display:flex;align-items:center;gap:4px">
                    <svg width="14" height="10" viewBox="0 0 16 11" fill="none"><path d="M11.05 1L5.5 6.55L4.45 5.5" stroke="#53bdeb" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 1L9.45 6.55L8.4 5.5" stroke="#53bdeb" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 5.5L4.45 9L9.5 3.95" stroke="#53bdeb" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    Double Blue Tick Verified
                </span>
            </div>
        </div>`;

        const campsList = (S.campaigns || []).map(c => {
            const tpl = (S.templates || []).find(t => t.id === c.tplId || t.name === c.tplName) || { name: c.tplName || 'Template' };
            const pct = c.sentCount ? Math.round((c.deliveredCount / c.sentCount) * 100) : 100;
            const rPct = c.deliveredCount ? Math.round((c.readCount / c.deliveredCount) * 100) : 95;
            return `<tr>
                <td data-label="Campaign Name">
                    <b>${esc(c.name)}</b>
                    <small class="mu" style="display:block;white-space:normal">${esc(c.createdAt)}</small>
                </td>
                <td data-label="Template"><span class="tag-pill" style="font-family:monospace;font-size:11px">${esc(tpl.name)}</span></td>
                <td data-label="Target Segment"><span class="tag-pill">${esc(c.audience || 'Target Segment')}</span></td>
                <td data-label="Dispatched"><b>${c.sentCount || 0}</b></td>
                <td data-label="Delivered">
                    <div style="display:flex;align-items:center;gap:6px">
                        <b>${c.deliveredCount || 0}</b>
                        <small class="mu">(${pct}%)</small>
                    </div>
                </td>
                <td data-label="Read">
                    <div style="display:flex;align-items:center;gap:4px;color:#53bdeb">
                        <b>${c.readCount || 0}</b>
                        <small>(${rPct}%)</small>
                    </div>
                </td>
                <td data-label="Status"><span class="b ok">${esc(c.status || 'Completed')}</span></td>
                <td data-label="Actions">
                    <div style="display:flex;gap:6px">
                        <button class="btn sm" data-act="wa-preview-tpl" data-id="${tpl.id || ''}" title="Preview Template">${ic('send')} Preview</button>
                        <button class="btn sm" data-act="wa-del-camp" data-id="${c.id}" title="Delete Record" style="color:#ef4444">${ic('trash')}</button>
                    </div>
                </td>
            </tr>`;
        }).join('');

        content = `${kpis}
        <div class="panel">
            <div class="panel pad" style="border:none;border-bottom:1px solid var(--bd);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
                <div>
                    <b>Broadcast Campaigns History</b>
                    <div class="mu" style="font-size:12px">All mass outreach campaigns sent through official WhatsApp Business Gateway</div>
                </div>
                <button class="btn pri sm" data-act="nav" data-p="automations/broadcasts/new">${ic('send')} Launch New Broadcast</button>
            </div>
            <div class="tw">
                <table class="tbl rt">
                    <thead>
                        <tr>
                            <th>Campaign Name</th>
                            <th>Template</th>
                            <th>Target Segment</th>
                            <th>Dispatched</th>
                            <th>Delivered</th>
                            <th>Read</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>${campsList || '<tr><td colspan="8" style="text-align:center;padding:24px" class="mu">No campaigns launched yet. Click "+ Launch New Broadcast" to start.</td></tr>'}</tbody>
                </table>
            </div>
        </div>`;
    } else if (V.waTab === 'templates') {
        const filter = V.tplFilter || 'All';
        const filteredTpls = (S.templates || []).filter(t => {
            if (filter === 'All') return true;
            if (filter === 'UTILITY') return t.cat === 'UTILITY';
            if (filter === 'MARKETING') return t.cat === 'MARKETING';
            if (filter === 'Approved') return t.status === 'APPROVED';
            if (filter === 'Pending') return t.status === 'PENDING';
            return true;
        });

        const filterChips = ['All', 'UTILITY', 'MARKETING', 'Approved', 'Pending'].map(cat =>
            `<button class="chip ${filter === cat ? 'on' : ''}" data-act="tpl-filter" data-cat="${cat}">${cat}</button>`
        ).join('');

        const tplCards = filteredTpls.map(t => {
            return `<div class="panel pad" style="display:flex;flex-direction:column;justify-content:space-between;gap:12px">
                <div>
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:8px">
                        <div>
                            <b style="font-size:14px;font-family:monospace;color:var(--pr)">${esc(t.name)}</b>
                            <div class="mu" style="font-size:11px;margin-top:2px">Lang: ${esc(t.lang || 'en_US')} · Category: <b>${esc(t.cat)}</b></div>
                        </div>
                        <span class="b ${t.status === 'APPROVED' ? 'ok' : 'wa'}">${esc(t.status)}</span>
                    </div>
                    <div style="margin:12px 0">${renderWABubble(t)}</div>
                </div>
                <div style="display:flex;gap:8px;justify-content:flex-end;border-top:1px solid var(--bd);padding-top:10px;flex-wrap:wrap">
                    <button class="btn sm" data-act="wa-test-tpl" data-id="${t.id}" title="Send test WhatsApp to your phone">${ic('phone')} Test Send</button>
                    <button class="btn sm pri" data-act="nav" data-p="automations/broadcasts/new/${t.id}" title="Launch broadcast with this template">${ic('send')} Broadcast</button>
                    <button class="btn sm" data-act="wa-del-tpl" data-id="${t.id}" style="color:#ef4444" title="Delete Template">${ic('trash')}</button>
                </div>
            </div>`;
        }).join('');

        content = `<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:20px">
            <div class="chips">${filterChips}</div>
            <button class="btn pri sm" data-act="nav" data-p="automations/templates/new">${ic('plus')} Create New Template</button>
        </div>
        <div class="g g2">${tplCards || '<div class="panel pad mu" style="grid-column:1/-1;text-align:center">No templates found matching current filter.</div>'}</div>`;
    } else if (V.waTab === 'workflows') {
        const workflowsList = (S.automations || []).map(a => {
            const matchedTpl = (S.templates || []).find(t => t.name.toLowerCase().includes(a.id === 'W1' ? 'welcome' : a.id === 'W2' ? 'purchase' : a.id === 'W3' ? 'reminder_1' : a.id === 'W4' ? 'reminder_2' : 'offer')) || S.templates[0];
            return `<div class="panel pad" style="margin-bottom:14px;border-left:4px solid ${a.on ? '#10b981' : 'var(--bd)'}">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px">
                    <div style="flex:1;min-width:280px">
                        <div style="display:flex;align-items:center;gap:8px">
                            <b style="font-size:15px">${esc(a.name)}</b>
                            <span class="tag-pill" style="font-family:monospace;font-size:11px">Template: ${esc(matchedTpl ? matchedTpl.name : 'default')}</span>
                        </div>
                        <div class="mu" style="font-size:12px;margin-top:4px">Trigger Condition: <b style="color:var(--fg)">${esc(a.trig)}</b> · Lead: ${a.lead ? a.lead + ' days prior' : 'Instant on action'}</div>
                        <div style="margin-top:10px;background:var(--bg);padding:10px;border-radius:8px;font-size:12.5px;line-height:1.45;color:var(--fg);border:1px solid var(--bd)">
                            ${esc(a.body)}
                        </div>
                    </div>
                    <div style="display:flex;flex-direction:column;align-items:flex-end;gap:10px">
                        <div style="display:flex;align-items:center;gap:8px">
                            <span style="font-size:12px;color:var(--mu)">${a.on ? 'Active' : 'Paused'}</span>
                            <button class="sw" role="switch" aria-checked="${a.on}" aria-label="Toggle ${esc(a.name)}" data-act="auto-toggle" data-id="${a.id}"></button>
                        </div>
                        <span class="tag-pill" style="font-size:11px">${a.sentCount || 0} messages sent</span>
                        <div style="display:flex;gap:6px">
                            <button class="btn sm" data-act="auto-test" data-id="${a.id}" title="Simulate instant automated trigger">${ic('send')} Test Trigger</button>
                            <button class="btn sm" data-act="auto-edit" data-id="${a.id}" title="Edit Template Text">${ic('edit')} Customize</button>
                        </div>
                    </div>
                </div>
            </div>`;
        }).join('');

        content = `<div class="panel pad" style="margin-bottom:16px;background:var(--sf)">
            <b>Automated AC Lifecycle Triggers</b>
            <div class="mu" style="font-size:12px;margin-top:2px">When events occur (new customer recorded, new AC sale saved, or service dates approaching), Mobile Point AC Care automatically triggers approved templates directly to the customer's WhatsApp number.</div>
        </div>
        <div>${workflowsList}</div>`;
    } else if (V.waTab === 'gateway') {
        content = `<div class="g g2">
            <div class="panel pad">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
                    <div style="width:36px;height:36px;border-radius:8px;background:#25d366;color:#fff;display:flex;align-items:center;justify-content:center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <div>
                        <b>WhatsApp Business Connection Settings</b>
                        <div class="mu" style="font-size:12px">Official Cloud Messaging Gateway for Mobile Point AC Care</div>
                    </div>
                </div>
                <div class="fg">
                    <label>Business Display Name
                        <input id="wa-gw-name" value="${esc(wa.displayName || S.set.store)}">
                    </label>
                    <label>WhatsApp Business Phone Number
                        <input id="wa-gw-phone" value="${esc(wa.phone)}" placeholder="+91 98250 12345">
                    </label>
                    <label>WhatsApp Cloud Endpoint
                        <input id="wa-gw-endpoint" value="${esc(wa.endpoint || 'https://graph.facebook.com/v19.0')}" readonly style="background:var(--bg)">
                    </label>
                </div>
                <div class="acts" style="margin-top:16px">
                    <button class="btn" data-act="wa-acc-ping">${ic('refresh')} Ping API Test</button>
                    <button class="btn pri" data-act="wa-save-conn">${ic('check')} Save Settings</button>
                </div>
            </div>

            <div class="panel pad">
                <b>Account Health &amp; Limits</b>
                <div class="mu" style="font-size:12px;margin-bottom:14px">Live connection health &amp; messaging tier</div>
                <div class="panel pad" style="background:var(--bg);margin-bottom:16px">
                    <div style="display:flex;justify-content:space-between;margin-bottom:8px">
                        <span class="mu" style="font-size:12px">Account Status:</span>
                        <b style="color:#10b981">Verified &amp; Active</b>
                    </div>
                    <div style="display:flex;justify-content:space-between;margin-bottom:8px">
                        <span class="mu" style="font-size:12px">Quality Rating:</span>
                        <b style="color:#10b981">${esc(wa.qualityRating)} (GREEN)</b>
                    </div>
                    <div style="display:flex;justify-content:space-between;margin-bottom:8px">
                        <span class="mu" style="font-size:12px">Messaging Tier:</span>
                        <b>${esc(wa.dailyLimit)}</b>
                    </div>
                    <div style="display:flex;justify-content:space-between">
                        <span class="mu" style="font-size:12px">Last Health Ping:</span>
                        <b>${esc(wa.lastSync)}</b>
                    </div>
                </div>
                <div style="margin-top:14px">
                    <button class="btn sm" data-act="wa-acc-disc" style="color:#ef4444">${ic('logout')} Disconnect Gateway</button>
                </div>
            </div>
        </div>`;
    }

    return `<div class="pg">
        <div class="ph">
            <div>
                <h1>WhatsApp Automation &amp; Broadcasts</h1>
                <p class="mu">Official WhatsApp Business suite with approved message templates, mass broadcast campaigns, and automated AC service reminders.</p>
            </div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
                <button class="btn sm" data-act="nav" data-p="automations/templates/new">${ic('plus')} Create Template</button>
                <button class="btn pri sm" data-act="nav" data-p="automations/broadcasts/new">${ic('send')} New Campaign</button>
            </div>
        </div>
        ${topBanner}
        ${tabsBar}
        ${content}
    </div>`;
}

function waPreviewM(tplId) {
    const tpl = (S.templates || []).find(t => t.id === tplId || t.name === tplId) || (S.templates || [])[0];
    if (!tpl) return;
    modal(`<h1>WhatsApp Chat Preview: ${esc(tpl.name)}</h1>
    <div style="margin:16px 0;display:flex;justify-content:center">
        ${renderWABubble(tpl)}
    </div>
    <div class="acts">
        <button class="btn" data-act="close">Close</button>
        <button class="btn" data-act="wa-test-tpl" data-id="${tpl.id}">${ic('phone')} Test Send to Phone</button>
        <button class="btn pri" data-act="nav" data-p="automations/broadcasts/new/${tpl.id}">${ic('send')} Use in Broadcast</button>
    </div>`);
}

function waTestM(tplId) {
    const tpl = (S.templates || []).find(t => t.id === tplId) || (S.templates || [])[0];
    if (!tpl) return;
    modal(`<h1>Send WhatsApp Test Message</h1>
    <p class="mu" style="margin-bottom:12px">Send an instant live simulation to test how this template looks in the recipient's WhatsApp app.</p>
    <div class="fg">
        <label>Recipient WhatsApp Mobile Number
            <input id="wa-test-num" value="+91 98250 12345" placeholder="+91 9XXXXXXXXX">
        </label>
    </div>
    <div style="margin:14px 0">${renderWABubble(tpl)}</div>
    <div class="acts">
        <button class="btn" data-act="close">Cancel</button>
        <button class="btn pri" data-act="wa-send-test-msg" data-id="${tpl.id}">${ic('send')} Send Test Message Now</button>
    </div>`);
}

function autoEditM(id) {
    const a = S.automations.find(x => x.id === id);
    if (!a) return;
    modal(`<h1>WhatsApp Automation: ${esc(a.name)}</h1>
    <div class="fg" style="margin-top:12px">
        <label>Trigger Condition
            <input value="${esc(a.trig)}" readonly style="background:var(--bg)">
        </label>
        <label>Channel
            <input value="WhatsApp Cloud API (Official Integration)" readonly style="background:var(--bg)">
        </label>
        <label>Message Template Body (Supports {{name}}, {{brand}}, {{model}}, {{date}}, {{store}}, {{phone}})
            <textarea id="auto-body" rows="4">${esc(a.body)}</textarea>
        </label>
        <div class="panel pad" style="background:#dcfce7;border:1px solid #86efac;color:#166534">
            <b>WhatsApp Message Bubble Preview:</b>
            <div style="margin-top:6px;font-size:13px;line-height:1.4" id="auto-preview-bubble">${esc(a.body.replace(/\{\{name\}\}/g, 'Amit Sharma').replace(/\{\{store\}\}/g, S.set.store).replace(/\{\{phone\}\}/g, S.set.phone).replace(/\{\{brand\}\}/g, 'Daikin').replace(/\{\{model\}\}/g, 'FTKF35TV16U').replace(/\{\{sn\}\}/g, 'DK-71001').replace(/\{\{date\}\}/g, fd(D(14))).replace(/\{\{installDate\}\}/g, fd(D(1))))}</div>
        </div>
    </div>
    <div class="acts" style="margin-top:16px">
        <button class="btn" data-act="close">Cancel</button>
        <button class="btn" data-act="auto-test" data-id="${a.id}">${ic('send')} Send Test Message</button>
        <button class="btn pri" data-act="auto-save" data-id="${a.id}">Save Template</button>
    </div>`);
}

function waRemindM(saleId, type) {
    const s = sale(saleId);
    if (!s) return;
    const c = cust(s.cid);
    const dateStr = fd(type === '1' ? s.srv1Date : s.srv2Date);
    const tplName = type === '1' ? '1st AC Service Reminder (3 to 5 Months)' : '2nd AC Service Reminder (Before 11 Months)';
    const autoDef = S.automations.find(a => a.id === (type === '1' ? 'W3' : 'W4'));
    let text = (autoDef ? autoDef.body : 'Hi {{name}}, your AC service is due on {{date}}.')
        .replace(/\{\{name\}\}/g, s.custName)
        .replace(/\{\{store\}\}/g, S.set.store)
        .replace(/\{\{phone\}\}/g, S.set.phone)
        .replace(/\{\{brand\}\}/g, s.brand)
        .replace(/\{\{model\}\}/g, s.model)
        .replace(/\{\{sn\}\}/g, s.sn)
        .replace(/\{\{date\}\}/g, dateStr);

    modal(`<h1>Trigger WhatsApp ${type === '1' ? '1st' : '2nd'} Service Reminder</h1>
    <p class="mu">Customer: <b>${esc(s.custName)}</b> · WhatsApp: <b>${esc(s.custPhone)}</b></p>
    <div class="panel pad" style="background:#dcfce7;border:1px solid #86efac;color:#166534;margin:14px 0">
        <div style="display:flex;align-items:center;gap:6px;font-weight:600;margin-bottom:6px">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Message Preview (Template: ${esc(tplName)})
        </div>
        <div style="font-size:13px;line-height:1.5">${esc(text)}</div>
    </div>
    <div class="acts">
        <button class="btn" data-act="close">Cancel</button>
        <button class="btn pri" data-act="wa-send-now" data-id="${s.id}" data-type="${type}">Send WhatsApp Reminder Now</button>
    </div>`);
}

function render(keep) {
    const main = $('#main');
    if (!main) return;
    const p0 = V.page || 'overview';
    const p = p0.split('/')[0];

    const nv = $('#nv');
    if (nv) {
        nv.innerHTML = NAV.map((n, i) => (n[3] != (NAV[i - 1] || [])[3] ? '<div class="gh lb">' + esc(n[3]) + '</div>' : '') + `<button class="ni${n[0] == p ? ' on' : ''}" data-act="nav" data-p="${n[0]}" title="${esc(n[1])}"${n[0] == p ? ' aria-current="page"' : ''}>${ic(n[2])}<span class="lb">${esc(n[1])}</span></button>`).join('');
    }

    const ub = $('#user-badge');
    if (ub && currentUser) {
        ub.innerHTML = `<span class="av" title="${esc(currentUser.name)}">${esc(ini(currentUser.name))}</span><div class="lb us-info"><b title="${esc(currentUser.name)}">${esc(currentUser.name)}</b><small title="${esc(currentUser.email)}">${esc(currentUser.email)}</small></div><button class="ib lb" data-act="logout" aria-label="Sign out" title="Sign out">${ic('logout')}</button>`;
    }

    const bn = $('#bn');
    if (bn) {
        bn.innerHTML = [
            ['overview', 'Home', 'home'],
            ['sales', 'Sales', 'cart'],
            ['calendar', 'Calendar', 'cal'],
            ['customers', 'Customers', 'users']
        ].map(n => `<button class="${n[0] == p ? 'on' : ''}" data-act="nav" data-p="${n[0]}">${ic(n[2])}${n[1]}</button>`).join('') + `<button data-act="menu">${ic('more')}More</button>`;
    }

    const mb = $('#mb'); if (mb) mb.innerHTML = ic('menu');
    const nb = $('#nb'); if (nb) nb.innerHTML = ic('plus') + '<span class="cl">New</span>';
    const bl = $('#bl'); if (bl) bl.innerHTML = ic('bell') + bellBdg();
    const th = $('#th'); if (th) th.innerHTML = ic('moon');
    const ab = $('#ab'); if (ab) ab.innerHTML = ic('pulse');

    const sub = subPage(p0);
    if (sub) {
        main.innerHTML = sub;
    } else if (p === 'sales') {
        main.innerHTML = salesPage();
    } else if (p === 'overview') {
        main.innerHTML = overview();
    } else if (p === 'calendar') {
        main.innerHTML = calendar();
    } else if (p === 'reports') {
        main.innerHTML = reports();
    } else if (p === 'settings') {
        main.innerHTML = settings();
    } else if (p === 'automations') {
        main.innerHTML = automationsPage();
    } else if (P[p]) {
        main.innerHTML = listPage(p);
    } else {
        main.innerHTML = overview();
    }

    npRef();
    if (!keep) window.scrollTo(0, 0);
}

function go(p, f, q) {
    if (DIRTY && !confirm('You have unsaved changes. Leave this page?')) return;
    DIRTY = false;
    V.k = ['overview', 'calendar', 'reports', 'settings', 'sales', 'notifications', 'activity', 'automations'].includes(p.split('/')[0]) ? '' : p.split('/')[0];
    V.f = f || 'All';
    V.q = q || '';
    V.p = 0;
    V.page = p;
    location.hash = p;
    render();
}

function act(a, e) {
    const d = a.dataset;
    switch (d.act) {
        case 'ovl':
            if (e && e.target !== a) return;
            return closeM();
        case 'close':
            return closeM();
        case 'close-np':
            return npClose();
        case 'menu':
            return innerWidth <= 820 ? $('#app').classList.toggle('dr') : $('#app').classList.toggle('col');
        case 'drawer':
            return $('#app').classList.remove('dr');
        case 'nav':
            $('#app').classList.remove('dr');
            return go(d.p);
        case 'nav-close':
            closeM();
            $('#app').classList.remove('dr');
            return go(d.p);
        case 'theme': {
            const r = document.documentElement;
            const next = r.dataset.theme === 'dark' ? 'light' : 'dark';
            r.dataset.theme = next;
            SS().theme = next;
            save();
            return;
        }
        case 'bell':
            return npToggle();
        case 'actd':
            return adToggle();
        case 'adx':
            return adClose();
        case 'new':
            return newM();
        case 'chip':
            V.f = d.v;
            V.p = 0;
            return render(true);
                case 'rep-range':
            REP_RANGE = d.v;
            return render(true);
        case 'export': {
            const u = URL.createObjectURL(new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' }));
            const l = document.createElement('a');
            l.href = u;
            l.download = 'mobile-point-data-backup.json';
            l.click();
            toast('Backup exported successfully');
            return;
        }
        case 'sales-chip':
            SF = d.v;
            return render(true);
        case 'cal':
            if (d.v === 'prev') {
                if (CV === 'month') {
                    const dt = new Date(CD + 'T00:00:00Z');
                    dt.setUTCDate(1);
                    dt.setUTCMonth(dt.getUTCMonth() - 1);
                    CD = dt.toISOString().slice(0, 10);
                } else if (CV === 'week') {
                    CD = cdd(CD, -7);
                } else {
                    CD = cdd(CD, -1);
                }
            } else if (d.v === 'next') {
                if (CV === 'month') {
                    const dt = new Date(CD + 'T00:00:00Z');
                    dt.setUTCDate(1);
                    dt.setUTCMonth(dt.getUTCMonth() + 1);
                    CD = dt.toISOString().slice(0, 10);
                } else if (CV === 'week') {
                    CD = cdd(CD, 7);
                } else {
                    CD = cdd(CD, 1);
                }
            } else if (d.v === 'today') {
                CD = D(0);
            } else {
                CV = d.v;
            }
            return render(true);
        case 'cal-filter':
            CAL_FILTER = d.v;
            return render(true);
        case 'cal-day':
            CD = d.d;
            CV = 'day';
            return render(true);
        case 'open-row':
            if (P[d.k] && P[d.k].open) return P[d.k].open(d.id);
            return;
        case 'sale-cmode': {
            SALE_CUST_MODE = d.v;
            const box = $('#sale-cust-existing-box');
            if (box) box.style.display = d.v === 'existing' ? 'block' : 'none';
            $$e($('#sale-form'), '[data-act="sale-cmode"]').forEach(b => b.classList.toggle('on', b.dataset.v === d.v));
            return;
        }
        case 'sale-pmode': {
            SALE_PROD_MODE = d.v;
            const box = $('#sale-prod-existing-box');
            if (box) box.style.display = d.v === 'existing' ? 'block' : 'none';
            $$e($('#sale-form'), '[data-act="sale-pmode"]').forEach(b => b.classList.toggle('on', b.dataset.v === d.v));
            return;
        }
        case 'img-del': {
            e.stopPropagation();
            const idx = +d.idx;
            if (!isNaN(idx)) {
                SALE_IMAGES.splice(idx, 1);
                const g = $('#sale-img-preview-grid');
                if (g) g.innerHTML = renderImageThumbnails();
            }
            return;
        }
        case 'img-lightbox': {
            const idx = +d.idx;
            const src = SALE_IMAGES[idx];
            if (src) modal(`<div style="text-align:center"><img src="${src}" style="max-width:100%;max-height:80vh;border-radius:8px"><div class="acts" style="margin-top:12px"><button class="btn" data-act="close">Close</button></div></div>`);
            return;
        }
        case 'img-lightbox-view': {
            const src = decodeURIComponent(d.src);
            if (src) modal(`<div style="text-align:center"><img src="${src}" style="max-width:100%;max-height:80vh;border-radius:8px"><div class="acts" style="margin-top:12px"><button class="btn" data-act="close">Close</button></div></div>`);
            return;
        }
        case 'auto-edit':
            return autoEditM(d.id);
        case 'auto-toggle': {
            const auto = S.automations.find(x => x.id === d.id);
            if (auto) {
                auto.on = !auto.on;
                save();
                toast(auto.name + (auto.on ? ' activated' : ' paused'));
                render(true);
            }
            return;
        }
        case 'auto-test': {
            const auto = S.automations.find(x => x.id === d.id);
            if (auto) {
                auto.sentCount = (auto.sentCount || 0) + 1;
                S.feed.unshift({ id: 'EV' + Date.now(), t: 'Simulated WhatsApp message sent: ' + auto.name, time: 'Just now', k: 'messages', p: 'automations' });
                save();
                closeM();
                toast('Test message delivered to +91 98250 12345 (Simulated)', 'ok');
                render(true);
            }
            return;
        }
        case 'auto-save': {
            const auto = S.automations.find(x => x.id === d.id);
            const tb = $('#auto-body');
            if (auto && tb) {
                auto.body = tb.value.trim();
                save();
                closeM();
                toast('Automation template saved');
                render(true);
            }
            return;
        }
        case 'wa-tab': {
            V.waTab = d.tab;
            render(true);
            return;
        }
        case 'tpl-filter': {
            V.tplFilter = d.cat;
            render(true);
            return;
        }
        case 'wa-sync': {
            if (S.whatsapp) S.whatsapp.lastSync = 'Just now';
            save();
            toast('WhatsApp templates & connection synced', 'ok');
            render(true);
            return;
        }
        case 'wa-acc-save': {
            const nameEl = $('#wa-acc-name');
            const phoneEl = $('#wa-acc-phone');
            if (S.whatsapp) {
                if (nameEl && nameEl.value) S.whatsapp.displayName = nameEl.value.trim();
                if (phoneEl && phoneEl.value) S.whatsapp.phone = phoneEl.value.trim();
                S.whatsapp.connected = true;
                S.whatsapp.lastSync = 'Just now';
            }
            save();
            toast('WhatsApp Business connection details saved', 'ok');
            go('automations');
            return;
        }
        case 'wa-acc-ping': {
            toast('WhatsApp Business API ping test successful (42ms, Status 200 OK)', 'ok');
            return;
        }
        case 'wa-acc-disc': {
            if (S.whatsapp) S.whatsapp.connected = false;
            save();
            toast('WhatsApp Business number disconnected');
            render(true);
            return;
        }
        case 'wa-save-conn': {
            const nameEl = $('#wa-gw-name');
            const phoneEl = $('#wa-gw-phone');
            if (S.whatsapp) {
                if (nameEl && nameEl.value) S.whatsapp.displayName = nameEl.value.trim();
                if (phoneEl && phoneEl.value) S.whatsapp.phone = phoneEl.value.trim();
                S.whatsapp.connected = true;
                S.whatsapp.lastSync = 'Just now';
            }
            save();
            toast('Gateway settings saved successfully', 'ok');
            render(true);
            return;
        }
        case 'wa-var-pill': {
            const tag = d.tag;
            const tb = $('#tpl-body');
            if (tb && tag) {
                const start = tb.selectionStart || tb.value.length;
                const end = tb.selectionEnd || tb.value.length;
                tb.value = tb.value.substring(0, start) + tag + tb.value.substring(end);
                tb.focus();
                tb.selectionStart = tb.selectionEnd = start + tag.length;
                updateTplPageLivePreview();
            }
            return;
        }
        case 'wa-submit-tpl': {
            const nameEl = $('#tpl-name');
            const catEl = $('#tpl-cat');
            const langEl = $('#tpl-lang');
            const hdrEl = $('#tpl-hdr');
            const bodyEl = $('#tpl-body');
            const ftrEl = $('#tpl-ftr');
            const btn1El = $('#tpl-btn1');
            const btn2El = $('#tpl-btn2');
            if (!nameEl || !bodyEl) return;
            let tName = nameEl.value.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
            if (!tName) return toast('Template identifier is required', 'er');
            if (!bodyEl.value.trim()) return toast('Message body text cannot be empty', 'er');
            const btns = [];
            if (btn1El && btn1El.value.trim()) btns.push({ type: 'QUICK_REPLY', text: btn1El.value.trim() });
            if (btn2El && btn2El.value.trim()) btns.push({ type: 'PHONE_NUMBER', text: btn2El.value.trim(), val: S.set.phone });
            const newTpl = {
                id: 'tpl_' + Date.now(),
                name: tName,
                cat: catEl ? catEl.value : 'UTILITY',
                status: 'APPROVED',
                lang: langEl ? langEl.value : 'en_US',
                header: hdrEl ? hdrEl.value.trim() : '',
                body: bodyEl.value.trim(),
                footer: ftrEl ? ftrEl.value.trim() : '',
                buttons: btns
            };
            S.templates.unshift(newTpl);
            save();
            toast('Template "' + tName + '" saved & submitted successfully', 'ok');
            V.waTab = 'templates';
            go('automations');
            return;
        }
        case 'wa-del-tpl': {
            const tplIdx = S.templates.findIndex(t => t.id === d.id);
            if (tplIdx !== -1) {
                const removed = S.templates.splice(tplIdx, 1)[0];
                save();
                toast('Template ' + removed.name + ' deleted');
                render(true);
            }
            return;
        }
        case 'wa-launch-camp-page': {
            const cNameEl = $('#camp-name');
            const cTplEl = $('#camp-tpl');
            const cAudEl = $('#camp-aud');
            if (!cNameEl || !cTplEl) return;
            const cName = cNameEl.value.trim() || ('Broadcast ' + fd(D(0)));
            const tpl = S.templates.find(t => t.id === cTplEl.value) || S.templates[0];
            const audVal = cAudEl ? cAudEl.value : 'all';
            let recipients = [];
            if (audVal === 'all') {
                recipients = S.customers.map(c => c.name);
            } else if (audVal === 'srv1_due') {
                recipients = S.sales.filter(s => s.srv1Status !== 'Completed').map(s => s.custName);
            } else if (audVal === 'srv2_due') {
                recipients = S.sales.filter(s => s.srv2Status !== 'Completed').map(s => s.custName);
            } else if (audVal === 'brand_daikin') {
                recipients = S.sales.filter(s => s.brand === 'Daikin').map(s => s.custName);
            } else if (audVal === 'brand_voltas') {
                recipients = S.sales.filter(s => s.brand === 'Voltas').map(s => s.custName);
            } else if (audVal === 'brand_hitachi') {
                recipients = S.sales.filter(s => s.brand === 'Hitachi').map(s => s.custName);
            } else if (audVal === 'alkapuri') {
                recipients = S.customers.filter(c => (c.locality || '').toLowerCase().includes('alkapuri') || (c.address || '').toLowerCase().includes('alkapuri')).map(c => c.name);
            }
            const uniqueRecipients = [...new Set(recipients.filter(Boolean))];
            const count = Math.max(uniqueRecipients.length, 1);
            const deliv = Math.max(1, Math.round(count * 0.98));
            const read = Math.max(1, Math.round(deliv * 0.94));
            const newCamp = {
                id: 'CAMP-' + (S.campaigns.length + 101),
                name: cName,
                tplId: tpl.id,
                tplName: tpl.name,
                audience: cAudEl ? cAudEl.options[cAudEl.selectedIndex].text.split('(')[0].trim() : 'Audience',
                sentCount: count,
                deliveredCount: deliv,
                readCount: read,
                replyCount: Math.round(read * 0.3),
                createdAt: 'Just now',
                status: 'Completed'
            };
            S.campaigns.unshift(newCamp);
            S.feed.unshift({
                id: 'EV' + Date.now(),
                t: 'WhatsApp Broadcast launched: ' + cName + ' (' + count + ' recipients)',
                time: 'Just now',
                k: 'messages',
                p: 'automations'
            });
            save();
            toast('Broadcast campaign "' + cName + '" dispatched to ' + count + ' customers!', 'ok');
            V.waTab = 'campaigns';
            go('automations');
            return;
        }
        case 'wa-del-camp': {
            const campIdx = S.campaigns.findIndex(c => c.id === d.id);
            if (campIdx !== -1) {
                const removed = S.campaigns.splice(campIdx, 1)[0];
                save();
                toast('Campaign "' + removed.name + '" removed');
                render(true);
            }
            return;
        }
        case 'wa-preview-tpl': {
            waPreviewM(d.id);
            return;
        }
        case 'wa-test-tpl': {
            waTestM(d.id);
            return;
        }
        case 'wa-send-test-msg': {
            const numInput = $('#wa-test-num');
            const testNum = numInput ? numInput.value.trim() : '+91 98250 12345';
            const tpl = S.templates.find(t => t.id === d.id) || S.templates[0];
            S.feed.unshift({
                id: 'EV' + Date.now(),
                t: 'WhatsApp test message sent (' + (tpl ? tpl.name : 'Template') + ') to ' + testNum,
                time: 'Just now',
                k: 'messages',
                p: 'automations'
            });
            save();
            closeM();
            toast('Test message dispatched to ' + testNum + ' (Delivered)', 'ok');
            render(true);
            return;
        }
        case 'wa-remind':
            return waRemindM(d.id, d.type);
        case 'wa-send-now': {
            const s = sale(d.id);
            if (s) {
                if (d.type === '1') s.srv1Status = 'Sent';
                else s.srv2Status = 'Sent';
                S.feed.unshift({ id: 'EV' + Date.now(), t: (d.type === '1' ? '1st' : '2nd') + ' Service reminder sent to ' + s.custName, time: 'Just now', k: 'calendar', p: 'sales/' + s.id });
                S.msgs.unshift({ id: 'M' + Date.now(), cid: s.cid, saleId: s.id, ch: 'WhatsApp', tpl: d.type === '1' ? '1st AC Service Reminder' : '2nd AC Service Reminder', time: D(0), status: 'Delivered', text: 'Service reminder sent to ' + s.custName });
                save();
                closeM();
                toast('WhatsApp reminder sent successfully to ' + s.custPhone, 'ok');
                render(true);
            }
            return;
        }
        case 'mark-srv': {
            const s = sale(d.id);
            if (s) {
                if (d.type === '1') {
                    s.srv1Status = s.srv1Status === 'Completed' ? 'Upcoming' : 'Completed';
                    s.srv1DoneDate = s.srv1Status === 'Completed' ? D(0) : '';
                } else {
                    s.srv2Status = s.srv2Status === 'Completed' ? 'Upcoming' : 'Completed';
                    s.srv2DoneDate = s.srv2Status === 'Completed' ? D(0) : '';
                }
                save();
                toast('Service milestone updated');
                render(true);
            }
            return;
        }
        case 'sale-save':
            return handleSaleSave();
        case 'cust-save':
            return handleCustSave();
        case 'prod-save':
            return handleProdSave();
        case 'settings-save':
            return handleSettingsSave();
        case 'user-perm-save':
            return handleUserPermSave();
        case 'apply-preset': {
            const pDef = PRESETS[d.preset];
            if (!pDef) return;
            MODULE_DEFS.forEach(m => {
                const mp = pDef.perms[m.id] || { enabled: false };
                const en = document.querySelector(`[name="mod_${m.id}_enabled"]`);
                if (en) en.checked = !!mp.enabled;
                const vw = document.querySelector(`[name="mod_${m.id}_view"]`);
                if (vw) vw.checked = !!mp.view;
                const ed = document.querySelector(`[name="mod_${m.id}_edit"]`);
                if (ed) ed.checked = !!mp.edit;
                const del = document.querySelector(`[name="mod_${m.id}_delete"]`);
                if (del) del.checked = !!mp.delete;
            });
            toast('Applied preset: ' + pDef.label);
            return;
        }
        case 'cust-new':
            return go('customers/new');
        case 'prod-new':
            return go('products/new');
        case 'user-new':
            return userNewM();
        case 'logout': {
            currentUser = null;
            localStorage.removeItem(AUTH_KEY);
            localStorage.setItem('mp_logged_out', '1');
            toast('Logged out');
            render();
            return;
        }
        case 'nall':
            notifs().forEach(n => { if (!isRd(n.id)) nrd().push(n.id); });
            save();
            npRef();
            toast('All notifications marked as read');
            render(true);
            return;
        case 'ntab':
            NT = d.v;
            npRef();
            {
                const p = $('#np');
                if (p) {
                    p.remove();
                    npToggle();
                }
            }
            return;
        case 'nread':
            if (!isRd(d.id)) {
                nrd().push(d.id);
                save();
            }
            npClose();
            if (d.p) go(d.p);
            return;
    }
}

function handleSaleSave() {
    const f = $('#sale-form');
    if (!f) return;
    const fd = new FormData(f);
    const saleId = fd.get('sale_id');

    let cid = fd.get('existing_cid');
    const custName = (fd.get('cust_name') || '').trim();
    const custPhone = (fd.get('cust_phone') || '').trim();
    const custAltPhone = (fd.get('cust_alt_phone') || '').trim();
    const custAddress = (fd.get('cust_address') || '').trim();
    const custLocality = (fd.get('cust_locality') || '').trim();
    const custLandmark = (fd.get('cust_landmark') || '').trim();
    const custPincode = (fd.get('cust_pincode') || '').trim();

    if (!custName) return toast('Please enter customer name', 'er');
    if (!custPhone) return toast('Please enter WhatsApp number', 'er');
    if (!custAddress) return toast('Please enter complete address', 'er');
    if (!custLocality) return toast('Please enter locality', 'er');

    let customer = S.customers.find(c => c.id === cid);
    if (SALE_CUST_MODE === 'new' || !customer) {
        cid = 'C' + (Math.max(100, ...S.customers.map(c => +c.id.replace(/\D/g, '') || 0)) + 1);
        customer = {
            id: cid,
            name: custName,
            phone: custPhone,
            altPhone: custAltPhone,
            address: custAddress,
            locality: custLocality,
            landmark: custLandmark,
            pincode: custPincode,
            active: true
        };
        S.customers.unshift(customer);
        S.feed.unshift({ id: 'EV' + Date.now(), t: 'New customer registered: ' + custName, time: 'Just now', k: 'customers', p: 'customers/' + cid });
        S.msgs.unshift({ id: 'M' + Date.now(), cid: cid, ch: 'WhatsApp', tpl: 'New Customer Welcome Message', time: D(0), status: 'Delivered', text: 'Welcome ' + custName + ' to ' + S.set.store });
    } else {
        customer.name = custName;
        customer.phone = custPhone;
        customer.altPhone = custAltPhone;
        customer.address = custAddress;
        customer.locality = custLocality;
        customer.landmark = custLandmark;
        customer.pincode = custPincode;
    }

    const brand = (fd.get('prod_brand') || '').trim();
    const model = (fd.get('prod_model') || '').trim();
    const sn = (fd.get('prod_sn') || '').trim();
    const capacity = (fd.get('prod_cap') || '1.5 Ton').trim();
    const star = (fd.get('prod_star') || '5 Star').trim();

    if (!brand) return toast('Please enter AC brand name', 'er');
    if (!model) return toast('Please enter AC model number', 'er');
    if (!sn) return toast('Please enter AC serial number', 'er');

    let prodObj = S.products.find(p => p.brand.toLowerCase() === brand.toLowerCase() && p.model.toLowerCase() === model.toLowerCase());
    if (!prodObj) {
        const newPid = 'P' + (Math.max(1000, ...S.products.map(p => +p.id.replace(/\D/g, '') || 0)) + 1);
        prodObj = {
            id: newPid,
            brand: brand,
            model: model,
            name: brand + ' ' + model + ' ' + capacity,
            capacity: capacity,
            star: star,
            invType: 'Inverter',
            condenser: '100% Copper',
            gas: 'R32',
            warranty: '1 Year Comp + 10 Years Compressor',
            units: [{ sn: sn, st: 'Sold' }]
        };
        S.products.unshift(prodObj);
        S.feed.unshift({ id: 'EV' + Date.now(), t: 'New AC model added to catalog: ' + brand + ' ' + model, time: 'Just now', k: 'products', p: 'products/' + newPid });
    } else {
        prodObj.units = prodObj.units || [];
        const existingUnit = prodObj.units.find(u => u.sn === sn);
        if (existingUnit) existingUnit.st = 'Sold';
        else prodObj.units.push({ sn: sn, st: 'Sold' });
    }

    const saleDate = fd.get('sale_date') || D(0);
    const installDate = fd.get('install_date') || '';
    const shopName = (fd.get('shop_name') || S.set.store).trim();
    const notes = (fd.get('sale_notes') || '').trim();

    const srv1Date = cdd(saleDate, S.set.srv1Days || 120);
    const srv2Date = cdd(saleDate, S.set.srv2Days || 330);

    let targetSale = saleId ? S.sales.find(s => s.id === saleId) : null;
    if (targetSale) {
        targetSale.cid = cid;
        targetSale.custName = custName;
        targetSale.custPhone = custPhone;
        targetSale.custAltPhone = custAltPhone;
        targetSale.custAddress = custAddress;
        targetSale.custLocality = custLocality;
        targetSale.custLandmark = custLandmark;
        targetSale.custPincode = custPincode;
        targetSale.pid = prodObj.id;
        targetSale.brand = brand;
        targetSale.model = model;
        targetSale.sn = sn;
        targetSale.date = saleDate;
        targetSale.installDate = installDate;
        targetSale.shopName = shopName;
        targetSale.notes = notes;
        targetSale.images = [...SALE_IMAGES];
        targetSale.srv1Date = srv1Date;
        targetSale.srv2Date = srv2Date;
        toast('Sale record updated successfully');
    } else {
        const newSaleId = 'SALE-2026-' + String(S.sales.length + 1).padStart(3, '0');
        const newInvId = 'INV-' + (Math.max(5000, ...S.invoices.map(i => +i.id.replace(/\D/g, '') || 0)) + 1);

        targetSale = {
            id: newSaleId,
            invId: newInvId,
            cid: cid,
            custName: custName,
            custPhone: custPhone,
            custAltPhone: custAltPhone,
            custAddress: custAddress,
            custLocality: custLocality,
            custLandmark: custLandmark,
            custPincode: custPincode,
            pid: prodObj.id,
            brand: brand,
            model: model,
            sn: sn,
            date: saleDate,
            shopName: shopName,
            installDate: installDate,
            srv1Date: srv1Date,
            srv1Status: 'Upcoming',
            srv1DoneDate: '',
            srv2Date: srv2Date,
            srv2Status: 'Upcoming',
            srv2DoneDate: '',
            images: [...SALE_IMAGES],
            notes: notes
        };
        S.sales.unshift(targetSale);

        S.invoices.unshift({
            id: newInvId,
            saleId: newSaleId,
            cid: cid,
            date: saleDate,
            shopName: shopName,
            brand: brand,
            model: model,
            sn: sn,
            pay: 'UPI',
            srv1Date: srv1Date,
            srv2Date: srv2Date
        });

        S.feed.unshift({
            id: 'EV' + Date.now(),
            t: 'Sale recorded: ' + brand + ' ' + model + ' for ' + custName,
            time: 'Just now',
            k: 'sales',
            p: 'sales/' + newSaleId
        });

        S.msgs.unshift({
            id: 'M' + Date.now(),
            cid: cid,
            saleId: newSaleId,
            ch: 'WhatsApp',
            tpl: 'AC Purchase Greeting & Warranty Confirmation',
            time: D(0),
            status: 'Delivered',
            text: 'Dear ' + custName + ', congratulations on purchasing your ' + brand + ' AC from ' + shopName + '!'
        });

        toast('AC Sale recorded and complimentary services scheduled!', 'ok');
    }

    save();
    DIRTY = false;
    go('sales/' + targetSale.id);
}

function handleCustSave() {
    const f = $('#cust-form');
    if (!f) return;
    const fd = new FormData(f);
    const custId = fd.get('cust_id');
    const name = (fd.get('name') || '').trim();
    const phone = (fd.get('phone') || '').trim();
    const altPhone = (fd.get('altPhone') || '').trim();
    const address = (fd.get('address') || '').trim();
    const locality = (fd.get('locality') || '').trim();
    const landmark = (fd.get('landmark') || '').trim();
    const pincode = (fd.get('pincode') || '').trim();
    const active = fd.get('active') !== null;

    if (!name) return toast('Please enter customer name', 'er');
    if (!phone) return toast('Please enter WhatsApp number', 'er');
    if (!address) return toast('Please enter complete address', 'er');
    if (!locality) return toast('Please enter locality', 'er');

    if (custId) {
        const c = S.customers.find(x => x.id === custId);
        if (c) {
            c.name = name;
            c.phone = phone;
            c.altPhone = altPhone;
            c.address = address;
            c.locality = locality;
            c.landmark = landmark;
            c.pincode = pincode;
            c.active = active;
        }
        toast('Customer record updated');
    } else {
        const newId = 'C' + (Math.max(100, ...S.customers.map(c => +c.id.replace(/\D/g, '') || 0)) + 1);
        S.customers.unshift({
            id: newId,
            name: name,
            phone: phone,
            altPhone: altPhone,
            address: address,
            locality: locality,
            landmark: landmark,
            pincode: pincode,
            active: active
        });
        S.feed.unshift({ id: 'EV' + Date.now(), t: 'New customer added: ' + name, time: 'Just now', k: 'customers', p: 'customers/' + newId });
        toast('Customer created successfully');
    }
    save();
    DIRTY = false;
    go('customers');
}

function handleProdSave() {
    const f = $('#prod-form');
    if (!f) return;
    const fd = new FormData(f);
    const prodId = fd.get('prod_id');
    const brand = (fd.get('brand') || '').trim();
    const model = (fd.get('model') || '').trim();
    const name = (fd.get('name') || (brand + ' ' + model)).trim();
    const capacity = fd.get('capacity') || '1.5 Ton';
    const star = fd.get('star') || '5 Star';
    const invType = fd.get('invType') || 'Inverter';
    const condenser = (fd.get('condenser') || '100% Copper').trim();
    const gas = (fd.get('gas') || 'R32').trim();
    const warranty = (fd.get('warranty') || '1 Year Comp + 10 Years Compressor').trim();
    const serials = (fd.get('serials') || '').split(',').map(s => s.trim()).filter(Boolean);

    if (!brand) return toast('Please enter brand name', 'er');
    if (!model) return toast('Please enter model number', 'er');

    if (prodId) {
        const p = S.products.find(x => x.id === prodId);
        if (p) {
            p.brand = brand;
            p.model = model;
            p.name = name;
            p.capacity = capacity;
            p.star = star;
            p.invType = invType;
            p.condenser = condenser;
            p.gas = gas;
            p.warranty = warranty;
            serials.forEach(sn => {
                p.units = p.units || [];
                if (!p.units.some(u => u.sn === sn)) p.units.push({ sn, st: 'In stock' });
            });
        }
        toast('AC Model updated');
    } else {
        const newId = 'P' + (Math.max(1000, ...S.products.map(p => +p.id.replace(/\D/g, '') || 0)) + 1);
        S.products.unshift({
            id: newId,
            brand,
            model,
            name,
            capacity,
            star,
            invType,
            condenser,
            gas,
            warranty,
            units: serials.map(sn => ({ sn, st: 'In stock' }))
        });
        toast('AC Model created');
    }
    save();
    DIRTY = false;
    go('products');
}

function handleSettingsSave() {
    const f = $('#settings-form');
    if (!f) return;
    const fd = new FormData(f);
    S.set.store = (fd.get('store') || 'Mobile Point AC Care').trim();
    S.set.branches = (fd.get('branches') || '').trim();
    S.set.addr = (fd.get('addr') || '').trim();
    S.set.phone = (fd.get('phone') || '').trim();
    S.set.email = (fd.get('email') || '').trim();
    S.set.gstin = (fd.get('gstin') || '').trim();
    S.set.srv1Days = +fd.get('srv1Days') || 120;
    S.set.srv2Days = +fd.get('srv2Days') || 330;
    S.set.leadDays = +fd.get('leadDays') || 14;
    save();
    toast('Settings saved successfully');
    render(true);
}

function handleUserPermSave() {
    const f = $('#user-perm-form');
    if (!f) return;
    const fd = new FormData(f);
    const uid = fd.get('user_id');
    const u = S.users.find(x => x.id === uid);
    if (!u) return;

    u.permissions = u.permissions || {};
    MODULE_DEFS.forEach(m => {
        u.permissions[m.id] = {
            enabled: fd.get(`mod_${m.id}_enabled`) !== null,
            view: fd.get(`mod_${m.id}_view`) !== null,
            edit: fd.get(`mod_${m.id}_edit`) !== null,
            delete: fd.get(`mod_${m.id}_delete`) !== null
        };
    });
    save();
    toast('Permissions saved for ' + u.name);
    go('users');
}

function userNewM() {
    modal(`<h1>Add Staff User</h1>
    <form id="new-user-form" novalidate onsubmit="return false">
        <div class="fg">
            <label>Full Name *
                <input name="name" required placeholder="Staff member name">
            </label>
            <label>Email *
                <input name="email" type="email" required placeholder="name@mobilepoint.in">
            </label>
            <label>Phone
                <input name="phone" placeholder="+91 98250 XXXXX">
            </label>
            <label>Role Preset
                <select name="preset">
                    ${Object.entries(PRESETS).map(([k, def]) => `<option value="${k}">${esc(def.label)}</option>`).join('')}
                </select>
            </label>
        </div>
        <div class="acts" style="margin-top:16px">
            <button class="btn" data-act="close">Cancel</button>
            <button class="btn pri" data-act="save-new-user">Create User</button>
        </div>
    </form>`);
}

document.addEventListener('click', e => {
    const t = e.target.closest('[data-act]');
    if (t) {
        act(t, e);
        return;
    }
    const upz = e.target.closest('#sale-upz');
    if (upz) {
        const fi = $('#sale-file-input');
        if (fi) fi.click();
        return;
    }
    const np = $('#np');
    if (np && !e.target.closest('#np') && !e.target.closest('#bl')) {
        npClose();
    }
});

document.addEventListener('change', e => {
    const t = e.target;
    if (t.id === 'sale-file-input' && t.files) {
        const files = [...t.files];
        files.forEach(f => {
            const r = new FileReader();
            r.onload = ev => {
                SALE_IMAGES.push(ev.target.result);
                const g = $('#sale-img-preview-grid');
                if (g) g.innerHTML = renderImageThumbnails();
            };
            r.readAsDataURL(f);
        });
        t.value = '';
    } else if (t.id === 'sale-cust-select') {
        const c = cust(t.value);
        if (c.id) {
            const scn = $('#sc_name'), scp = $('#sc_phone'), sca = $('#sc_alt'), scad = $('#sc_addr'), scl = $('#sc_loc'), sclm = $('#sc_land'), scpin = $('#sc_pin');
            if (scn) scn.value = c.name;
            if (scp) scp.value = c.phone;
            if (sca) sca.value = c.altPhone || '';
            if (scad) scad.value = c.address;
            if (scl) scl.value = c.locality || '';
            if (sclm) sclm.value = c.landmark || '';
            if (scpin) scpin.value = c.pincode || '';
        }
    } else if (t.id === 'sale-prod-select') {
        const p = S.products.find(x => x.id === t.value);
        if (p) {
            const spb = $('#sp_brand'), spm = $('#sp_model'), spc = $('#sp_cap'), sps = $('#sp_star');
            if (spb) spb.value = p.brand;
            if (spm) spm.value = p.model;
            if (spc) spc.value = p.capacity;
            if (sps) sps.value = p.star;
        }
    } else if (t.id === 'sale-date-input') {
        const d = t.value;
        if (d) {
            const p1 = $('#srv1-preview-date'), p2 = $('#srv2-preview-date');
            if (p1) p1.textContent = fd(cdd(d, S.set.srv1Days || 120));
            if (p2) p2.textContent = fd(cdd(d, S.set.srv2Days || 330));
        }
    } else if (t.id === 'camp-tpl') {
        updateCampPagePreview();
    } else if (t.id === 'camp-aud') {
        updateCampPageAudience();
    }
});

document.addEventListener('input', e => {
    if (['tpl-hdr', 'tpl-body', 'tpl-ftr', 'tpl-btn1', 'tpl-btn2', 'tpl-name'].includes(e.target.id)) {
        updateTplPageLivePreview();
    } else if (e.target.id === 'sq') {
        SQ = e.target.value;
        const main = $('#main');
        if (V.page === 'sales' && main) main.innerHTML = salesPage();
    } else if (e.target.id === 'lq') {
        V.q = e.target.value;
        V.p = 0;
        const tb = $('#tb');
        if (tb && P[V.page]) {
            const def = P[V.page];
            let rows = def.rows();
            if (V.f && V.f !== 'All' && def.chip) rows = rows.filter(r => def.chip(r, V.f));
            if (V.q.trim()) {
                const q = V.q.toLowerCase().trim();
                rows = rows.filter(r => JSON.stringify(r).toLowerCase().includes(q));
            }
            tb.innerHTML = rows.slice(0, 25).map(r => `
                <tr style="cursor:pointer" data-act="open-row" data-k="${V.page}" data-id="${r.id}">
                    ${def.cols.map(c => `<td data-label="${esc(c[0])}"${['Status', 'Permissions', 'Available Stock'].includes(c[0]) ? ' data-status="1"' : ''}>${c[1](r)}</td>`).join('')}
                </tr>
            `).join('') || `<tr><td colspan="${def.cols.length}" class="empty">No records found matching filter</td></tr>`;
        }
    } else if (e.target.id === 'gq') {
        const q = e.target.value.toLowerCase().trim();
        let existing = $('.gsr');
        if (existing) existing.remove();
        if (!q) return;
        const matches = [];
        S.customers.filter(c => c.name.toLowerCase().includes(q) || c.phone.includes(q)).slice(0, 4).forEach(c => matches.push({ t: c.name, s: 'Customer · ' + c.phone, p: 'customers/' + c.id }));
        S.products.filter(p => p.brand.toLowerCase().includes(q) || p.model.toLowerCase().includes(q)).slice(0, 4).forEach(p => matches.push({ t: p.brand + ' ' + p.model, s: 'AC Product', p: 'products/' + p.id }));
        S.sales.filter(s => s.id.toLowerCase().includes(q) || s.sn.toLowerCase().includes(q)).slice(0, 4).forEach(s => matches.push({ t: s.id + ' · ' + s.custName, s: 'Sale · S/N ' + s.sn, p: 'sales/' + s.id }));
        const r = e.target.getBoundingClientRect();
        const popup = document.createElement('div');
        popup.className = 'gsr';
        popup.style.cssText = `left:${r.left}px;top:${r.bottom + 6}px;width:${Math.max(r.width, 320)}px;position:fixed;background:var(--sf);border:1px solid var(--bd);border-radius:10px;box-shadow:0 12px 32px rgba(0,0,0,0.18);z-index:9999;max-height:360px;overflow-y:auto;padding:6px`;
        popup.innerHTML = matches.map(m => `
            <div data-act="nav" data-p="${m.p}" style="padding:8px 12px;border-radius:6px;cursor:pointer">
                <b>${esc(m.t)}</b>
                <small class="mu" style="display:block">${esc(m.s)}</small>
            </div>
        `).join('') || '<div class="mu" style="padding:10px">No matching records found</div>';
        document.body.append(popup);
    }
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeM();
        npClose();
        adClose();
        const g = $('.gsr');
        if (g) g.remove();
    }
});

window.addEventListener('resize', npPos);

document.addEventListener('submit', e => {
    if (e.target && e.target.dataset && e.target.dataset.act === 'save-new-user') {
        e.preventDefault();
        const fd = new FormData(e.target);
        const name = (fd.get('name') || '').trim();
        const email = (fd.get('email') || '').trim();
        const phone = (fd.get('phone') || '').trim();
        const preset = fd.get('preset') || 'cashier';
        if (!name || !email) return toast('Name and email are required', 'er');
        const newU = {
            id: 'U' + (S.users.length + 1),
            name,
            email,
            phone,
            status: 'Active',
            lastLogin: 'Never',
            preset,
            permissions: JSON.parse(JSON.stringify(PRESETS[preset].perms))
        };
        S.users.push(newU);
        save();
        closeM();
        toast('Staff user added');
        go('users');
    }
});

const mb = $('#mb');
if (mb) mb.innerHTML = ic('menu');
const bl = $('#bl');
if (bl) bl.innerHTML = ic('bell');
const ab = $('#ab');
if (ab) ab.innerHTML = ic('pulse');
const th = $('#th');
if (th) th.innerHTML = ic('moon');
const nb = $('#nb');
if (nb) nb.innerHTML = ic('plus') + '<span>New</span>';
const gsb = $('#gsb');
if (gsb) gsb.innerHTML = ic('search') + '<input id="gq" placeholder="Global search customers, AC models, sales, serials..." aria-label="Global search">';

V.page = location.hash.slice(1) || 'overview';
if (!NAV.some(n => n[0] === V.page.split('/')[0])) V.page = 'overview';
V.k = ['overview', 'calendar', 'reports', 'settings', 'sales', 'notifications', 'activity', 'automations'].includes(V.page.split('/')[0]) ? '' : V.page.split('/')[0];
render();

document.addEventListener('mouseover', e => {
    const r = e.target.closest && e.target.closest('.dn3');
    if (!r) return;
    const t = e.target.closest('[data-dsi]');
    dnSet(r, t ? +t.dataset.dsi : null);
});
document.addEventListener('mouseout', e => {
    const r = e.target.closest && e.target.closest('.dn3');
    if (r && !(e.relatedTarget && r.contains(e.relatedTarget))) dnSet(r, null);
});
