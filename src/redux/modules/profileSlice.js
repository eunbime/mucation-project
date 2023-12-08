import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isEditingUserProfile: false, // 프로필 수정 모달 열기/닫기
  userIntroduce: '',
  userInterest: []
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    isEditingUserProfile: (state, action) => {
      state.isEditingUserProfile = action.payload;
    },
    editUserNickname: (state, action) => {
      localStorage.setItem('nickname', action.payload);
      state.nickname = action.payload;
    },
    edituserIntroduction: (state, action) => {
      state.userIntro = action.payload;
      localStorage.setItem('userIntro', action.payload);
    },
    addInterest: (state, action) => {
      state.userInterest.push(action.payload);
    },
    removeInterest: (state, action) => {
      let removeInterest = state.userInterest;
      removeInterest.splice(action.payload, 1);
    }
  }
});

export const { isEditingUserProfile, editUserNickname, edituserIntroduction, addInterest, removeInterest } =
  profileSlice.actions;
export default profileSlice.reducer;
