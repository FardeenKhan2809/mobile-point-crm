"use strict";

let SQ = '';
let SF = 'All';
let SALE_CUST_MODE = 'existing';
let SALE_PROD_MODE = 'existing';

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
