import { Link } from "react-router-dom";

import "./Start.css";

const Start = () => {
  return (
    <div className="start-container">
      <Link
        to="/auth"
        className="auth-choice"
      >
        <h2>I'm okay with logging in my Google account</h2>
        <p>or I don't know my Youtube username/channel ID</p>
      </Link>
      <Link
        to="/manual"
        className="username-choice"
      >
        <h2>I don't want to log in my Google account</h2>
        <p>and I know my Youtube username/channel ID</p>
      </Link>
    </div>
  );
};

export default Start;
