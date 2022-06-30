import { InternalMap } from '../../components/InternalMap';
import { ShopDetails } from '../../components/ShopDetails';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedShop, unselectShop } from '../../store/searchShopsSlice';

export function MapScreen() {
  const dispatch = useDispatch();
  const selectedShop = useSelector(selectSelectedShop);

  return (
    <div>
      <div>
        {
          Boolean(selectedShop) &&
            <ShopDetails
              shop={selectedShop}
              onClose={() => dispatch(unselectShop())}
            ></ShopDetails>
        }
      </div>

      <InternalMap
        highlight={selectedShop}
      ></InternalMap>
    </div>
  );
}