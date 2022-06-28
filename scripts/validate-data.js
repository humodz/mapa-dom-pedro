const fs = require('fs');

const stores = JSON.parse(fs.readFileSync('public/data/stores.json'));

const conditions = [
  it => it.pavimento.length !== 1,
  it => it.itensSeguimento.length !== 1,
  it => it.categoria.length !== 1,
  it => it.itensSeguimento[0].seguimento !== it.categoria[0],
];

console.log('Total stores:', stores.length);

for (const condition of conditions) {
  const failed = stores.filter(it => condition(it));
  console.log(condition.toString());

  if (failed.length) {
    console.log('  ', failed.map(it => it.nome).join(', '));
  } else {
    console.log('   -')
  }
}

function countBy(items, keyFn) {
  const result = {};

  for (const item of items) {
    const key = keyFn(item);
    result[key] = result[key] || 0;
    result[key] += 1;
  }

  return result;
}

// console.log(countBy(stores, it => it.pavimento[0]));
