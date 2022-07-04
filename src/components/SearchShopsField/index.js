import { useCallback, useMemo } from 'react';
import Fuse from 'fuse.js';
import styles from './styles.module.css';
import { ShopSummary } from '../ShopSummary';
import { removeDiacritics } from '../../utils';


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

  const filteredShops = useFuzzySearch(searchText, shops);

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

function useFuzzySearch(searchText, shops) {
  const fuseNormal = useMemo(() => {
    return new Fuse(shops, {
      keys: ['nome'],
    });
  }, [shops]);

  const fuseWithoutDiacritics = useMemo(() => {
    return new Fuse(shops, {
      keys: ['nome'],
      getFn(obj, path) {
        const value = Fuse.config.getFn(obj, path);
        return removeDiacritics(value);
      },
    });
  }, [shops]);

  const filteredShops = useMemo(() => {
    if (!searchText) {
      return [];
    }

    const searchTextWithoutDiacritics = removeDiacritics(searchText);

    const fuse = (searchText === searchTextWithoutDiacritics)
      ? fuseWithoutDiacritics
      : fuseNormal;

    return fuse.search(searchText)
      .slice(0, 10)
      .map(it => it.item);
  }, [searchText, fuseNormal, fuseWithoutDiacritics]);

  return filteredShops
}