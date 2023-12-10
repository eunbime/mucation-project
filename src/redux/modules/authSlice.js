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
    },
    setSuccessLogout: (state) => {
      state.isLogin = false;
    }
  }
});

export default authSlice.reducer;
export const { setSuccessLogin, setSuccessLogout } = authSlice.actions;
