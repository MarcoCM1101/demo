import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthenticationCallback = () => {
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const transactionStatus = query.get("transactionStatus");
    const transactionId = query.get("transactionId");
    console.log("Transaction Status:", transactionStatus);
    console.log("Transaction ID:", transactionId);
    // Haz algo con la información de la transacción aquí, como validar la transacción en el servidor
  }, [location]);

  return (
    <div>
      <h2>Authentication Callback</h2>
      <p>Autenticación completada.</p>
    </div>
  );
};

export default AuthenticationCallback;
