"use client";

import { configureStore, Store } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import pushReducer from "./slice/pushSlice";
import modelReducer from "./slice/modelSlice";
import communityReducer from "./slice/communitySlice";
import ethermailReducer from "./slice/EthermailSlice";

export const store: Store = configureStore({
  reducer: {
    push: pushReducer,
    model: modelReducer,
    community: communityReducer,
    ethermail: ethermailReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
