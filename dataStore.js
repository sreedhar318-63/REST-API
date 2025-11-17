const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'books.json');

function read() {
  try { return JSON.parse(fs.readFileSync(file,'utf8') || '[]'); }
  catch(e) { return []; }
}
function write(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}
module.exports = { read, write, file };
