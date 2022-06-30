import styles from './App.module.css';
import { useEffect } from 'react';
import { SearchShops } from './components/SearchShops';
import { useSelector, useDispatch } from 'react-redux';
import { selectShops, fetchShops } from './store/shopsSlice';
import { selectShop } from './store/searchShopsSlice';
import { MapScreen } from './screens/MapScreen';
// import { Icon } from './components/Icon';

export function App() {
  const dispatch = useDispatch();
  const shops = useSelector(selectShops);

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

      <MapScreen></MapScreen>
    </div>
  );
}