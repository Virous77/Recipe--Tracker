import React from "react";
import "../styles/Error.css";

const Error = ({ error }) => {
  return <p className="error">{error}</p>;
};

export default Error;
