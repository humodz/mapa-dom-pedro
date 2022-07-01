import { useDispatch, useSelector } from 'react-redux';
import { selectSearchText, setSearchText, setSelectedShop, switchScreen } from '../../store/searchShopsSlice';
import { selectShops } from '../../store/shopsSlice';
import { Icon } from '../../components/Icon';
import { SearchShopsField } from '../../components/SearchShopsField';
import styles from './styles.module.css';

export function NavBar() {
  const dispatch = useDispatch();

  const shops = useSelector(selectShops);
  const searchText = useSelector(selectSearchText);

  const onChooseShop = shop => dispatch(setSelectedShop(shop));
  const onSwitchScreen = () => dispatch(switchScreen());
  const onChangeSearchText = (text) => dispatch(setSearchText(text));

  return (
    <>
      <div className={styles.NavBar}>
        <SearchShopsField
          shops={shops}
          onChooseShop={onChooseShop}
          searchText={searchText}
          onChangeSearchText={onChangeSearchText}
        ></SearchShopsField>
        <Icon
          name='keycap-asterisk'
          size={2.5}
          onClick={onSwitchScreen}
        ></Icon>
      </div>

      <div style={{ height: '2.5rem' }}></div>
    </>
  );
}