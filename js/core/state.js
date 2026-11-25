"use strict";

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
            body: 'Special Season Offer from {{store}}! Upgrade to 5-Star Inverter ACs with heavy exchange bonus & free standard installation. Reply YES or call {{phone}} to claim your voucher!'
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
            category: 'Air Conditioner Sales & Services',
            locality: 'Alkapuri, Vadodara',
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
            header: 'Welcome to Mobile Point AC Care',
            body: 'Hello {{customer_name}},\n\nWelcome to {{store_name}}! We are delighted to register you as our valued customer. Our team is committed to delivering premier cooling comfort, genuine AC spares, and OEM authorized service support.\n\nCustomer Care: {{shop_phone}}\nLocation: {{store_address}}',
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
            header: 'AC Purchase & Warranty Confirmation',
            body: 'Dear {{customer_name}},\n\nCongratulations on your purchase of *{{brand}} {{model}}* (S/N: {{serial_number}}) from {{store_name}}!\n\nPurchase Date: {{purchase_date}}\nInstallation Date: {{install_date}}\nComplimentary Services (1st Year):\n• 1st Service: Due around {{srv1_date}} (3-5 Months)\n• 2nd Service: Due around {{srv2_date}} (Before 11 Months)\n\nPlease keep your invoice handy for authorized warranty claims.',
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
            header: '1st Free AC Service Reminder',
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
            header: '2nd Free AC Service (Warranty Due)',
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
            header: 'Summer AC Mega Exchange Blitz',
            body: 'Beat the heat with {{store_name}}! Upgrade your existing air conditioner with up to *₹8,000 Exchange Bonus* on 5-Star Inverter Split ACs (Daikin, Voltas, Hitachi, O General).\n\n• 0% Interest EMI Options\n• Free Standard Installation\n• Comprehensive 10-Yr Compressor Warranty\n\nVisit our Alkapuri showroom or WhatsApp OFFER to claim your voucher!',
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
            header: 'Monsoon AC Maintenance Guide',
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
            header: 'Welcome to Mobile Point AC Care',
            body: 'Hello {{customer_name}},\n\nWelcome to {{store_name}}! We are delighted to register you as our valued customer. Our team is committed to delivering premier cooling comfort, genuine AC spares, and OEM authorized service support.\n\nCustomer Care: {{shop_phone}}\nLocation: {{store_address}}',
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
            header: 'AC Purchase & Warranty Confirmation',
            body: 'Dear {{customer_name}},\n\nCongratulations on your purchase of *{{brand}} {{model}}* (S/N: {{serial_number}}) from {{store_name}}!\n\nPurchase Date: {{purchase_date}}\nInstallation Date: {{install_date}}\nComplimentary Services (1st Year):\n• 1st Service: Due around {{srv1_date}} (3-5 Months)\n• 2nd Service: Due around {{srv2_date}} (Before 11 Months)\n\nPlease keep your invoice handy for authorized warranty claims.',
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
            header: '1st Free AC Service Reminder',
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
            header: '2nd Free AC Service (Warranty Due)',
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
            header: 'Summer AC Mega Exchange Blitz',
            body: 'Beat the heat with {{store_name}}! Upgrade your existing air conditioner with up to *₹8,000 Exchange Bonus* on 5-Star Inverter Split ACs (Daikin, Voltas, Hitachi, O General).\n\n• 0% Interest EMI Options\n• Free Standard Installation\n• Comprehensive 10-Yr Compressor Warranty\n\nVisit our Alkapuri showroom or WhatsApp OFFER to claim your voucher!',
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
            header: 'Monsoon AC Maintenance Guide',
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

const V = { k: '', q: '', f: 'All', p: 0, page: 'overview' };
let DIRTY = false;
let SALE_IMAGES = [];

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
