import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import IframeForm from "./IframeForm";
import StepUpIframe from "./IframeChallenge";

const PaymentForm = ({ cartId }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
  });

  const [jwt, setJwt] = useState("");
  const [referenceid, setReference] = useState("");
  const [responseIframe, setResponseIframe] = useState(false);
  const [jwtChallenge, setJwtChallenge] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar que todos los campos estén llenos
    for (const key in formData) {
      if (formData[key] === "") {
        alert("Todos los campos son requeridos.");
        return;
      }
    }

    const dataToSend = {
      clientReferenceInformation: {
        code: cartId,
      },
      paymentInformation: {
        card: {
          type: "001",
          number: formData.cardNumber,
          expirationMonth: formData.expirationMonth,
          expirationYear: formData.expirationYear,
        },
      },
    };

    axios
      .post("http://localhost:8080/payerAuthentication/setup", dataToSend)
      .then((response) => {
        console.log("Payment setup successful:", response.data);
        if (
          response.data.consumerAuthenticationInformation.accessToken &&
          response.data.consumerAuthenticationInformation.referenceId
        ) {
          setJwt(response.data.consumerAuthenticationInformation.accessToken); // Set JWT from response
          setReference(
            response.data.consumerAuthenticationInformation.referenceId
          ); // Set reference from response
        }
      })
      .catch((error) => {
        console.error("There was an error making the payment setup:", error);
      });
  };

  const handleResponseIframe = () => {
    setResponseIframe(true);

    const enrollData = {
      clientReferenceInformation: {
        code: cartId.toString(),
      },
      orderInformation: {
        amountDetails: {
          currency: "MXN",
          totalAmount: "10.99",
        },
        billTo: {
          address1: "Av Jaime Balmes",
          address2: "Address 2",
          administrativeArea: "CA",
          country: "US",
          locality: "Mexico City",
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          postalCode: "11510",
        },
      },
      paymentInformation: {
        card: {
          type: "001",
          expirationMonth: formData.expirationMonth,
          expirationYear: formData.expirationYear,
          number: formData.cardNumber,
        },
      },
      consumerAuthenticationInformation: {
        returnUrl: "http://localhost:5173/authentication-callback",
        referenceId: referenceid,
        transactionMode: "eCommerce",
      },
    };

    // Esperar 10 segundos antes de hacer la petición de enroll
    setTimeout(() => {
      axios
        .post("http://localhost:8080/payerAuthentication/enroll", enrollData)
        .then((response) => {
          console.log("Enrollment successful:", response.data);
          if (response.data.consumerAuthenticationInformation.accessToken) {
            const jwtChallenge1 =
              response.data.consumerAuthenticationInformation.accessToken;
            setJwtChallenge(jwtChallenge1);
            console.log("JWT Challenge:", jwtChallenge1);
          }
        })
        .catch((error) => {
          console.error("There was an error during enrollment:", error);
        });
    }, 10000);
  };

  return (
    <div className="PaymentForm">
      <h2>Payment Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Información de Dirección */}
        <div className="form-group">
          <label htmlFor="firstName">Nombre</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Apellido</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Teléfono</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Información de la Tarjeta */}
        <div className="form-group">
          <label htmlFor="cardNumber">Número de Tarjeta</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="expirationMonth">Mes de Expiración</label>
          <input
            type="text"
            id="expirationMonth"
            name="expirationMonth"
            value={formData.expirationMonth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="expirationYear">Año de Expiración</label>
          <input
            type="text"
            id="expirationYear"
            name="expirationYear"
            value={formData.expirationYear}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Pagar</button>
      </form>

      {/* Renderiza el iframe con el JWT si está disponible */}
      {jwt && <IframeForm jwt={jwt} setResponseIframe={handleResponseIframe} />}
      {jwtChallenge && <StepUpIframe jwtChallenge={jwtChallenge} />}
    </div>
  );
};

PaymentForm.propTypes = {
  cartId: PropTypes.number.isRequired,
};

export default PaymentForm;
