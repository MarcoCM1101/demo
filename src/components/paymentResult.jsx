import React from "react";

const PaymentResult = ({ result }) => {
  return (
    <div>
      <h2>Payment Result</h2>
      {result.error ? (
        <p style={{ color: "red" }}>{result.error}</p>
      ) : (
        <p style={{ color: "green" }}>
          Payment Successful! Transaction ID: {result.id}
        </p>
      )}
    </div>
  );
};

export default PaymentResult;
