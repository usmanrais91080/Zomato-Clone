import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.find(val => val.id == action.payload.id);
      if (existingProduct != 1) {
        state[existingProduct].qty++;
      } else {
        state.push({...action.payload, qty: 1});
      }
    },
    removeFromCart: (state, action) => {
      const newList = state.filter(val => val.id != action.payload.id);
      return newList;
    },
  },
});
export const {addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;
