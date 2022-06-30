import styles from './App.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShops } from './store/shopsSlice';
import { Screen, selectCurrentScreen } from './store/searchShopsSlice';
import { MapScreen } from './containers/MapScreen';
import { CategoriesScreen } from './containers/CategoriesScreen';
import { NavBar } from './containers/NavBar';

export function App() {
  const dispatch = useDispatch();
  const currentScreen = useSelector(selectCurrentScreen);

  useEffect(() => {
    dispatch(fetchShops());
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <NavBar></NavBar>

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