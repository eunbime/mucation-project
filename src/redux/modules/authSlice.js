import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {},
  isLogin: false
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.currentUser = action.payload;
      state.isLogin = true;
    }
  }
});

export default authSlice.reducer;
export const { setUserInfo } = authSlice.actions;
