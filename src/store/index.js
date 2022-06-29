import { configureStore } from '@reduxjs/toolkit';
import { shopsReducer } from './shopsSlice';

export const store = configureStore({
  reducer: {
    shops: shopsReducer,
  },
});