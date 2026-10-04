const fs = require('fs');
const code = fs.readFileSync('/tmp/ref-bundle.js', 'utf8');

console.log('File size:', code.length);

// Let's find sections or navigation items
const navMatches = code.match(/["']([a-zA-Z0-9_\-\.]{2,40})["']:\s*\{/g);
console.log('Object keys sample:', navMatches ? navMatches.slice(0, 30) : []);

// Let's search for translations object or specific features
const regexAr = /["']([\u0600-\u06FF\s،؛ـ0-9a-zA-Z\-_]{5,80})["']/g;
const arSamples = new Set();
let match;
while ((match = regexAr.exec(code)) !== null && arSamples.size < 40) {
  if (match[1].length > 10) arSamples.add(match[1]);
}
console.log('Arabic samples:', Array.from(arSamples));
