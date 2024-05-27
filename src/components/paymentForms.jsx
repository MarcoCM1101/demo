import React, { useState } from "react";
import paymentService from "../services/paymentService";

const PaymentForm = ({ setPaymentResult }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paymentData = {
      cardNumber,
      expiryDate,
      cvv,
      amount,
    };

    try {
      const result = await paymentService.processPayment(paymentData);
      setPaymentResult(result);
    } catch (error) {
      setPaymentResult({ error: "Payment failed" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Card Number:</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Expiry Date (MM/YY):</label>
        <input
          type="text"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>CVV:</label>
        <input
          type="text"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <button type="submit">Pay</button>
    </form>
  );
};

export default PaymentForm;
