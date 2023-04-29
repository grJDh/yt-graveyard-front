import { useRouteError } from "react-router-dom";

import Title from "../../components/Title/Title";

import "./Error.css";

import coffin_error from "../../assets/coffin_error.svg";

const Error = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-container">
      <Title />
      <div className="error-text">
        <p>Oops! Something went wrong.</p>
        <p className="error">Error: {error.statusText || error.message}</p>
        <img src={coffin_error} />
      </div>
    </div>
  );
};

export default Error;
