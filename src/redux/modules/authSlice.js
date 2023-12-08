import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setSuccessLogin: (state) => {
      state.isLogin = true;
    }
  }
});

export default authSlice.reducer;
export const { setSuccessLogin } = authSlice.actions;
