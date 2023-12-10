import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isEditingUserProfile: false // 프로필 수정 모달 열기/닫기
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    isEditingUserProfile: (state, action) => {
      state.isEditingUserProfile = action.payload;
    }
  }
});

export const { isEditingUserProfile } = profileSlice.actions;
export default profileSlice.reducer;
