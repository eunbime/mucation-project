import authSlice from '../modules/authSlice';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({ authSlice });

const store = configureStore({
  reducer: rootReducer
});

export default store;
