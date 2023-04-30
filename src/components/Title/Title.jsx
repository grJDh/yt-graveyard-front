import { Link } from "react-router-dom";

import grave_main from "../../assets/grave_main.svg";
import coffin_error from "../../assets/coffin_error.svg";

import "./Title.css";

const Title = ({ text = "YouTube Graveyard", coffin = false }) => {
  return (
    <div className="title">
      <Link
        to="/"
        reloadDocument
      >
        <img src={coffin ? coffin_error : grave_main} />
      </Link>
      <h1>{text}</h1>
    </div>
  );
};

export default Title;
