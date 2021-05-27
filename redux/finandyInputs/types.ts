export const SET_INPUTS = "SET_INPUTS";
export const SET_STORE = "SET_STORE";

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

export type FirstChangeData = {
  price: number;
  quantity: number;
  sum: number;
  changed: string;
  value: number;
};

export type AfterFirstChangeData = {
  price: number;
  quantity: number;
  sum: number;
  changed: string;
  current: string;
};

// export type SetDataInputAction = {
//   type: string;
//   payload: DataInputs;
// };
