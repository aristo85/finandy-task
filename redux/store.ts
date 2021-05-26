import { createStore } from "redux";
import reducer from "./finandyInputs/reducer";

export const useStore = (initialState) => {
  return createStore(reducer, initialState);
};