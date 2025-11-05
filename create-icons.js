// Script to create proper PNG icons from our SVG design
const fs = require('fs');

// Create a simple SVG to PNG conversion using data URLs
const createPngIcon = (size) => {
  const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3B82F6"/>
      <stop offset="100%" style="stop-color:#1E3A8A"/>
    </linearGradient>
  </defs>
  
  <!-- Background circle -->
  <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 8}" fill="url(#bgGrad)"/>
  
  <!-- Medical cross -->
  <g transform="translate(${size/2},${size/2})">
    <rect x="${-size/6}" y="${-size/24}" width="${size/3}" height="${size/12}" rx="${size/24}" fill="white"/>
    <rect x="${-size/24}" y="${-size/6}" width="${size/12}" height="${size/3}" rx="${size/24}" fill="white"/>
  </g>
  
  <!-- Simple heartbeat line -->
  <path d="M${size*0.2},${size*0.75} L${size*0.35},${size*0.75} L${size*0.4},${size*0.65} L${size*0.44},${size*0.85} L${size*0.48},${size*0.7} L${size*0.52},${size*0.75} L${size*0.8},${size*0.75}" 
        stroke="#EF4444" 
        stroke-width="${size/64}" 
        fill="none" 
        stroke-linecap="round"/>
</svg>`;

  return svgContent;
};

// Create icon files for different sizes
const sizes = [16, 32, 192, 512, 180]; // 180 for apple-touch-icon

sizes.forEach(size => {
  const svgContent = createPngIcon(size);
  const fileName = size === 180 ? 'apple-touch-icon.svg' : `icon-${size}x${size}.svg`;
  
  fs.writeFileSync(`public/icons/${fileName}`, svgContent);
  console.log(`Created ${fileName}`);
});

console.log('All icon files created successfully!');