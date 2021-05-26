import {
  DataInputs,
  DataState,
  SET_CHANGED,
  SET_INPUTS,
  SET_PRICE,
  SET_QUANTITY,
  SET_SUM,
} from "./types";

const initialState: DataState = {
  price: 1,
  quantity: 1,
  sum: 1,
  changed: ''
};

const reducer = (state: DataState = initialState, action): DataState => {
  switch (action.type) {
    case SET_INPUTS:
      return {
        ...state,
        ...action.payload,
      };
    case SET_PRICE:
      return { ...state, price: action.payload };

    case SET_QUANTITY:
      return { ...state, quantity: action.payload };

    case SET_SUM:
      return { ...state, sum: action.payload };

    case SET_CHANGED:
      return { ...state, changed: action.payload };

    default:
      return state;
  }
};

export default reducer;
