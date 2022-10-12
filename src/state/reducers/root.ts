import { combineReducers } from '@reduxjs/toolkit';
import localSlice from './local';

const rootReducer = combineReducers({
  localSlice,
});

export default rootReducer;
