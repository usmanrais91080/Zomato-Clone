import {configureStore} from '@reduxjs/toolkit';
import CartReducer from './CartSlice';
const store = configureStore({
  reducer: {
    myCart: CartReducer,
  },
});

export default store;
