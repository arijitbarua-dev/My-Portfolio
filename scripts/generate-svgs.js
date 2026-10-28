const fs = require('fs');
const path = require('path');

const generateSvg = (title, tag, category, num, color1, color2) => `<svg width="1200" height="800" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="800" fill="#FFFBEA"/>
  <rect x="20" y="20" width="1160" height="760" fill="#F5F3E9" stroke="#111111" stroke-width="4"/>
  <rect x="60" y="60" width="1080" height="110" fill="#111111"/>
  <text x="100" y="130" fill="#FFFBEA" font-family="sans-serif" font-size="44" font-weight="900" letter-spacing="2">${title}</text>
  <rect x="930" y="85" width="180" height="50" fill="${color1}" stroke="#111111" stroke-width="2"/>
  <text x="1020" y="118" fill="#111111" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle">${num}</text>
  
  <rect x="80" y="220" width="1040" height="500" fill="#FFFFFF" stroke="#111111" stroke-width="3"/>
  <rect x="88" y="228" width="1024" height="45" fill="${color2}"/>
  <text x="110" y="258" fill="#111111" font-family="monospace" font-size="16" font-weight="bold">${tag}</text>
  <circle cx="1080" cy="250" r="10" fill="#111111"/>
  
  <rect x="130" y="320" width="940" height="340" fill="#F5F3E9" stroke="#111111" stroke-width="2"/>
  <text x="600" y="460" fill="#111111" font-family="sans-serif" font-size="38" font-weight="900" text-anchor="middle">${category}</text>
  <text x="600" y="510" fill="#555555" font-family="monospace" font-size="18" text-anchor="middle">EDITORIAL CASE STUDY DEMO ASSET</text>
  <rect x="510" y="540" width="180" height="36" fill="${color1}" stroke="#111111" stroke-width="2"/>
  <text x="600" y="564" fill="#111111" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">SCREENSHOT PREVIEW</text>
</svg>`;

const images = [
  ['project-pulse.svg', 'PULSE // TASK ENGINE', 'COMMAND-FIRST WORKFLOW', 'PRODUCTIVITY', 'DEMO 02', '#83E52B', '#FF5722'],
  ['project-syntax.svg', 'SYNTAX // CREATIVE CMS', 'PUBLISHING PLATFORM', 'DASHBOARD & CMS', 'DEMO 03', '#FF5722', '#83E52B'],
  ['project-kronos-1.svg', 'KRONOS // CATALOG VIEW', 'DYNAMIC INVENTORY', 'GALLERY 01', 'SCREEN 01', '#FF5722', '#FFFBEA'],
  ['project-kronos-2.svg', 'KRONOS // CART CHECKOUT', 'STRIPE PIPELINE', 'GALLERY 02', 'SCREEN 02', '#83E52B', '#FFFBEA'],
  ['project-kronos-3.svg', 'KRONOS // ADMIN PORTAL', 'ORDER DISPATCH', 'GALLERY 03', 'SCREEN 03', '#FF5722', '#FFFBEA'],
  ['project-kronos-4.svg', 'KRONOS // MOBILE ADAPTATION', 'RESPONSIVE SPEC', 'GALLERY 04', 'SCREEN 04', '#83E52B', '#FFFBEA'],
  ['project-pulse-1.svg', 'PULSE // KANBAN BOARD', 'BOARD POSITIONING', 'GALLERY 01', 'SCREEN 01', '#83E52B', '#FFFBEA'],
  ['project-pulse-2.svg', 'PULSE // CMD PALETTE', 'KEYBOARD ACCELERATION', 'GALLERY 02', 'SCREEN 02', '#FF5722', '#FFFBEA'],
  ['project-pulse-3.svg', 'PULSE // TEAM AUDIT', 'HISTORICAL LOGS', 'GALLERY 03', 'SCREEN 03', '#83E52B', '#FFFBEA'],
  ['project-pulse-4.svg', 'PULSE // METRICS HUD', 'VELOCITY CHARTS', 'GALLERY 04', 'SCREEN 04', '#FF5722', '#FFFBEA'],
  ['project-syntax-1.svg', 'SYNTAX // EDITORIAL DESK', 'TYPOGRAPHY ENGINE', 'GALLERY 01', 'SCREEN 01', '#FF5722', '#FFFBEA'],
  ['project-syntax-2.svg', 'SYNTAX // HEATMAP HUD', 'SCROLL TELEMETRY', 'GALLERY 02', 'SCREEN 02', '#83E52B', '#FFFBEA'],
  ['project-syntax-3.svg', 'SYNTAX // ASSET LIBRARY', 'IMAGE OPTIMIZATION', 'GALLERY 03', 'SCREEN 03', '#FF5722', '#FFFBEA'],
  ['project-syntax-4.svg', 'SYNTAX // FEDIVERSE DISPATCH', 'DISTRIBUTION PROTOCOL', 'GALLERY 04', 'SCREEN 04', '#83E52B', '#FFFBEA'],
];

images.forEach(([filename, title, tag, category, num, c1, c2]) => {
  fs.writeFileSync(path.join(__dirname, '../public/images', filename), generateSvg(title, tag, category, num, c1, c2));
});

console.log('Generated all gallery and project SVGs.');

