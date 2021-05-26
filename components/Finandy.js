import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sendData } from "../redux/finThunk";
import styles from "../styles/Home.module.css";

const Finandy = ({ data }) => {
  const [price, setprice] = useState(data.price);
  const [quantity, setquantity] = useState(data.quantity);
  const [sum, setsum] = useState(data.sum);
  const [changed, setchanged] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const target = e.target;
    const value =
      target.value > 0 ? Number.parseFloat(target.value).toFixed() : 1;
    const name = target.name;

    if (!changed) {
      console.log(name);
      setchanged(name);
      name === "price"
        ? setprice(value)
        : name === "sum"
        ? setquantity(value / price)
        : setquantity(value);
    } else {
      if (name === "price") {
        setprice(value);
        changed === "price"
          ? null
          : changed === "sum"
          ? setsum(quantity * value)
          : setquantity(sum / value);
      }
      if (name === "quantity") {
        setquantity(value);
        changed === "price"
          ? setprice(sum / value)
          : changed === "sum"
          ? setsum(price * value)
          : null;
      }
      if (name === "sum") {
        console.log("sum", value);
        setsum(value);
        changed === "price"
          ? setprice(value / quantity)
          : setquantity(value / price);
      }
    }
  };

  const sendDataInputs = async () => {
    setisLoading(true);
    const response = await dispatch(sendData({ price, quantity, sum }));

    if (sendData.fulfilled.match(response)) {
      setisLoading(false);
    } else {
      console.log(response.payload);
      alert(response.payload)
      setisLoading(false);
    }
  };

  useEffect(() => {
    price > 0 && quantity > 0 ? setsum(price * quantity) : setsum(0);
  }, [price, quantity]);

  return isLoading ? (
    <div>...Loading</div>
  ) : (
    <div className={styles.container}>
      <form className={styles.form}>
        <label className={styles.label}>Price:</label>
        <br />
        <input
          name="price"
          className={styles.input}
          type="number"
          value={price}
          onChange={handleInputChange}
        />
        <br />
        <label className={styles.label}>Quantity:</label>
        <br />
        <input
          name="quantity"
          className={styles.input}
          type="number"
          value={quantity}
          onChange={handleInputChange}
        />
        <br />
        <label className={styles.label}>Sum:</label>
        <br />
        <input
          name="sum"
          className={styles.input}
          type="number"
          value={sum}
          onChange={handleInputChange}
        />
        <br />
      </form>
      <button
        className={styles.btn}
        type="submit"
        onClick={() => sendDataInputs()}
      >
        Submit
      </button>
    </div>
  );
};

export default Finandy;
