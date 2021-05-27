import {
  DataInputs,
  SET_INPUTS,
  FirstChangeData,
  AfterFirstChangeData,
  SET_STORE,
} from "./types";

export const setValues = (data: DataInputs) => ({
  type: SET_INPUTS,
  payload: data,
});

export const setStoreFirstTime = (data: FirstChangeData) => {
  const { price, quantity, sum, changed, value } = data;
  const payload =
    changed === "price"
      ? {
          price: value,
          quantity,
          sum: value * quantity,
          changed,
        }
      : changed === "sum"
      ? {
          price: price,
          quantity: value / price,
          sum: value,
          changed,
        }
      : {
          price: price,
          quantity: value,
          sum: value * price,
          changed,
        };
  return {
    type: SET_STORE,
    payload,
  };
};

export const setStoreAfter = (data: AfterFirstChangeData) => {
  let payload;
  const { price, quantity, sum, changed, current } = data;
  if (current === "price") {
    payload =
      changed === "quantity"
        ? {
            price: price,
            quantity: sum / price,
            sum,
          }
        : {
            price: price,
            quantity,
            sum: price * quantity,
          };
  }
  if (current === "quantity") {
    payload =
      changed === "price"
        ? {
            price: sum / quantity,
            quantity: quantity,
            sum: sum,
          }
        : {
            price,
            quantity: quantity,
            sum: quantity * price,
          };
  }
  if (current === "sum") {
    payload =
      changed === "price"
        ? {
            price: sum / quantity,
            quantity,
            sum,
          }
        : {
            price,
            quantity: sum / price,
            sum,
          };
  }

  return {
    type: SET_INPUTS,
    payload,
  };
};
