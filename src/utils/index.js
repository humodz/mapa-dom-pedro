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

export function sorted(items, compare) {
  return [...items].sort(compare);
}

export const collatorPtBr = new Intl.Collator(['pt-BR', 'pt'], {
  usage: 'sort',
  sensitivity: 'base',
  ignorePunctuation: true,
  numeric: true,
});
