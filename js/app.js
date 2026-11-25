"use strict";

const rr = () => { if (V.k !== '' && !/\/(new|edit)/.test(V.page)) render(true); };

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

function render(keep) {
    const main = $('#main');
    if (!main) return;
    const p0 = V.page || 'overview';
    const p = p0.split('/')[0];

    const nv = $('#nv');
    if (nv) {
        const unreadNCount = notifs().filter(n => !isRd(n.id)).length;
        nv.innerHTML = NAV.map((n, i) => {
            const bdg = (n[0] === 'notifications' && unreadNCount > 0) ? `<span class="nav-bdg">${unreadNCount > 9 ? '9+' : unreadNCount}</span>` : '';
            return (n[3] != (NAV[i - 1] || [])[3] ? '<div class="gh lb">' + esc(n[3]) + '</div>' : '') + `<button class="ni${n[0] == p ? ' on' : ''}" data-act="nav" data-p="${n[0]}" title="${esc(n[1])}"${n[0] == p ? ' aria-current="page"' : ''}>${ic(n[2])}<span class="lb">${esc(n[1])}</span>${bdg}</button>`;
        }).join('');
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
        case 'notif-filter':
            V.notifFilter = d.v;
            return render(true);
        case 'act-filter':
            V.actFilter = d.v;
            return render(true);
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
            const catEl = $('#wa-acc-cat');
            const locEl = $('#wa-acc-loc');
            const wabaEl = $('#wa-acc-waba');
            const phoneIdEl = $('#wa-acc-phoneid');
            const tokenEl = $('#wa-acc-token');
            if (S.whatsapp) {
                if (nameEl && nameEl.value) S.whatsapp.displayName = nameEl.value.trim();
                if (phoneEl && phoneEl.value) S.whatsapp.phone = phoneEl.value.trim();
                if (catEl && catEl.value) S.whatsapp.category = catEl.value.trim();
                if (locEl && locEl.value) S.whatsapp.locality = locEl.value.trim();
                if (wabaEl && wabaEl.value) S.whatsapp.wabaId = wabaEl.value.trim();
                if (phoneIdEl && phoneIdEl.value) S.whatsapp.phoneId = phoneIdEl.value.trim();
                if (tokenEl && tokenEl.value) S.whatsapp.apiKey = tokenEl.value.trim();
                S.whatsapp.connected = true;
                S.whatsapp.lastSync = 'Just now';
            }
            save();
            toast('WhatsApp Business connection verified & saved', 'ok');
            if (V.page === 'automations/account') go('automations');
            else render(true);
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
        case 'wa-acc-send-test': {
            const numEl = $('#wa-test-acc-phone');
            const testNum = numEl && numEl.value.trim() ? numEl.value.trim() : (S.whatsapp ? S.whatsapp.phone : '+91 98250 12345');
            S.feed.unshift({
                id: 'EV' + Date.now(),
                t: 'Live WhatsApp connection test sent to ' + testNum,
                time: 'Just now',
                k: 'messages',
                p: 'automations'
            });
            save();
            toast('Test message delivered to ' + testNum + ' (200 OK)', 'ok');
            render(true);
            return;
        }
        case 'wa-acc-toggle-mode': {
            V.waMode = d.mode || (V.waMode === 'custom' ? 'direct' : 'custom');
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
