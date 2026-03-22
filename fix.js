const fs = require('fs');
let content = fs.readFileSync('src/components/MapComponent.tsx', 'utf8');
content = content.replace(/\\`/g, '`').replace(/\\\$/g, '$');
fs.writeFileSync('src/components/MapComponent.tsx', content);
