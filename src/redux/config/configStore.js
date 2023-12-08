import authSlice from '../modules/authSlice';
import mapSlice from '../modules/mapSlice';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import profileSlice from '../modules/profileSlice';

const rootReducer = combineReducers({ authSlice, mapSlice, profileSlice });

const store = configureStore({
  reducer: rootReducer
});

export default store;
