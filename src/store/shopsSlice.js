import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// TODO: move this somewhere?
function apiFetchShops() {
  return fetch('/data/shops.json')
      .then(res => res.json());
}

const initialState = {
  shops: [],
};

export const selectShops = state => state.shops.shops;

export const fetchShops = createAsyncThunk(
  'shops/fetchShops',
  async () => {
    return await apiFetchShops();
  }
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