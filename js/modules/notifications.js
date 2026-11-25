"use strict";

function notifs() {
    const list = [];
    (S.sales || []).forEach(s => {
        const c = cust(s.cid);
        const cName = c ? c.name : (s.custName || 'Customer');
        const cPhone = c ? c.phone : (s.custPhone || '');
        const todayStr = D(0);
        if (s.srv1Status !== 'Completed' && s.srv1Date) {
            const diff1 = Math.round((new Date(s.srv1Date + 'T00:00:00Z') - new Date(todayStr + 'T00:00:00Z')) / 864e5);
            if (diff1 <= 30) {
                list.push({
                    id: 'N-S1-' + s.id,
                    cat: 'Services',
                    t: '1st AC Service Due: ' + cName,
                    sub: s.brand + ' ' + s.model + ' (S/N: ' + s.sn + ') due ' + fd(s.srv1Date),
                    time: fd(s.srv1Date),
                    diff: diff1,
                    custName: cName,
                    custPhone: cPhone,
                    brand: s.brand,
                    model: s.model,
                    sn: s.sn,
                    saleId: s.id,
                    type: '1st Service (3-5 Mo)',
                    go: ['sales/' + s.id]
                });
            }
        }
        if (s.srv2Status !== 'Completed' && s.srv2Date) {
            const diff2 = Math.round((new Date(s.srv2Date + 'T00:00:00Z') - new Date(todayStr + 'T00:00:00Z')) / 864e5);
            if (diff2 <= 30) {
                list.push({
                    id: 'N-S2-' + s.id,
                    cat: 'Services',
                    t: '2nd AC Service Due: ' + cName,
                    sub: s.brand + ' ' + s.model + ' (S/N: ' + s.sn + ') due ' + fd(s.srv2Date),
                    time: fd(s.srv2Date),
                    diff: diff2,
                    custName: cName,
                    custPhone: cPhone,
                    brand: s.brand,
                    model: s.model,
                    sn: s.sn,
                    saleId: s.id,
                    type: '2nd Service (<11 Mo)',
                    go: ['sales/' + s.id]
                });
            }
        }
        if (!s.installDate || s.installDate >= todayStr) {
            const diffIns = s.installDate ? Math.round((new Date(s.installDate + 'T00:00:00Z') - new Date(todayStr + 'T00:00:00Z')) / 864e5) : 0;
            list.push({
                id: 'N-INS-' + s.id,
                cat: 'Sales',
                t: 'Pending Installation: ' + cName,
                sub: s.brand + ' ' + s.model + ' · Scheduled ' + (s.installDate ? fd(s.installDate) : 'Pending'),
                time: s.installDate ? fd(s.installDate) : fd(s.date),
                diff: diffIns,
                custName: cName,
                custPhone: cPhone,
                brand: s.brand,
                model: s.model,
                sn: s.sn,
                saleId: s.id,
                type: 'Installation Alert',
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
    if (innerWidth <= 820) {
        p.style.top = '58px';
        p.style.left = '8px';
        p.style.right = '8px';
        p.style.width = 'calc(100vw - 16px)';
        p.style.maxWidth = 'calc(100vw - 16px)';
        return;
    }
    const r = b.getBoundingClientRect(), w = 380;
    p.style.top = (r.bottom + 8) + 'px';
    p.style.left = Math.max(12, Math.min(r.right - w, innerWidth - w - 12)) + 'px';
    p.style.width = w + 'px';
    p.style.maxWidth = '380px';
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
    const p = document.createElement('div');
    p.id = 'np';
    p.className = 'np';
    p.setAttribute('role', 'dialog');
    p.setAttribute('aria-label', 'Notifications');

    const filteredN = allN.filter(n => NT === 'All' || n.cat === NT || (NT === 'Unread' && !isRd(n.id)));

    p.innerHTML = `<div class="np-h">
        <b>Notifications</b>
        <div style="display:flex;align-items:center;gap:6px">
            <button class="btn sm" data-act="nall">Mark read</button>
            <button class="ib sm" data-act="close-np" aria-label="Close" style="font-size:20px;line-height:1;width:28px;height:28px">×</button>
        </div>
    </div>
    <div class="tabs" style="padding:6px 12px 0">
        ${['All', 'Services', 'Sales'].map(t => `<button type="button" class="${NT === t ? 'on' : ''}" data-act="ntab" data-v="${t}">${t}</button>`).join('')}
    </div>
    <div class="np-l">
        ${filteredN.map(n => `
            <div class="li${isRd(n.id) ? '' : ' unread'}" data-act="nread" data-id="${n.id}" data-p="${n.go[0]}" style="cursor:pointer;padding:10px 14px">
                <div style="flex:1;min-width:0">
                    <div style="display:flex;align-items:center;gap:6px">
                        <b>${esc(n.t)}</b>
                        ${isRd(n.id) ? '' : '<span class="b ok">New</span>'}
                    </div>
                    <small style="display:block;margin-top:2px">${esc(n.sub)}</small>
                </div>
                <small class="mu" style="flex:none">${esc(n.time)}</small>
            </div>
        `).join('') || '<div class="empty">No notifications</div>'}
    </div>
    <div class="np-f">
        <button class="btn sm" data-act="nav" data-p="notifications" style="width:100%;justify-content:center">View full notifications page</button>
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
    const unreadCount = allN.filter(n => !isRd(n.id)).length;
    const servCount = allN.filter(n => n.cat === 'Services').length;
    const insCount = allN.filter(n => n.cat === 'Sales').length;

    const curF = V.notifFilter || 'All';
    const filteredN = allN.filter(n => {
        if (curF === 'Unread') return !isRd(n.id);
        if (curF === 'Services') return n.cat === 'Services';
        if (curF === 'Sales') return n.cat === 'Sales';
        return true;
    });

    return `<div class="pg">
        <div class="ph">
            <div>
                <h1>Notifications</h1>
                <p>Service milestones, upcoming free warranty visits, and pending installation alerts.</p>
            </div>
            <button class="btn" data-act="nall">${ic('check')} Mark All as Read</button>
        </div>
        <div class="bar">
            <div class="chips">
                <button class="chip${curF === 'All' ? ' on' : ''}" data-act="notif-filter" data-v="All">All (${allN.length})</button>
                <button class="chip${curF === 'Unread' ? ' on' : ''}" data-act="notif-filter" data-v="Unread">Unread (${unreadCount})</button>
                <button class="chip${curF === 'Services' ? ' on' : ''}" data-act="notif-filter" data-v="Services">Services (${servCount})</button>
                <button class="chip${curF === 'Sales' ? ' on' : ''}" data-act="notif-filter" data-v="Sales">Installations (${insCount})</button>
            </div>
        </div>
        <div class="panel">
            ${filteredN.map(n => {
                const rd = isRd(n.id);
                const cleanPhone = (n.custPhone || '').replace(/\D/g, '');
                const waUrl = cleanPhone ? 'https://wa.me/' + cleanPhone + '?text=' + encodeURIComponent('Hello ' + n.custName + ', message from ' + S.set.store + ' regarding your AC ' + n.type + ' due on ' + n.time) : '';
                return `<div class="li${rd ? '' : ' unread'}" style="cursor:pointer;padding:12px 16px" data-act="nav" data-p="${n.go[0]}">
                    <div style="flex:1;min-width:0">
                        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                            <b>${esc(n.t)}</b>
                            ${rd ? '' : '<span class="b ok">New</span>'}
                            <span class="tag-pill">${esc(n.cat)}</span>
                            <span class="tag-pill">${esc(n.type)}</span>
                        </div>
                        <small style="display:block;margin-top:3px">${esc(n.sub)}</small>
                        <small class="mu" style="display:block;margin-top:2px">Scheduled: <b>${esc(n.time)}</b>${n.custPhone ? ' · ' + esc(n.custPhone) : ''}</small>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;flex:none">
                        ${waUrl ? `<a class="btn sm" href="${waUrl}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${ic('msg')} WhatsApp</a>` : ''}
                        <button class="btn sm" data-act="nav" data-p="${n.go[0]}">Open Sale</button>
                    </div>
                </div>`;
            }).join('') || '<div class="empty">All clear, no notifications matching current filter.</div>'}
        </div>
    </div>`;
}

function feed() {
    return S.feed || [];
}

const adHTML = () => {
    const list = feed();
    return `<div class="ad-h">
        <b>Recent Activity</b>
        <button class="ib" data-act="adx" aria-label="Close activity" title="Close" style="font-size:20px;line-height:1">×</button>
    </div>
    <div class="ad-l">
        ${list.map(f => `
            <div class="li" style="cursor:pointer;padding:10px 14px" data-act="nav" data-p="${f.p || 'sales'}">
                <div style="flex:1;min-width:0">
                    <b>${esc(f.t)}</b>
                    <small class="mu" style="display:block;margin-top:2px">${esc(f.time)} · Event ID: ${esc(f.id)}</small>
                </div>
                <span class="tag-pill" style="flex:none">${esc(f.k || 'system')}</span>
            </div>
        `).join('') || '<div class="empty">No recent activity</div>'}
    </div>
    <div class="np-f">
        <button class="btn sm" data-act="nav" data-p="activity" style="width:100%;justify-content:center">Open full activity page</button>
    </div>`;
};

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
    const list = feed();
    const curF = V.actFilter || 'All';
    const salesCount = list.filter(f => f.k === 'sales').length;
    const msgCount = list.filter(f => f.k === 'messages' || f.k === 'whatsapp').length;
    const calCount = list.filter(f => f.k === 'calendar').length;

    const filtered = list.filter(f => {
        if (curF === 'sales') return f.k === 'sales';
        if (curF === 'messages') return f.k === 'messages' || f.k === 'whatsapp';
        if (curF === 'calendar') return f.k === 'calendar';
        return true;
    });

    return `<div class="pg">
        <div class="ph">
            <div>
                <h1>Activity</h1>
                <p>Chronological feed of recorded AC sales, customer additions, and WhatsApp automations.</p>
            </div>
        </div>
        <div class="bar">
            <div class="chips">
                <button class="chip${curF === 'All' ? ' on' : ''}" data-act="act-filter" data-v="All">All Events (${list.length})</button>
                <button class="chip${curF === 'sales' ? ' on' : ''}" data-act="act-filter" data-v="sales">Sales (${salesCount})</button>
                <button class="chip${curF === 'messages' ? ' on' : ''}" data-act="act-filter" data-v="messages">WhatsApp (${msgCount})</button>
                <button class="chip${curF === 'calendar' ? ' on' : ''}" data-act="act-filter" data-v="calendar">Services (${calCount})</button>
            </div>
        </div>
        <div class="panel">
            ${filtered.map(f => `
                <div class="li" style="padding:12px 16px;cursor:pointer" data-act="nav" data-p="${f.p || 'sales'}">
                    <div style="flex:1;min-width:0">
                        <b>${esc(f.t)}</b>
                        <small class="mu" style="display:block;margin-top:2px">${esc(f.time)} · Event ID: ${esc(f.id)}</small>
                    </div>
                    <div style="display:flex;align-items:center;gap:8px;flex:none">
                        <span class="tag-pill">${esc(f.k || 'system')}</span>
                        <button class="btn sm" data-act="nav" data-p="${f.p || 'sales'}">View →</button>
                    </div>
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
