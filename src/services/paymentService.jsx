const processPayment = async (paymentData) => {
  const response = await fetch("http://localhost:3000/api/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentData),
  });

  console.log(paymentData);
  if (!response.ok) {
    throw new Error("Payment failed");
  }

  return response.json();
};

export default {
  processPayment,
};
