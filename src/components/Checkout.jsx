import React, { useState } from "react";
import PaymentForm from "./PaymentForms";
import OrderSummary from "./OrderSummary";
import PaymentResult from "./PaymentResult";

const Checkout = () => {
  const [paymentResult, setPaymentResult] = useState(null);

  return (
    <div className="checkout">
      <OrderSummary />
      <PaymentForm setPaymentResult={setPaymentResult} />
      {paymentResult && <PaymentResult result={paymentResult} />}
    </div>
  );
};

export default Checkout;
