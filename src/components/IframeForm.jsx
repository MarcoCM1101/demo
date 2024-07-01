import React, { useEffect } from "react";
import PropTypes from "prop-types";

const IframeForm = ({ jwt, setResponseIframe }) => {
  useEffect(() => {
    // Enviar el formulario automáticamente cuando el componente se monta
    const cardinalCollectionForm = document.querySelector(
      "#cardinal_collection_form"
    );
    if (cardinalCollectionForm) {
      cardinalCollectionForm.submit();
    }

    // Agregar listener para el evento message
    const messageListener = (event) => {
      if (event.origin === "https://centinelapistag.cardinalcommerce.com") {
        console.log(event.data);
        setResponseIframe(event.data);
      }
    };

    window.addEventListener("message", messageListener, false);

    // Eliminar el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("message", messageListener, false);
    };
  }, [jwt]);

  return (
    <div>
      <iframe
        id="cardinal_collection_iframe"
        name="collectionIframe"
        height="10"
        width="10"
        style={{ display: "none" }}
      ></iframe>
      <form
        id="cardinal_collection_form"
        method="POST"
        target="collectionIframe"
        action="https://centinelapistag.cardinalcommerce.com/V1/Cruise/Collect"
      >
        <input
          id="cardinal_collection_form_input"
          type="hidden"
          name="JWT"
          value={jwt}
        />
      </form>
    </div>
  );
};

IframeForm.propTypes = {
  jwt: PropTypes.string.isRequired,
};

export default IframeForm;
