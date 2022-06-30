import { InternalMap } from '../../components/InternalMap';
import { SelectedShop } from '../../components/SelectedShop';
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
            <SelectedShop
              shop={selectedShop}
              unselectShop={() => dispatch(unselectShop())}
            ></SelectedShop>
        }
      </div>

      <InternalMap
        highlight={selectedShop}
      ></InternalMap>
    </div>
  );
}