import React from "react";
import styles from "../../styles/Home.module.css";

type FormProps = {
  price: number;
  quantity: number;
  sum: number;
  handleInputChange: (event: React.FormEvent) => void;
  sendDataInputs: () => void;
};

const Form: React.FC<FormProps> = ({
  price,
  quantity,
  sum,
  handleInputChange,
  sendDataInputs,
}) => {
  return (
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

export default Form;
