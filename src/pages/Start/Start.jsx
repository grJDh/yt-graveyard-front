import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Start.css";

const Start = () => {
  const [serverStatus, setServerStatus] = useState(null);

  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await fetch("http://localhost:3000/");
        setServerStatus(response.status);
      } catch (error) {
        console.log(error);
        setServerStatus(503);
      }
    };

    checkServer();
  }, []);

  const checkForServerResponse = () => {
    switch (serverStatus) {
      case 200:
        return renderContent();
      case null:
        return (
          <div className="manual-steps">
            <p>Checking for server availability...</p>
            <div className="lds-dual-ring"></div>
          </div>
        );
      default:
        return (
          <div className="manual-steps">
            <p>Sorry, but the server is not responding. Please, try again later!</p>
          </div>
        );
    }
  };

  const renderContent = () => {
    return (
      <div className="start-container">
        <Link
          to="/auth"
          className="auth-choice"
        >
          <h2>I'm okay with logging in my Google account</h2>
          {/* <p>or I don't know my Youtube username/channel ID</p> */}
        </Link>
        <Link
          to="/manual"
          className="username-choice"
        >
          <h2>I don't want to log in my Google account</h2>
          {/* <p>and I know my Youtube username/channel ID</p> */}
        </Link>
      </div>
    );
  };

  return checkForServerResponse();
};

export default Start;
