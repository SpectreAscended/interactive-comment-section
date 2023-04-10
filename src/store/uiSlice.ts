import { createSlice } from '@reduxjs/toolkit';

interface InitialUiState {
  modalOpen: boolean;
  modalData: any;
}

const initialUiState: InitialUiState = {
  modalOpen: false,
  modalData: {},
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUiState,
  reducers: {
    openModal(state) {
      state.modalOpen = true;
    },
    closeModal(state) {
      state.modalOpen = false;
    },
    setModalData(state, action) {
      state.modalData = action.payload;
    },
    resetModalData(state) {
      state.modalData = {};
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
