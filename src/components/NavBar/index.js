import { Icon } from '../Icon';
import { SearchShopsField } from '../SearchShopsField';
import styles from './styles.module.css';

export function NavBar({
  shops,
  onSelectShop,
  onSwitchScreen,
}) {
  return (
    <>
      <div className={styles.NavBar}>
        <SearchShopsField
          shops={shops}
          onChooseShop={onSelectShop}
        ></SearchShopsField>
        <Icon
          name='keycap-asterisk'
          size='2.5'
          onClick={onSwitchScreen}
        ></Icon>
      </div>

      <div style={{ height: '2.5rem' }}></div>
    </>
  );
}