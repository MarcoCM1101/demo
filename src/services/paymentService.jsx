const processPayment = async (paymentData) => {
  const response = await fetch("http://localhost:3000/payment/pay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentData),
  });

  console.log(paymentData);
  console.log(response);
  if (!response.ok) {
    throw new Error("Payment failed");
  }

  return response.json();
};

export default {
  processPayment,
};
