import currentVideoSlice from '../modules/currentVideoSlice';
import seletcedVideoSlice from '../modules/seletcedVideoSlice';
import authSlice from '../modules/authSlice';
import mapSlice from '../modules/mapSlice';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import profileSlice from '../modules/profileSlice';

const rootReducer = combineReducers({ authSlice, profileSlice,mapSlice ,seletcedVideoSlice, currentVideoSlice });


const store = configureStore({
  reducer: rootReducer
});

export default store;
