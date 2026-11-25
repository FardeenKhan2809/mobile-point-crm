"use strict";

function settings() {
    return `<div class="pg">
    <div class="ph">
        <div>
            <h1>Settings</h1>
            <p>Third-Party AC Seller details, branch stores, and WhatsApp automation lead times.</p>
        </div>
    </div>

    <form id="settings-form" novalidate onsubmit="return false">
        <div class="fgrid">
            <div class="panel pad">
                <h2>Store Profile</h2>
                <div class="fg">
                    <label>Store Name *
                        <input name="store" value="${esc(S.set.store)}" required>
                    </label>
                    <label>Branch Locations (comma separated)
                        <input name="branches" value="${esc(S.set.branches || '')}">
                    </label>
                    <label>Store Complete Address
                        <textarea name="addr" rows="2">${esc(S.set.addr)}</textarea>
                    </label>
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
                        <label>Phone / Helpline
                            <input name="phone" value="${esc(S.set.phone)}">
                        </label>
                        <label>Email
                            <input name="email" value="${esc(S.set.email)}">
                        </label>
                    </div>
                    <label>GSTIN
                        <input name="gstin" value="${esc(S.set.gstin)}">
                    </label>
                </div>
            </div>

            <div class="panel pad">
                <h2>Service Reminder Defaults</h2>
                <div class="fg">
                    <label>1st Service Target (Days post-purchase)
                        <input name="srv1Days" type="number" value="${S.set.srv1Days || 120}">
                    </label>
                    <label>2nd Service Target (Days post-purchase)
                        <input name="srv2Days" type="number" value="${S.set.srv2Days || 330}">
                    </label>
                    <label>Reminder Lead Time (Days before due date)
                        <input name="leadDays" type="number" value="${S.set.leadDays || 14}">
                    </label>
                </div>
            </div>
        </div>

        <div class="sticky" style="margin-top:20px">
            <button type="button" class="btn pri" data-act="settings-save">Save Settings</button>
        </div>
    </form>
</div>`;
}

function userPermissionsPage(id) {
    const u = S.users.find(x => x.id === id);
    if (!u) return nf('users', 'User');
    const p = u.permissions || {};

    return `<div class="pg">
    <nav class="bc mu">
        <button class="lnk" data-act="nav" data-p="users">User Permissions</button> / ${esc(u.name)}
    </nav>
    <div class="ph">
        <div>
            <h1>${esc(u.name)}</h1>
            <p>${esc(u.email)} · Role: ${esc(u.preset || 'custom')} · System Access</p>
        </div>
    </div>

    <form id="user-perm-form" novalidate onsubmit="return false">
        <input type="hidden" name="user_id" value="${esc(u.id)}">
        <div class="panel pad" style="margin-bottom:20px">
            <h2>Quick Preset Assignment</h2>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
                ${Object.entries(PRESETS).map(([k, def]) => `
                    <button type="button" class="btn sm" data-act="apply-preset" data-preset="${k}">${esc(def.label)}</button>
                `).join('')}
            </div>
        </div>

        <div class="panel">
            <div class="tw">
                <table class="tbl rt">
                    <thead>
                        <tr>
                            <th>Module</th>
                            <th>Enabled</th>
                            <th>View</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${MODULE_DEFS.map(m => {
                            const mp = p[m.id] || { enabled: false, view: false, edit: false, delete: false };
                            return `<tr>
                                <td>
                                    <b>${esc(m.title)}</b>
                                    <small class="mu" style="display:block">${esc(m.desc)}</small>
                                </td>
                                <td><input type="checkbox" name="mod_${m.id}_enabled" ${mp.enabled ? 'checked' : ''}></td>
                                <td><input type="checkbox" name="mod_${m.id}_view" ${mp.view ? 'checked' : ''}></td>
                                <td>${m.hasEdit ? `<input type="checkbox" name="mod_${m.id}_edit" ${mp.edit ? 'checked' : ''}>` : '—'}</td>
                                <td>${m.hasDelete ? `<input type="checkbox" name="mod_${m.id}_delete" ${mp.delete ? 'checked' : ''}>` : '—'}</td>
                            </tr>`;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>

        <div class="sticky" style="margin-top:20px">
            <button type="button" class="btn" data-act="nav" data-p="users">Back</button>
            <button type="button" class="btn pri" data-act="user-perm-save">Save Permissions</button>
        </div>
    </form>
</div>`;
}

function handleSettingsSave() {
    const f = $('#settings-form');
    if (!f) return;
    const fd = new FormData(f);
    S.set.store = (fd.get('store') || 'Mobile Point AC Care').trim();
    S.set.branches = (fd.get('branches') || '').trim();
    S.set.addr = (fd.get('addr') || '').trim();
    S.set.phone = (fd.get('phone') || '').trim();
    S.set.email = (fd.get('email') || '').trim();
    S.set.gstin = (fd.get('gstin') || '').trim();
    S.set.srv1Days = +fd.get('srv1Days') || 120;
    S.set.srv2Days = +fd.get('srv2Days') || 330;
    S.set.leadDays = +fd.get('leadDays') || 14;
    save();
    toast('Settings saved successfully');
    render(true);
}

function handleUserPermSave() {
    const f = $('#user-perm-form');
    if (!f) return;
    const fd = new FormData(f);
    const uid = fd.get('user_id');
    const u = S.users.find(x => x.id === uid);
    if (!u) return;

    u.permissions = u.permissions || {};
    MODULE_DEFS.forEach(m => {
        u.permissions[m.id] = {
            enabled: fd.get(`mod_${m.id}_enabled`) !== null,
            view: fd.get(`mod_${m.id}_view`) !== null,
            edit: fd.get(`mod_${m.id}_edit`) !== null,
            delete: fd.get(`mod_${m.id}_delete`) !== null
        };
    });
    save();
    toast('Permissions saved for ' + u.name);
    go('users');
}

function userNewM() {
    modal(`<h1>Add Staff User</h1>
    <form id="new-user-form" novalidate onsubmit="return false">
        <div class="fg">
            <label>Full Name *
                <input name="name" required placeholder="Staff member name">
            </label>
            <label>Email *
                <input name="email" type="email" required placeholder="name@mobilepoint.in">
            </label>
            <label>Phone
                <input name="phone" placeholder="+91 98250 XXXXX">
            </label>
            <label>Role Preset
                <select name="preset">
                    ${Object.entries(PRESETS).map(([k, def]) => `<option value="${k}">${esc(def.label)}</option>`).join('')}
                </select>
            </label>
        </div>
        <div class="acts" style="margin-top:16px">
            <button class="btn" data-act="close">Cancel</button>
            <button class="btn pri" data-act="save-new-user">Create User</button>
        </div>
    </form>`);
}
