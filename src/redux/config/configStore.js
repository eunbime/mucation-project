import authSlice from '../modules/authSlice';
import auth from '../module/auth';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({ authSlice, auth });

const store = configureStore({
  reducer: rootReducer
});

export default store;
