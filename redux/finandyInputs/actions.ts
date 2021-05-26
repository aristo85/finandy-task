import {
  DataInputs,
  SET_INPUTS,
  SET_PRICE,
  SET_QUANTITY,
  SET_SUM,
  SET_CHANGED,
} from "./types";

export const setValues = (data: DataInputs) => ({
  type: SET_INPUTS,
  payload: data,
});

export const setPrice = (data: number) => ({
  type: SET_PRICE,
  payload: data,
});

export const setQuantity = (data: number) => ({
  type: SET_QUANTITY,
  payload: data,
});

export const setSum = (data: number) => ({
  type: SET_SUM,
  payload: data,
});

export const setChanged = (data: string) => ({
  type: SET_CHANGED,
  payload: data,
});
