import currentVideoSlice from '../modules/currentVideoSlice';
import seletcedVideoSlice from '../modules/seletcedVideoSlice';
import authSlice from '../modules/authSlice';
import mapSlice from '../modules/mapSlice';
import alertSlice from '../modules/alertSlice';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import profileSlice from '../modules/profileSlice';

const rootReducer = combineReducers({ authSlice, profileSlice,mapSlice ,seletcedVideoSlice, currentVideoSlice,alertSlice  });


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export default store;
