export function removeDiacritics(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function enumContains(Enum, value) {
  return Object.values(Enum).includes(value);
}

export function groupBy(items, keyFn, valueFn = it => it) {
  const result = new Map();

  for (const item of items) {
    const key = keyFn(item);

    result.set(key, result.get(key) || []);
    result.get(key).push(valueFn(item));
  }

  return result;
}

export function sorted(items, compare = defaultCompare) {
  return [...items].sort(compare);
}

export function defaultCompare(item1, item2) {
  if (item1 < item2) {
    return -1;
  } else if (item1 > item2) {
    return 1;
  } else {
    return 0;
  }
}

export function unique(items) {
  return [...new Set(items)];
}

export const uniqueId = (() => {
  let id = 1;
  return (prefix = '') => prefix + id++;
})();

export const collatorPtBr = new Intl.Collator(['pt-BR', 'pt'], {
  usage: 'sort',
  sensitivity: 'base',
  ignorePunctuation: true,
  numeric: true,
});
