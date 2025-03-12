import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommunityState {
  activeAccordionValue: string | null;
}

const initialState: CommunityState = {
  activeAccordionValue: "si_u_scholars",
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    setActiveAccordionValue: (
      state: CommunityState,
      action: PayloadAction<string | null>,
    ) => {
      state.activeAccordionValue = action.payload;
    },
  },
});

export const { setActiveAccordionValue } = communitySlice.actions;
export default communitySlice.reducer;
