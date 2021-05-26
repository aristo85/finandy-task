import { configureStore } from "@reduxjs/toolkit";
import finandyReducer from "./finandySlice";

export const store = configureStore({
  reducer: {
    finandy: finandyReducer,
  },
});
