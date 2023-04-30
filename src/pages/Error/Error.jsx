import { useRouteError, useNavigate } from "react-router-dom";

import Title from "../../components/Title/Title";

import "./Error.css";
import LinkButton from "../../components/Buttons/LinkButton";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <Title
        text="Oops! Something went wrong"
        coffin
      />
      <div className="error-text">
        {/* <p>Something went wrong.</p> */}
        <p className="error">Error: {error.statusText || error.message}</p>
        <LinkButton
          main
          reload
          text="Return to Start"
          to="/"
        />
      </div>
    </div>
  );
};

export default Error;
