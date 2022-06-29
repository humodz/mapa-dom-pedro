import { configureStore } from '@reduxjs/toolkit';
import { searchShopsReducer } from './searchShopsSlice';
import { shopsReducer } from './shopsSlice';

export const store = configureStore({
  reducer: {
    shops: shopsReducer,
    searchShops: searchShopsReducer,
  },
});