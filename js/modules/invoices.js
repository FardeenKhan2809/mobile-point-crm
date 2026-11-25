"use strict";

function invPage(id) {
    const inv = S.invoices.find(x => x.id === id);
    if (!inv) return nf('invoices', 'Invoice');
    const s = S.sales.find(x => x.id === inv.saleId) || {};
    const c = cust(inv.cid);

    return `<div class="pg">
    <nav class="bc mu">
        <button class="lnk" data-act="nav" data-p="invoices">Invoices</button> / ${esc(inv.id)}
    </nav>
    <div class="ph">
        <div>
            <h1>Invoice ${esc(inv.id)}</h1>
            <p>Date: ${fd(inv.date)} · Linked Sale: ${esc(inv.saleId || '—')}</p>
        </div>
        <div style="display:flex;gap:8px">
            <button class="btn" onclick="window.print()">Print / PDF</button>
            ${inv.saleId ? `<button class="btn pri" data-act="nav" data-p="sales/${inv.saleId}">View Sale Record</button>` : ''}
        </div>
    </div>

    <div class="doc panel pad" style="max-width:850px;margin:0 auto;background:#fff;color:#111">
        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:14px;border-bottom:2px solid #e5e7eb;padding-bottom:18px;margin-bottom:18px">
            <div>
                <h2 style="font-size:24px;font-weight:700;color:#0284c7;margin:0 0 4px">${esc(S.set.store)}</h2>
                <div style="font-size:13px;color:#4b5563;line-height:1.5">
                    <div>${esc(S.set.addr)}</div>
                    <div>Phone: ${esc(S.set.phone)} | Email: ${esc(S.set.email)}</div>
                    <div><b>GSTIN: ${esc(S.set.gstin)}</b></div>
                </div>
            </div>
            <div style="text-align:right">
                <span class="b ok" style="font-size:13px">OFFICIAL TAX INVOICE</span>
                <div style="font-size:14px;margin-top:6px"><b>Invoice No:</b> ${esc(inv.id)}</div>
                <div style="font-size:13px;color:#4b5563"><b>Date:</b> ${fdt(inv.date)}</div>
                <div style="font-size:13px;color:#4b5563"><b>Payment Mode:</b> ${esc(inv.pay || 'UPI')}</div>
            </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin-bottom:20px;font-size:13px">
            <div style="background:#f9fafb;padding:12px;border-radius:6px;border:1px solid #e5e7eb">
                <b style="color:#374151;text-transform:uppercase;font-size:11px;letter-spacing:0.5px">Billed To (Customer Details)</b>
                <div style="font-size:15px;font-weight:700;margin:4px 0">${esc(c.name)}</div>
                <div>WhatsApp: ${esc(c.phone)} ${c.altPhone ? '· Alt: ' + esc(c.altPhone) : ''}</div>
                <div>${esc(c.address)}</div>
                <div>${esc(c.locality || '')} ${c.landmark ? '(Near ' + esc(c.landmark) + ')' : ''} - ${esc(c.pincode || '')}</div>
            </div>
            <div style="background:#f9fafb;padding:12px;border-radius:6px;border:1px solid #e5e7eb">
                <b style="color:#374151;text-transform:uppercase;font-size:11px;letter-spacing:0.5px">Sale &amp; Branch Information</b>
                <div style="margin-top:4px"><b>Branch:</b> ${esc(inv.shopName || S.set.store)}</div>
                <div><b>Linked Sale Ref:</b> ${esc(inv.saleId || '—')}</div>
                <div><b>Installation Date:</b> ${s.installDate ? fdt(s.installDate) : 'Pending Schedule'}</div>
                <div><b>Technician:</b> Dispatched by OEM / Manufacturer Brand</div>
            </div>
        </div>

        <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;margin-bottom:20px">
        <table style="width:100%;min-width:480px;border-collapse:collapse;font-size:13px">
            <thead>
                <tr style="background:#f3f4f6;text-align:left">
                    <th style="padding:10px;border:1px solid #e5e7eb">#</th>
                    <th style="padding:10px;border:1px solid #e5e7eb">Description of Goods (Air Conditioner)</th>
                    <th style="padding:10px;border:1px solid #e5e7eb">Product Serial Number</th>
                    <th style="padding:10px;border:1px solid #e5e7eb;text-align:center">Qty</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding:10px;border:1px solid #e5e7eb">1</td>
                    <td style="padding:10px;border:1px solid #e5e7eb">
                        <b>${esc(inv.brand)} ${esc(inv.model)}</b>
                        <div style="color:#6b7280;font-size:12px">Split Inverter Air Conditioner Unit with Remote &amp; Accessories</div>
                    </td>
                    <td style="padding:10px;border:1px solid #e5e7eb">
                        <span style="font-family:monospace;font-weight:700">${esc(inv.sn)}</span>
                    </td>
                    <td style="padding:10px;border:1px solid #e5e7eb;text-align:center">1 Unit</td>
                </tr>
            </tbody>
        </table>
        </div>

        <div style="border:2px dashed #0284c7;background:#f0f9ff;border-radius:8px;padding:16px;margin-bottom:20px">
            <h3 style="margin:0 0 8px;color:#0369a1;font-size:15px;display:flex;align-items:center;gap:6px">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5 7.5-.7z"/></svg>
                Complimentary 2-Free-Service Warranty Certificate
            </h3>
            <p style="font-size:12px;color:#0369a1;margin:0 0 10px;line-height:1.4">This invoice entitles the registered customer to 2 complimentary free services within the 1st year of purchase. Company OEM authorized service personnel will be arranged upon reminder confirmation.</p>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;font-size:12px">
                <div style="background:#fff;padding:8px 12px;border-radius:6px;border:1px solid #bae6fd">
                    <b>1st Free Service Milestone:</b>
                    <div>Scheduled Due: <b>${fdt(inv.srv1Date)}</b> (3 to 5 Months)</div>
                </div>
                <div style="background:#fff;padding:8px 12px;border-radius:6px;border:1px solid #bae6fd">
                    <b>2nd Free Service Milestone:</b>
                    <div>Scheduled Due: <b>${fdt(inv.srv2Date)}</b> (Before 11 Months)</div>
                </div>
            </div>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:20px;margin-top:30px;font-size:12px;color:#6b7280">
            <div>
                <div>Goods once sold are covered under respective brand manufacturer warranty.</div>
                <div>Authorized service &amp; installation handled directly by OEM brand centers.</div>
            </div>
            <div style="text-align:center">
                <div style="margin-bottom:40px;font-weight:600;color:#111">For ${esc(S.set.store)}</div>
                <div style="border-top:1px solid #d1d5db;padding-top:4px;width:160px">Authorized Signatory</div>
            </div>
        </div>
    </div>
</div>`;
}
