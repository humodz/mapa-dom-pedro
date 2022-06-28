import { useCallback, useMemo, useState } from 'react';
import styles from './styles.module.css';

export function SearchStores({
  stores,
  setSelectedStore,
}) {
  const [searchText, setSearchText] = useState('');

  const updateSearchText = useCallback(event => {
    setSearchText(event.target.value)
  }, []);

  const filteredStores = useMemo(() => {
    if (!searchText) {
      return [];
    }

    return stores
      .filter(it => it.nome.toUpperCase().includes(searchText.toUpperCase()))
      .slice(0, 10);
  }, [searchText, stores]);

  const selectStore = useCallback(store => {
    setSearchText('');
    setSelectedStore(store);
  }, [setSelectedStore]);

  return (
    <div>
      <input
        className={styles.searchInput}
        value={searchText}
        onChange={updateSearchText}
      ></input>

      <div className={styles.storeList}>
        {filteredStores.map(store => (
          <StoreItem
            key={store.id}
            store={store}
            onClick={() => selectStore(store)}
          ></StoreItem>
        ))}
      </div>
    </div>
  );
}

function StoreItem({ store, onClick }) {
  return (
    <div className={styles.storeItem} onClick={onClick}>
      <div
        className={styles.storeImage}
        style={{
          backgroundImage: `url('${store.imgURL}')`,
        }}
      ></div>
      <div className={styles.storeName}>{ store.nome }</div>
    </div>
  )
}