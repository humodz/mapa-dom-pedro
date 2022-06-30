import styles from './App.module.css';
import { useEffect } from 'react';
import { SearchShops } from './components/SearchShops';
import { useSelector, useDispatch } from 'react-redux';
import { selectShops, fetchShops } from './store/shopsSlice';
import { Screen, selectCurrentScreen, switchScreen, setSelectedShop } from './store/searchShopsSlice';
import { MapScreen } from './screens/MapScreen';
import { CategoriesScreen } from './screens/CategoriesScreen';
import { Icon } from './components/Icon';

export function App() {
  const dispatch = useDispatch();
  const shops = useSelector(selectShops);
  const currentScreen = useSelector(selectCurrentScreen);

  useEffect(() => {
    dispatch(fetchShops());
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <div className={styles.navBar}>
        <SearchShops
          shops={shops}
          setSelectedShop={store => dispatch(setSelectedShop(store))}
        ></SearchShops>
        <Icon
          name="keycap-asterisk"
          size="2.5"
          onClick={() => dispatch(switchScreen())}
        ></Icon>
      </div>

      {
        Boolean(currentScreen === Screen.MAP) &&
          <MapScreen></MapScreen>
      }

      {
        Boolean(currentScreen === Screen.CATEGORIES) &&
          <CategoriesScreen></CategoriesScreen>
      }
    </div>
  );
}