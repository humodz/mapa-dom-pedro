import styles from './App.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShops } from './store/shopsSlice';
import { Screen, selectCurrentScreen } from './store/searchShopsSlice';
import { MapScreen } from './screens/MapScreen';
import { CategoriesScreen } from './screens/CategoriesScreen';
import { NavBar } from './components/NavBar';

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