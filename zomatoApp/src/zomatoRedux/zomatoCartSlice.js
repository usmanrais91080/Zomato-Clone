import {createSlice} from '@reduxjs/toolkit';

const zomatoSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    addProductToCart: (state, action) => {
      const existingItemIndex = state.findIndex(
        val => val.id === action.payload.id,
      );
      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity++;
      } else {
        state.push({...action.payload, quantity: 1});
      }
    },
    removeProductFromCart: (state, action) => {
      return state.filter(val => val.id !== action.payload.id);
    },
    increaseByQuantity: (state, action) => {
      const item = state.find(val => val.id === action.payload.id);
      if (item) {
        item.quantity++;
      }
    },
    decreaseByQuantity: (state, action) => {
      const item = state.find(val => val.id === action.payload.id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          return state.filter(val => val.id !== action.payload.id);
        }
      }
      return state;
    },
    addItemsToFavourite: (state, action) => {
      const existingItemIndex = state.findIndex(
        val => val.id === action.payload.id,
      );
      if (existingItemIndex !== -1) {
        state[existingItemIndex].isFavourite = true;
      } else {
        state.push({...action.payload, isFavourite: true});
      }
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  increaseByQuantity,
  decreaseByQuantity,
  addItemsToFavourite,
} = zomatoSlice.actions;

export default zomatoSlice.reducer;
