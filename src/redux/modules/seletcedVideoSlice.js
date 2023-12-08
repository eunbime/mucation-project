import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: ''
};

const seletcedVideoSlice = createSlice({
  name: 'seletcedVideoSlice',
  initialState,
  reducers: {
    selectedvideo: (state, action) => {
      // console.log('액션',action);
      state.id = action.payload;
    }
  }
});

export const { selectedvideo } = seletcedVideoSlice.actions;

export default seletcedVideoSlice.reducer;
