import { Link } from "react-router-dom";

import grave_main from "../../assets/grave_main.svg";

import "./Title.css";

const Title = () => {
  //username cannot be empty or

  return (
    <div className="title">
      <Link to="/">
        <img src={grave_main} />
      </Link>
      <h1>YouTube Graveyard</h1>
    </div>
  );
};

export default Title;
