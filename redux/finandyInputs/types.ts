export const SET_INPUTS = "SET_INPUTS";
export const SET_PRICE = "SET_PRICE";
export const SET_QUANTITY = "SET_QUANTITY";
export const SET_SUM = "SET_SUM";
export const SET_CHANGED = "SET_CHANGED";

export type DataInputs = {
  price: number;
  quantity: number;
  sum: number;
};

export type DataState = {
  price: number;
  quantity: number;
  sum: number;
  changed: string;
};

export type SetDataInputAction = {
  type: string;
  payload: DataInputs;
};
