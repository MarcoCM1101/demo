import React, { useState } from "react";
import PaymentForm from "./PaymentForms";
import OrderSummary from "./OrderSummary";
import PaymentResult from "./PaymentResult";

const Checkout = () => {
  const [paymentResult, setPaymentResult] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleCheckboxChange = () => {
    setShowPaymentForm(!showPaymentForm);
  };

  return (
    <div className="checkout">
      <OrderSummary />
      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={showPaymentForm}
            onChange={handleCheckboxChange}
          />
          Payment Gateway Prosa
        </label>
      </div>
      {showPaymentForm && <PaymentForm setPaymentResult={setPaymentResult} />}
      {paymentResult && <PaymentResult result={paymentResult} />}
    </div>
  );
};

export default Checkout;
