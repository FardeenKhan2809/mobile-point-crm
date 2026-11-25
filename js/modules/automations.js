"use strict";

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
        header: 'Special AC Care Alert',
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
                <button class="btn sm" data-act="nav" data-p="automations" style="margin-bottom:8px">${ic('arrowLeft')} Back</button>
                <h1>Create Template</h1>
            </div>
        </div>
        <div class="wa-creator-grid">
            <div class="panel pad">
                <div class="fg">
                    <label>Template Name
                        <input id="tpl-name" placeholder="e.g. ac_service_reminder" value="ac_service_special_offer">
                    </label>
                    <div class="g g2">
                        <label>Category
                            <select id="tpl-cat" class="shadcn-select">
                                <option value="UTILITY" selected>Utility (Service &amp; Care)</option>
                                <option value="MARKETING">Marketing (Promotions)</option>
                                <option value="AUTHENTICATION">Authentication (OTP)</option>
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
                    <label>Header (Optional)
                        <input id="tpl-hdr" placeholder="e.g. AC Maintenance Alert" value="Special AC Care Alert">
                    </label>
                    <label>Body
                        <textarea id="tpl-body" rows="5">Hello {{customer_name}}, gentle reminder from {{store_name}}: Ensure your {{brand}} AC (S/N: {{serial_number}}) is ready for optimal cooling. Call {{shop_phone}} to book your OEM technician visit!</textarea>
                    </label>
                    <div>
                        <span class="mu" style="font-size:12px;display:block;margin-bottom:6px;font-weight:600">Insert Variable</span>
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
                    <label>Footer (Optional)
                        <input id="tpl-ftr" placeholder="e.g. Mobile Point AC Care" value="Mobile Point AC Care • Authorized Sales &amp; Support">
                    </label>
                    <div class="g g2">
                        <label>Button 1
                            <input id="tpl-btn1" placeholder="e.g. Confirm Service" value="Confirm Service">
                        </label>
                        <label>Button 2
                            <input id="tpl-btn2" placeholder="e.g. Call Support" value="Call Support">
                        </label>
                    </div>
                </div>
                <div class="sticky-form-acts">
                    <button class="btn" data-act="nav" data-p="automations">Cancel</button>
                    <button class="btn pri" data-act="wa-submit-tpl">${ic('check')} Save Template</button>
                </div>
            </div>
            <div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                    <span class="mu" style="font-size:12px;font-weight:600">Preview</span>
                    <span class="tag-pill" style="font-size:11px">Live</span>
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
                <button class="btn sm" data-act="nav" data-p="automations" style="margin-bottom:8px">${ic('arrowLeft')} Back</button>
                <h1>New Broadcast</h1>
            </div>
        </div>
        <div class="wa-creator-grid">
            <div class="panel pad">
                <div class="fg">
                    <label>Campaign Name
                        <input id="camp-name" placeholder="e.g. Summer Free Service Drive 2026" value="AC Service Drive ${fd(D(0))}">
                    </label>
                    <label>Template
                        <select id="camp-tpl" class="shadcn-select">
                            ${tpls.map(t => `<option value="${t.id}" ${t.id === selectedTplId ? 'selected' : ''}>${esc(t.name)} (${esc(t.cat)})</option>`).join('')}
                        </select>
                    </label>
                    <label>Target Audience
                        <select id="camp-aud" class="shadcn-select">
                            <option value="all">All Registered Customers (${S.customers.length})</option>
                            <option value="srv1_due">1st AC Service Due (Next 30 Days)</option>
                            <option value="srv2_due">2nd AC Service Due (Next 30 Days)</option>
                            <option value="brand_daikin">Daikin AC Owners</option>
                            <option value="brand_voltas">Voltas AC Owners</option>
                            <option value="brand_hitachi">Hitachi AC Owners</option>
                            <option value="alkapuri">Alkapuri Locality Customers</option>
                        </select>
                    </label>
                    <div id="camp-matched-info" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:var(--sf);border:1px solid var(--bd);border-radius:var(--r);font-size:13px">
                        <div><b>${S.customers.length}</b> recipients selected</div>
                        <span class="b ok">Eligible</span>
                    </div>
                    <div class="g g2">
                        <label>Timing
                            <select id="camp-sched" class="shadcn-select">
                                <option value="now" selected>Send Immediately</option>
                                <option value="sched">Schedule Tomorrow 10:00 AM</option>
                            </select>
                        </label>
                        <label>Dispatch Rate
                            <select id="camp-throttle" class="shadcn-select">
                                <option value="safe" selected>Standard (30 msg / min)</option>
                                <option value="fast">High Speed (100 msg / min)</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div class="sticky-form-acts">
                    <button class="btn" data-act="nav" data-p="automations">Cancel</button>
                    <button class="btn pri" data-act="wa-launch-camp-page">${ic('send')} Launch Broadcast</button>
                </div>
            </div>
            <div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                    <span class="mu" style="font-size:12px;font-weight:600">Preview</span>
                    <span class="tag-pill" style="font-size:11px">Live</span>
                </div>
                <div id="camp-live-phone-preview">${renderWABubble(currentTpl, {}, true)}</div>
            </div>
        </div>
    </div>`;
}

function renderWhatsAppAccountSetup(isSubPage) {
    const wa = S.whatsapp || {
        connected: true,
        phone: '+91 98250 12345',
        displayName: S.set.store,
        category: 'Air Conditioner Sales & Services',
        locality: 'Alkapuri, Vadodara',
        qualityRating: 'HIGH',
        dailyLimit: '10,000 / day (Tier 2)',
        lastSync: 'Just now'
    };
    const isCustom = V.waMode === 'custom';

    const statusBanner = wa.connected ? `<div class="panel pad" style="margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
        <div style="display:flex;align-items:center;gap:12px">
            <div style="width:38px;height:38px;border-radius:10px;background:#25d366;color:#fff;display:flex;align-items:center;justify-content:center;flex:none">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div>
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                    <b>${esc(wa.displayName || S.set.store)}</b>
                    <span class="b ok">${ic('check')} Connected</span>
                    <span class="mu" style="font-size:12.5px">${esc(wa.phone)}</span>
                </div>
            </div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
            <button class="btn sm" data-act="wa-acc-ping">${ic('refresh')} Ping Test</button>
            <button class="btn sm" data-act="wa-acc-disc" style="color:var(--er)">Disconnect</button>
        </div>
    </div>` : `<div class="panel pad" style="margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
        <div style="display:flex;align-items:center;gap:12px">
            <div style="width:38px;height:38px;border-radius:10px;background:var(--sf);color:var(--er);display:flex;align-items:center;justify-content:center;flex:none;border:1px solid var(--bd)">
                ${ic('zap')}
            </div>
            <div>
                <b>WhatsApp Gateway Disconnected</b>
                <div class="mu" style="font-size:12px">Enter store details below to activate WhatsApp messaging.</div>
            </div>
        </div>
    </div>`;

    const mainBody = `<div class="g g2">
        <div class="panel pad">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
                <div style="width:32px;height:32px;border-radius:8px;background:#25d366;color:#fff;display:flex;align-items:center;justify-content:center;flex:none">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <div>
                    <b>Business Profile &amp; Number</b>
                </div>
            </div>

            <div class="fg">
                <label>Business Name
                    <input id="wa-acc-name" value="${esc(wa.displayName || S.set.store)}" placeholder="e.g. Mobile Point AC Care">
                </label>
                <label>WhatsApp Number
                    <input id="wa-acc-phone" value="${esc(wa.phone)}" placeholder="e.g. +91 98250 12345">
                </label>
                <label>Category
                    <select id="wa-acc-cat" class="shadcn-select">
                        <option value="Air Conditioner Sales &amp; Services" ${(!wa.category || wa.category === 'Air Conditioner Sales & Services') ? 'selected' : ''}>Air Conditioner Sales &amp; Services</option>
                        <option value="Consumer Electronics &amp; Appliances" ${wa.category === 'Consumer Electronics & Appliances' ? 'selected' : ''}>Consumer Electronics &amp; Appliances</option>
                        <option value="HVAC Technical Contracting" ${wa.category === 'HVAC Technical Contracting' ? 'selected' : ''}>HVAC Technical Contracting</option>
                        <option value="Multi-brand AC Showroom &amp; Spares" ${wa.category === 'Multi-brand AC Showroom & Spares' ? 'selected' : ''}>Multi-brand AC Showroom &amp; Spares</option>
                    </select>
                </label>
                <label>Locality / City
                    <input id="wa-acc-loc" value="${esc(wa.locality || 'Alkapuri, Vadodara')}" placeholder="e.g. Alkapuri, Vadodara">
                </label>

                <div>
                    <span class="mu" style="font-size:12px;font-weight:600;display:block;margin-bottom:8px">Connection Mode</span>
                    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:8px">
                        <div class="wa-opt-card ${!isCustom ? 'selected' : ''}" data-act="wa-acc-toggle-mode" data-mode="direct">
                            <span class="wa-opt-radio"></span>
                            <div>
                                <b style="font-size:13px;display:block">Cloud Gateway</b>
                                <span class="mu" style="font-size:11px">Direct instant connection</span>
                            </div>
                        </div>
                        <div class="wa-opt-card ${isCustom ? 'selected' : ''}" data-act="wa-acc-toggle-mode" data-mode="custom">
                            <span class="wa-opt-radio"></span>
                            <div>
                                <b style="font-size:13px;display:block">Custom Meta API</b>
                                <span class="mu" style="font-size:11px">Own WABA &amp; API credentials</span>
                            </div>
                        </div>
                    </div>
                </div>

                ${isCustom ? `<div class="panel pad" style="background:var(--bg);margin-top:6px">
                    <label>WABA ID
                        <input id="wa-acc-waba" value="${esc(wa.wabaId || 'WABA-919825012345')}" placeholder="WABA-XXXXXXXXXXXX">
                    </label>
                    <label style="margin-top:8px">Phone Number ID
                        <input id="wa-acc-phoneid" value="${esc(wa.phoneId || '104829104928192')}" placeholder="Phone Number ID">
                    </label>
                    <label style="margin-top:8px">Access Token
                        <input id="wa-acc-token" type="password" value="${esc(wa.apiKey || 'wa_cloud_sec_9942a7b8e10d48f6820c7e2b144fae93')}" placeholder="Bearer Token">
                    </label>
                </div>` : ''}
            </div>

            <div class="acts" style="margin-top:18px">
                <button class="btn pri" data-act="wa-acc-save">${ic('check')} Save &amp; Connect</button>
                <button class="btn" data-act="wa-acc-ping">${ic('refresh')} Ping Test</button>
            </div>
        </div>

        <div class="panel pad" style="display:flex;flex-direction:column;justify-content:space-between;gap:16px">
            <div>
                <b>Gateway Telemetry</b>
                <div class="panel pad" style="background:var(--sf);margin:12px 0 16px">
                    <div class="wa-status-row">
                        <span class="mu">Status</span>
                        <b style="color:#10b981;display:inline-flex;align-items:center;gap:6px">
                            <span class="wa-pulse"></span> Active
                        </b>
                    </div>
                    <div class="wa-status-row">
                        <span class="mu">Quality</span>
                        <b style="color:#10b981">${esc(wa.qualityRating || 'HIGH')}</b>
                    </div>
                    <div class="wa-status-row">
                        <span class="mu">Daily Limit</span>
                        <b>${esc(wa.dailyLimit || '10,000 / day')}</b>
                    </div>
                    <div class="wa-status-row">
                        <span class="mu">WABA ID</span>
                        <span class="tag-pill" style="font-family:monospace;font-size:11px">${esc(wa.wabaId || 'WABA-919825012345')}</span>
                    </div>
                    <div class="wa-status-row">
                        <span class="mu">Last Sync</span>
                        <b>${esc(wa.lastSync || 'Just now')}</b>
                    </div>
                </div>

                <b>Test Message</b>
                <div class="mu" style="font-size:12px;margin-bottom:8px">Send test ping to verify handset delivery</div>
                <div class="fg" style="margin-bottom:12px">
                    <label>Recipient Phone
                        <div style="display:flex;gap:8px">
                            <input id="wa-test-acc-phone" value="${esc(wa.phone || '+91 98250 12345')}" placeholder="+91 9XXXXXXXXX">
                            <button class="btn pri sm" data-act="wa-acc-send-test" style="flex:none">${ic('send')} Test</button>
                        </div>
                    </label>
                </div>
            </div>

            <div style="border-top:1px solid var(--bd);padding-top:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
                <span class="mu" style="font-size:11.5px">Cloud SLA: 99.9% Uptime</span>
                <button class="btn sm" data-act="wa-acc-disc" style="color:var(--er)">Disconnect</button>
            </div>
        </div>
    </div>`;

    if (isSubPage) {
        return `<div class="pg">
            <div class="ph">
                <div>
                    <button class="btn sm" data-act="nav" data-p="automations" style="margin-bottom:8px">${ic('arrowLeft')} Back</button>
                    <h1>WhatsApp Setup</h1>
                </div>
            </div>
            ${statusBanner}
            ${mainBody}
        </div>`;
    }

    return `<div>
        ${statusBanner}
        ${mainBody}
    </div>`;
}

function waAccountPage() {
    return renderWhatsAppAccountSetup(true);
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

    const count = [...new Set(matched.filter(Boolean))].length;
    info.innerHTML = `<div><b>${count}</b> recipients selected</div>
    <span class="b ${count > 0 ? 'ok' : 'wa'}">${count > 0 ? 'Eligible' : 'None matched'}</span>`;
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

    const tabsBar = `<div class="seg-nav" style="margin-bottom:20px">
        <button class="seg-btn ${V.waTab === 'campaigns' ? 'active' : ''}" data-act="wa-tab" data-tab="campaigns">${ic('send')} Campaigns <span class="seg-badge">${totalCamps}</span></button>
        <button class="seg-btn ${V.waTab === 'templates' ? 'active' : ''}" data-act="wa-tab" data-tab="templates">${ic('file')} Templates <span class="seg-badge">${(S.templates || []).length}</span></button>
        <button class="seg-btn ${V.waTab === 'workflows' ? 'active' : ''}" data-act="wa-tab" data-tab="workflows">${ic('zap')} Triggers <span class="seg-badge">${(S.automations || []).length}</span></button>
        <button class="seg-btn ${V.waTab === 'gateway' ? 'active' : ''}" data-act="wa-tab" data-tab="gateway">${ic('gear')} WhatsApp Setup</button>
    </div>`;

    let content = '';

    if (V.waTab === 'campaigns') {
        const kpis = `<div class="g g4" style="margin-bottom:20px">
            <div class="wa-stat-card">
                <span class="mu" style="font-size:12px">Total Broadcasts</span>
                <b>${totalCamps}</b>
                <span class="tag-pill" style="align-self:flex-start">All time</span>
            </div>
            <div class="wa-stat-card">
                <span class="mu" style="font-size:12px">Messages Sent</span>
                <b>${totalMsgsSent.toLocaleString('en-IN')}</b>
                <span class="b ok" style="align-self:flex-start">${totalDelivered} delivered</span>
            </div>
            <div class="wa-stat-card">
                <span class="mu" style="font-size:12px">Delivery Rate</span>
                <b>${delPct}%</b>
                <span class="b ok" style="align-self:flex-start">Standard SLA</span>
            </div>
            <div class="wa-stat-card">
                <span class="mu" style="font-size:12px">Read Rate</span>
                <b>${readPct}%</b>
                <span class="tag-pill" style="align-self:flex-start;color:#0284c7">Read verified</span>
            </div>
        </div>`;

        const campsList = (S.campaigns || []).map(c => {
            const tpl = (S.templates || []).find(t => t.id === c.tplId || t.name === c.tplName) || { name: c.tplName || 'Template' };
            const pct = c.sentCount ? Math.round((c.deliveredCount / c.sentCount) * 100) : 100;
            const rPct = c.deliveredCount ? Math.round((c.readCount / c.deliveredCount) * 100) : 95;
            return `<tr>
                <td data-label="Campaign">
                    <b>${esc(c.name)}</b>
                    <small class="mu" style="display:block;white-space:normal">${esc(c.createdAt)}</small>
                </td>
                <td data-label="Template"><span class="tag-pill" style="font-family:monospace;font-size:11px">${esc(tpl.name)}</span></td>
                <td data-label="Segment"><span class="tag-pill">${esc(c.audience || 'Target Segment')}</span></td>
                <td data-label="Dispatched"><b>${c.sentCount || 0}</b></td>
                <td data-label="Delivered">
                    <div style="display:flex;align-items:center;gap:6px">
                        <b>${c.deliveredCount || 0}</b>
                        <small class="mu">(${pct}%)</small>
                    </div>
                </td>
                <td data-label="Read">
                    <div style="display:flex;align-items:center;gap:4px;color:#0284c7">
                        <b>${c.readCount || 0}</b>
                        <small>(${rPct}%)</small>
                    </div>
                </td>
                <td data-label="Status"><span class="b ok">${esc(c.status || 'Completed')}</span></td>
                <td data-label="Actions">
                    <div style="display:flex;gap:6px">
                        <button class="btn sm" data-act="wa-preview-tpl" data-id="${tpl.id || ''}" title="Preview">${ic('send')} Preview</button>
                        <button class="btn sm" data-act="wa-del-camp" data-id="${c.id}" title="Delete" style="color:var(--er)">${ic('trash')}</button>
                    </div>
                </td>
            </tr>`;
        }).join('');

        content = `${kpis}
        <div class="panel">
            <div class="panel pad" style="border:none;border-bottom:1px solid var(--bd);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
                <b>Broadcast History</b>
                <button class="btn pri sm" data-act="nav" data-p="automations/broadcasts/new">${ic('send')} New Broadcast</button>
            </div>
            <div class="tw">
                <table class="tbl rt">
                    <thead>
                        <tr>
                            <th>Campaign</th>
                            <th>Template</th>
                            <th>Segment</th>
                            <th>Dispatched</th>
                            <th>Delivered</th>
                            <th>Read</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>${campsList || '<tr><td colspan="8" style="text-align:center;padding:24px" class="mu">No campaigns launched yet.</td></tr>'}</tbody>
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
                            <div class="mu" style="font-size:11px;margin-top:2px">${esc(t.lang || 'en_US')} · <b>${esc(t.cat)}</b></div>
                        </div>
                        <span class="b ${t.status === 'APPROVED' ? 'ok' : 'wa'}">${esc(t.status)}</span>
                    </div>
                    <div style="margin:12px 0">${renderWABubble(t)}</div>
                </div>
                <div style="display:flex;gap:8px;justify-content:flex-end;border-top:1px solid var(--bd);padding-top:10px;flex-wrap:wrap">
                    <button class="btn sm" data-act="wa-test-tpl" data-id="${t.id}">${ic('phone')} Test</button>
                    <button class="btn sm pri" data-act="nav" data-p="automations/broadcasts/new/${t.id}">${ic('send')} Broadcast</button>
                    <button class="btn sm" data-act="wa-del-tpl" data-id="${t.id}" style="color:var(--er)">${ic('trash')}</button>
                </div>
            </div>`;
        }).join('');

        content = `<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:20px">
            <div class="chips" style="overflow-x:auto;white-space:nowrap;-webkit-overflow-scrolling:touch">${filterChips}</div>
            <button class="btn pri sm" data-act="nav" data-p="automations/templates/new">${ic('plus')} New Template</button>
        </div>
        <div class="g g2">${tplCards || '<div class="panel pad mu" style="grid-column:1/-1;text-align:center">No templates found.</div>'}</div>`;
    } else if (V.waTab === 'workflows') {
        const workflowsList = (S.automations || []).map(a => {
            const matchedTpl = (S.templates || []).find(t => t.name.toLowerCase().includes(a.id === 'W1' ? 'welcome' : a.id === 'W2' ? 'purchase' : a.id === 'W3' ? 'reminder_1' : a.id === 'W4' ? 'reminder_2' : 'offer')) || S.templates[0];
            return `<div class="panel pad" style="margin-bottom:12px">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px">
                    <div style="flex:1;min-width:260px">
                        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                            <b>${esc(a.name)}</b>
                            <span class="tag-pill" style="font-family:monospace;font-size:11px">${esc(matchedTpl ? matchedTpl.name : 'default')}</span>
                            <span class="b ${a.on ? 'ok' : 'wa'}">${a.on ? 'Active' : 'Paused'}</span>
                        </div>
                        <div class="mu" style="font-size:12px;margin-top:4px">Trigger: <b>${esc(a.trig)}</b> · ${a.lead ? a.lead + ' days prior' : 'Immediate'}</div>
                        <div style="margin-top:10px;background:var(--sf);padding:10px 12px;border-radius:var(--r);font-size:12.5px;line-height:1.45;color:var(--fg);border:1px solid var(--bd)">
                            ${esc(a.body)}
                        </div>
                    </div>
                    <div style="display:flex;flex-direction:column;align-items:flex-end;gap:10px">
                        <button class="sw" role="switch" aria-checked="${a.on}" aria-label="Toggle ${esc(a.name)}" data-act="auto-toggle" data-id="${a.id}"></button>
                        <div style="display:flex;gap:6px">
                            <button class="btn sm" data-act="auto-test" data-id="${a.id}">${ic('send')} Test</button>
                            <button class="btn sm" data-act="auto-edit" data-id="${a.id}">${ic('edit')} Edit</button>
                        </div>
                    </div>
                </div>
            </div>`;
        }).join('');

        content = `<div>${workflowsList}</div>`;
    } else if (V.waTab === 'gateway') {
        content = renderWhatsAppAccountSetup(false);
    }

    return `<div class="pg">
        <div class="ph">
            <div>
                <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                    <h1>Automations</h1>
                    <span class="live-pill">
                        <span class="wa-pulse"></span>
                        <span>WhatsApp Cloud</span>
                        <span class="live-sub">${esc(wa.phone)}</span>
                    </span>
                </div>
            </div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
                <button class="btn sm" data-act="wa-sync" title="Sync">${ic('refresh')} Sync</button>
                <button class="btn sm" data-act="nav" data-p="automations/templates/new">${ic('plus')} Template</button>
                <button class="btn pri sm" data-act="nav" data-p="automations/broadcasts/new">${ic('send')} New Campaign</button>
            </div>
        </div>
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
