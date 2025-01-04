import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const useFetch = createAsyncThunk('GetUsers', async () => {
  const responce = await axios.get('https://randomuser.me/api/?results=30');
  return responce.data.results;
});

export const Asynthunk = createSlice({
  name: 'users',
  initialState: {data: null, isLoader: false, isError: false},
  extraReducers: builder => {
    builder.addCase(useFetch.pending, (state, action) => {
      state.isLoader = true;
    });
    builder.addCase(useFetch.fulfilled, (state, action) => {
      state.isLoader = false;
      state.data = action.payload;
    });
    builder.addCase(useFetch.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});
export default Asynthunk.reducer;
