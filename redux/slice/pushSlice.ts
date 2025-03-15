import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PushState {
  pushSign: any;
  isConnected: boolean;
}

const initialState: PushState = {
  pushSign: {},
  isConnected: false,
};

const pushSlice = createSlice({
  name: "push",

  initialState,

  reducers: {
    setPushSign: (state: PushState, action: PayloadAction<any>) => {
      state.pushSign = action.payload;
    },

    resetPush: () => {
      initialState;
    },

    setConnected: (state: PushState, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
  },
});

export const { setPushSign, resetPush, setConnected } = pushSlice.actions;

export default pushSlice.reducer;
