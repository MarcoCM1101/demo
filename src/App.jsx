import React, { useState } from "react";
import PaymentForm from "./components/paymentForms.jsx";
import PaymentResult from "./components/paymentResult.jsx";
import "./App.css";

const App = () => {
  const [paymentResult, setPaymentResult] = useState(null);

  return (
    <div className="App">
      <h1>Payment Simulator</h1>
      <PaymentForm setPaymentResult={setPaymentResult} />
      {paymentResult && <PaymentResult result={paymentResult} />}
    </div>
  );
};

export default App;
