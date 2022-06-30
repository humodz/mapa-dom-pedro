import { Icon } from '../Icon';
import { SearchShops } from '../SearchShops';
import styles from './styles.module.css';

export function NavBar({
  shops,
  onSelectShop,
  onSwitchScreen,
}) {
  return (
    <>
      <div className={styles.NavBar}>
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