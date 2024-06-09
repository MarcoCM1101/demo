import React, { useState } from "react";
import paymentService from "../services/paymentService";

const PaymentForm = ({ setPaymentResult }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "MX",
    email: "",
    phoneNumber: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paymentData = {
      cardNumber,
      expiryDate,
      cvv,
      amount,
      billingInfo,
    };

    try {
      const result = await paymentService.processPayment(paymentData);
      setPaymentResult(result);
    } catch (error) {
      setPaymentResult({ error: "Payment failed" });
    }
  };

  const handleBillingInfoChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <div className="payment-form">
      <h2>Pay With Card</h2>
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
        <h3>Billing Information</h3>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={billingInfo.firstName}
            onChange={handleBillingInfoChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={billingInfo.lastName}
            onChange={handleBillingInfoChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={billingInfo.address}
            onChange={handleBillingInfoChange}
            required
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={billingInfo.city}
            onChange={handleBillingInfoChange}
            required
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={billingInfo.state}
            onChange={handleBillingInfoChange}
            required
          />
        </div>
        <div>
          <label>Zip Code:</label>
          <input
            type="text"
            name="zipCode"
            value={billingInfo.zipCode}
            onChange={handleBillingInfoChange}
            required
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={billingInfo.country}
            onChange={handleBillingInfoChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={billingInfo.email}
            onChange={handleBillingInfoChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={billingInfo.phoneNumber}
            onChange={handleBillingInfoChange}
            required
          />
        </div>
        <button type="submit">Pay</button>
      </form>
    </div>
  );
};

export default PaymentForm;
