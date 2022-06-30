import styles from './styles.module.css';
import { ShopDetails } from '../ShopDetails';

export function Category({ name, shops, onClickShop }) {
  return (
    <details className={styles.Category}>
      <summary>
        {name} <span className={styles.shopCount}>({shops.length})</span>
      </summary>
      {
        shops.map((shop) => (
          <ShopDetails
            key={shop.id}
            shop={shop}
            onClick={() => onClickShop(shop)}
            showSubCategory={true}
          ></ShopDetails>
        ))
      }
    </details>
  );
}