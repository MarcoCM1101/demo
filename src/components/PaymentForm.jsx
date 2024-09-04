import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import IframeForm from "./IframeForm";
import StepUpIframe from "./IframeChallenge";
import AuthenticationCallback from "./AuthenticationCallback"; // Asegúrate de importar el componente
import FinalTransaction from "./FinalTransaction"; // Asegúrate de importar el componente

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
  const [status, setStatus] = useState("");
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const transactionId = sessionStorage.getItem("transactionId");
      if (transactionId) {
        const validateData = {
          clientReferenceInformation: {
            code: cartId,
          },
          orderInformation: {
            amountDetails: {
              currency: "MXN",
              totalAmount: "10.99",
            },
          },
          paymentInformation: {
            card: {
              type: "001",
              number: formData.cardNumber,
              expirationMonth: formData.expirationMonth,
              expirationYear: formData.expirationYear,
            },
          },
          consumerAuthenticationInformation: {
            authenticationTransactionId: transactionId,
          },
        };

        axios
          .post(
            "http://localhost:8080/payerAuthentication/validate",
            validateData
          )
          .then((response) => {
            console.log("Validation successful:", response.data.status);
            setStatus(response.data.status);
            setJwtChallenge("");
            clearInterval(intervalId); // Detiene la verificación después de una validación exitosa
            sessionStorage.removeItem("transactionId");
          })
          .catch((error) => {
            console.error("There was an error during validation:", error);
            sessionStorage.removeItem("transactionId");
          });
      }
    }, 5000); // Verifica cada 5 segundos

    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonte
  }, [cartId, formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
          setJwt(response.data.consumerAuthenticationInformation.accessToken);
          setReference(
            response.data.consumerAuthenticationInformation.referenceId
          );
        }
      })
      .catch((error) => {
        console.error("There was an error making the payment setup:", error);
      });
  };

  const handleResponseIframe = () => {
    setResponseIframe(true);
    setIsLoading(true);

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
          administrativeArea: "MEX",
          country: "MX",
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
        returnUrl:
          "https://storefront-payment-beta.enviaflores.com/v1/payments/cybersource/payer_authentication/check_enrollment_response",
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
          setIsLoading(false);
          if (response.data.consumerAuthenticationInformation.accessToken) {
            const jwtChallenge1 =
              response.data.consumerAuthenticationInformation.accessToken;
            setJwtChallenge(jwtChallenge1);
            console.log("JWT Challenge:", jwtChallenge1);
          } else {
            console.log(
              "Enrollment successful, no JWT Challenge",
              response.data.status
            );
            setStatus(response.data.status);
          }
        })
        .catch((error) => {
          console.error("There was an error during enrollment:", error);
          setIsLoading(false);
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

      <p>{isloading && "Cargando..."}</p>

      {/* Renderiza el iframe con el JWT si está disponible */}
      {jwt && <IframeForm jwt={jwt} setResponseIframe={handleResponseIframe} />}
      {jwtChallenge && <StepUpIframe jwtChallenge={jwtChallenge} />}
      {status && <FinalTransaction status={status} />}
    </div>
  );
};

PaymentForm.propTypes = {
  cartId: PropTypes.number.isRequired,
};

export default PaymentForm;
