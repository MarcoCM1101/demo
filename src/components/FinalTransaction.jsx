import React from "react";
import PropTypes from "prop-types";

const FinalTransaction = ({ status }) => {
  return (
    <div className="FinalTransaction">
      <h2>Final Transaction</h2>
      <p>Transaction Status: {status}</p>
    </div>
  );
};

FinalTransaction.propTypes = {
  status: PropTypes.string.isRequired,
};

export default FinalTransaction;
