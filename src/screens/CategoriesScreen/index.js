import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectShopsByCategory } from '../../store/shopsSlice';
import { setSelectedShop } from '../../store/searchShopsSlice';
import { useMemo } from 'react';
import { sorted } from '../../utils';
import { ShopDetails } from '../../components/ShopDetails';

const collator = new Intl.Collator(['pt-BR', 'pt'], {
  usage: 'sort',
  sensitivity: 'base',
  ignorePunctuation: true,
  numeric: true,
});

export function CategoriesScreen() {
  const dispatch = useDispatch();

  const shopsByCategory = useSelector(selectShopsByCategory);

  const sortedCategories = useMemo(() => (
    Array
      .from(shopsByCategory)
      .sort(([name1], [name2]) => collator.compare(name1, name2))
      .map(([name, shops]) => [
        name,
        sorted(shops, (shop1, shop2) => collator.compare(shop1.nome, shop2.nome))
      ])
  ), [shopsByCategory]);

  return (
    <div>
      {
        sortedCategories
          .map(([name, shops], i) => (
            <Category
              key={i}
              name={name}
              shops={shops}
              onClickShop={shop => dispatch(setSelectedShop(shop))}
            ></Category>
          ))
      }
    </div>
  );
}

function Category({ name, shops, onClickShop }) {
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
          // <p key={shop.id} onClick={() => onClickShop(shop)}>
          //   <img src={shop.imgURL} alt="" width="50" height="50"></img>
          //   {shop.nome}
          // </p>
        ))
      }
    </details>
  );
}