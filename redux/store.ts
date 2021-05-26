import { configureStore } from "@reduxjs/toolkit";
import finandyReducer from "./finandySlice";

export const store = configureStore({
  reducer: {
    finandy: finandyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
