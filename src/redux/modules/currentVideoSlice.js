import { createSlice } from '@reduxjs/toolkit';

const initialState = {

};



const currentVideoSlice = createSlice({
  name: 'currentVideo',
  initialState,
  reducers: {
    currentVideoData: (state, action) => {
      // console.log('커랜트 맞나 ', action);
      return state = action.payload;
    }
  }
});

export const { currentVideoData } = currentVideoSlice.actions;

export default currentVideoSlice.reducer;
