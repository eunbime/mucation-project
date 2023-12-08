import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: { lat: '', lng: '' }
};

const mapSlice = createSlice({
  name: 'mapSlice',
  initialState,
  reducers: {
    getLocation: (state, action) => {
      state.location.lat = action.payload.lat;
      state.location.lng = action.payload.lng;
    }
  }
});

export default mapSlice.reducer;
export const { getLocation, getBounds } = mapSlice.actions;
