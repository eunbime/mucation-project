import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  videoInfo : {},
};

const seletcedVideoSlice = createSlice({
  name: 'seletcedVideoSlice',
  initialState,
  reducers: {
    selectedvideo: (state, action) => {

     return state = action.payload;
    }
  }
});

export const { selectedvideo } = seletcedVideoSlice.actions;

export default seletcedVideoSlice.reducer;
