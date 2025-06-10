"use client";

import { configureStore, Store } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import userReducer from "./slice/userSlice";
import pushReducer from "./slice/pushSlice";
import modelReducer from "./slice/modelSlice";
import communityReducer from "./slice/communitySlice";
import activeSectionReducer from "./slice/activeSectionSlice";
import grow3dgeReducer from "./slice/grow3dgeSlice";

export const store: Store = configureStore({
  reducer: {
    user: userReducer,
    push: pushReducer,
    model: modelReducer,
    community: communityReducer,
    activeSection: activeSectionReducer,
    grow3dge: grow3dgeReducer,
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
