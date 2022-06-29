import styles from './App.module.css';
import { useEffect } from 'react';
import { InternalMap } from './components/InternalMap';
import { SearchShops } from './components/SearchShops';
import { SelectedShop } from './components/SelectedShop';
import { useSelector, useDispatch } from 'react-redux';
import { selectShops, fetchShops } from './store/shopsSlice';
import { selectSelectedShop, selectShop, unselectShop } from './store/searchShopsSlice';
// import { Icon } from './components/Icon';

export function App() {
  const dispatch = useDispatch();
  const shops = useSelector(selectShops);
  const selectedShop = useSelector(selectSelectedShop);

  useEffect(() => {
    dispatch(fetchShops());
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <div>
        <SearchShops
          shops={shops}
          setSelectedShop={store => dispatch(selectShop(store))}
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
              unselectShop={() => dispatch(unselectShop())}
            ></SelectedShop>
        }
      </div>

      <InternalMap
        highlight={selectedShop}
      ></InternalMap>
    </div>
  );
}