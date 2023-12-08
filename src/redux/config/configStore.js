import auth from '../module/auth.js';

import { configureStore, combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  auth
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
