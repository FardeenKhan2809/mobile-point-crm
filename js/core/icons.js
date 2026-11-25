"use strict";

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
    copy: 'M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M16 4h2a2 2 0 0 1 2 2v4M21 14H11a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2z',
    arrowLeft: 'M19 12H5M12 19l-7-7 7-7'
};

const ic = n => `<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${IC[n] || IC.home}"/></svg>`;
