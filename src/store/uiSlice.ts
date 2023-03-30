import { createSlice } from '@reduxjs/toolkit';

interface InitialUiState {
  modalOpen: boolean;
}

const initialUiState: InitialUiState = {
  modalOpen: false,
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
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
