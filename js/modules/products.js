"use strict";

function prodPage(id) {
    const p = S.products.find(x => x.id === id);
    if (!p) return nf('products', 'AC Product');
    const ss = S.sales.filter(s => s.pid === id || (s.brand === p.brand && s.model === p.model));
    const inStock = (p.units || []).filter(u => u.st !== 'Sold');
    const soldUnits = (p.units || []).filter(u => u.st === 'Sold');

    return `<div class="pg">
    <nav class="bc mu">
        <button class="lnk" data-act="nav" data-p="products">AC Products</button> / ${esc(p.brand)} ${esc(p.model)}
    </nav>
    <div class="ph">
        <div>
            <h1>${esc(p.brand)} ${esc(p.model)}</h1>
            <p>${esc(p.name)} · ${esc(p.capacity)} · ${esc(p.star)} · Minimal AC Specs (No Price)</p>
        </div>
        <div style="display:flex;gap:8px">
            <button class="btn" data-act="nav" data-p="sales/new">${ic('plus')} Record Sale of this AC</button>
            <button class="btn pri" data-act="nav" data-p="products/edit/${id}">Edit Model</button>
        </div>
    </div>

    <div class="cw2">
        <div class="panel pad">
            <h2>AC Specifications (Minimal)</h2>
            <dl class="kv" style="margin-top:12px">
                <dt>Brand Name</dt>
                <dd><b>${esc(p.brand)}</b></dd>
                <dt>Model Number</dt>
                <dd><b>${esc(p.model)}</b></dd>
                <dt>Capacity / Tonnage</dt>
                <dd>${esc(p.capacity || '1.5 Ton')}</dd>
                <dt>Energy Star Rating</dt>
                <dd><b>${esc(p.star || '5 Star')}</b></dd>
                <dt>Inverter Type</dt>
                <dd>${esc(p.invType || 'Inverter')}</dd>
                <dt>Condenser Coil</dt>
                <dd>${esc(p.condenser || '100% Copper')}</dd>
                <dt>Refrigerant Gas</dt>
                <dd>${esc(p.gas || 'R32')}</dd>
                <dt>Manufacturer Warranty</dt>
                <dd>${esc(p.warranty || '1 Year Comp + 10 Years Compressor')}</dd>
            </dl>
        </div>

        <div style="display:flex;flex-direction:column;gap:20px">
            <div class="panel pad">
                <h2>Product Serial Numbers</h2>
                <div style="margin-top:10px">
                    <b>In-Stock Units (${inStock.length}):</b>
                    <div style="display:flex;gap:6px;flex-wrap:wrap;margin:6px 0 12px">
                        ${inStock.map(u => `<span class="tag-pill" style="font-weight:600">${esc(u.sn)}</span>`).join('') || '<span class="mu">No units currently in stock</span>'}
                    </div>

                    <b>Sold Units (${soldUnits.length}):</b>
                    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px">
                        ${soldUnits.map(u => `<span class="tag-pill mu">${esc(u.sn)} (Sold)</span>`).join('') || '<span class="mu">No units sold yet</span>'}
                    </div>
                </div>
            </div>

            <div class="panel">
                <div class="hd">
                    <h2>Recorded Sales of this AC (${ss.length})</h2>
                </div>
                ${ss.map(s => `
                    <div class="li" style="cursor:pointer" data-act="nav" data-p="sales/${s.id}">
                        <div>
                            <b>${esc(s.custName)}</b>
                            <small class="mu">${fd(s.date)} · S/N: ${esc(s.sn)}</small>
                        </div>
                        <span class="b ok">Sold</span>
                    </div>
                `).join('') || '<div class="empty">No sales recorded yet for this model</div>'}
            </div>
        </div>
    </div>
</div>`;
}

