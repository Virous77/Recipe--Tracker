import React from "react";
import { ImSpinner9 } from "react-icons/im";
import "../styles/Spinner.css";

const Spinner = () => {
  return (
    <span className="spinner">
      <ImSpinner9 className="spinnerIcon" />
    </span>
  );
};

export default Spinner;
