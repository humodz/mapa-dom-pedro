import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// TODO: move this somewhere?
function apiFetchStores() {
  return fetch('/data/stores.json')
      .then(res => res.json());
}

const initialState = {
  stores: [],
};

export const fetchStores = createAsyncThunk(
  'stores/fetchStores',
  async () => {
    return await apiFetchStores();
  }
);

export const storesSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.stores = action.payload;
      });
  },
});

export const selectStores = state => state.stores.stores;

export const storesReducer = storesSlice.reducer;