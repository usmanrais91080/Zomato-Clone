import {configureStore} from '@reduxjs/toolkit';
import userReducer from './FetchThunck';

const AsynthunkStore = configureStore({
  reducer: {
    users: userReducer,
  },
});
export default AsynthunkStore;
