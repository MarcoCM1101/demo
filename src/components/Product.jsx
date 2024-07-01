import React from "react";
import PropTypes from "prop-types";

const Product = ({ id, name, price, currency, imgSrc }) => {
  return (
    <div className="Product">
      <div className="column text">
        <h2>{name}</h2>
        <p>ID de Producto: {id}</p>
        <p>Precio: ${price}</p>
        <p>Moneda: ${currency}</p>
      </div>
      <div className="column image">
        <img src={imgSrc} alt={name} />
      </div>
    </div>
  );
};

Product.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  imgSrc: PropTypes.string.isRequired,
};

export default Product;
