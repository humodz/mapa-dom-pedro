import styles from './styles.module.css';
import { ShopDetails } from '../ShopDetails';
import { useCallback, useMemo, useState } from 'react';
import { collatorPtBr, sorted, unique } from '../../utils';
import { useUniqueId } from '../../utils/hooks';

export function Category({ name, shops, onClickShop }) {
  const id = useUniqueId('cat');

  const subCategories = useMemo(() => {
    const allSubCategories = shops.map(
      shop => shop.itensSeguimento[0].subseguimento.toLowerCase()
    );
    return sorted(unique(allSubCategories), collatorPtBr.compare);
  }, [shops]);

  const [isChecked, toggle, reset] = useCheckboxList();

  const selectedShops = useMemo(() => {
    const selectedSubCategories = subCategories.filter((_, i) => isChecked(i));

    return shops.filter(shop =>
      selectedSubCategories.includes(shop.itensSeguimento[0].subseguimento.toLowerCase())
    );
  }, [shops, subCategories, isChecked]);

  return (
    <details className={styles.Category} onToggle={reset}>
      <summary>
        {name} <span className={styles.shopCount}>({shops.length})</span>
      </summary>
      <div className={styles.subCategories}>
        {
          subCategories.map((subCategory, i) => (
            <Checkbox
              key={i}
              id={`${id}-${i}`}
              label={subCategory}
              checked={isChecked(i)}
              onChange={() => toggle(i)}
            ></Checkbox>
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

function Checkbox({ id, label, checked, onChange }) {
  return (
    <div>
      <input
        type='checkbox'
        id={id}
        checked={checked}
        onChange={onChange}
      ></input>
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

function useCheckboxList() {
  const [unchecked, setUnchecked] = useState({});

  const isChecked = useCallback(
    (i) => !unchecked[i],
    [unchecked],
  );

  const toggle = useCallback((i) => setUnchecked(state => ({
    ...state,
    [i]: !state[i]
  })), []);

  const reset = useCallback(() => setUnchecked({}), []);

  return [isChecked, toggle, reset];
}