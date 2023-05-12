import { Link } from "react-router-dom";

import grave_main from "../../assets/grave_main.svg";
import coffin_error from "../../assets/coffin_error.svg";

import "./Title.css";

const Title = ({ text = "YouTube Graveyard", coffin = false }) => {
  return (
    <header className="title">
      <Link
        to="/"
        reloadDocument
        aria-label="Return to the Start page"
      >
        <img
          src={coffin ? coffin_error : grave_main}
          alt="Logo"
        />
      </Link>
      <h1>{text}</h1>
    </header>
  );
};

export default Title;
