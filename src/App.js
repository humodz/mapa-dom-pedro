import styles from './App.module.css';
import { useCallback, useEffect, useState } from 'react';
import { InternalMap } from './components/InternalMap';
import { SearchShops } from './components/SearchShops';
import { SelectedShop } from './components/SelectedShop';
import { useSelector, useDispatch } from 'react-redux';
import { selectShops, fetchShops } from './store/shopsSlice';
// import { Icon } from './components/Icon';

export function App() {
  const dispatch = useDispatch();
  const shops = useSelector(selectShops);

  console.log('!!!', shops);

  const [selectedShop, setSelectedShop] = useState(null);

  const unselectShop = useCallback(() => {
    setSelectedShop(null);
  }, [])

  useEffect(() => {
    dispatch(fetchShops());
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <div>
        <SearchShops
          shops={shops}
          setSelectedShop={setSelectedShop}
        ></SearchShops>
        {/* <Icon
          name="keycap-asterisk"
          size="2.5"
        ></Icon> */}
      </div>

      <div>
        {
          Boolean(selectedShop) &&
            <SelectedShop
              shop={selectedShop}
              unselectShop={unselectShop}
            ></SelectedShop>
        }
      </div>

      <InternalMap
        highlight={selectedShop}
      ></InternalMap>
    </div>
  );
}