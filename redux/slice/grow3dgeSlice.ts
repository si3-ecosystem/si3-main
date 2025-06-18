import { createSlice } from "@reduxjs/toolkit";

interface Grow3dgeState {
  isOpen: boolean;
}

const initialState: Grow3dgeState = {
  isOpen: true,
};

const grow3dgeSlice = createSlice({
  name: "grow3dge",
  initialState,
  reducers: {
    openGrow3dgeModal: (state: Grow3dgeState) => {
      state.isOpen = true;
      document.body.style.overflow = "hidden";
    },
    closeGrow3dgeModal: (state: Grow3dgeState) => {
      state.isOpen = false;
      document.body.style.overflow = "unset";
    },
    toggleGrow3dgeModal: (state: Grow3dgeState) => {
      state.isOpen = !state.isOpen;
      document.body.style.overflow = state.isOpen ? "unset" : "hidden";
    },
  },
});

export const { openGrow3dgeModal, closeGrow3dgeModal, toggleGrow3dgeModal } =
  grow3dgeSlice.actions;

export default grow3dgeSlice.reducer;
