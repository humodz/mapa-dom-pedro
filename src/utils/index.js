export function removeDiacritics(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function enumContains(Enum, value) {
  return Object.values(Enum).includes(value);
}