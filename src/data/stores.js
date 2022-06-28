export function fetchStores() {
  return fetch('/data/stores.json')
      .then(res => res.json());
}