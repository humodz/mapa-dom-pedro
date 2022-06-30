import styles from './App.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectShops, fetchShops } from './store/shopsSlice';
import { Screen, selectCurrentScreen, switchScreen, setSelectedShop } from './store/searchShopsSlice';
import { MapScreen } from './screens/MapScreen';
import { CategoriesScreen } from './screens/CategoriesScreen';
import { NavBar } from './NavBar';

export function App() {
  const dispatch = useDispatch();
  const shops = useSelector(selectShops);
  const currentScreen = useSelector(selectCurrentScreen);

  useEffect(() => {
    dispatch(fetchShops());
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <NavBar
        shops={shops}
        onSelectShop={shop => dispatch(setSelectedShop(shop))}
        onSwitchScreen={() => dispatch(switchScreen())}
      ></NavBar>

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