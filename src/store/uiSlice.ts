import { createSlice } from '@reduxjs/toolkit';

interface InitialUiState {
  modalOpen: boolean;
  modalData: any;
  replyOpen: {
    menuOpen: boolean;
    commentId: string | null;
  };
}

const initialUiState: InitialUiState = {
  modalOpen: false,
  modalData: {},
  replyOpen: {
    menuOpen: false,
    commentId: null,
  },
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
    openReply(state, action) {
      state.replyOpen = { menuOpen: true, commentId: action.payload };
    },
    closeReply(state) {
      state.replyOpen = { menuOpen: false, commentId: null };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
