import { createSlice } from '@reduxjs/toolkit/dist';

const initialState = {
  state: {},
  bounds: {}
};

const mapSlice = createSlice({
  name: 'mapSlice',
  initialState,
  reducers: {
    getState: (state, action) => {},
    getBounds: (state, action) => {}
  }
});

export default mapSlice.Slice;
export const { getState, getBounds } = mapSlice.actions;
