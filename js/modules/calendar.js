"use strict";

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
