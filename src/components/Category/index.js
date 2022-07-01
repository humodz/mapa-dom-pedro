import styles from './styles.module.css';
import { ShopDetails } from '../ShopDetails';
import { useCallback, useMemo, useState } from 'react';
import { collatorPtBr, sorted, unique } from '../../utils';
import { useUniqueId } from '../../utils/hooks';

const SHOW_ALL = 0;

export function Category({ name, shops, onClickShop }) {
  const subCategories = useMemo(() => {
    const allSubCategories = shops.map(
      shop => shop.itensSeguimento[0].subseguimento.toLowerCase()
    );
    return ['mostrar todas', ...sorted(unique(allSubCategories), collatorPtBr.compare)];
  }, [shops]);

  const [checkedSubCategory, setCheckedSubCategory] = useState(SHOW_ALL);

  const showAll = useCallback(() => setCheckedSubCategory(SHOW_ALL), []);

  const selectedShops = useMemo(() => (
    shops.filter(shop => {
      const shopSubCategory = shop.itensSeguimento[0].subseguimento.toLowerCase();
      return checkedSubCategory === SHOW_ALL || subCategories[checkedSubCategory] === shopSubCategory;
    })
  ), [shops, subCategories, checkedSubCategory]);

  return (
    <details className={styles.Category} onToggle={showAll}>
      <summary>
        {name} <span className={styles.shopCount}>({shops.length})</span>
      </summary>
      <div className={styles.subCategories}>
        {
          subCategories.map((subCategory, i) => (
            <RadioButton
              key={i}
              label={subCategory}
              checked={checkedSubCategory === i}
              onChange={() => setCheckedSubCategory(i)}
            ></RadioButton>
          ))
        }
        <hr></hr>
      </div>
      {
        selectedShops.map((shop) => (
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

function RadioButton({ label, checked, onChange }) {
  const id = useUniqueId('radio');

  return (
    <div>
      <input
        type='radio'
        id={id}
        checked={checked}
        onChange={onChange}
      ></input>
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
