import { useCallback, useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import styles from './styles.module.css';
import { ShopSummary } from '../ShopSummary';


const noShopsFound = {
  imgURL: '',
  nome: 'Nenhuma loja encontrada.'
};

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
        placeholder='Nome da Loja...'
        className={styles.searchInput}
        value={searchText}
        onChange={updateSearchText}
      ></input>

      <div className={styles.shopList}>
        {
          filteredShops.map(shop => (
            <ShopSummary
              key={shop.id}
              shop={shop}
              onClick={() => chooseShop(shop)}
            ></ShopSummary>
          ))
        }
        {
          Boolean(searchText && filteredShops.length === 0) &&
            <ShopSummary
              shop={noShopsFound}
            ></ShopSummary>
        }
      </div>
    </div>
  );
}
