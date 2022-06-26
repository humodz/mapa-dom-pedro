import './App.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { InternalMap } from './InternalMap';
import { removeDiacritics } from './utils';

export function App() {

  const [searchText, setSearchText] = useState('');

  const updateSearchText = useCallback(event => {
    setSearchText(event.target.value)
  }, []);


  const [stores, setStores] = useState([]);

  const filteredStores = useMemo(() => {
    if (!searchText) {
      return [];
    }

    return stores
      .filter(it => it.nome.toUpperCase().includes(searchText.toUpperCase()))
      .slice(0, 10);
  }, [searchText, stores]);


  const [selectedStore, setSelectedStore] = useState(null);

  const selectStore = (store) => {
    setSearchText('');
    setSelectedStore(store);
  };


  const regions = useMemo(() => {
    const allRegions = stores.map(it => it.pavimento[0]);
    const uniqueRegions = new Set(allRegions);
    console.log([...uniqueRegions].map(it => removeDiacritics(it)));
    return [...uniqueRegions];
  }, [stores]);

  const segments = useMemo(() => {
    const allSegments = {};

    for (const store of stores) {
      const segment = store.itensSeguimento[0].seguimento;
      const subSegment = store.itensSeguimento[0].subseguimento;

      allSegments[segment] = allSegments[segment] || new Set();
      allSegments[segment].add(subSegment);
    }

    // console.log(allSegments);
    return allSegments;
  }, [stores]);


  useEffect(() => {
    fetch('/data/stores.json')
      .then(res => res.json())
      .then(data => {
        // console.log('!!!', data);
        setStores(data);
      });
  }, []);


  return (
    <div className='App'>
      <input
        className='searchInput'
        value={searchText}
        onChange={updateSearchText}
      ></input>

      <div>
        {
          selectedStore &&
            <StoreItem
              store={selectedStore}
              onClick={() => setSelectedStore(null)}
            ></StoreItem>
        }
      </div>

      <div>
        <div className='storeList'>
          {filteredStores.map(store => (
            <StoreItem
              key={store.id}
              store={store}
              onClick={() => selectStore(store)}
            ></StoreItem>
          ))}
        </div>
      </div>

      <InternalMap
        highlight={selectedStore?.pavimento[0]}
      ></InternalMap>
    </div>
  );
}

function StoreItem({ store, onClick }) {
  return (
    <div class='storeItem' onClick={onClick}>
      <div
        class='storeImage'
        style={{
          backgroundImage: `url('${store.imgURL}')`,
        }}
      ></div>
      <div class='storeName'>{ store.nome }</div>
    </div>
  )
}