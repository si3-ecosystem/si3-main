import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EthemailState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ethermail: any;
  isConnected: boolean;
}

const initialState: EthemailState = {
  ethermail: {},
  isConnected: false,
};

const ethermailSlice = createSlice({
  name: "ethermail",

  initialState,

  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setEthermail: (state: EthemailState, action: PayloadAction<any>) => {
      state.ethermail = action.payload;
    },

    resetEthermail: () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      initialState;
    },

    setConnected: (state: EthemailState, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
  },
});

export const { setEthermail, resetEthermail, setConnected } =
  ethermailSlice.actions;

export default ethermailSlice.reducer;
