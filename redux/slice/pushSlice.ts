import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PushState {
  pushSign: any;
}

const initialState: PushState = {
  pushSign: {},
};

const pushSlice = createSlice({
  name: "push",

  initialState,

  reducers: {
    setPushSign: (state: PushState, action: PayloadAction<any>) => {
      state.pushSign = action.payload;
    },

    resetPushSign: () => {
      initialState;
    },
  },
});

export const { setPushSign, resetPushSign } = pushSlice.actions;

export default pushSlice.reducer;
