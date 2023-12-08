import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',      
  date:'',
  location: '',
  videoId: '',
  uid: '',
  title: '',
  context: '',
  thumbnail: '',
  nickname: '',
};

const seletcedVideoSlice = createSlice({
  name: 'seletcedVideoSlice',
  initialState,
  reducers: {
    selectedvideo: (state, action) => {
      console.log(action);
      state.id = action.payload;
    },
    currentVideo: (state, action) => {
     return {...state, action}
    }
  }
});

export const { selectedvideo ,currentVideo} = seletcedVideoSlice.actions;

export default seletcedVideoSlice.reducer;
