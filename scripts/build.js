const fs = require('fs');

const jsFiles = [
    'js/core/icons.js',
    'js/core/utils.js',
    'js/core/state.js',
    'js/modules/dashboard.js',
    'js/modules/customers.js',
    'js/modules/products.js',
    'js/modules/sales.js',
    'js/modules/invoices.js',
    'js/modules/calendar.js',
    'js/modules/notifications.js',
    'js/modules/automations.js',
    'js/modules/reports.js',
    'js/modules/settings.js',
    'js/app.js'
];

let jsBundle = '';
jsFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
    content = content.replace(/^"use strict";\n+/gm, '');
    jsBundle += content + '\n\n';
});
jsBundle = '"use strict";\n\n' + jsBundle.trim() + '\n';
fs.writeFileSync('js/bundle.js', jsBundle);

const cssFiles = [
    'css/base.css',
    'css/layout.css',
    'css/components.css',
    'css/modules/calendar.css',
    'css/modules/notifications.css',
    'css/modules/automations.css'
];

let cssBundle = '';
cssFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
    cssBundle += content + '\n\n';
});
fs.writeFileSync('css/bundle.css', cssBundle.trim() + '\n');

console.log('Build complete: js/bundle.js and css/bundle.css created successfully.');
