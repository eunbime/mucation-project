import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: null,
  isOpen: false,
  title: '',
  message: '',
  resolveFunc: () => {}
};
const alertSlice = createSlice({
  name: 'alertSlice',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.mode = null;
      state.title = '';
      state.message = '';
      state.isOpen = false;
      state.resolveFunc = () => {};
    },
    alertOpen: (state, action) => {
      state.mode = 'alert';
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.isOpen = true;
    },
    confirmOpen: (state, action) => {
      state.mode = 'confirm';
      state.isOpen = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
    },
    setResolveFunc: (state, action) => {
      state.resolveFunc = action.payload.func;
    }
  }
});

export default alertSlice.reducer;
export const { alertOpen, closeModal, confirmOpen, setResolveFunc } = alertSlice.actions;
