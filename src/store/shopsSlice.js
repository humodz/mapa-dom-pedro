import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { collatorPtBr, groupBy, sorted } from '../utils';


const initialState = {
  shops: [],
};

export const selectShops = state => state.shops.shops;

export const selectShopsByCategory = createSelector([selectShops], (shops) => {
  const shopsByCategory = groupBy(shops, shop => shop.itensSeguimento[0].seguimento);

  return Array
    .from(shopsByCategory)
    .sort(([category1], [category2]) => collatorPtBr.compare(category1, category2))
    .map(([category, shops]) => [
      category,
      sorted(shops, (shop1, shop2) => collatorPtBr.compare(shop1.nome, shop2.nome))
    ]);
});

export const fetchShops = createAsyncThunk(
  'shops/fetchShops',
  async () => {
    return await apiFetchShops();
  },
);

export const shopsSlice = createSlice({
  name: 'shops',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchShops.fulfilled, (state, action) => {
        state.shops = action.payload;
      });
  },
});

export const shopsReducer = shopsSlice.reducer;


// TODO: move this somewhere?
function apiFetchShops() {
  return fetch('/data/shops.json')
      .then(res => res.json());
}
