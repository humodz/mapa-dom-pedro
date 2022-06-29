import { configureStore } from '@reduxjs/toolkit';
import { storesReducer } from './storesSlice';

export const store = configureStore({
  reducer: {
    stores: storesReducer,
  },
});