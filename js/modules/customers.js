"use strict";

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
