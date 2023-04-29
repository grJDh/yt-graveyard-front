import { Link } from "react-router-dom";

import "./Buttons.css";

const LinkButton = ({ to, main = false, text }) => {
  return (
    <Link
      to={to}
      className={`button ${main ? "main-button" : ""}`}
    >
      {text}
    </Link>
  );
};

export default LinkButton;
