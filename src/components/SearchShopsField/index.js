import { useCallback, useMemo } from 'react';
import Fuse from 'fuse.js';
import styles from './styles.module.css';
import { ShopSummary } from '../ShopSummary';


const noShopsFound = {
  imgURL: '',
  nome: 'Nenhuma loja encontrada.'
};

export function SearchShopsField({
  shops,
  onChooseShop = () => {},
  searchText,
  onChangeSearchText = () => {},
}) {
  const updateSearchText = useCallback(event => {
    onChangeSearchText(event.target.value)
  }, [onChangeSearchText]);

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
              onClick={() => onChooseShop(shop)}
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
