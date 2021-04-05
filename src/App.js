import React, { useState } from "react";
import "./App.css";
import ReactDOM from "react-dom";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function App() {
  const [price, setPrice] = useState(0);
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: price,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture();
  };

  return (
    <div className="app">
      <h3>PayPal Checkout</h3>
      <div className="wrapper">
        <div className="inputContainer">
          <label>Enter the amount</label>
          <input
            type="number"
            value={price}
            placeholder="Enter amount"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <PayPalButton
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        />
      </div>
    </div>
  );
}

export default App;
