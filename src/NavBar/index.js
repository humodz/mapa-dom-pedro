import { Icon } from '../components/Icon';
import { SearchShops } from '../components/SearchShops';
import styles from './styles.module.css';

export function NavBar({
  shops,
  onSelectShop,
  onSwitchScreen,
}) {
  return (
    <>
      <div className={styles.navBar}>
        <SearchShops
          shops={shops}
          onChooseShop={onSelectShop}
        ></SearchShops>
        <Icon
          name="keycap-asterisk"
          size="2.5"
          onClick={onSwitchScreen}
        ></Icon>
      </div>

      <div style={{ height: '2.5rem' }}></div>
    </>
  );
}