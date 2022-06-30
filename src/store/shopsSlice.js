import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { groupBy } from '../utils';

const initialState = {
  shops: [],
};

export const selectShops = state => state.shops.shops;

export const selectShopsByCategory = createSelector([selectShops], (shops) => {
  return groupBy(shops, shop => shop.itensSeguimento[0].seguimento);
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
