import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existingProductIndex = state.findIndex(
        val => val.id === action.payload.id,
      );

      if (existingProductIndex !== -1) {
        // If product already exists in the cart, increase its quantity
        state[existingProductIndex].qty++;
      } else {
        // If product does not exist in the cart, add it
        state.push({...action.payload, qty: 1});
      }
    },
    removeFromCart: (state, action) => {
      const newList = state.filter(val => val.name !== action.payload.name);
      return newList;
    },
  },
});
export const {addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;
