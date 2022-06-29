export function fetchShops() {
  return fetch('/data/shops.json')
      .then(res => res.json());
}