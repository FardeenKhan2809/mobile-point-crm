"use strict";

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

    const brandCounts = {};
    S.sales.forEach(s => {
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
    S.sales.forEach(s => {
        const ym = (s.date || '').slice(0, 7);
        if (monthBuckets[ym] !== undefined) monthBuckets[ym]++;
    });
    const trendItems = last6Months.map(m => ({
        l: m.label,
        fl: m.ym,
        v: monthBuckets[m.ym] || 0,
        t: m.label + ' Sales'
    }));

    const srv1Done = S.sales.filter(s => s.srv1Status === 'Completed').length;
    const srv2Done = S.sales.filter(s => s.srv2Status === 'Completed').length;
    const totalSrvDone = srv1Done + srv2Done;
    const totalSrvScheduled = S.sales.length * 2;
    const complianceRate = totalSrvScheduled > 0 ? Math.round((totalSrvDone / totalSrvScheduled) * 100) : 100;

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
    <div class="db-header">
        <div class="db-header-info">
            <div class="db-header-title">
                <h1>Dashboard</h1>
                <span class="db-status-pill"><i></i>Live Operations</span>
            </div>
            <p class="db-header-sub">${esc(S.set.store)} · AC Sales, Warranty Service Schedules &amp; Automated Care</p>
        </div>
        <div class="db-header-acts">
            <button class="btn" data-act="nav" data-p="calendar">${ic('cal')} Service Calendar</button>
            <button class="btn pri" data-act="nav" data-p="sales/new">${ic('plus')} Record AC Sale</button>
        </div>
    </div>

    <div class="kp k4" style="margin-bottom:20px">
        <div class="k clickable" data-act="nav" data-p="sales">
            <div class="k-top"><span>Total AC Sales</span><div class="k-ico">${ic('cart')}</div></div>
            <div class="k-mid"><b>${totalSales}</b><span class="k-badge ok">Active</span></div>
            <small>Units recorded in system registry</small>
        </div>
        <div class="k clickable" data-act="nav" data-p="sales">
            <div class="k-top"><span>Pending Installations</span><div class="k-ico amber">${ic('wrench')}</div></div>
            <div class="k-mid"><b style="color:var(--wa)">${pendingInstall}</b><span class="k-badge ${pendingInstall > 0 ? 'wa' : 'ok'}">${pendingInstall > 0 ? 'Pending' : 'Done'}</span></div>
            <small>Units awaiting brand OEM technician</small>
        </div>
        <div class="k clickable" data-act="nav" data-p="calendar">
            <div class="k-top"><span>1st Service Due</span><div class="k-ico amber">${ic('bell')}</div></div>
            <div class="k-mid"><b style="color:var(--wa)">${srv1Due}</b><span class="k-badge ${srv1Due > 0 ? 'wa' : 'ok'}">${srv1Due > 0 ? '30 Days' : 'Clear'}</span></div>
            <small>Complimentary 3 to 5 month window</small>
        </div>
        <div class="k clickable" data-act="nav" data-p="reports">
            <div class="k-top"><span>Warranty Compliance</span><div class="k-ico green">${ic('check')}</div></div>
            <div class="k-mid"><b style="color:var(--ok)">${complianceRate}%</b><span class="k-badge ok">${totalSrvDone}/${totalSrvScheduled}</span></div>
            <small>Free service milestones completed</small>
        </div>
    </div>

    <div class="panel pad" style="margin-bottom:20px">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
            <div>
                <h2 style="margin:0 0 2px;font-size:16px">Quick Actions &amp; Workflows</h2>
                <small class="mu">Fast shortcuts to record sales, register buyers, and launch campaigns</small>
            </div>
            <button class="btn sm" data-act="new">${ic('plus')} Action Menu</button>
        </div>
        <div class="qa-card-grid">
            <div class="qa-item blue" data-act="nav" data-p="sales/new">
                <div class="qa-ico blue">${ic('plus')}</div>
                <div class="qa-meta">
                    <b>Record AC Sale</b>
                    <small>Customer, AC specs &amp; serial #</small>
                </div>
                <span class="qa-badge">Sale</span>
            </div>
            <div class="qa-item green" data-act="nav" data-p="customers/new">
                <div class="qa-ico green">${ic('users')}</div>
                <div class="qa-meta">
                    <b>Add Customer</b>
                    <small>Name, WhatsApp &amp; address</small>
                </div>
                <span class="qa-badge">Buyer</span>
            </div>
            <div class="qa-item amber" data-act="nav" data-p="calendar">
                <div class="qa-ico amber">${ic('cal')}</div>
                <div class="qa-meta">
                    <b>Service Calendar</b>
                    <small>1st &amp; 2nd service milestones</small>
                </div>
                <span class="qa-badge">Dates</span>
            </div>
            <div class="qa-item purple" data-act="nav" data-p="automations/broadcasts/new">
                <div class="qa-ico purple">${ic('zap')}</div>
                <div class="qa-meta">
                    <b>WhatsApp Broadcast</b>
                    <small>Instant message to buyers</small>
                </div>
                <span class="qa-badge">Blast</span>
            </div>
        </div>
    </div>

    <div class="dgr" style="margin-bottom:20px">
        <div class="panel">
            <div class="hd" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
                <div>
                    <h2>Monthly AC Sales Trend</h2>
                    <span class="mu" style="font-size:12px">${trendItems.reduce((a, b) => a + b.v, 0)} units recorded across 6 months</span>
                </div>
                <button class="btn sm" data-act="nav" data-p="reports">Detailed Reports</button>
            </div>
            ${dchart(trendItems, { fmt: n => n + ' units', ax: v => String(v) })}
        </div>

        <div class="panel">
            <div class="hd" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
                <div>
                    <h2>Brand Market Share</h2>
                    <span class="mu" style="font-size:12px">${donutItems.length} active AC brands in store</span>
                </div>
                <button class="btn sm" data-act="nav" data-p="products">AC Catalog</button>
            </div>
            ${donut(donutItems, n => n + ' units', 'Total ACs')}
        </div>
    </div>

    <div class="db-grid">
        <div class="panel">
            <div class="hd" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
                <div>
                    <h2>Upcoming AC Services</h2>
                    <span class="mu" style="font-size:12px">Free warranty milestones &amp; technician reminders</span>
                </div>
                <div style="display:flex;align-items:center;gap:6px">
                    <span class="tag-pill" style="font-weight:600;color:var(--ac)"><i style="width:6px;height:6px;border-radius:50%;background:var(--ac);display:inline-block;margin-right:4px"></i>${upcomingServices.length} Milestones</span>
                    <button class="btn sm" data-act="nav" data-p="calendar">${ic('cal')} Calendar</button>
                </div>
            </div>
            <div class="srv-list">
                ${upcomingServices.slice(0, 6).map(u => {
                    const diffDays = Math.round((new Date(u.date + 'T00:00:00Z') - new Date(D(0) + 'T00:00:00Z')) / 864e5);
                    const dueText = diffDays === 0 ? 'Due Today' : diffDays > 0 ? `In ${diffDays}d` : `${Math.abs(diffDays)}d Overdue`;
                    const dueCls = diffDays < 0 ? 'er' : diffDays <= 30 ? 'wa' : 'ok';
                    return `<div class="srv-card" data-act="nav" data-p="sales/${u.sale.id}">
                        <div class="srv-card-top">
                            <div class="srv-cust">
                                <span class="av sm">${esc(ini(u.cust.name))}</span>
                                <div class="srv-cust-info">
                                    <b class="srv-cust-name">${esc(u.cust.name)}</b>
                                    <span class="srv-cust-sub">${esc(u.cust.phone)} · ${esc(u.cust.locality || 'Vadodara')}</span>
                                </div>
                            </div>
                            <div class="srv-badge-wrap">
                                ${srvBadge(u.status, u.date)}
                                <span class="srv-countdown ${dueCls}">${dueText}</span>
                            </div>
                        </div>
                        <div class="srv-card-body">
                            <div class="srv-ac-info">
                                <span class="srv-brand-pill">${esc(u.sale.brand)}</span>
                                <span class="srv-model">${esc(u.sale.model)}</span>
                                <span class="srv-sn">S/N: ${esc(u.sale.sn)}</span>
                            </div>
                            <div class="srv-sched-info">
                                <span class="srv-type-pill ${u.type.startsWith('1st') ? 'srv1' : 'srv2'}">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z"/></svg>
                                    ${esc(u.type)}
                                </span>
                                <span class="srv-date">${ic('cal')} Due: <b>${fd(u.date)}</b></span>
                            </div>
                        </div>
                        <div class="srv-card-foot" onclick="event.stopPropagation()">
                            <span class="srv-technician"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> OEM Brand Technician</span>
                            <button class="btn sm wa-btn" data-act="wa-remind" data-id="${u.sale.id}" data-type="${u.type.startsWith('1st') ? '1' : '2'}">
                                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                                Send WhatsApp Reminder
                            </button>
                        </div>
                    </div>`;
                }).join('') || '<div class="empty">No services due at this moment</div>'}
            </div>
        </div>

        <div class="panel">
            <div class="hd" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
                <div>
                    <h2>Recent AC Sales</h2>
                    <span class="mu" style="font-size:12px">Latest registered installations &amp; invoices</span>
                </div>
                <button class="btn sm" data-act="nav" data-p="sales">View All Sales</button>
            </div>
            <div class="sale-list">
                ${S.sales.slice(0, 6).map(s => `
                    <div class="sale-card" data-act="nav" data-p="sales/${s.id}">
                        <div class="sale-card-top">
                            <div class="sale-cust">
                                <span class="av sm" style="background:color-mix(in srgb,var(--ok) 14%,var(--sf));color:var(--ok)">${esc(ini(s.custName))}</span>
                                <div>
                                    <b class="sale-cust-name">${esc(s.custName)}</b>
                                    <span class="sale-cust-sub">${fd(s.date)} · ${esc(s.custLocality || s.shopName)}</span>
                                </div>
                            </div>
                            <span class="b ok">Recorded</span>
                        </div>
                        <div class="sale-card-body">
                            <div style="display:flex;align-items:center;gap:6px">
                                <span class="srv-brand-pill">${esc(s.brand)}</span>
                                <span style="font-weight:600;color:var(--tx)">${esc(s.model)}</span>
                            </div>
                            <small class="mu" style="font-family:monospace">S/N: ${esc(s.sn)}</small>
                            ${(s.images || []).length > 0 ? `<span class="tag-pill">${s.images.length} photos</span>` : '<span class="mu" style="font-size:11px">No photos</span>'}
                        </div>
                    </div>
                `).join('') || '<div class="empty">No sales recorded yet</div>'}
            </div>
        </div>
    </div>
</div>`;
}
