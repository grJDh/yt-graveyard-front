import { Link } from "react-router-dom";

import grave_main from "../../assets/grave_main.svg";

import "./Title.css";

const Title = () => {
  //username cannot be empty or

  return (
    <Link
      to="/"
      className="title"
    >
      <img src={grave_main} />
      <h1>YouTube Graveyard</h1>
    </Link>
  );
};

export default Title;
