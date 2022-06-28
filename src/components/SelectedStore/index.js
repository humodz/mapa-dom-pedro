import { Icon } from '../Icon';
import styles from './styles.module.css';

export function SelectedStore({ store, unselectStore }) {
  return (
    <div className={styles.SelectedStore}>
      <div
        className={styles.storeImage}
        style={{
          backgroundImage: `url('${store.imgURL}')`,
        }}
      ></div>
      <div className={styles.storeInfo}>
        <div><strong>{ store.nome }</strong></div>
        <div className={styles.capitalized}>
          <Icon name="label"></Icon>
          &nbsp;
          { store.itensSeguimento[0].seguimento.toLowerCase() }
        </div>
        <div className={styles.capitalized}>
          <Icon name="pushpin"></Icon>
          &nbsp;
          { store.pavimento[0].toLowerCase() }
        </div>
      </div>
      <Icon
        name="cross-mark"
        size="1.5"
        onClick={unselectStore}
      ></Icon>
    </div>
  );
}