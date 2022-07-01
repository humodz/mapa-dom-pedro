const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function main() {
  const { data: shops } = await axios.get('https://parquedpedro.com.br/lojas_files/lojas.json');
  saveFile('public/data/shops.json', JSON.stringify(shops, null, 2));
}

function saveFile(destination, data) {
  const directory = path.dirname(destination);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(destination, data);
}

main().catch(console.error);