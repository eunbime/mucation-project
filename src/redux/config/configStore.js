import authSlice from '../modules/authSlice';
import auth from '../module/auth';
import mapSlice from '../modules/mapSlice';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({ authSlice, auth, mapSlice });

const store = configureStore({
  reducer: rootReducer
});

export default store;
