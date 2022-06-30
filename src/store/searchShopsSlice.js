import { createSlice } from '@reduxjs/toolkit';

export const Screen = {
  MAP: 'MAP',
  CATEGORIES: 'CATEGORIES',
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
    setSelectedShop(state, { payload: shop }) {
      state.currentScreen = Screen.MAP;
      state.selectedShop = shop;
    },
    unselectShop(state) {
      state.selectedShop = null;
    },
    switchScreen(state) {
      if (state.currentScreen === Screen.MAP) {
        state.currentScreen = Screen.CATEGORIES;
      } else {
        state.currentScreen = Screen.MAP;
      }

      state.selectedShop = null;
    },
  },
  extraReducers: builder => {
  },
});

export const {
  setSelectedShop,
  unselectShop,
  switchScreen,
} = searchShopsSlice.actions;

export const searchShopsReducer = searchShopsSlice.reducer;