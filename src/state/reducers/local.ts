import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppDispatch } from '../store';

const initialState: LocalState = {
  token: null,
};

const localSlice = createSlice({
  name: 'local',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log('HYDRATE', state, action.payload);
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const saveToken = (token: string) => async (dispatch: AppDispatch) => {
  localStorage.setItem('token', token);
  dispatch(localSlice.actions.setToken(token));
};

export const { setToken } = localSlice.actions;

export default localSlice.reducer;
