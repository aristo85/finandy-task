import { DataState, SET_INPUTS, SET_STORE } from "./types";

const initialState: DataState = {
  price: 1,
  quantity: 1,
  sum: 1,
  changed: "",
};

const reducer = (state: DataState = initialState, action): DataState => {
  switch (action.type) {
    case SET_INPUTS:
      return {
        ...state,
        ...action.payload,
      };
    case SET_STORE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
