import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const seletcedVideoSlice = createSlice({
  name: 'seletcedVideoSlice',
  initialState,
  reducers: {
    selectedvideo: (state, action) => {
      state = action.payload;
      localStorage.setItem('post', JSON.stringify(action.payload));
      return state;
    }
  }
});

export const { selectedvideo } = seletcedVideoSlice.actions;

export default seletcedVideoSlice.reducer;
