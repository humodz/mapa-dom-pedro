import { createSlice } from '@reduxjs/toolkit';
import { enumContains } from '../utils';

const Screen = {
  MAP: 'MAP',
  SEGMENTS: 'SEGMENTS',
};

const initialState = {
  currentScreen: Screen.MAP,
  selectedShop: null,
};

export const selectCurrentScreen = state => state.searchShops.currentScreen;
export const selectSelectedShop = state => state.searchShops.selectedShop;

export const searchShopsSlice = createSlice({
  name: 'searchShops',
  initialState,
  reducers: {
    selectShop(state, { payload: shop }) {
      state.currentScreen = Screen.MAP;
      state.selectedShop = shop;
    },
    unselectShop(state) {
      state.selectedShop = null;
    },
    goToScreen(state, { payload: screen }) {
      if (!enumContains(Screen, screen)) {
        return;
      }

      state.currentScreen = Screen.MAP;
      state.selectedShop = null;
    },
  },
  extraReducers: builder => {
  },
});

export const {
  selectShop,
  unselectShop,
  goToScreen,
} = searchShopsSlice.actions;

export const searchShopsReducer = searchShopsSlice.reducer;