import { useMemo } from 'react';
import { Icon } from '../Icon';
import styles from './styles.module.css';

export function SelectedShop({
  shop,
  onClick = () => {},
  unselectShop,
  showSubCategory = false
}) {
  const label = useMemo(() => {
    const info = shop.itensSeguimento[0];
    const labelText = showSubCategory ? info.subseguimento : info.seguimento;
    return labelText.toLowerCase();
  }, [shop, showSubCategory]);

  return (
    <div className={styles.SelectedShop} onClick={onClick}>
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
          { label }
        </div>
        <div className={styles.capitalized}>
          <Icon name="pushpin"></Icon>
          &nbsp;
          { shop.pavimento[0].toLowerCase() }
        </div>
      </div>
      {
        Boolean(unselectShop) &&
          <Icon
            name="cross-mark"
            size="1.5"
            onClick={unselectShop}
          ></Icon>
      }
    </div>
  );
}