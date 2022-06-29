import styles from './App.module.css';
import { useCallback, useEffect, useState } from 'react';
import { InternalMap } from './components/InternalMap';
import { SearchStores } from './components/SearchStores';
import { SelectedStore } from './components/SelectedStore';
import { useSelector, useDispatch } from 'react-redux';
import { selectStores, fetchStores } from './store/storesSlice';
// import { Icon } from './components/Icon';

export function App() {
  const dispatch = useDispatch();
  const stores = useSelector(selectStores);

  console.log('!!!', stores);

  const [selectedStore, setSelectedStore] = useState(null);

  const unselectStore = useCallback(() => {
    setSelectedStore(null);
  }, [])

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <div>
        <SearchStores
          stores={stores}
          setSelectedStore={setSelectedStore}
        ></SearchStores>
        {/* <Icon
          name="keycap-asterisk"
          size="2.5"
        ></Icon> */}
      </div>

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
        highlight={selectedStore}
      ></InternalMap>
    </div>
  );
}