function prodFormPage(id) {
    const e = id ? S.products.find(x => x.id === id) : null;
    if (id && !e) return nf('products', 'AC Product');
    DIRTY = false;

    return `<div class="pg">
    <nav class="bc mu">
        <button class="lnk" data-act="nav" data-p="products">AC Products</button> / ${e ? esc(e.brand) + ' ' + esc(e.model) + ' / Edit' : 'Add AC Model'}
    </nav>
    <div class="ph">
        <div>
            <h1>${e ? 'Edit AC Model' : 'Add Minimal AC Model'}</h1>
            <p>Brand, model number, specifications and serial numbers. Strictly no pricing fields.</p>
        </div>
    </div>

    <form id="prod-form" novalidate onsubmit="return false">
        <input type="hidden" name="prod_id" value="${e ? esc(e.id) : ''}">
        <div class="fgrid">
            <div class="panel pad">
                <h2>AC Identification *</h2>
                <div class="fg">
                    <label>Brand Name *
                        <input name="brand" value="${esc(e ? e.brand : '')}" placeholder="e.g. Daikin, LG, Voltas, Hitachi" required>
                    </label>
                    <label>Product Model Number *
                        <input name="model" value="${esc(e ? e.model : '')}" placeholder="e.g. FTKF35TV16U" required>
                    </label>
                    <label>Display / Commercial Name
                        <input name="name" value="${esc(e ? e.name : '')}" placeholder="e.g. Daikin FTKF35 1.0T Inverter">
                    </label>
                </div>
            </div>

            <div class="panel pad">
                <h2>Technical Specifications</h2>
                <div class="fg">
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
                        <label>Capacity / Tonnage
                            <select name="capacity">
                                ${['1.0 Ton', '1.5 Ton', '2.0 Ton', '0.8 Ton', '2.5 Ton'].map(c => `<option ${(e && e.capacity === c) ? 'selected' : ''}>${c}</option>`).join('')}
                            </select>
                        </label>
                        <label>Star Rating
                            <select name="star">
                                ${['5 Star', '3 Star', '4 Star', '2 Star', '1 Star'].map(c => `<option ${(e && e.star === c) ? 'selected' : ''}>${c}</option>`).join('')}
                            </select>
                        </label>
                    </div>
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
                        <label>Inverter Type
                            <select name="invType">
                                ${['Inverter', 'Dual Inverter', 'Fixed Speed', 'Triple Inverter'].map(c => `<option ${(e && e.invType === c) ? 'selected' : ''}>${c}</option>`).join('')}
                            </select>
                        </label>
                        <label>Condenser Coil
                            <input name="condenser" value="${esc(e ? e.condenser : '100% Copper')}" placeholder="e.g. 100% Copper">
                        </label>
                    </div>
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
                        <label>Refrigerant Gas
                            <input name="gas" value="${esc(e ? e.gas : 'R32')}" placeholder="e.g. R32, R410A">
                        </label>
                        <label>Warranty Terms
                            <input name="warranty" value="${esc(e ? e.warranty : '1 Year Comp + 10 Years Compressor')}" placeholder="e.g. 1 Yr Comp + 10 Yr Compressor">
                        </label>
                    </div>
                </div>
            </div>

            <div class="panel pad" style="grid-column:1/-1">
                <h2>Serial Numbers (comma separated)</h2>
                <label>Opening Serial Numbers
                    <input name="serials" value="${esc(e ? (e.units || []).map(u => u.sn).join(', ') : '')}" placeholder="e.g. DK-71001, DK-71002, DK-71003">
                </label>
            </div>
        </div>

        <div class="sticky" style="margin-top:20px">
            <button type="button" class="btn" data-act="nav" data-p="products">Cancel</button>
            <button type="button" class="btn pri" data-act="prod-save">${e ? 'Save Model' : 'Create AC Model'}</button>
        </div>
    </form>
</div>`;
}

function handleProdSave() {
    const f = $('#prod-form');
    if (!f) return;
    const fd = new FormData(f);
    const prodId = fd.get('prod_id');
    const brand = (fd.get('brand') || '').trim();
    const model = (fd.get('model') || '').trim();
    const name = (fd.get('name') || (brand + ' ' + model)).trim();
    const capacity = fd.get('capacity') || '1.5 Ton';
    const star = fd.get('star') || '5 Star';
    const invType = fd.get('invType') || 'Inverter';
    const condenser = (fd.get('condenser') || '100% Copper').trim();
    const gas = (fd.get('gas') || 'R32').trim();
    const warranty = (fd.get('warranty') || '1 Year Comp + 10 Years Compressor').trim();
    const serials = (fd.get('serials') || '').split(',').map(s => s.trim()).filter(Boolean);

    if (!brand) return toast('Please enter brand name', 'er');
    if (!model) return toast('Please enter model number', 'er');

    if (prodId) {
        const p = S.products.find(x => x.id === prodId);
        if (p) {
            p.brand = brand;
            p.model = model;
            p.name = name;
            p.capacity = capacity;
            p.star = star;
            p.invType = invType;
            p.condenser = condenser;
            p.gas = gas;
            p.warranty = warranty;
            serials.forEach(sn => {
                p.units = p.units || [];
                if (!p.units.some(u => u.sn === sn)) p.units.push({ sn, st: 'In stock' });
            });
        }
        toast('AC Model updated');
    } else {
        const newId = 'P' + (Math.max(1000, ...S.products.map(p => +p.id.replace(/\D/g, '') || 0)) + 1);
        S.products.unshift({
            id: newId,
            brand,
            model,
            name,
            capacity,
            star,
            invType,
            condenser,
            gas,
            warranty,
            units: serials.map(sn => ({ sn, st: 'In stock' }))
        });
        toast('AC Model created');
    }
    save();
    DIRTY = false;
    go('products');
}
