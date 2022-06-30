import { useCallback, useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import styles from './styles.module.css';

export function SearchShopsField({
  shops,
  onChooseShop,
}) {
  const [searchText, setSearchText] = useState('');

  const updateSearchText = useCallback(event => {
    setSearchText(event.target.value)
  }, []);

  const fuse = useMemo(() => {
    return new Fuse(shops, {
      keys: ['nome'],
    });
  }, [shops]);

  const filteredShops = useMemo(() => {
    if (!searchText) {
      return [];
    }

    return fuse.search(searchText)
      .slice(0, 10)
      .map(it => it.item);
  }, [searchText, fuse]);

  const chooseShop = useCallback(shop => {
    setSearchText('');
    onChooseShop(shop);
  }, [onChooseShop]);

  return (
    <div>
      <input
        className={styles.searchInput}
        value={searchText}
        onChange={updateSearchText}
      ></input>

      <div className={styles.shopList}>
        {
          filteredShops.map(shop => (
            <ShopItem
              key={shop.id}
              shop={shop}
              onClick={() => chooseShop(shop)}
            ></ShopItem>
          ))
        }
      </div>
    </div>
  );
}

function ShopItem({ shop, onClick }) {
  return (
    <div className={styles.shopItem} onClick={onClick}>
      <div
        className={styles.shopImage}
        style={{
          backgroundImage: `url('${shop.imgURL}')`,
        }}
      ></div>
      <div className={styles.shopName}>{ shop.nome }</div>
    </div>
  )
}