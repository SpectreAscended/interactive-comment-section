import { createSlice } from '@reduxjs/toolkit';

interface InitialUiState {
  modalOpen: boolean;
  modalData: any;
  replyInput: {
    menuOpen: boolean;
    commentId: string | null;
  };
  editInput: {
    menuOpen: boolean;
    commentId: string | null;
  };
}

const initialUiState: InitialUiState = {
  modalOpen: false,
  modalData: {},
  replyInput: {
    menuOpen: false,
    commentId: null,
  },
  editInput: {
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
      state.replyInput = { menuOpen: true, commentId: action.payload };
    },
    closeReply(state) {
      state.replyInput = { menuOpen: false, commentId: null };
    },
    openEdit(state, action) {
      state.editInput = { menuOpen: true, commentId: action.payload };
    },
    closeEdit(state) {
      state.editInput = { menuOpen: false, commentId: null };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
