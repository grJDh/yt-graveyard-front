import { Link } from "react-router-dom";

import LinkButton from "../Buttons/LinkButton";

import "./ErrorResponse.css";

const ErrorResponse = ({ text }) => {
  return (
    <div className="error-response-container">
      <p>{text}</p>
      <LinkButton
        main
        text="Return to Start"
        to="/"
        reload
      />
    </div>
  );
};

export default ErrorResponse;
