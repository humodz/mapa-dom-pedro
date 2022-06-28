import styles from './App.module.css';
import { useCallback, useEffect, useState } from 'react';
import { InternalMap } from './components/InternalMap';
import { SearchStores } from './components/SearchStores';
import { SelectedStore } from './components/SelectedStore';
import { fetchStores } from './data/stores';

export function App() {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);

  const unselectStore = useCallback(() => {
    setSelectedStore(null);
  }, [])

  useEffect(() => {
    fetchStores()
      .then(data => {
        setStores(data);
      });
  }, []);

  return (
    <div className={styles.App}>
      <SearchStores
        stores={stores}
        setSelectedStore={setSelectedStore}
      ></SearchStores>

      <div>
        {
          Boolean(selectedStore) &&
            <SelectedStore
              store={selectedStore}
              unselectStore={unselectStore}
            ></SelectedStore>
        }
      </div>

      <InternalMap
        highlight={selectedStore?.pavimento[0]}
      ></InternalMap>
    </div>
  );
}