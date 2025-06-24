import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SectionType = "scholars" | "guides" | "partners";

interface ActiveSectionState {
  activeSection: SectionType;
}

const initialState: ActiveSectionState = {
  activeSection: "scholars",
};

export const activeSectionSlice = createSlice({
  name: "activeSection",
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<SectionType>) => {
      state.activeSection = action.payload;
    },
  },
});

export const { setActiveSection } = activeSectionSlice.actions;
export default activeSectionSlice.reducer;
