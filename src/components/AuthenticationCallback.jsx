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
    // Aquí puedes manejar la respuesta de la transacción, como validar la transacción en el servidor
    if (transactionId) {
      sessionStorage.setItem("transactionId", transactionId);
    }
  }, [location]);

  return (
    <div className="Iframe">
      <h2>Authentication Callback</h2>
      <p>Autenticación completada.</p>
      <p>
        Transaction Status:{" "}
        {new URLSearchParams(location.search).get("transactionStatus")}
      </p>
      <p>
        Transaction ID:{" "}
        {new URLSearchParams(location.search).get("transactionId")}
      </p>
    </div>
  );
};

export default AuthenticationCallback;
