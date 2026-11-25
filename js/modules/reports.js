"use strict";

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
