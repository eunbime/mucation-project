import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isEditingUserProfile: false, // 프로필 수정 모달 열기/닫기
  avatar: localStorage.getItem('photoURL'),
  nickname: localStorage.getItem('nickname'),
  email: localStorage.getItem('email'),
  uid: localStorage.getItem('uid'),
  userIntro: localStorage.getItem('userIntro'),
  userInterestText: '',
  userInterest: []
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { accessToken, avatar, nickname, uid, email, userIntro, userInterest } = action.payload;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('avatar', avatar);
      localStorage.setItem('nickname', nickname);
      localStorage.setItem('uid', uid);
      localStorage.setItem('email', email);
      localStorage.setItem('userIntro', userIntro);
      localStorage.setItem('userInterest', userInterest);
      state.isLogin = true;
      state.avatar = avatar;
      state.nickname = nickname;
      state.uid = uid;
      state.email = email;
      state.userIntro = userIntro;
      state.userInterest = userInterest;
    },
    logout: (state, action) => {
      state.isLogin = false;
      localStorage.clear();
    },
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

export const {
  login,
  logout,
  isEditingUserProfile,
  editUserNickname,
  edituserIntroduction,
  addInterest,
  removeInterest
} = authSlice.actions;
export default authSlice.reducer;
