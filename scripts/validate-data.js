const fs = require('fs');

const shops = JSON.parse(fs.readFileSync('public/data/shops.json'));

const conditions = [
  it => it.pavimento.length !== 1,
  it => it.itensSeguimento.length !== 1,
  it => it.categoria.length !== 1,
  it => it.itensSeguimento[0].seguimento !== it.categoria[0],
];

console.log('Total shops:', shops.length);

for (const condition of conditions) {
  const failed = shops.filter(it => condition(it));
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

// console.log(countBy(shops, it => it.pavimento[0]));
