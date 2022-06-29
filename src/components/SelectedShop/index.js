import { Icon } from '../Icon';
import styles from './styles.module.css';

export function SelectedShop({ shop, unselectShop }) {
  return (
    <div className={styles.SelectedShop}>
      <div
        className={styles.shopImage}
        style={{
          backgroundImage: `url('${shop.imgURL}')`,
        }}
      ></div>
      <div className={styles.shopInfo}>
        <div><strong>{ shop.nome }</strong></div>
        <div className={styles.capitalized}>
          <Icon name="label"></Icon>
          &nbsp;
          { shop.itensSeguimento[0].seguimento.toLowerCase() }
        </div>
        <div className={styles.capitalized}>
          <Icon name="pushpin"></Icon>
          &nbsp;
          { shop.pavimento[0].toLowerCase() }
        </div>
      </div>
      <Icon
        name="cross-mark"
        size="1.5"
        onClick={unselectShop}
      ></Icon>
    </div>
  );
}