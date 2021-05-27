import React, { Component, useEffect, useState } from "react";
import Form from "./presentational/Form";
import { connect } from "react-redux";
import {
  AfterFirstChangeData,
  DataInputs,
  DataState,
  FirstChangeData,
} from "../redux/finandyInputs/types";
import {
  setStoreAfter,
  setStoreFirstTime,
  setValues,
} from "../redux/finandyInputs/actions";
import { sendFinData } from "../store/DB";

interface FinProps {
  state: DataState;
  onSendData: (data: DataInputs) => void;
  data: DataInputs;
  onSetStoreFirstTime: (data: FirstChangeData) => void;
  onSetStoreAfter: (data: AfterFirstChangeData) => void;
}

const Finandy: React.FC<FinProps> = ({
  state,
  onSendData,
  data,
  onSetStoreFirstTime,
  onSetStoreAfter,
}) => {
  const [isLoading, setisLoading] = useState(false);

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value > 0 ? target.value : 1;
    const name = target.name;

    if (!state.changed) {
      onSetStoreFirstTime({
        ...state,
        changed: name,
        value,
      });
    } else {
      let price: number = name === "price" ? value : state.price;
      let quantity: number = name === "quantity" ? value : state.quantity;
      let sum: number = name === "sum" ? value : state.sum;
      onSetStoreAfter({ ...state, price, quantity, sum, current: name });
    }
  };

  const sendDataInputs = async () => {
    setisLoading(true);
    const { price, quantity, sum } = state;
    const res = await sendFinData({ price, quantity, sum });

    if (res.success) {
      onSendData({ price, quantity, sum });
      setisLoading(false);
    } else {
      alert(res.message);
      setisLoading(false);
    }
  };

  useEffect(() => {
    onSendData(data);
  }, []);

  return isLoading ? (
    <div>...Loading</div>
  ) : (
    <Form
      price={state.price}
      quantity={state.quantity}
      sum={state.sum}
      handleInputChange={handleInputChange}
      sendDataInputs={sendDataInputs}
    />
  );
};

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onSendData: (dataInputs) => {
      dispatch(setValues(dataInputs));
    },
    onSetStoreFirstTime: (data: FirstChangeData) => {
      dispatch(setStoreFirstTime(data));
    },
    onSetStoreAfter: (data: AfterFirstChangeData) => {
      dispatch(setStoreAfter(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Finandy);
