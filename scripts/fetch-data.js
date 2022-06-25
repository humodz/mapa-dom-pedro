const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function main() {
  const { data: stores } = await axios.get('https://parquedpedro.com.br/lojas_files/lojas.json');
  saveFile('public/data/stores.json', JSON.stringify(stores, null, 2));

  const { data: map } = await axios.request({
    method: 'GET',
    url: 'https://parquedpedro.com.br/data/files/58/26/0B/B7/6351181054F5EF08180808FF/Mapa_PDP_L1%20_1_.jpg',
    responseType: 'arraybuffer',
  });

  saveFile('public/data/map.jpg', map);
}

function saveFile(destination, data) {
  const directory = path.dirname(destination);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(destination, data);
}

main().catch(console.error);