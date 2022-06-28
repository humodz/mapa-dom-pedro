import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { InternalMap } from './components/InternalMap';
import { SearchStores } from './components/SearchStores';
import { fetchStores } from './data/stores';

export function App() {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    fetchStores()
      .then(data => {
        // console.log('!!!', data);
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
      </div>

      <InternalMap
        highlight={selectedStore?.pavimento[0]}
      ></InternalMap>
    </div>
  );
}