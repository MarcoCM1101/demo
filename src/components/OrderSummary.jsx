import React from "react";

const OrderSummary = () => {
  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <div className="item">
        <div className="item-details">
          <p>Espresso Maker</p>
          <p>Dual shot · frother wand</p>
          <p>Quantity: 1</p>
        </div>
        <div className="item-price">
          <p>$279.99</p>
        </div>
      </div>
      <div className="summary-details">
        <p>Shipping: $0.00</p>
        <p>Estimated Tax (94404): $10.00</p>
        <h3>Total: $289.99</h3>
      </div>
    </div>
  );
};

export default OrderSummary;
