import {configureStore} from '@reduxjs/toolkit';
import zomatoCartSlice from './zomatoCartSlice';

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// };

// const persistedReducer = persistReducer(persistConfig, zomatoCartSlice);

export const zomatoStore = configureStore({
  reducer: {
    // cart: persistedReducer,
    cart: zomatoCartSlice,
  },
});

// export const persistor = persistStore(zomatoStore);
