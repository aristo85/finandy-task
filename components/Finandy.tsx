import React, { Component, useEffect, useState } from "react";
import Form from "./presentational/Form";
import { connect } from "react-redux";
import { DataInputs, DataState } from "../redux/finandyInputs/types";
import {
  setChanged,
  setPrice,
  setQuantity,
  setSum,
  setValues,
} from "../redux/finandyInputs/actions";
import { sendFinData } from "../store/DB";

interface FinProps {
  state: DataState;
  onSendData: (data: DataInputs) => void;
  data: DataInputs;
  setChanged: (changed: string) => void;
  setPrice: (price: number) => void;
  setQuantity: (quantity: number) => void;
  setSum: (sum: number) => void;
}
interface FinState {
  isLoading: boolean;
  changed: string;
}

const Finandy: React.FC<FinProps> = ({
  state,
  onSendData,
  data,
  setChanged,
  setPrice,
  setQuantity,
  setSum,
}) => {
  const [isLoading, setisLoading] = useState(false);

  const handleInputChange = (e) => {
    // e.preventDefult();
    const target = e.target;
    const value = target.value > 0 ? target.value : 1;
    const name = target.name;

    if (!state.changed) {
      console.log(name);
      setChanged(name);
      name === "price"
        ? setPrice(value)
        : name === "sum"
        ? setQuantity(value / state.price)
        : setQuantity(value);
    } else {
      if (name === "price") {
        setPrice(value);
        state.changed === "price"
          ? null
          : state.changed === "sum"
          ? setSum(state.quantity * value)
          : setQuantity(state.sum / value);
      }
      if (name === "quantity") {
        setQuantity(value);
        state.changed === "price"
          ? setPrice(state.sum / value)
          : state.changed === "sum"
          ? setSum(state.price * value)
          : null;
      }
      if (name === "sum") {
        console.log("sum", value);
        setSum(value);
        state.changed === "price"
          ? setPrice(value / state.quantity)
          : setQuantity(value / state.price);
      }
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
    state.price > 0 && state.quantity > 0
      ? setSum(state.price * state.quantity)
      : setSum(0);
  }, [state.price, state.quantity]);

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
    setPrice: (price) => {
      dispatch(setPrice(price));
    },
    setQuantity: (quantity) => {
      dispatch(setQuantity(quantity));
    },
    setSum: (sum) => {
      dispatch(setSum(sum));
    },
    setChanged: (data) => {
      dispatch(setChanged(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Finandy);

// interface FinProps {
//   state: DataState;
//   onSendData: (data: DataInputs) => void;
//   data: DataInputs;
//   setChanged: (changed: string) => void;
//   setPrice: (price: number) => void;
//   setQuantity: (quantity: number) => void;
//   setSum: (sum: number) => void;
// }
// interface FinState {
//   isLoading: boolean;
//   changed: string;
// }
// export class Finandy extends Component<FinProps, FinState> {
//   constructor(props) {
//     super(props);
//     this.state = { isLoading: false, changed: "" };
//   }

//   handleInputChange = (e) => {
//     // e.preventDefult();
//     const target = e.target;
//     const value = target.value > 0 ? target.value : 1;
//     const name = target.name;

//     if (!this.props.state.changed) {
//       console.log(name);
//       this.props.setChanged(name);
//       name === "price"
//         ? this.props.setPrice(value)
//         : name === "sum"
//         ? this.props.setQuantity(value / this.props.state.price)
//         : this.props.setQuantity(value);
//     } else {
//       if (name === "price") {
//         this.props.setPrice(value);
//         this.state.changed === "price"
//           ? null
//           : this.props.state.changed === "sum"
//           ? this.props.setSum(this.props.state.quantity * value)
//           : this.props.setQuantity(this.props.state.sum / value);
//       }
//       if (name === "quantity") {
//         this.props.setQuantity(value);
//         this.state.changed === "price"
//           ? this.props.setPrice(this.props.state.sum / value)
//           : this.state.changed === "sum"
//           ? this.props.setSum(this.props.state.price * value)
//           : null;
//       }
//       if (name === "sum") {
//         console.log("sum", value);
//         this.props.setSum(value);
//         this.state.changed === "price"
//           ? this.props.setPrice(value / this.props.state.quantity)
//           : this.props.setQuantity(value / this.props.state.price);
//       }
//     }
//   };

//   sendDataInputs = async () => {
//     this.setState({
//       isLoading: true,
//     });
//     const { price, quantity, sum } = this.props.state;
//     const res = await sendFinData({ price, quantity, sum });

//     if (res.success) {
//       this.setState({
//         isLoading: false,
//       });
//     } else {
//       alert(res.message);
//       this.setState({
//         isLoading: false,
//       });
//     }
//   };

//   componentDidMount() {
//     this.props.state.price > 0 && this.props.state.quantity > 0
//       ? this.props.setSum(this.props.state.price * this.props.state.quantity)
//       : this.props.setSum(0);
//   }

//   render() {
//     return this.state.isLoading ? (
//       <div>...Loading</div>
//     ) : (
//       <Form
//         price={this.props.state.price}
//         quantity={this.props.state.quantity}
//         sum={this.props.state.sum}
//         handleInputChange={this.handleInputChange}
//         sendDataInputs={this.sendDataInputs}
//       />
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   state,
// });

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onSendData: (dataInputs) => {
//       dispatch(setValues(dataInputs));
//     },
//     setPrice: (price) => {
//       dispatch(setPrice(price));
//     },
//     setQuantity: (quantity) => {
//       dispatch(setQuantity(quantity));
//     },
//     setSum: (sum) => {
//       dispatch(setSum(sum));
//     },
//     setChanged: (data) => {
//       dispatch(setChanged(data));
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Finandy);
