import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import Button from "../../components/Buttons/Button";
import LinkButton from "../../components/Buttons/LinkButton";
import Loading from "../../components/Loading/Loading";

import "./Start.css";

const Start = () => {
  const [serverStatus, setServerStatus] = useState(null);

  const navigate = useNavigate;

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
        return <Loading text="Checking for server availability..." />;
      default:
        // return renderContent();
        return (
          <div className="manual-steps">
            <p>Sorry, but the server is not responding. Please, try again later!</p>
          </div>
        );
    }
  };

  const login = useGoogleLogin({
    onSuccess: async googleResponse =>
      navigate("/result", {
        state: {
          type: "auth",
          token: googleResponse.access_token,
        },
      }),
    scope: "https://www.googleapis.com/auth/youtube.readonly",
  });

  const renderContent = () => {
    return (
      <div className="start-container">
        <p>See which Youtube channels you are subscribed to are probably dead 💀</p>
        <Button
          text="Continue with Google Account"
          main
          onClick={() => login()}
        />
        <LinkButton
          to="/manual"
          text="I don't want to login into my Google account"
        />
      </div>
    );
  };

  return checkForServerResponse();
};

export default Start;
