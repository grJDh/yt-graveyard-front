import { useNavigate } from "react-router-dom";

import "./Manual.css";

import yt_privacy from "../../assets/yt_privacy.png";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useEffect, useState } from "react";

const Manual = () => {
  const [serverStatus, setServerStatus] = useState(null);
  const [token, setToken] = useState("");

  const handleSetToken = event => setToken(event.target.value);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkServer = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/");
  //       setServerStatus(response.status);
  //     } catch (error) {
  //       console.log(error);
  //       setServerStatus(503);
  //     }
  //   };

  //   checkServer();
  // }, []);

  // const checkForServerResponse = () => {
  //   switch (serverStatus) {
  //     case 200:
  //       return renderContent();
  //     case null:
  //       return (
  //         <div className="manual-steps">
  //           <p>Checking for server availability...</p>
  //           <div class="lds-dual-ring"></div>
  //         </div>
  //       );
  //     default:
  //       return (
  //         <div className="manual-steps">
  //           <p>Sorry, but the server is not responding. Please, try again later!</p>
  //         </div>
  //       );
  //   }
  // };

  // return checkForServerResponse();
  return (
    <div className="manual-steps">
      <p>
        In order for the site to see your subscriptions, you need to make them public. You can do this by following{" "}
        <a href="https://www.youtube.com/account_privacy">this link</a> and turning off the "Keep all my subscriptions
        private" setting. Don't worry - you can turn it back on later!
      </p>
      <p>After that, enter your username or channel ID here:</p>
      <Input
        placeholder="@YourUsername/YourChannelID"
        text="Your username or channel ID here"
        onChange={handleSetToken}
      />
      <Button
        text="I did it!"
        onClick={() =>
          navigate("/result", {
            state: {
              type: "manual",
              token: token,
            },
          })
        }
      />
      <img
        src={yt_privacy}
        alt='"Keep all my subscriptions private" setting'
      />
      {/* <img
        src={yt_privacy}
        alt='"Keep all my subscriptions private" setting'
      /> */}
    </div>
  );
};

export default Manual;
