import { useDispatch, useSelector } from 'react-redux';
import { selectShopsByCategory } from '../../store/shopsSlice';
import { setSelectedShop } from '../../store/searchShopsSlice';
import { Category } from '../../components/Category';

export function CategoriesScreen() {
  const dispatch = useDispatch();

  const shopsByCategory = useSelector(selectShopsByCategory);

  const onClickShop = shop => {
    window.scrollTo(0, 0);
    dispatch(setSelectedShop(shop));
  }

  return (
    <div>
      {
        shopsByCategory
          .map(([category, shops], i) => (
            <Category
              key={i}
              name={category}
              shops={shops}
              onClickShop={onClickShop}
            ></Category>
          ))
      }
    </div>
  );
}
