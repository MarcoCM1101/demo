import React, { useState, useEffect } from "react";
import Product from "./Product";
import PaymentForm from "./PaymentForm";

const Cart = () => {
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    // Generar un número aleatorio para el ID del carrito
    const generateCartId = () => {
      return Math.floor(Math.random() * 1000000);
    };
    setCartId(generateCartId());
  }, []);

  const product = {
    id: "12345",
    name: "Rosas",
    price: 19.99,
    currency: "MXN",
    imgSrc: "Ramo.png",
  };

  return (
    <div className="Cart">
      <h2>Shopping Cart</h2>
      <p>ID del Carrito: {cartId}</p>
      <Product
        id={product.id}
        name={product.name}
        price={product.price}
        currency={product.currency}
        imgSrc={product.imgSrc}
      />
      <div className="PaymentForm">
        {cartId !== null && <PaymentForm cartId={cartId} />}
      </div>
    </div>
  );
};

export default Cart;
