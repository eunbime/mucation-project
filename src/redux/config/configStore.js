import authSlice from '../modules/authSlice';
import profileSlice from '../modules/profileSlice';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({ authSlice, profileSlice });

const store = configureStore({
  reducer: rootReducer
});

export default store;
