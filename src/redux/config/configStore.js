const { configureStore, combineReducers } = require('@reduxjs/toolkit');

const rootReducer = combineReducers({});

const store = configureStore({
  reducer: rootReducer
});

export default store;
