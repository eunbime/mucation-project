import seletcedVideoSlice from '../modules/seletcedVideoSlice';
import authSlice from '../modules/authSlice';
import profileSlice from '../modules/profileSlice';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({ authSlice, profileSlice, seletcedVideoSlice });

const store = configureStore({
  reducer: rootReducer
});

export default store;
