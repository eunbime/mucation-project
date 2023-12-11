import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  videoInfo: {}
};

const currentVideoSlice = createSlice({
  name: 'currentVideo',
  initialState,
  reducers: {
    currentVideoData: (state, action) => {
      state.videoInfo = action.payload;
    }
  }
});

export const { currentVideoData } = currentVideoSlice.actions;

export default currentVideoSlice.reducer;
