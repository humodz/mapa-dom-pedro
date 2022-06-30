import { useDispatch, useSelector } from 'react-redux';
import { selectShopsByCategory } from '../../store/shopsSlice';
import { setSelectedShop } from '../../store/searchShopsSlice';
import { useMemo } from 'react';
import { sorted } from '../../utils';
import { Category } from '../../components/Category';

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

  const onClickShop = shop => {
    window.scrollTo(0, 0);
    dispatch(setSelectedShop(shop));
  }

  return (
    <div>
      {
        sortedCategories
          .map(([name, shops], i) => (
            <Category
              key={i}
              name={name}
              shops={shops}
              onClickShop={onClickShop}
            ></Category>
          ))
      }
    </div>
  );
}
