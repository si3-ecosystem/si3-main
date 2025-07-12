import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SectionType = "scholars" | "guides" | "partners";

interface ActiveSectionState {
  activeSection: SectionType;
  contentSection: string | null;
}

const initialState: ActiveSectionState = {
  activeSection: "scholars",
  contentSection: null,
};

export const activeSectionSlice = createSlice({
  name: "activeSection",
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<SectionType>) => {
      state.activeSection = action.payload;
    },
    setContentSection: (state, action: PayloadAction<string | null>) => {
      state.contentSection = action.payload;
    },
  },
});

export const { setActiveSection, setContentSection } =
  activeSectionSlice.actions;
export default activeSectionSlice.reducer;
